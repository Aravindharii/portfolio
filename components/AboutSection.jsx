// components/AboutSection.jsx (ENHANCED - Floating Background Elements)
'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [floatingItems, setFloatingItems] = useState([]);

  // Generate floating background items on mount
  useEffect(() => {
    const items = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 60 + 20, // 20px to 80px
      duration: Math.random() * 8 + 4, // 4s to 12s
      delay: Math.random() * 5,
      color: ['from-purple-500', 'from-pink-500', 'from-blue-500', 'from-cyan-500', 'from-orange-500'][
        Math.floor(Math.random() * 5)
      ],
      opacity: Math.random() * 0.4 + 0.1, // 0.1 to 0.5
    }));
    setFloatingItems(items);
  }, []);

  const skills = [
    { name: 'React & Next.js', level: 95, icon: '⚛️' },
    { name: 'Node.js & Express', level: 90, icon: '🟢' },
    { name: 'MongoDB & SQL', level: 90, icon: '🍃' },
    { name: 'TypeScript', level: 88, icon: '📘' },
    { name: 'AWS & GCP', level: 85, icon: '☁️' },
    { name: 'Angular', level: 85, icon: '🅰️' },
  ];

  const certifications = [
    'TypeScript & Web Development',
    'Advanced SQL',
    'CSS Skills',
    'AI & Big Data in IoT',
    'Ethical Hacking',
  ];

  return (
    <section id="about" ref={ref} className="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden">
      {/* Animated Background Floating Items */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingItems.map((item) => (
          <motion.div
            key={item.id}
            className={`absolute rounded-full bg-gradient-to-br ${item.color} to-transparent blur-xl`}
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              width: `${item.size}px`,
              height: `${item.size}px`,
              opacity: item.opacity,
              willChange: 'transform',
            }}
            animate={{
              y: [0, -60, 0],
              x: [-20, 20, -20],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Extra floating orbs for depth */}
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-purple-600/30 to-transparent rounded-full blur-3xl"
          animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-60 h-60 bg-gradient-to-br from-pink-600/20 to-transparent rounded-full blur-3xl"
          animate={{ y: [0, 60, 0], x: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-600/25 to-transparent rounded-full blur-2xl"
          animate={{ y: [-30, 30, -30], x: [20, -20, 20] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-br from-cyan-600/20 to-transparent rounded-full blur-3xl"
          animate={{ y: [20, -40, 20], x: [-30, 20, -30] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f71a_1px,transparent_1px),linear-gradient(to_bottom,#ec48991a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_0%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-purple-400 font-semibold text-xs md:text-sm tracking-widest uppercase block mb-2 md:mb-4">
            About Me
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Building Scalable Solutions
          </h2>
          <p className="text-sm md:text-lg text-gray-400 max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
            Full-stack developer proficient in MERN stack, building scalable and responsive web
            applications with clean code practices.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
          {/* Experience & Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Work Experience */}
            <motion.div
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg md:rounded-2xl p-4 md:p-8 backdrop-blur-sm relative overflow-hidden group"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Floating accent */}
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="relative z-10 flex gap-3 mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl">💼</span>
                <div>
                  <h3 className="text-lg md:text-2xl font-bold">Full Stack Developer</h3>
                  <p className="text-purple-400 text-sm md:text-base font-medium">GoFreeLab Technologies</p>
                  <p className="text-xs md:text-sm text-gray-500">Aug 2024 - Present</p>
                </div>
              </div>
              <ul className="relative z-10 space-y-2 text-gray-300 text-xs md:text-sm">
                <li className="flex gap-2">
                  <span className="text-purple-400 flex-shrink-0">▹</span>
                  <span>
                    Building Eduvocate e-learning platform with React, Node.js, MongoDB, FastAPI
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 flex-shrink-0">▹</span>
                  <span>Microservices architecture with Nameko</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-400 flex-shrink-0">▹</span>
                  <span>Built Expertzlab.com with Next.js & Sanity CMS</span>
                </li>
              </ul>
            </motion.div>

            {/* Education */}
            <motion.div
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg md:rounded-2xl p-4 md:p-8 backdrop-blur-sm relative overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Floating accent */}
              <motion.div
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />

              <h3 className="relative z-10 text-lg md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-2xl md:text-3xl">📚</span>
                Education
              </h3>
              <div className="relative z-10 space-y-3">
                <div>
                  <p className="font-semibold text-sm md:text-base text-white">
                    Master's in Commerce (MCom)
                  </p>
                  <p className="text-xs md:text-sm text-gray-400">Mahatma Gandhi University</p>
                  <p className="text-xs text-gray-500">2024 - 2026</p>
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base text-white">Bachelor of Commerce</p>
                  <p className="text-xs md:text-sm text-gray-400">
                    Rajagiri College of Management & Applied Sciences
                  </p>
                  <p className="text-xs text-gray-500">2021 - 2024</p>
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base text-white">MERN Stack Training</p>
                  <p className="text-xs md:text-sm text-gray-400">Expertzlab Technologies</p>
                  <p className="text-xs text-gray-500">2024</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Skills */}
            <div>
              <h3 className="text-lg md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                <span className="text-2xl md:text-4xl">⚡</span>
                Technical Skills
              </h3>
              <div className="space-y-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    className="space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-gray-300 text-xs md:text-sm font-medium">
                        <span className="text-lg md:text-2xl">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-purple-400 text-xs md:text-sm font-semibold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.4 + i * 0.06,
                          ease: 'easeOut',
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <motion.div
              className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-lg md:rounded-2xl p-4 md:p-8 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -4 }}
              whileHoverTransition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Floating accent */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/15 rounded-full blur-2xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
              />

              <h3 className="relative z-10 text-lg md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-2xl md:text-3xl">🏆</span>
                Certifications
              </h3>
              <div className="relative z-10 space-y-2">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="flex gap-2 text-gray-300 text-xs md:text-sm group/cert hover:text-orange-300 transition-colors"
                  >
                    <span className="text-orange-400 flex-shrink-0 mt-0.5 group-hover/cert:scale-125 transition-transform">
                      ✓
                    </span>
                    <span>{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
