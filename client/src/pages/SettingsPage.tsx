import GlassCard from '../components/ui/GlassCard';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold text-white tracking-widest">SYSTEM CONFIG</h1>
      
      <GlassCard className="p-8 max-w-2xl">
        <h3 className="text-primary font-mono text-sm uppercase mb-6">Profile Settings</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-500 text-xs font-mono uppercase mb-2">Agent Name</label>
            <div className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white font-mono">
              {user?.name}
            </div>
          </div>
          <div>
            <label className="block text-gray-500 text-xs font-mono uppercase mb-2">Secure ID (Email)</label>
            <div className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white font-mono opacity-50">
              {user?.email}
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/5">
            <button className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded text-xs font-mono hover:bg-red-500/20 transition-colors">
              TERMINATE ACCOUNT
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default SettingsPage;