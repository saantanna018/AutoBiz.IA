import { Button } from "@/components/ui/button";

export default function Templates() {
  const templates = [
    {
      title: "Newsletter de Marca Personal",
      description: "Monetiza tu expertise con newsletters premium y contenido exclusivo para suscriptores.",
      icon: "fas fa-newspaper",
      color: "from-blue-400 to-blue-600",
      iconBg: "text-blue-600"
    },
    {
      title: "eBook para Coaches",
      description: "Vende tu conocimiento con eBooks profesionales y páginas de venta optimizadas.",
      icon: "fas fa-book",
      color: "from-purple-400 to-purple-600",
      iconBg: "text-purple-600"
    },
    {
      title: "Página para Vender Servicios",
      description: "Showcasea tus servicios profesionales con páginas que convierten visitas en clientes.",
      icon: "fas fa-handshake",
      color: "from-green-400 to-green-600",
      iconBg: "text-green-600"
    },
    {
      title: "Tienda de Cursos",
      description: "Crea y vende cursos online con una plataforma completa de aprendizaje.",
      icon: "fas fa-graduation-cap",
      color: "from-orange-400 to-orange-600",
      iconBg: "text-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Plantillas de Negocio Listas para Usar
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elige entre nuestras plantillas optimizadas para diferentes nichos de mercado
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className={`h-48 bg-gradient-to-br ${template.color} p-4 flex flex-col justify-between`}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <i className={`${template.icon} ${template.iconBg} text-sm`}></i>
                  </div>
                  <span className="text-white font-semibold">Template</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/20 h-2 rounded w-full"></div>
                  <div className="bg-white/20 h-2 rounded w-3/4"></div>
                  <div className="bg-white/20 h-2 rounded w-1/2"></div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {template.description}
                </p>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => {
                    // Scroll to pricing section to encourage signup
                    const element = document.getElementById('precios');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Probar esta Plantilla
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-gray-900 hover:bg-gray-800 text-white border-gray-900"
            onClick={() => {
              // Scroll to pricing section to encourage signup
              const element = document.getElementById('precios');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Ver Todas las Plantillas
            <i className="fas fa-arrow-right ml-2"></i>
          </Button>
        </div>
      </div>
    </section>
  );
}
