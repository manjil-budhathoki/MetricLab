import { Home, Info, LineChart, PieChart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={22} />, route: '/', label: 'Home' },
    { icon: <LineChart size={22} />, route: '/regression', label: 'Regression' },
    { icon: <PieChart size={22} />, route: '/classification', label: 'Classification' },
    { icon: <Info size={22} />, route: '/about', label: 'About' },
  ];

  return (
    <aside className="fixed top-1/2 left-4 -translate-y-1/2 z-50 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-2 py-4 shadow-xl flex flex-col items-center space-y-6">
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.route)}
          className={`group relative p-2 rounded-lg hover:bg-white/20 transition ${
            location.pathname === item.route ? 'text-white' : 'text-white/50'
          }`}
        >
          {item.icon}

          {/* Tooltip */}
          <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
            {item.label}
          </span>
        </button>
      ))}
    </aside>
  );
}
