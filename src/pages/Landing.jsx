import MetricCard from "../components/MetricCard";
import regressionFox from "../assets/Regression.png";
import classificationWolf from "../assets/Classification.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 sm:px-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#1b0033] via-[#251542] to-[#120018] text-white">
      {/* Background abstract characters (book, pen, atom icons) */}
      <div className="absolute inset-0 z-0 bg-[url('/background-pattern.svg')] bg-contain bg-repeat opacity-10 pointer-events-none" />

      {/* Hero Text Section */}
      <div className="z-10 text-center mb-10 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold leading-tight"
        >
          Master Machine Learning Metrics with <span className="text-violet-400">MetricLab</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-base sm:text-lg text-white/80"
        >
          Dive into interactive visualizations and explore core evaluation metrics in Supervised Learning.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-base sm:text-md text-white/60 mt-2 mb-6"
        >
          Learn through characters, track your metrics, and make ML concepts unforgettable.
        </motion.p>
      </div>

      {/* Cards Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="z-10 flex gap-16 flex-col sm:flex-row items-center justify-center"
      >
        <MetricCard
          title="Regression"
          description="Explore RMSE, MAE, R² Score and more."
          image={regressionFox}
          backgroundColor="linear-gradient(to bottom right, #15803d, #064e3b)"
          characterType="fox"
          modelType="regression"
          onClick={() => navigate("/regression")}
        />

        <MetricCard
          title="Classification"
          description="Understand Accuracy, F1 Score, Recall, and beyond."
          image={classificationWolf}
          backgroundColor="linear-gradient(to bottom right, #c2410c, #7c2d12)"
          characterType="whiteWarrior"
          modelType="classification"
          onClick={() => navigate("/classification")}
        />
      </motion.div>

      {/* Footer Text */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="z-10 mt-28 text-sm text-white/40"
      >
        <p>© 2025 MetricLab. Learn, Visualize, Master.</p>
        <p className="text-xs mt-1">Designed to guide your journey through the core of machine learning evaluation.</p>
      </motion.footer>
    </div>
  );
}
