import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, type = "text", ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mb-5">
      <label className="block text-xs font-mono text-primary/80 mb-2 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative group">
        <input
          {...props}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(139,92,246,0.3)] outline-none transition-all duration-300 font-sans"
        />
        
        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full peer-focus:w-full" />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;