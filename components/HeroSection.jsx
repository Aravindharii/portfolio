// components/HeroSection.jsx (ENHANCED - Floating SVG Icons)
'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Floating SVG Icons Component
const FloatingIcon = ({ icon, delay, duration, left, top, size }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: `${top}%`,
      }}
      animate={{
        y: [0, -40, 0],
        x: [-15, 15, -15],
        rotate: [0, 360, 0],
        scale: [0.8, 1.1, 0.8],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: 'easeInOut',
      }}
    >
      <div
        className="text-white"
        style={{
          fontSize: `${size}px`,
          filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))',
        }}
      >
        {icon}
      </div>
    </motion.div>
  );
};

// Icon set for tech stack and tools
const floatingIcons = [
  { icon: '⚛️', label: 'React' },
  { icon: '🟢', label: 'Node.js' },
  { icon: '🍃', label: 'MongoDB' },
  { icon: '📘', label: 'TypeScript' },
  { icon: '☁️', label: 'AWS' },
  { icon: '🅰️', label: 'Angular' },
  { icon: '🔧', label: 'Tools' },
  { icon: '⚡', label: 'Performance' },
  { icon: '🚀', label: 'Rocket' },
  { icon: '💻', label: 'Code' },
  { icon: '🎨', label: 'Design' },
  { icon: '📦', label: 'Package' },
  { icon: '🔐', label: 'Security' },
  { icon: '📊', label: 'Analytics' },
  { icon: '🌐', label: 'Web' },
  { icon: '⚙️', label: 'Settings' },
  { icon: '📱', label: 'Mobile' },
  { icon: '🎯', label: 'Target' },
  { icon: '✨', label: 'Star' },
  { icon: '🔥', label: 'Hot' },
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [floatingPositions, setFloatingPositions] = useState([]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate random positions for floating icons
  useEffect(() => {
    const positions = floatingIcons.map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      top: Math.random() * 80 + 10,
      size: Math.random() * 20 + 24, // 24px to 44px
      duration: Math.random() * 6 + 4, // 4s to 10s
      delay: Math.random() * 3,
    }));
    setFloatingPositions(positions);
  }, []);

  const stats = [
    { value: '2+', label: 'Years Experience', icon: '💼' },
    { value: '10+', label: 'Projects Completed', icon: '🚀' },
    { value: '3', label: 'Research Papers', icon: '📄' },
    { value: '100%', label: 'Client Satisfaction', icon: '⭐' },
  ];

  const expertise = [
    { name: 'Full Stack Development', level: 95 },
    { name: 'MERN Stack Mastery', level: 92 },
    { name: 'Cloud Architecture', level: 88 },
    { name: 'Microservices Design', level: 90 },
  ];

  const techStack = [
    'MongoDB',
    'Express',
    'React',
    'Node.js',
    'Next.js',
    'TypeScript',
    'AWS',
    'Firebase',
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-16 md:pt-20 md:pb-20"
    >
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f71a_1px,transparent_1px),linear-gradient(to_bottom,#ec48991a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

      {/* Floating SVG Icons Background */}
      {!isMobile &&
        floatingPositions.map((pos) => (
          <FloatingIcon
            key={pos.id}
            icon={floatingIcons[pos.id].icon}
            delay={pos.delay}
            duration={pos.duration}
            left={pos.left}
            top={pos.top}
            size={pos.size}
          />
        ))}

      {/* Static Gradient Orbs */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background:
                'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{
              background:
                'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)',
            }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center">
          {/* Status Badges */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="px-4 py-2 md:px-6 md:py-3 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs md:text-sm font-medium flex items-center gap-1.5"
            >
              <span>⚡</span>
              <span>Full Stack Developer</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="px-4 py-2 md:px-6 md:py-3 bg-green-500/20 border border-green-500/30 rounded-full text-xs md:text-sm font-medium"
            >
              <span className="inline-block mr-1.5">🟢</span>
              <span>Available</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="px-4 py-2 md:px-6 md:py-3 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs md:text-sm font-medium hidden sm:block"
            >
              <span className="mr-1.5">🏆</span>
              <span>Researcher</span>
            </motion.div>
          </div>

          {/* Main Heading */}
          <motion.h1
            className="mb-4 md:mb-6 leading-tight relative font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="block text-white mb-2">Hi, I&apos;m</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Aravind V H
            </span>
          </motion.h1>

          {/* Professional Subtitle */}
          <motion.p
            className="text-base md:text-xl text-gray-300 mb-3 md:mb-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
              MERN Stack Developer
            </span>
            {' '}&amp; Software Engineer
          </motion.p>

          <motion.p
            className="text-sm md:text-base text-gray-400 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Building scalable web applications with <span className="text-purple-400">performance</span>, <span className="text-pink-400">architecture</span>, and <span className="text-orange-400">user experience</span>. Currently at Expertzlab Technologies.
          </motion.p>

          {/* Expertise Bars */}
          <motion.div
            className="max-w-xl mx-auto mb-8 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {expertise.map((skill, i) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-medium">{skill.name}</span>
                  <span className="text-xs text-purple-400">{skill.level}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{
                      duration: 1.2,
                      delay: 0.6 + i * 0.1,
                      ease: 'easeOut',
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.a
              href="#projects"
              className="w-full sm:w-auto px-6 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full font-semibold text-sm md:text-base transition-all text-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
            </motion.a>

            <motion.a
              href="#contact"
              className="w-full sm:w-auto px-6 py-3 md:py-4 border border-white/20 hover:border-purple-500/50 bg-white/5 hover:bg-white/10 rounded-full font-semibold text-sm md:text-base transition-all text-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Let&apos;s Talk
            </motion.a>

            <motion.a
              href="mailto:aravindhari1718@gmail.com"
              className="w-full sm:w-auto px-6 py-3 md:py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full font-semibold text-sm md:text-base transition-all text-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              📧 Email
            </motion.a>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-lg md:rounded-2xl p-3 md:p-6 text-center hover:bg-white/10 transition-colors"
                whileHover={{ y: -2 }}
              >
                <div className="text-2xl md:text-4xl mb-1 md:mb-2">{stat.icon}</div>
                <div className="text-xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Stack Pills */}
          <motion.div
            className="flex flex-wrap gap-2 md:gap-3 justify-center mb-6 md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm font-medium hover:bg-white/10 hover:border-purple-500/50 transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.04 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Current Project Banner */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg md:rounded-2xl p-4 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xs md:text-sm text-gray-400 mb-1">
                    Currently Working On
                  </p>
                  <p className="text-base md:text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Eduvocate - E-Learning Platform
                  </p>
                </div>
                <motion.a
                  href="#projects"
                  className="px-4 py-2 md:px-6 md:py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-xs md:text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
