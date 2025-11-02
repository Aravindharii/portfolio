// components/ContactSection.jsx
'use client';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Mouse position tracking for 3D effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const contactMethods = [
    {
      icon: '📧',
      label: 'Email',
      value: 'aravindhari1718@gmail.com',
      link: 'mailto:aravindhari1718@gmail.com',
      description: 'Direct email for inquiries',
      color: 'from-blue-500 to-cyan-500',
      delay: 0,
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/aravind-v-h',
      link: 'https://linkedin.com/in/aravind-v-h-4862b5287',
      description: 'Connect professionally',
      color: 'from-blue-600 to-blue-500',
      delay: 0.1,
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+91 9995475379',
      link: 'tel:+919995475379',
      description: 'Call for immediate response',
      color: 'from-green-500 to-emerald-500',
      delay: 0.2,
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Ernakulam, Kerala',
      link: 'https://maps.google.com/?q=Ernakulam,Kerala',
      description: 'Based in India, available remotely',
      color: 'from-orange-500 to-red-500',
      delay: 0.3,
    },
  ];

  const handleCopy = (value, index) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setShowForm(false);
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Floating particles background
  const Particle = ({ delay, duration, x, y }) => (
    <motion.div
      className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-sm"
      animate={{
        y: [y, y - 100],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
      }}
      style={{ left: x, top: y }}
    />
  );

  return (
    <section id="contact" ref={ref} className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient mesh background */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />

        {/* Floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Particle
            key={i}
            delay={i * 0.3}
            duration={4 + i * 0.5}
            x={`${Math.random() * 100}%`}
            y={`${Math.random() * 100}%`}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.span
            className="inline-block text-purple-400 font-bold text-xs sm:text-sm tracking-widest uppercase mb-4 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Get In Touch
          </motion.span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Let's Connect
            </span>
            <br />
          
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            I'm always excited to discuss innovative projects and opportunities. Choose your preferred way to connect.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {contactMethods.map((method, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: method.delay }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative h-full"
            >
              {/* Card with advanced styling */}
              <motion.div
                className="relative p-5 sm:p-6 h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
                style={{
                  background: hoveredCard === i 
                    ? 'rgba(255, 255, 255, 0.08)' 
                    : 'rgba(255, 255, 255, 0.03)',
                }}
              >
                {/* Animated gradient border */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                    '--tw-gradient-from': method.color.split(' ')[1],
                    '--tw-gradient-to': method.color.split(' ')[3],
                  }}
                  animate={hoveredCard === i ? { opacity: 0.2 } : { opacity: 0 }}
                />

                {/* Glow effect on hover */}
                {hoveredCard === i && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-10 blur-2xl`}
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    className={`inline-block text-4xl sm:text-5xl mb-4 p-3 sm:p-4 rounded-xl bg-gradient-to-br ${method.color} bg-opacity-20 border border-white/10`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {method.icon}
                  </motion.div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{method.label}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-3">{method.description}</p>

                  <motion.div
                    className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-white/5"
                    initial={{ opacity: 0 }}
                    animate={hoveredCard === i ? { opacity: 1 } : { opacity: 0 }}
                  >
                    <a
                      href={method.link}
                      target={method.link.startsWith('http') ? '_blank' : '_self'}
                      rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                      className="text-sm font-semibold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text hover:underline transition-all"
                    >
                      Open
                    </a>
                    <motion.button
                      onClick={() => handleCopy(method.value, i)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copiedIndex === i ? '✓ Copied!' : 'Copy'}
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section with advanced form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <motion.button
              onClick={() => setShowForm(!showForm)}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message 📧
            </motion.button>

            <motion.a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white/10 border-2 border-white/20 hover:border-purple-500/50 rounded-full font-bold text-lg transition-all text-white"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Call 📅
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Advanced Contact Form Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            />

            {/* Form Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
            >
              <div className="relative bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
                {/* Close button */}
                <motion.button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 sm:top-6 right-4 sm:right-6 text-gray-400 hover:text-white text-2xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Let's Talk!</h3>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none h-24"
                      placeholder="Your message..."
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold text-white hover:shadow-lg transition-all disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <motion.div className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </motion.div>
                    ) : submitStatus === 'success' ? (
                      '✓ Message Sent!'
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </section>
  );
}
