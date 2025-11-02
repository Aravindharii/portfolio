import os

# === Project structure ===
folders = [
    "app/about",
    "app/projects",
    "app/contact",
    "components",
    "public"
]

files = {
    "app/layout.jsx": """\
export const metadata = {
  title: "My Portfolio",
  description: "Creative Frontend Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
""",

    "app/page.jsx": """\
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
""",

    "components/Navbar.jsx": """\
'use client';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      className="flex justify-between items-center px-10 py-6 text-white sticky top-0 backdrop-blur-md z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold">MyPortfolio</h1>
      <ul className="flex gap-6 text-lg">
        <li><a href="#about" className="hover:text-yellow-300 transition">About</a></li>
        <li><a href="#projects" className="hover:text-yellow-300 transition">Projects</a></li>
        <li><a href="#contact" className="hover:text-yellow-300 transition">Contact</a></li>
      </ul>
    </motion.nav>
  );
}
""",

    "components/HeroSection.jsx": """\
'use client';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-8">
      <motion.h1
        className="text-6xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-600 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Hi, I'm Aravind 👋
      </motion.h1>
      <motion.p
        className="mt-4 text-xl text-white/80 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        A passionate Frontend Developer crafting interactive & vibrant web experiences.
      </motion.p>
    </section>
  );
}
""",

    "components/AboutSection.jsx": """\
'use client';
export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-8 text-center">
      <h2 className="text-4xl font-bold mb-6 text-yellow-300">About Me</h2>
      <p className="text-lg text-white/80 max-w-3xl mx-auto">
        I'm a creative frontend developer specializing in React, Next.js, and modern UI design.
        I love combining design and functionality to create meaningful user experiences.
      </p>
    </section>
  );
}
""",

    "components/ProjectsSection.jsx": """\
'use client';
import { motion } from 'framer-motion';

export default function ProjectsSection() {
  const projects = [
    { title: "Expertzlab Website", desc: "Next.js + Sanity CMS + Nodemailer", color: "from-pink-500 to-yellow-400" },
    { title: "BNPL System", desc: "Angular + Node + MongoDB", color: "from-purple-500 to-blue-400" },
    { title: "Doctor Appointment System", desc: "React + NestJS + Prisma", color: "from-green-500 to-cyan-400" },
  ];

  return (
    <section id="projects" className="py-20 px-8">
      <h2 className="text-4xl font-bold text-center mb-10 text-yellow-300">Projects</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            className={\`p-6 rounded-2xl bg-gradient-to-br \${p.color} text-black shadow-lg hover:scale-105 transition\`}
            whileHover={{ rotate: 2 }}
          >
            <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
            <p>{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
""",

    "components/ContactSection.jsx": """\
'use client';
import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-8 text-center">
      <h2 className="text-4xl font-bold mb-6 text-yellow-300">Contact</h2>
      <p className="text-lg text-white/80 mb-8">Want to collaborate or hire me? Let’s connect!</p>
      <motion.a
        href="mailto:youremail@example.com"
        className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
        whileHover={{ scale: 1.1 }}
      >
        Say Hello 👋
      </motion.a>
    </section>
  );
}
""",

    "components/Footer.jsx": """\
export default function Footer() {
  return (
    <footer className="py-6 text-center text-white/70 border-t border-white/20">
      © {new Date().getFullYear()} Aravind Hari | Built with Next.js + Tailwind + Framer Motion
    </footer>
  );
}
"""
}

# === Create folders and files ===
for folder in folders:
    os.makedirs(folder, exist_ok=True)

for path, content in files.items():
    with open(path, "w") as f:
        f.write(content)

print("✅ Portfolio structure created successfully!")
