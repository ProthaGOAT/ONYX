import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import GlassCard from '../components/ui/GlassCard';
import AuthLayout from '../components/layout/AuthLayout';
import { Loader2, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      // Friendly error message if backend fails
      setError(err.response?.data?.message || 'Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="ACCESS YOUR TERMINAL">
      <GlassCard className="p-8 backdrop-blur-xl bg-black/60 border-primary/20">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-xs font-mono text-center shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input 
            label="Email Address" 
            name="email"
            autoComplete="username"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="agent@onyx.com"
          />
          <Input 
            label="Password" 
            name="current-password"
            autoComplete="current-password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="••••••••"
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-[1.02] flex justify-center items-center gap-2 group"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                AUTHENTICATE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs font-mono uppercase">New here?</p>
          <Link to="/register" className="text-secondary hover:text-white text-sm font-bold tracking-wider hover:underline transition-colors mt-2 inline-block">
            Create Free Account
          </Link>
        </div>
      </GlassCard>
    </AuthLayout>
  );
};

export default LoginPage;