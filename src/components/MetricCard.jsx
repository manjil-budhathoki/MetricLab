import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MetricCard({ 
  title, 
  description, 
  image, 
  backgroundColor, // now expecting gradient string or fallback
  onClick,
  characterType = 'fox',
  modelType = 'classification',
  metrics = {
    accuracy: 0.89,
    precision: 0.92,
    recall: 0.85,
    f1Score: 0.88,
    rmse: 0.24,
    mae: 0.19,
    r2: 0.91
  }
}) {
  const [isHovered, setIsHovered] = useState(false);

  const characterStyles = {
    fox: {
      accent: 'text-orange-500',
      statBarColor: 'bg-orange-500',
      statBgColor: 'bg-orange-200/50',
      iconStyle: 'text-orange-500'
    },
    whiteWarrior: {
      accent: 'text-indigo-500',
      statBarColor: 'bg-indigo-500',
      statBgColor: 'bg-indigo-200/50',
      iconStyle: 'text-indigo-500'
    }
  };

  const styles = characterStyles[characterType] || characterStyles.fox;

  const formatMetric = (value) => {
    if (typeof value === 'number') {
      return value < 1 ? `${(value * 100).toFixed(1)}%` : value.toFixed(2);
    }
    return value;
  };

  const getRelevantMetrics = () => {
    if (modelType === 'classification') {
      return [
        { name: 'Accuracy', value: metrics.accuracy, icon: '🎯' },
        { name: 'Precision', value: metrics.precision, icon: '✓' },
        { name: 'Recall', value: metrics.recall, icon: '🔍' },
        { name: 'F1 Score', value: metrics.f1Score, icon: '⚖️' }
      ];
    } else {
      return [
        { name: 'RMSE', value: metrics.rmse, icon: '📉' },
        { name: 'MAE', value: metrics.mae, icon: '📊' },
        { name: 'R² Score', value: metrics.r2, icon: '📈' }
      ];
    }
  };

  const renderStatBar = (name, value, icon, index) => {
    const widthPercentage = typeof value === 'number' && value < 1 
      ? Math.max(value * 100, 15) 
      : Math.min(value * 10, 100); // Scale regression metrics

    return (
      <motion.div 
        key={name}
        className="mb-2 last:mb-0" 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 + (index * 0.05) }}
      >
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center">
            <span className="mr-1">{icon}</span>
            <span className="text-xs font-medium text-white">{name}</span>
          </div>
          <span className="text-xs font-bold text-white">{formatMetric(value)}</span>
        </div>
        <div className={`w-full h-1.5 rounded-full ${styles.statBgColor}`}>
          <motion.div 
            className={`h-full rounded-full ${styles.statBarColor}`}
            initial={{ width: '0%' }}
            animate={{ width: `${widthPercentage}%` }}
            transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-[200px] sm:w-[240px] h-[300px] sm:h-[340px] cursor-pointer group"
    >
      {/* Gradient Background */}
      <div
        className="absolute inset-0 z-0 rounded-2xl shadow-lg"
        style={{
          background: backgroundColor || 'linear-gradient(to bottom right, #10b981, #065f46)'
        }}
      />

      {/* Character image - now slightly bigger */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10 w-[110px] sm:w-[130px]">
        <motion.img
            src={image}
            alt={title}
            className="h-auto max-w-full object-contain"
            animate={{ 
            y: isHovered ? -10 : 0,
            scale: isHovered ? 1.1 : 1
            }}
            transition={{ type: "spring", stiffness: 300 }}
        />
        </div>



      {/* Hover Metrics Panel */}
      <motion.div 
        className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 bg-black/70 backdrop-blur-sm rounded-2xl transition duration-300 flex flex-col text-white px-4 py-6"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.div 
          className="flex flex-col h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <div className="text-center mb-2">
            <motion.h3 className="text-lg font-bold" initial={{ y: -10 }} animate={{ y: 0 }} transition={{ delay: 0.1 }}>
              {title}
            </motion.h3>
            <motion.p className="text-xs text-white/80" initial={{ y: -5 }} animate={{ y: 0 }} transition={{ delay: 0.15 }}>
              {description}
            </motion.p>
          </div>

          <motion.div 
            className="flex justify-center mb-3"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className={`text-xs px-2 py-1 rounded-full border border-white/30 ${styles.accent}`}>
              {modelType === 'classification' ? 'Classification Expert' : 'Regression Master'}
            </span>
          </motion.div>

          <motion.h4 
            className={`text-xs font-semibold ${styles.accent} uppercase tracking-wider mb-2`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            Performance Metrics
          </motion.h4>

          <div className="space-y-2 mt-1">
            {getRelevantMetrics().map((metric, index) =>
              renderStatBar(metric.name, metric.value, metric.icon, index)
            )}
          </div>

          {/* Optional Particles */}
          {isHovered && [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{ 
                x: Math.random() * 200, 
                y: Math.random() * 300,
                opacity: 0 
              }}
              animate={{ 
                y: [null, Math.random() * -50],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 1 + Math.random() * 2,
                delay: Math.random(),
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
