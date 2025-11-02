// components/ProjectsSection.jsx
'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: 'Eduvocate E-Learning Platform',
      desc: 'Scalable e-learning platform using React, Node.js, MongoDB, FastAPI (Python), and Nameko microservices architecture for enhanced performance.',
      tech: ['React', 'Node.js', 'MongoDB', 'FastAPI', 'Microservices'],
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      icon: '🎓',
      status: 'In Development',
            link: 'https://eduvocate.in',

    },
    {
      title: 'Expertzlab Training Website',
      desc: 'Modern, fully responsive training institute website with Next.js, Tailwind CSS, Framer Motion, Sanity CMS, Firebase, and automated email delivery.',
      tech: ['Next.js', 'Sanity CMS', 'Firebase', 'Nodemailer', 'Tailwind'],
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      icon: '🏫',
      link: 'https://expertzlab.com',
    },
    {
      title: 'AI Chatbot - Nova',
      desc: 'Hybrid AI chatbot combining rule-based logic with LLMs via Together AI. Integrated MathJS for real-time processing and Hugging Face model.',
      tech: ['Node.js', 'Express', 'Together AI', 'Hugging Face', 'Bootstrap'],
      gradient: 'from-green-500 via-emerald-500 to-cyan-500',
      icon: '🤖',
    },
    {
      title: 'EcoShopper E-Commerce',
      desc: 'Eco-friendly e-commerce platform using JavaScript, localStorage, and DOM manipulation with responsive design using HTML5, CSS3, and Bootstrap 5.',
      tech: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap 5', 'LocalStorage'],
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      icon: '🛍️',
    },
 
    {
      title: 'HR Training Effectiveness Study',
      desc: 'Research project at Hedge Equities analyzing employee training effectiveness through comprehensive survey of 60 employees.',
      tech: ['Research', 'Data Analysis', 'HR Management'],
      gradient: 'from-pink-500 via-rose-500 to-red-500',
      icon: '📊',
    },
  ];

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-purple-400 font-semibold text-sm tracking-widest uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A selection of my work spanning full-stack applications, AI solutions, research, and scalable architectures
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                {/* Gradient Background on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  animate={hoveredIndex === i ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  {/* Icon & Status Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-5xl">{project.icon}</div>
                    {project.status && (
                      <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300">
                        {project.status}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed text-sm">{project.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-purple-400 font-semibold group/link text-sm"
                      whileHover={{ x: 5 }}
                    >
                      Visit Project
                      <motion.span
                        animate={{ x: hoveredIndex === i ? 5 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
