import { motion } from 'framer-motion';
import { BarChart, Activity, SigmaSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Regression() {
  const navigate = useNavigate();

  const metrics = [
    { name: 'RMSE', icon: <BarChart className="w-5 h-5 text-green-400" />, status: 'active', desc: 'Root Mean Squared Error — penalizes large errors.' },
    { name: 'MAE', icon: <Activity className="w-5 h-5 text-orange-400" />, status: 'coming', desc: 'Mean Absolute Error — average of all errors.' },
    { name: 'R² Score', icon: <SigmaSquare className="w-5 h-5 text-blue-400" />, status: 'coming', desc: 'Explains variance captured by the model.' }
  ];

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0d0c26] via-[#191139] to-[#1a002d] text-white flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-center mb-4"
        >
          Dive into Regression Metrics
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-white/70 max-w-xl mb-10"
        >
          Visualize and explore key regression metrics like RMSE, MAE, and R² in an intuitive and interactive way.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className={`rounded-2xl cursor-pointer ${metric.status === 'active' ? 'hover:shadow-green-500/20' : 'cursor-not-allowed'} backdrop-blur-md border border-white/20 p-6 shadow-xl flex items-center justify-between transition duration-300 hover:scale-[1.02] ${metric.status === 'active' ? 'bg-white/10' : 'bg-white/5 opacity-60'}`}
              onClick={() => metric.status === 'active' && navigate('/regression/estimation-station')}
            >
              <div className="flex items-center">
                {metric.icon}
                <h3 className="text-lg font-semibold text-white/80 ml-3">{metric.name}</h3>
              </div>
              <span className={`text-sm ${metric.status === 'active' ? 'text-green-400' : 'text-white/50 italic'}`}>
                {metric.status === 'active' ? 'Explore more →' : 'Coming soon...'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="mt-20 text-white/40 text-sm text-center">
        <p>© 2025 MetricLab — Regression Visualized.</p>
        <p className="text-xs mt-1">Built for clarity and experimentation. Try RMSE now.</p>
      </footer>
    </div>
  );
}