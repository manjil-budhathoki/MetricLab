import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EstimationStation() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('welcome');
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [actuals, setActuals] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [totalRounds] = useState(5);
  const [timeLeft, setTimeLeft] = useState(10);
  const [currentImage, setCurrentImage] = useState(null);

  const calculateRMSE = (guesses, actuals) => {
    if (guesses.length === 0) return 0;
    const squaredErrors = guesses.map((guess, index) => {
      const error = guess - actuals[index];
      return error * error;
    });
    const meanSquaredError = squaredErrors.reduce((sum, err) => sum + err, 0) / guesses.length;
    return Math.sqrt(meanSquaredError).toFixed(2);
  };

  const generateRandomDotCount = () => Math.floor(Math.random() * 80) + 20;

  const generateNewImage = () => {
    const dotCount = generateRandomDotCount();
    actuals.push(dotCount);
    setActuals([...actuals]);
    return dotCount;
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentRound(1);
    setGuesses([]);
    setActuals([]);
    setScore(0);
    setCurrentImage(generateNewImage());
    setTimeLeft(10);
  };

  const submitGuess = () => {
    const guess = parseInt(currentGuess) || 0;
    guesses.push(guess);
    setGuesses([...guesses]);
    setCurrentGuess('');

    if (currentRound >= totalRounds) {
      setGameState('results');
    } else {
      setCurrentRound(currentRound + 1);
      setCurrentImage(generateNewImage());
      setTimeLeft(10);
    }
  };

  useEffect(() => {
    let timer = null;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (gameState === 'playing' && timeLeft === 0 && currentGuess === '') {
      submitGuess();
    }
    return () => { if (timer) clearTimeout(timer); };
  }, [timeLeft, gameState, currentGuess]);

  const renderDots = (count) => {
    const dots = [];
    const colors = ['bg-cyan-500', 'bg-pink-500', 'bg-green-500', 'bg-amber-500', 'bg-purple-500', 'bg-blue-500', 'bg-red-400'];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 280) + 10;
      const y = Math.floor(Math.random() * 280) + 10;
      const size = Math.floor(Math.random() * 10) + 5;
      const colorIndex = Math.floor(Math.random() * colors.length);
      dots.push(
        <div key={i} className={`absolute rounded-full ${colors[colorIndex]} shadow-lg`} style={{ left: `${x}px`, top: `${y}px`, width: `${size}px`, height: `${size}px`, filter: 'brightness(1.2)' }} />
      );
    }
    return dots;
  };

  const renderResultsTable = () => {
    return (
      <div className="p-4 bg-gray-800 rounded-lg shadow-md border border-purple-500">
        <h3 className="text-xl font-bold mb-4 text-cyan-400">Your Results</h3>
        <table className="w-full text-left border-collapse mb-4 text-gray-300">
          <thead>
            <tr className="bg-gray-900">
              <th className="p-2 border border-gray-700">Round</th>
              <th className="p-2 border border-gray-700">Your Guess</th>
              <th className="p-2 border border-gray-700">Actual Count</th>
              <th className="p-2 border border-gray-700">Error</th>
              <th className="p-2 border border-gray-700">Squared Error</th>
            </tr>
          </thead>
          <tbody>
            {guesses.map((guess, index) => {
              const actual = actuals[index];
              const error = guess - actual;
              const squaredError = error * error;
              return (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-2 border border-gray-700">{index + 1}</td>
                  <td className="p-2 border border-gray-700">{guess}</td>
                  <td className="p-2 border border-gray-700">{actual}</td>
                  <td className="p-2 border border-gray-700">{error}</td>
                  <td className="p-2 border border-gray-700">{squaredError}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="bg-gray-900 p-4 rounded-lg border border-blue-500">
          <h4 className="font-bold mb-2 text-purple-300">RMSE Calculation</h4>
          <p className="mb-2 text-gray-300">1. Mean of Squared Errors: {(guesses.map((guess, index) => { const error = guess - actuals[index]; return error * error; }).reduce((sum, err) => sum + err, 0) / guesses.length).toFixed(2)}</p>
          <p className="mb-2 text-gray-300">2. Root Mean Squared Error: {calculateRMSE(guesses, actuals)}</p>
          <p className="font-bold mt-4 text-cyan-400">Your RMSE: {calculateRMSE(guesses, actuals)} {calculateRMSE(guesses, actuals) < 10 ? " - Excellent!" : calculateRMSE(guesses, actuals) < 20 ? " - Good job!" : " - Keep practicing!"}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen bg-gradient-to-br from-[#120230] via-[#330344] to-[#240b36] text-white">
      <h1 className="text-3xl font-bold text-center mb-4 text-cyan-400">Estimation Station</h1>
      <h2 className="text-xl text-center mb-8 text-purple-300">Learn about RMSE by guessing quantities!</h2>

      {gameState === 'welcome' && (
        <div className="text-center">
          <div className="bg-[#121c30] p-6 rounded-lg shadow-xl border border-purple-600 max-w-xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">How to Play</h3>
            <p className="mb-4 text-gray-300">You'll be shown images with random dots for 10 seconds each.</p>
            <p className="mb-4 text-gray-300">Estimate how many dots you see, then enter your guess.</p>
            <p className="mb-4 text-gray-300">After {totalRounds} rounds, we'll calculate your RMSE (Root Mean Square Error).</p>
            <p className="mb-4 text-cyan-300">Lower RMSE = Better accuracy!</p>
          </div>
          <button onClick={startGame} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition duration-300 mt-6">
            Start Game
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-bold text-cyan-400">Round: {currentRound}/{totalRounds}</div>
            <div className="text-lg font-bold text-amber-500">Time Left: {timeLeft}s</div>
          </div>
          <div className="relative w-full h-80 bg-[#1a1c2c] rounded-lg shadow-inner mb-6 border border-purple-500">
            {currentImage && renderDots(actuals[actuals.length - 1])}
          </div>
          <div className="mb-6">
            <label className="block text-lg font-bold mb-2 text-cyan-400">How many dots did you see?</label>
            <div className="flex">
              <input type="number" value={currentGuess} onChange={e => setCurrentGuess(e.target.value)} className="flex-grow p-2 border bg-gray-800 border-purple-500 rounded-l-lg text-lg text-white placeholder-gray-400" placeholder="Enter your guess..." />
              <button onClick={submitGuess} className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-2 px-6 rounded-r-lg text-lg">Submit</button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'results' && (
        <div>
          {renderResultsTable()}
          <div className="text-center mt-8">
            <button onClick={startGame} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg mr-4 shadow-lg transition duration-300">Play Again</button>
            <button onClick={() => navigate('/regression/rmse')} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition duration-300 mt-4">Continue to Learn RMSE 📘</button>
          </div>
        </div>
      )}
    </div>
  );
}
