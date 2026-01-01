import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import GlassCard from '../components/ui/GlassCard';
import AuthLayout from '../components/layout/AuthLayout';
import { Loader2, UserPlus, ShieldAlert, Check, Lock } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UX State for password checklist
  const [isPwdFocused, setIsPwdFocused] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  // Real-time Validation Logic
  const hasLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*]/.test(password);
  const isValid = hasLength && hasNumber && hasSymbol;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!isValid) {
        setError("Please meet all password requirements below.");
        setLoading(false);
        return;
    }

    try {
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.errors?.[0]?.message || err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const RequirementItem = ({ met, label }: { met: boolean; label: string }) => (
    <div className={`flex items-center gap-2 text-xs font-mono transition-all duration-300 ${met ? 'text-green-400 opacity-100' : 'text-gray-500 opacity-70'}`}>
        {met ? (
            <div className="w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50">
                <Check size={10} className="text-green-400" />
            </div>
        ) : (
            <div className="w-4 h-4 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <div className="w-1 h-1 bg-gray-500 rounded-full" />
            </div>
        )}
        <span>{label}</span>
    </div>
  );

  return (
    <AuthLayout title="CREATE YOUR ACCOUNT">
      <GlassCard className="p-8 backdrop-blur-xl bg-black/60 border-primary/20">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-xs font-mono flex items-center gap-2 animate-pulse">
            <ShieldAlert size={14} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input 
            label="Full Name" 
            name="name"
            autoComplete="name"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="John Doe"
          />
          <Input 
            label="Email Address" 
            name="email"
            autoComplete="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="you@example.com"
          />
          
          <div className="relative">
            <Input 
                label="Create Password" 
                name="new-password"
                autoComplete="new-password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onFocus={() => setIsPwdFocused(true)}
                onBlur={() => setIsPwdFocused(false)}
                required 
                placeholder="Secure Password..."
            />

            {/* PASSWORD CHECKLIST DROPDOWN */}
            {(isPwdFocused || password.length > 0) && (
                <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-3 text-xs text-primary font-mono uppercase tracking-widest border-b border-white/5 pb-2">
                        <Lock size={12} /> Security Requirements
                    </div>
                    <div className="space-y-2">
                        <RequirementItem met={hasLength} label="Minimum 8 Characters" />
                        <RequirementItem met={hasNumber} label="Contains a Number (0-9)" />
                        <RequirementItem met={hasSymbol} label="Contains a Symbol (!@#$)" />
                    </div>
                </div>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={loading || !isValid}
            className={`w-full mt-4 font-bold py-3 px-4 rounded-lg transition-all duration-300 flex justify-center items-center gap-2
                ${isValid 
                    ? 'bg-secondary hover:bg-secondary/90 text-white shadow-neon hover:scale-[1.02] cursor-pointer' 
                    : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
                }
            `}
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                {isValid ? 'CREATE ACCOUNT' : 'REQUIREMENTS PENDING'} <UserPlus size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs font-mono uppercase">Have an account?</p>
          <Link to="/login" className="text-primary hover:text-white text-sm font-bold tracking-wider hover:underline transition-colors mt-2 inline-block">
            Sign In Here
          </Link>
        </div>
      </GlassCard>
    </AuthLayout>
  );
};

export default RegisterPage;