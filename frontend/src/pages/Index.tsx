import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import TrustBadges from "@/components/landing/TrustBadges";
import PathPreview from "@/components/landing/PathPreview";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <PathPreview />
      <TrustBadges />
      <Footer />
    </div>
  );
};

export default Index;
