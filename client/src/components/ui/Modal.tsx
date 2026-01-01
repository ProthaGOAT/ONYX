import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto mx-4">
              <div className="flex justify-between items-center p-6 border-b border-white/5">
                <h2 className="text-xl font-display font-bold text-white">{title}</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;