// components/Navbar.jsx
'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Active section detection
      const sections = ['about', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

// In components/Navbar.jsx, update navItems:
const navItems = ['About', 'Research', 'Projects', 'Contact']; // Added 'Research'

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'backdrop-blur-2xl bg-black/50 border-b border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.1)]' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Neon Top Border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        animate={{
          opacity: isScrolled ? [0.5, 1, 0.5] : 0,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with 3D Effect */}
          <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
        <motion.span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent relative">
  Aravind V H
  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent blur-sm opacity-50">
    Aravind V H
  </span>
</motion.span>
            
            {/* Underline Animation */}
            <motion.div
              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-400 shadow-[0_0_10px_#a855f7]"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group"
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`relative text-gray-300 hover:text-white transition-colors duration-300 font-medium ${
                      isActive ? 'text-white' : ''
                    }`}
                  >
                    {item}
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-400"
                        style={{
                          boxShadow: '0 0 10px #a855f7, 0 0 20px #ec4899',
                        }}
                      />
                    )}
                    
                    {/* Hover Underline */}
                    <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300 shadow-[0_0_10px_#a855f7]" />
                  </a>
                </motion.li>
              );
            })}
            
            {/* CTA Button with 3D & Neon */}
            <motion.li 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <a
                href="#contact"
                className="relative block px-6 py-2.5 rounded-full font-semibold overflow-hidden"
              >
                {/* Animated Gradient Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                {/* Neon Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity scale-150" />
                
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                <span className="relative z-10">Hire Me</span>
              </a>
            </motion.li>
          </ul>

          {/* Mobile Menu Button with Neon */}
          <motion.button 
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 group"
            whileTap={{ scale: 0.9 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className="w-6 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full relative"
                whileHover={{
                  boxShadow: '0 0 10px #a855f7',
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-sm" />
              </motion.span>
            ))}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
