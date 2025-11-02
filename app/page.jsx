import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ResearchSection from "@/components/ResearchSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ResearchSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
