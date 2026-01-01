import type { ReactNode } from 'react';
import CyberBackground from './CyberBackground';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <CyberBackground />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-md p-6 relative z-10"
      >
        <div className="mb-8 text-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <h1 className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">
              ONYX
            </h1>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-2" />
          </motion.div>
          <p className="text-gray-400 mt-4 font-mono text-sm tracking-widest">{title}</p>
        </div>

        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;