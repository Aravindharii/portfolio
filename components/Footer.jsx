// components/Footer.jsx
'use client';
import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', link: 'https://linkedin.com/in/aravind-v-h-4862b5287' },
    { name: 'GitHub', icon: '🐙', link: '#' },
    { name: 'Email', icon: '📧', link: 'mailto:aravindhari1718@gmail.com' },
    { name: 'Phone', icon: '📱', link: 'tel:+919995475379' },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Aravind V H
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Full Stack Developer specializing in MERN stack with expertise in MongoDB, Express, React, 
              Node.js, Next.js, and AWS.
            </p>
            <p className="text-sm text-gray-500">
              📍 Ernakulam, Kerala<br />
              📧 aravindhari1718@gmail.com<br />
              📱 +91 9995475379
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target={social.link.startsWith('http') ? '_blank' : '_self'}
                  rel={social.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-2xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Aravind V H. {' '}
            {/* <span className="text-purple-400">Next.js</span>,{' '}
            <span className="text-pink-400">Tailwind CSS</span> &{' '}
            <span className="text-orange-400">Framer Motion</span> */}
          </p>
        </div>
      </div>
    </footer>
  );
}
