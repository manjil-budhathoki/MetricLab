import { motion } from 'framer-motion';
import { Target, Check, RefreshCcw, Scale } from 'lucide-react';

export default function Classification() {
  const metrics = [
    { name: 'Accuracy', icon: <Target className="w-5 h-5 text-red-400" />, color: 'bg-white/5' },
    { name: 'Precision', icon: <Check className="w-5 h-5 text-green-400" />, color: 'bg-white/5' },
    { name: 'Recall', icon: <RefreshCcw className="w-5 h-5 text-orange-400" />, color: 'bg-white/5' },
    { name: 'F1 Score', icon: <Scale className="w-5 h-5 text-blue-400" />, color: 'bg-white/5' }
  ];

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#1a002d] via-[#2c1a55] to-[#12002f] text-white flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-center mb-4"
        >
          Classification Metrics Coming Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-white/70 max-w-xl mb-10"
        >
          We are preparing interactive visualizations for classification metrics like Accuracy, Precision, Recall, and F1 Score. Stay tuned!
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className={`rounded-2xl ${metric.color} backdrop-blur-md border border-white/20 p-6 shadow-xl flex items-center justify-between hover:scale-[1.02] transition duration-300`}
            >
              <div className="flex items-center">
                {metric.icon}
                <h3 className="text-lg font-semibold text-white/80 ml-3">{metric.name}</h3>
              </div>
              <span className="text-sm text-white/50 italic">Coming soon...</span>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="mt-20 text-white/40 text-sm text-center">
        <p>© 2025 MetricLab — Classification Coming Soon.</p>
        <p className="text-xs mt-1">We’re designing playful, animated insights to bring these metrics to life.</p>
      </footer>
    </div>
  );
}