import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import AudienceSection from "@/components/landing/AudienceSection";
import PreviewSection from "@/components/landing/PreviewSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <AudienceSection />
      <PreviewSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
