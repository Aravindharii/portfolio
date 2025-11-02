// components/HeroSection.jsx
'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20"
    >
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f71a_1px,transparent_1px),linear-gradient(to_bottom,#ec48991a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Animated Neon Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
            x: -mousePosition.x,
            y: -mousePosition.y,
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Holographic Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? '#a855f7' : '#ec4899',
            boxShadow: `0 0 10px ${i % 2 === 0 ? '#a855f7' : '#ec4899'}`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {i % 3 === 0 ? (
              <div className="w-12 h-12 border-2 border-purple-500/20 rounded-lg rotate-45" />
            ) : i % 3 === 1 ? (
              <div className="w-10 h-10 border-2 border-pink-500/20 rounded-full" />
            ) : (
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-b-blue-500/20" />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6"
        style={{ y, opacity }}
      >
        <div className="text-center mb-12">
          {/* Status Badge Row */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <span className="relative px-6 py-3 bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-full text-sm font-medium flex items-center gap-2 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  ⚡
                </motion.span>
                <span className="neon-text-subtle">Full Stack Developer</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <span className="relative px-6 py-3 bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-full text-sm font-medium flex items-center gap-2 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <motion.span
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-300">Available for Hire</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <span className="relative px-6 py-3 bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-full text-sm font-medium flex items-center gap-2 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <span className="text-2xl">🏆</span>
                <span className="text-blue-300">Published Researcher</span>
              </span>
            </motion.div>
          </div>

          {/* Main Heading */}
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-6 leading-tight relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Hi, I'm
            </span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent relative">
              Aravind V H
              <span 
                className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent blur-xl opacity-50"
                style={{ zIndex: -1 }}
              >
                Aravind V H
              </span>
            </span>
          </motion.h1>

          {/* Professional Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.span 
              className="font-bold relative inline-block"
              animate={{
                textShadow: [
                  '0 0 10px #a855f7, 0 0 20px #a855f7',
                  '0 0 20px #ec4899, 0 0 40px #ec4899',
                  '0 0 10px #a855f7, 0 0 20px #a855f7',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MERN Stack Developer
              </span>
            </motion.span>
            {' '}& Software Engineer
          </motion.p>

          <motion.p
            className="text-lg text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Driven by a deep passion for building <span className="text-purple-400 font-semibold">dynamic and scalable web applications</span>. 
            Specialized in <span className="text-pink-400 font-semibold">performance, architecture, and user experience</span> with 
            MongoDB, Express, React, and Node.js. Currently developing cutting-edge e-learning platforms at{' '}
            <span className="text-orange-400 font-semibold">Expertzlab Technologies</span>.
          </motion.p>

          {/* Mini Expertise Bars */}
          <motion.div
            className="max-w-2xl mx-auto mb-10 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {expertise.map((skill, i) => (
              <div key={skill.name} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400 font-medium">{skill.name}</span>
                  <span className="text-xs text-purple-400 font-bold">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: 0.8 + i * 0.1, ease: 'easeOut' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-sm" />
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap gap-6 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="group relative px-10 py-5 overflow-hidden rounded-full font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(20px)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <div className="absolute inset-0 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity bg-gradient-to-r from-purple-500 to-pink-500 scale-150" />
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>

            <motion.a
              href="#contact"
              className="group relative px-10 py-5 rounded-full font-semibold text-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(20px)',
              }}
            >
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #a855f7, #ec4899, #f97316, #a855f7)',
                  backgroundSize: '200% 200%',
                  padding: '2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <span className="relative z-10">Let's Talk</span>
            </motion.a>

            <motion.a
              href="mailto:aravindhari1718@gmail.com"
              className="group relative px-10 py-5 rounded-full font-semibold text-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full" />
              <span className="relative z-10 flex items-center gap-2">
                📧 Email Me
              </span>
            </motion.a>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1, type: 'spring' }}
                className="relative group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group-hover:bg-white/10 group-hover:border-purple-500/50 transition-all">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Stack Pills */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {['MongoDB', 'Express.js', 'React', 'Node.js', 'Next.js', 'TypeScript', 'AWS', 'Angular', 'Firebase', 'Python'].map((tech, i) => (
              <motion.span
                key={tech}
                className="relative group px-5 py-2.5 rounded-full text-sm font-medium overflow-hidden cursor-pointer"
                initial={{ opacity: 0, scale: 0, rotateX: -90 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ 
                  delay: 1.2 + i * 0.05,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{ 
                  scale: 1.1,
                  z: 50,
                  rotateX: 10,
                  rotateY: 10,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                }}
              >
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors">
                  {tech}
                </span>
              </motion.span>
            ))}
          </motion.div>

          {/* Current Status Banner */}
          <motion.div
            className="mt-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="relative bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🚀</div>
                  <div className="text-left">
                    <p className="text-sm text-gray-400">Currently Working On</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Eduvocate - E-Learning Platform
                    </p>
                  </div>
                </div>
                <motion.a
                  href="#projects"
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More →
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 3D Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative w-8 h-14 border-2 border-purple-500/50 rounded-full flex justify-center overflow-hidden backdrop-blur-sm bg-black/20">
          <div className="absolute inset-0 border-2 border-purple-500 rounded-full blur-md" />
          <motion.div
            className="absolute w-2 h-2 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-3 shadow-[0_0_10px_#a855f7]"
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">Scroll Down</p>
      </motion.div>
    </section>
  );
}
