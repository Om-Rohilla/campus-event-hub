import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import AudienceSection from "@/components/landing/AudienceSection";
import PreviewSection from "@/components/landing/PreviewSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import AuthModal from "@/components/auth/AuthModal";

const Index = () => {
  return (
    <AuthModalProvider>
      <div className="min-h-screen bg-background overflow-x-hidden overflow-y-auto">
        <Navbar />
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <AudienceSection />
        <PreviewSection />
        <FinalCTA />
        <Footer />
        <AuthModal />
      </div>
    </AuthModalProvider>
  );
};

export default Index;
