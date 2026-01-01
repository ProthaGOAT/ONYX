import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import CyberBackground from './CyberBackground';
import { Menu } from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen text-text relative isolate flex flex-col md:flex-row">
      <CyberBackground />
      
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-30">
        <h1 className="text-xl font-display font-bold text-white tracking-widest">ONYX</h1>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-white/10 rounded-lg text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Content Area */}
      {/* md:ml-64 ensures margin only exists on Desktop */}
      <div className="flex-1 p-4 md:p-8 md:ml-64 relative z-10 w-full overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;