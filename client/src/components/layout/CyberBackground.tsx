import { motion } from 'framer-motion';

const CyberBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505]">
      {/* 1. The Sci-Fi Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      {/* 2. Moving Neon Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"
      />

      {/* 3. Vignette (Dark edges) */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505]/90" />
    </div>
  );
};

export default CyberBackground;