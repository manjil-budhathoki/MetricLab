// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import BottomNavbar from './components/Sidebar';
import Classification from './pages/Classification';
import Regression from './pages/Regression';
import RMSE from './pages/RMSE';
import EstimationStation from './pages/EstimationStation';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/classification" element={<Classification />} />
          <Route path="/classification" element={<Classification />} />

          <Route path="/regression" element={<Regression />} />
          <Route path="/regression/estimation-station" element={<EstimationStation />} />
          <Route path="/regression/rmse" element={<RMSE />} />  

        </Routes>
        <BottomNavbar />
      </div>
    </Router>
  );
}
