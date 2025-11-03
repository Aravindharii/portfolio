// app/layout.jsx
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import "./globals.css";

export const metadata = {
  title: "Aravind V H | Full Stack Developer - MERN Stack",
  description: "Full Stack Developer specializing in MongoDB, Express, React, Node.js, Next.js, and AWS.",
  
  // ✅ Google Site Verification
  verification: {
    google: "qFlEqfbuvKHN7S8YEfelq4QRbLFBMj_utXNQlyabUwQ",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased overflow-x-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20 pointer-events-none" />
        <Navbar />
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
