// components/ResearchSection.jsx
'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ResearchSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const publications = [
    { name: 'IJIRT', fullName: 'International Journal of Innovative Research in Technology', color: 'from-purple-500 to-violet-600' },
    { name: 'IJRSET', fullName: 'International Journal of Research in Science and Engineering Technology', color: 'from-pink-500 to-rose-600' },
    { name: 'IJCRT', fullName: 'International Journal of Creative Research Thoughts', color: 'from-blue-500 to-cyan-600' },
  ];

  return (
    <section id="research" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-6"
            animate={{
              boxShadow: [
                '0 0 20px rgba(168,85,247,0.3)',
                '0 0 40px rgba(236,72,153,0.5)',
                '0 0 20px rgba(168,85,247,0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-3xl">🏆</span>
            <span className="text-purple-300 font-bold text-sm tracking-widest uppercase">
              Research Achievement
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent relative">
              Published Research Paper
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent blur-2xl opacity-50"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Accepted and published in three prestigious international journals
          </p>
        </motion.div>

        {/* Main Research Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group mb-12"
        >
          {/* Glowing Background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl opacity-75 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
          
          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-12 border border-purple-500/30 overflow-hidden">
            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f708_1px,transparent_1px),linear-gradient(to_bottom,#a855f708_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
            
            {/* Floating Geometric Shapes */}
            <motion.div
              className="absolute top-10 right-10 w-20 h-20 border-2 border-purple-500/30 rounded-lg rotate-45"
              animate={{
                rotate: [45, 225, 45],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-16 h-16 border-2 border-pink-500/30 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="relative z-10">
              {/* Icon & Badge */}
              <div className="flex items-start justify-between mb-8">
                <motion.div
                  className="text-7xl"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  📡
                </motion.div>
                <motion.span
                  className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-full text-sm font-bold text-green-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ✓
                  </motion.span>
                  Published
                </motion.span>
              </div>

              {/* Title */}
              <h3 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Scalable IoT Architectures Using Microservices
              </h3>

              {/* Description */}
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-4xl">
                Comprehensive research exploring <span className="text-purple-400 font-semibold">scalability challenges in IoT systems</span> and 
                proposing a revolutionary <span className="text-pink-400 font-semibold">microservices-based architecture</span> that addresses 
                key issues in distributed IoT environments, device interoperability, and system performance optimization.
              </p>

              {/* Key Contributions */}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {[
                  { icon: '🔬', title: 'Research Focus', desc: 'IoT Scalability Challenges' },
                  { icon: '🏗️', title: 'Architecture', desc: 'Microservices-Based Design' },
                  { icon: '⚡', title: 'Impact', desc: 'Industry-Grade Solutions' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <div className="text-sm text-purple-400 font-semibold mb-1">{item.title}</div>
                    <div className="text-gray-300 font-medium">{item.desc}</div>
                  </motion.div>
                ))}
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-3 font-semibold uppercase tracking-wide">Research Domain</p>
                <div className="flex flex-wrap gap-3">
                  {['IoT Architecture', 'Microservices', 'Scalability', 'Distributed Systems', 'Cloud Computing'].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-full text-sm text-gray-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Publication Journals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-300">
            Accepted for Publication in
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {publications.map((pub, i) => (
              <motion.div
                key={pub.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
                className="group relative"
                whileHover={{ y: -10 }}
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${pub.color} rounded-2xl opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-500`} />
                
                {/* Card */}
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-white/10 group-hover:border-purple-500/50 transition-all duration-300">
                  <div className="text-center">
                    <motion.div
                      className="text-5xl mb-4"
                      animate={{
                        rotateY: [0, 360],
                      }}
                      transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear' }}
                    >
                      📄
                    </motion.div>
                    <h4 className={`text-3xl font-black mb-3 bg-gradient-to-r ${pub.color} bg-clip-text text-transparent`}>
                      {pub.name}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {pub.fullName}
                    </p>
                    
                    {/* Status Badge */}
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                      <motion.span
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-xs text-green-300 font-semibold">Accepted</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats/Impact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '3 Journals', label: 'Accepted', icon: '📚' },
            { value: '100%', label: 'Acceptance Rate', icon: '✨' },
            { value: 'Int\'l', label: 'Recognition', icon: '🌍' },
            { value: '2024', label: 'Published', icon: '📅' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
