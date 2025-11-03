// components/AboutSection.jsx (OPTIMIZED - Mobile Efficient)
'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

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
    <section id="about" ref={ref} className="relative py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
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
            Full-stack developer proficient in MERN stack, building scalable and responsive web applications with clean code practices.
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
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg md:rounded-2xl p-4 md:p-8">
              <div className="flex gap-3 mb-3 md:mb-4">
                <span className="text-3xl md:text-4xl">💼</span>
                <div>
                  <h3 className="text-lg md:text-2xl font-bold">Full Stack Developer</h3>
                  <p className="text-purple-400 text-sm md:text-base font-medium">GoFreeLab Technologies</p>
                  <p className="text-xs md:text-sm text-gray-500">Aug 2024 - Present</p>
                </div>
              </div>
              <ul className="space-y-2 text-gray-300 text-xs md:text-sm">
                <li className="flex gap-2">
                  <span className="text-purple-400 flex-shrink-0">▹</span>
                  <span>Building Eduvocate e-learning platform with React, Node.js, MongoDB, FastAPI</span>
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
            </div>

            {/* Education */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg md:rounded-2xl p-4 md:p-8">
              <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-2xl md:text-3xl">📚</span>
                Education
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-sm md:text-base text-white">Master's in Commerce (MCom)</p>
                  <p className="text-xs md:text-sm text-gray-400">Mahatma Gandhi University</p>
                  <p className="text-xs text-gray-500">2024 - 2026</p>
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base text-white">Bachelor of Commerce</p>
                  <p className="text-xs md:text-sm text-gray-400">Rajagiri College of Management & Applied Sciences</p>
                  <p className="text-xs text-gray-500">2021 - 2024</p>
                </div>
                <div>
                  <p className="font-semibold text-sm md:text-base text-white">MERN Stack Training</p>
                  <p className="text-xs md:text-sm text-gray-400">Expertzlab Technologies</p>
                  <p className="text-xs text-gray-500">2024</p>
                </div>
              </div>
            </div>
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
                      <span className="text-purple-400 text-xs md:text-sm font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.06, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <motion.div
              className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-lg md:rounded-2xl p-4 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-2xl md:text-3xl">🏆</span>
                Certifications
              </h3>
              <div className="space-y-2">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="flex gap-2 text-gray-300 text-xs md:text-sm"
                  >
                    <span className="text-orange-400 flex-shrink-0 mt-0.5">✓</span>
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
