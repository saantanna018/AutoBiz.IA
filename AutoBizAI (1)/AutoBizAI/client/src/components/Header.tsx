import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSignupClick: () => void;
}

export default function Header({ onSignupClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 glass-effect border-b border-gray-200/50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold gradient-text">AutoBiz.AI</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('inicio')}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollToSection('como-funciona')}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Cómo Funciona
            </button>
            <button 
              onClick={() => scrollToSection('precios')}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Precios
            </button>
            <button 
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={onSignupClick}
            >
              Iniciar Sesión
            </button>
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button onClick={onSignupClick} className="bg-primary hover:bg-primary/90 text-white" data-signup-trigger>
              Empieza Gratis
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-gray-600`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('inicio')}
                className="text-gray-600 hover:text-primary transition-colors text-left"
              >
                Inicio
              </button>
              <button 
                onClick={() => scrollToSection('como-funciona')}
                className="text-gray-600 hover:text-primary transition-colors text-left"
              >
                Cómo Funciona
              </button>
              <button 
                onClick={() => scrollToSection('precios')}
                className="text-gray-600 hover:text-primary transition-colors text-left"
              >
                Precios
              </button>
              <button 
                className="text-gray-600 hover:text-primary transition-colors text-left"
                onClick={onSignupClick}
              >
                Iniciar Sesión
              </button>
              <Button onClick={onSignupClick} className="bg-primary hover:bg-primary/90 text-white mt-4" data-signup-trigger>
                Empieza Gratis
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
