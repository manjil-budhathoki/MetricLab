import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Info, PartyPopper } from 'lucide-react';

export default function RMSE() {
  const [data, setData] = useState([
    { actual: 3, predicted: 2.5 },
    { actual: 4, predicted: 4.2 },
    { actual: 5, predicted: 5.1 }
  ]);
  const [rmse, setRMSE] = useState(0);
  const [steps, setSteps] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const sections = ['intro', 'formula', 'interactive', 'steps', 'chart', 'score'];

  useEffect(() => {
    const calcSteps = data.map((d) => {
      const error = d.predicted - d.actual;
      return {
        ...d,
        error,
        squaredError: error * error
      };
    });
    const mse = calcSteps.reduce((sum, d) => sum + d.squaredError, 0) / calcSteps.length;
    setRMSE(Math.sqrt(mse));
    setSteps(calcSteps);
  }, [data]);

  const updateValue = (index, key, value) => {
    const updated = [...data];
    updated[index][key] = parseFloat(value);
    setData(updated);
  };

  const addRow = () => {
    setData([...data, { actual: 0, predicted: 0 }]);
  };

  const rmseRating = () => {
    const range = Math.max(...data.map(d => d.actual)) - Math.min(...data.map(d => d.actual));
    const percent = (rmse / range) * 100;
    if (percent < 10) return { label: 'Excellent 👍', color: 'text-green-400', reason: 'Your predictions are very close to real values. Great job!' };
    if (percent < 20) return { label: 'Good 😀', color: 'text-blue-400', reason: 'Pretty good, some predictions need tuning.' };
    if (percent < 30) return { label: 'Fair 🤔', color: 'text-yellow-400', reason: 'Some predictions are off. Let’s improve them!' };
    return { label: 'Poor 😢', color: 'text-red-400', reason: 'Big errors found. Maybe we missed something important!' };
  };

  const showNext = () => {
    const next = Math.min(currentSection + 1, sections.length - 1);
    setCurrentSection(next);
    if (next === sections.length - 1) setTimeout(() => setShowCelebration(true), 800);
  };

  const rating = rmseRating();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 sm:px-10 py-10">
      {/* Progress Dots */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${
              index === currentSection
                ? 'bg-green-400 scale-125 shadow-lg'
                : index < currentSection
                ? 'bg-green-400'
                : 'bg-white/20'
            } transition-all duration-300`}
          ></div>
        ))}
      </div>

      <main className="max-w-4xl mx-auto space-y-20 text-center">
        {/* Dynamic Content */}
        {currentSection >= 0 && (
          <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h1 className="text-4xl font-bold mb-4">👾 Meet Regie, your RMSE guide!</h1>
            <p className="text-white/80 mb-4">
              <span className="underline decoration-dotted cursor-help inline-flex items-center gap-1" title="RMSE (Root Mean Squared Error) helps you see how off your predictions are.">
                What is RMSE? <Info className="w-4 h-4" />
              </span>
              <br />
              RMSE tells us how far our guesses are from the truth!
            </p>
            <motion.button whileTap={{ scale: 0.95 }} onClick={showNext} className="bg-purple-500 px-6 py-2 rounded-xl hover:bg-purple-600">
              👉 Let's Begin
            </motion.button>
          </motion.section>
        )}

        {currentSection >= 1 && (
          <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-semibold mb-3">🧮 RMSE Formula</h2>
            <p className="text-white/70 mb-2">RMSE = √(Σ(predicted - actual)<sup>2</sup> / n)</p>
            <ul className="list-disc text-left text-sm text-white/60 pl-6 inline-block text-left">
              <li>Subtract prediction from actual</li>
              <li>Square the difference</li>
              <li>Find the average of all squared differences</li>
              <li>Take the square root of that average</li>
            </ul>
            <motion.button whileTap={{ scale: 0.95 }} onClick={showNext} className="mt-4 bg-purple-500 px-6 py-2 rounded-xl hover:bg-purple-600">
              ✅ Got it
            </motion.button>
          </motion.section>
        )}

        {currentSection >= 2 && (
          <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-2xl font-semibold mb-3">🎮 Try It Yourself</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {data.map((row, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg space-y-1 w-40">
                  <label className="block text-xs">Actual</label>
                  <input
                    type="number"
                    value={row.actual}
                    onChange={(e) => updateValue(i, 'actual', e.target.value)}
                    className="w-full text-black px-2 py-1 rounded"
                  />
                  <label className="block text-xs">Predicted</label>
                  <input
                    type="number"
                    value={row.predicted}
                    onChange={(e) => updateValue(i, 'predicted', e.target.value)}
                    className="w-full text-black px-2 py-1 rounded"
                  />
                </div>
              ))}
            </div>
            <motion.button whileTap={{ scale: 0.95 }} onClick={addRow} className="bg-green-500 px-4 py-1 rounded hover:bg-green-600 mr-3">
              ➕ Add Row
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={showNext} className="bg-purple-500 px-4 py-1 rounded hover:bg-purple-600">
              Next ➡️
            </motion.button>
          </motion.section>
        )}

        {currentSection >= 3 && (
          <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-2xl font-semibold mb-3">🔍 Breakdown</h2>
            <table className="mx-auto text-sm border border-white/10 rounded-xl w-full max-w-3xl">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-2">Actual</th>
                  <th className="p-2">Predicted</th>
                  <th className="p-2">Error</th>
                  <th className="p-2">Squared Error</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((row, i) => (
                  <tr key={i} className="text-center border-t border-white/5">
                    <td className="p-2">{row.actual}</td>
                    <td className="p-2">{row.predicted}</td>
                    <td className="p-2">{row.error.toFixed(2)}</td>
                    <td className="p-2">{row.squaredError.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <motion.button whileTap={{ scale: 0.95 }} onClick={showNext} className="mt-4 bg-purple-500 px-6 py-2 rounded-xl hover:bg-purple-600">
              Continue ➡️
            </motion.button>
          </motion.section>
        )}

        {currentSection >= 4 && (
          <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h2 className="text-2xl font-semibold mb-3">📊 Visualize Error</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={steps}>
                <XAxis dataKey="actual" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a2a', border: 'none' }} />
                <Bar dataKey="squaredError" fill="#38bdf8" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <motion.button whileTap={{ scale: 0.95 }} onClick={showNext} className="mt-4 bg-purple-500 px-6 py-2 rounded-xl hover:bg-purple-600">
              See My Score 🏁
            </motion.button>
          </motion.section>
        )}

        {currentSection >= 5 && (
          <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h2 className="text-3xl font-bold mb-2">
              Your RMSE is <span className="text-green-300">{rmse.toFixed(3)}</span>
            </h2>
            <p className="text-white/70 mb-2">That’s how far off your predictions are — on average.</p>
            <p className={`text-sm ${rating.color}`}>{rating.label}: {rating.reason}</p>
          </motion.section>
        )}

        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="bg-green-600/90 border border-white/10 text-white text-center rounded-xl px-6 py-10 shadow-2xl mt-10"
          >
            <div className="text-4xl mb-2 flex justify-center items-center gap-2">
              <PartyPopper className="w-8 h-8 animate-bounce" />
              Congratulations!
              <PartyPopper className="w-8 h-8 animate-bounce" />
            </div>
            <p className="text-lg mt-2 text-white/90">
              You’ve completed the RMSE walkthrough. You now understand how to evaluate prediction errors like a pro! 🎓
            </p>
          </motion.div>
        )}

        <footer className="text-white/40 text-sm text-center border-t border-white/10 pt-6 mt-10">
            <p>© 2025 MetricLab — Learn Regression Visually</p>
            <p className="text-xs mt-1">You're doing great — one step at a time 🚀</p>
        </footer>
      </main>
    </div>
  );
}
