// components/ContactSection.jsx (Advanced Hirer-Friendly, A11y, Autosave)
'use client';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [hoveredCard, setHoveredCard] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [particles, setParticles] = useState([]);
  const [formStep, setFormStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState(true);

  const [formData, setFormData] = useState({
    // Step 1: Contact
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    // Step 2: Project
    serviceType: '',
    timeline: '',
    engagement: '',
    // Step 3: Message
    message: '',
    // Hidden meta
    source: 'Portfolio Contact',
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Particles
  useEffect(() => {
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      delay: i * 0.3,
      duration: 4 + i * 0.5,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Autosave draft to localStorage (simple implementation)
  const DRAFT_KEY = 'contactFormDraft_v1';
  useEffect(() => {
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        const parsed = JSON.parse(draft);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    } catch {}
  }, [formData]);

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

  const serviceTypes = [
    'Web Development',
    'Mobile App Development',
    'Full Stack Project',
    'Consulting',
    'UI/UX Implementation',
    'Other',
  ];

  const timelines = [
    'ASAP (1-2 weeks)',
    'Short term (1 month)',
    'Medium term (2-3 months)',
    'Long term (3+ months)',
    'Flexible',
  ];

  const engagementModels = [
    'Fixed scope',
    'Time & materials',
    'Monthly retainer',
    'Discovery first',
    'Not sure yet',
  ];

  // Basic validators (lightweight and accessible)
  const validators = {
    name: (v) => (!v ? 'Name is required' : v.trim().length < 2 ? 'Please enter full name' : ''),
  // HTML5 email type will also help; this is a safeguard
    email: (v) => (!v ? 'Email is required' : !/^\S+@\S+\.\S+$/.test(v) ? 'Enter a valid email' : ''),
    phone: (v) =>
      v && v.replace(/\D/g, '').length < 7 ? 'Enter a valid phone or leave blank' : '',
    message: (v) =>
      !v ? 'Message is required' : v.trim().length < 2 ? 'Add at least 2 characters' : '',
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      const n = validators.name(formData.name);
      const e = validators.email(formData.email);
      const p = validators.phone(formData.phone);
      if (n) newErrors.name = n;
      if (e) newErrors.email = e;
      if (p) newErrors.phone = p;
    }
    if (step === 3) {
      const m = validators.message(formData.message);
      if (m) newErrors.message = m;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopy = (value, index) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(3)) return;

    if (!consent) {
      setErrors((prev) => ({ ...prev, consent: 'Please allow contact to proceed' }));
      return;
    }

    setLoading(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, submittedAt: new Date().toISOString() }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus('success');
        try {
          localStorage.removeItem(DRAFT_KEY);
        } catch {}
        // Keep email visible for success notice
        const emailCopy = formData.email;
        setFormData({
          name: '',
          email: emailCopy,
          phone: '',
          company: '',
          role: '',
          serviceType: '',
          timeline: '',
          engagement: '',
          message: '',
          source: 'Portfolio Contact',
        });
        setFormStep(1);
        setTimeout(() => {
          setShowForm(false);
          setSubmitStatus(null);
          setFormData((prev) => ({ ...prev, email: '' }));
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    const ok = validateStep(formStep);
    if (!ok) return;
    setFormStep((s) => Math.min(s + 1, 4));
  };
  const handlePrev = () => setFormStep((s) => Math.max(s - 1, 1));

  // Phone mask (very lightweight)
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 15);
    // Basic grouping, keeps international flexibility
    return digits.replace(/(\d{3})(\d{3})(\d{0,4})/, (m, a, b, c) =>
      c ? `+${a} ${b} ${c}` : b ? `+${a} ${b}` : `+${a}`
    );
  };

  const Particle = ({ particle }) => (
    <motion.div
      className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-sm"
      animate={{ y: [0, -100], opacity: [0, 1, 0] }}
      transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
      style={{ left: particle.x, top: particle.y }}
    />
  );

  const stepTitles = useMemo(
    () => ({
      1: 'Your details',
      2: 'Project preferences',
      3: 'Brief & goals',
      4: 'Review & send',
    }),
    []
  );

  const ProgressBar = () => {
    const pct = (formStep / 4) * 100;
    return (
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4" aria-hidden="true">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>
    );
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        {particles.map((p) => (
          <Particle key={p.id} particle={p} />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
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
              Let&apos;s Connect
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Share a few details about your hiring needs or project and get a prompt response. Aravind will be notified regarding your requirement immediately. {/* Calendly style CTA note guidance */}
          </p>
        </motion.div>

        {/* Contact Cards */}
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
              <motion.div
                className="relative p-5 sm:p-6 h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/8 transition-colors"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {hoveredCard === i && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-10 blur-2xl`}
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
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

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <motion.button
            onClick={() => {
              setShowForm(true);
              setFormStep(1);
            }}
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
            aria-label="Schedule a quick introduction call"
            title="Schedule a quick introduction call"
          >
            Schedule quick intro 📅
          </motion.a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <motion.button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close"
                >
                  ✕
                </motion.button>

                <div className="mb-4">
                  <h3 id="contact-modal-title" className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {submitStatus === 'success' ? '✓ Message Sent!' : stepTitles[formStep]}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {submitStatus === 'success'
                      ? 'Thanks for reaching out. Aravind will be notified regarding your requirement and respond shortly.'
                      : `Step ${formStep} of 4`}
                  </p>
                  <ProgressBar />
                </div>

                {submitStatus === 'success' ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-6xl mb-4"
                    >
                      🎉
                    </motion.div>
                    <p className="text-gray-300 mb-3">
                      A confirmation email has been sent to {formData.email || 'your inbox'}.
                    </p>
                    <p className="text-sm text-gray-500">Expect a response within 24–48 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                    <AnimatePresence mode="wait">
                      {formStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              onBlur={() => validateStep(1)}
                              placeholder="John Doe"
                              className={`w-full px-4 py-3 bg-white/5 border ${
                                errors.name ? 'border-red-400/50' : 'border-white/10'
                              } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                              required
                              aria-invalid={!!errors.name}
                              aria-describedby={errors.name ? 'err-name' : undefined}
                            />
                            {errors.name && (
                              <p id="err-name" role="alert" className="mt-1 text-xs text-red-400">
                                {errors.name}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              onBlur={() => validateStep(1)}
                              placeholder="you@example.com"
                              className={`w-full px-4 py-3 bg-white/5 border ${
                                errors.email ? 'border-red-400/50' : 'border-white/10'
                              } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                              required
                              aria-invalid={!!errors.email}
                              aria-describedby={errors.email ? 'err-email' : undefined}
                            />
                            {errors.email && (
                              <p id="err-email" role="alert" className="mt-1 text-xs text-red-400">
                                {errors.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Phone (optional)
                            </label>
                            <input
                              type="tel"
                              inputMode="tel"
                              value={formData.phone}
                              onChange={(e) => {
                                const v = e.target.value;
                                // apply gentle masking only if starts with +(preferred)
                                const next = v.startsWith('+') ? formatPhone(v) : v;
                                setFormData({ ...formData, phone: next });
                              }}
                              onBlur={() => validateStep(1)}
                              placeholder="+91 99954 75379"
                              className={`w-full px-4 py-3 bg-white/5 border ${
                                errors.phone ? 'border-red-400/50' : 'border-white/10'
                              } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                              aria-invalid={!!errors.phone}
                              aria-describedby={errors.phone ? 'err-phone' : undefined}
                            />
                            {errors.phone && (
                              <p id="err-phone" role="alert" className="mt-1 text-xs text-red-400">
                                {errors.phone}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Company (optional)
                              </label>
                              <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                placeholder="Acme Inc."
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Your role (optional)
                              </label>
                              <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                placeholder="Hiring Manager"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {formStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Service Type
                            </label>
                            <select
                              value={formData.serviceType}
                              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                            >
                              <option value="">Select a service...</option>
                              {serviceTypes.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Timeline</label>
                            <select
                              value={formData.timeline}
                              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                            >
                              <option value="">Select timeline...</option>
                              {timelines.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Engagement model
                            </label>
                            <select
                              value={formData.engagement}
                              onChange={(e) => setFormData({ ...formData, engagement: e.target.value })}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                            >
                              <option value="">Choose an option...</option>
                              {engagementModels.map((g) => (
                                <option key={g} value={g}>
                                  {g}
                                </option>
                              ))}
                            </select>
                          </div>

                          <p className="text-xs text-gray-500">
                            Not sure yet? You can leave these blank and we&apos;ll explore together on the call.
                          </p>
                        </motion.div>
                      )}

                      {formStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Project Description / Message *
                            </label>
                            <textarea
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              onBlur={() => validateStep(3)}
                              placeholder="Tell me about your project, goals, scope, target timeline, and any links..."
                              className={`w-full px-4 py-3 bg-white/5 border ${
                                errors.message ? 'border-red-400/50' : 'border-white/10'
                              } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none h-32`}
                              required
                              maxLength={2000}
                              aria-invalid={!!errors.message}
                              aria-describedby={errors.message ? 'err-message' : 'help-count'}
                            />
                            <div className="flex items-center justify-between">
                              {errors.message ? (
                                <p id="err-message" role="alert" className="mt-1 text-xs text-red-400">
                                  {errors.message}
                                </p>
                              ) : (
                                <span id="help-count" className="mt-1 text-[11px] text-gray-500">
                                  {formData.message.length}/2000
                                </span>
                              )}
                              <div className="text-[11px] text-gray-500">
                                Tip: include problem, audience, tech stack if known.
                              </div>
                            </div>
                          </div>

                          <label className="flex items-start gap-3 text-sm text-gray-300">
                            <input
                              type="checkbox"
                              checked={consent}
                              onChange={(e) => {
                                setConsent(e.target.checked);
                                setErrors((prev) => ({ ...prev, consent: undefined }));
                              }}
                              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5"
                            />
                            <span>
                              You agree to be contacted regarding this request. Aravind will be notified regarding your requirement.
                            </span>
                          </label>
                          {errors.consent && <p className="text-xs text-red-400">{errors.consent}</p>}
                        </motion.div>
                      )}

                      {formStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-4"
                        >
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                            <ReviewRow
                              label="Name"
                              value={formData.name || '—'}
                              onEdit={() => setFormStep(1)}
                            />
                            <ReviewRow
                              label="Email"
                              value={formData.email || '—'}
                              onEdit={() => setFormStep(1)}
                            />
                            <ReviewRow
                              label="Phone"
                              value={formData.phone || '—'}
                              onEdit={() => setFormStep(1)}
                            />
                            <ReviewRow
                              label="Company"
                              value={formData.company || '—'}
                              onEdit={() => setFormStep(1)}
                            />
                            <ReviewRow
                              label="Role"
                              value={formData.role || '—'}
                              onEdit={() => setFormStep(1)}
                            />
                            <ReviewRow
                              label="Service Type"
                              value={formData.serviceType || '—'}
                              onEdit={() => setFormStep(2)}
                            />
                            <ReviewRow
                              label="Timeline"
                              value={formData.timeline || '—'}
                              onEdit={() => setFormStep(2)}
                            />
                            <ReviewRow
                              label="Engagement"
                              value={formData.engagement || '—'}
                              onEdit={() => setFormStep(2)}
                            />
                            <ReviewRow
                              label="Message"
                              value={formData.message || '—'}
                              onEdit={() => setFormStep(3)}
                              multiline
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            Looks good? Send it now and you’ll receive a confirmation email. Aravind will be notified immediately.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex gap-3 pt-4">
                      {formStep > 1 && (
                        <motion.button
                          type="button"
                          onClick={handlePrev}
                          className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-semibold text-white transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Previous
                        </motion.button>
                      )}
                      {formStep < 4 ? (
                        <motion.button
                          type="button"
                          onClick={handleNext}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg font-semibold text-white transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Next
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          disabled={loading}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg font-semibold text-white transition-all disabled:opacity-50"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {loading ? (
                            <motion.div className="flex items-center justify-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              />
                              Sending...
                            </motion.div>
                          ) : (
                            'Send Message'
                          )}
                        </motion.button>
                      )}
                    </div>

                    {submitStatus === 'error' && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400 text-center mt-4" role="alert">
                        Failed to send message. Please try again in a moment.
                      </motion.p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

function ReviewRow({ label, value, onEdit, multiline = false }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="text-xs uppercase tracking-wider text-gray-400">{label}</div>
        <div className={`text-sm text-gray-200 ${multiline ? 'whitespace-pre-wrap' : ''}`}>{value}</div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="text-xs px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/10"
        aria-label={`Edit ${label}`}
      >
        Edit
      </button>
    </div>
  );
}
