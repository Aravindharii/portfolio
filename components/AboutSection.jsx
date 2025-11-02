// components/AboutSection.jsx
'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills = [
    { name: 'React & Next.js', level: 95, icon: '⚛️', category: 'Frontend' },
    { name: 'Node.js & Express', level: 90, icon: '🟢', category: 'Backend' },
    { name: 'MongoDB & SQL', level: 90, icon: '🍃', category: 'Database' },
    { name: 'TypeScript', level: 88, icon: '📘', category: 'Language' },
    { name: 'AWS & GCP', level: 85, icon: '☁️', category: 'Cloud' },
    { name: 'Angular', level: 85, icon: '🅰️', category: 'Frontend' },
  ];

  const certifications = [
    'TypeScript - The New JavaScript for Web Development',
    'Advanced SQL',
    'CSS Skill Test',
    'AI and Big Data in IoT',
    'Introduction to Certified Ethical Hacking (CEH)'
  ];

  return (
    <section id="about" ref={ref} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-purple-400 font-semibold text-sm tracking-widest uppercase mb-4 block">
            About Me
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Building Scalable Solutions
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Results-driven Full-stack developer proficient in the MERN stack with experience building 
            scalable and responsive web applications. Committed to clean code practices and delivering 
            high-impact contributions to innovative projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          {/* Experience Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">💼</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Full Stack Developer</h3>
                    <p className="text-purple-400 font-medium">GoFreeLab Technologies Pvt Ltd</p>
                    <p className="text-sm text-gray-500">August 2024 - Present</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span>Developing Eduvocate, a scalable e-learning platform using React, Node.js, MongoDB, and FastAPI (Python)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span>Implementing microservices architecture with Nameko for enhanced scalability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">▹</span>
                    <span>Built Expertzlab.com using Next.js, Sanity CMS, Firebase, and Nodemailer</span>
                  </li>
                </ul>
              </div>
            </div>

          

            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-3xl">📚</span>
                  Education
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-white">Master's in Commerce (MCom)</p>
                    <p className="text-sm text-gray-400">Mahatma Gandhi University</p>
                    <p className="text-xs text-gray-500">2024 - 2026</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Bachelor of Commerce</p>
                    <p className="text-sm text-gray-400">Rajagiri College of Management & Applied Sciences</p>
                    <p className="text-xs text-gray-500">2021 - 2024</p>
                  </div>
                      <div>
                    <p className="font-semibold text-white">MERN Stack Training</p>
                    <p className="text-sm text-gray-400">Expertzlab technologies</p>
                    <p className="text-xs text-gray-500">2024</p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="text-4xl">⚡</span>
                Technical Skills
              </h3>
              <div className="space-y-6">
                {skills.map((skill, i) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-gray-300 font-medium">
                        <span className="text-2xl">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-purple-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden relative">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.6 + i * 0.1, ease: 'easeOut' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-sm" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">🏆</span>
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-orange-400 mt-1">✓</span>
                    <span className="text-sm">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
