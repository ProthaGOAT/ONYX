import type { ReactNode } from 'react'; // <--- Added 'type' here

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({ children, className = '' }: GlassCardProps) => {
  return (
    <div className={`
      bg-surface/50 backdrop-blur-md 
      border border-white/10 rounded-xl 
      shadow-lg text-text relative overflow-hidden
      ${className}
    `}>
      {/* Subtle top shine */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  );
};

export default GlassCard;