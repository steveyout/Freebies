import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (totalHeight > 0) {
        setScrollPercentage(Math.round((scrollY / totalHeight) * 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          id="scroll-to-top-btn"
          aria-label="Scroll to top"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 p-3 bg-zinc-900/95 dark:bg-zinc-800/95 text-rose-500 hover:text-rose-400 border border-rose-500/40 hover:border-rose-500/80 rounded-full shadow-xl shadow-rose-950/20 backdrop-blur-md transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-rose-500/50"
        >
          <div className="relative flex items-center justify-center w-6 h-6">
            <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-1" />
            <span className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-mono font-bold bg-zinc-950 text-rose-400 px-1.5 py-0.5 rounded border border-rose-900 whitespace-nowrap shadow">
              {scrollPercentage}%
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
