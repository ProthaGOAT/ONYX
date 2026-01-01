import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, Settings, LogOut, Globe, Calculator, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { logout } = useAuth();
  const { currency, setCurrency, availableCurrencies } = useCurrency();
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Wealth Simulator', path: '/dashboard/simulator', icon: Calculator },
    { name: 'Transactions', path: '/dashboard/transactions', icon: Receipt },
    { name: 'Global Tools', path: '/dashboard/wallet', icon: Globe },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop (Click to close) */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-surface border-r border-white/5 z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-white tracking-widest text-shadow-neon">
              ONYX
            </h1>
            <p className="text-[10px] text-gray-500 font-mono tracking-widest mt-1">WEALTH OS</p>
          </div>
          {/* Close Button (Mobile Only) */}
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-4">
          <div className="bg-black/40 border border-white/10 rounded-lg p-2 flex items-center gap-2">
            <Globe size={16} className="text-primary" />
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as any)}
              className="bg-transparent text-white text-sm font-sans outline-none w-full cursor-pointer"
            >
              {Object.entries(availableCurrencies).map(([code, info]) => (
                <option key={code} value={code} className="bg-surface text-white">
                  {info.flag} {code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => onClose()} // Close menu on click (Mobile UX)
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-sans ${
                  isActive 
                    ? 'bg-primary/20 text-primary font-bold shadow-neon border-l-2 border-primary' 
                    : 'hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-accent hover:bg-accent/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;