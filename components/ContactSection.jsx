// components/ContactSection.jsx
'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactMethods = [
    { 
      icon: '📧', 
      label: 'Email', 
      value: 'aravindhari1718@gmail.com', 
      link: 'mailto:aravindhari1718@gmail.com' 
    },
    { 
      icon: '💼', 
      label: 'LinkedIn', 
      value: 'linkedin.com/in/aravind-v-h', 
      link: 'https://linkedin.com/in/aravind-v-h-4862b5287' 
    },
    { 
      icon: '📱', 
      label: 'Phone', 
      value: '+91 9995475379', 
      link: 'tel:+919995475379' 
    },
    { 
      icon: '📍', 
      label: 'Location', 
      value: 'Ernakulam, Kerala', 
      link: '#' 
    },
  ];

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-purple-400 font-semibold text-sm tracking-widest uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Open to exciting opportunities in full-stack development. Let's discuss how I can contribute 
            to your next innovative project with scalable MERN stack solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {contactMethods.map((method, i) => (
            <motion.a
              key={i}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : '_self'}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{method.icon}</div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">{method.label}</div>
                  <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                    {method.value}
                  </div>
                </div>
                <motion.div
                  className="text-gray-400 group-hover:text-purple-400"
                  animate={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <motion.a
            href="mailto:aravindhari1718@gmail.com"
            className="inline-block px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Me a Message 📧
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
