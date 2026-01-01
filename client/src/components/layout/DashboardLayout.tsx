import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import CyberBackground from './CyberBackground';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen text-text relative isolate">
      <CyberBackground /> {/* <--- The new background */}
      
      <Sidebar />
      <div className="ml-64 p-8 relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;