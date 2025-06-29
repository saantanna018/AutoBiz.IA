import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Templates from "@/components/Templates";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SignupModal from "@/components/SignupModal";

export default function Home() {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onSignupClick={() => setShowSignupModal(true)} />
      <Hero onSignupClick={() => setShowSignupModal(true)} />
      <HowItWorks />
      <Templates />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      
      {/* Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 md:hidden">
        <button 
          onClick={() => setShowSignupModal(true)}
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
        >
          <i className="fas fa-rocket mr-2"></i>
          Empieza Gratis Ahora
        </button>
      </div>

      <SignupModal 
        open={showSignupModal} 
        onClose={() => setShowSignupModal(false)} 
      />
    </div>
  );
}
