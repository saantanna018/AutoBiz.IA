import { Button } from "@/components/ui/button";

interface HeroProps {
  onSignupClick: () => void;
}

export default function Hero({ onSignupClick }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative py-20 sm:py-32 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Lanza tu negocio digital en{" "}
              <span className="gradient-text">minutos con IA</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Genera una web, emails, productos y automatizaciones con solo responder 3 preguntas. 
              La inteligencia artificial hace todo el trabajo pesado por ti.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onSignupClick}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all"
              >
                <i className="fas fa-rocket mr-2"></i>
                Empieza Gratis
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary px-8 py-4 text-lg font-semibold"
                onClick={() => {
                  // Scroll to How It Works section to show the process
                  const element = document.getElementById('como-funciona');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <i className="fas fa-play mr-2"></i>
                Ver Demo
              </Button>
            </div>
            
            <div className="mt-12 flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                Sin tarjeta de crédito
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                Setup en 5 minutos
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                Soporte 24/7
              </div>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            {/* Dashboard mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary to-blue-600 p-4 rounded-lg text-white">
                    <h3 className="font-semibold">AutoBiz.AI Dashboard</h3>
                    <p className="text-sm opacity-90">Configurando tu negocio digital...</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <i className="fas fa-globe text-primary"></i>
                        <span className="text-sm font-medium">Web generada</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <i className="fas fa-envelope text-primary"></i>
                        <span className="text-sm font-medium">Emails</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-check-circle text-green-600"></i>
                      <span className="text-green-800 font-medium">¡Listo para lanzar!</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-white p-3 rounded-lg shadow-lg animate-bounce-slow">
                <i className="fas fa-magic text-lg"></i>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-lg shadow-lg">
                <i className="fas fa-chart-line text-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
