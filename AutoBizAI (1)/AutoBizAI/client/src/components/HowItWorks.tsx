export default function HowItWorks() {
  const steps = [
    {
      icon: "fas fa-lightbulb",
      number: "1",
      title: "Elige tu Idea",
      description: "Selecciona tu nicho, público objetivo y estilo de negocio. Nuestro asistente IA te guía en cada paso.",
      features: ["Coaching personal", "Venta de cursos", "Newsletter premium"],
      color: "from-primary to-blue-600",
      bgColor: "bg-primary"
    },
    {
      icon: "fas fa-cogs",
      number: "2", 
      title: "IA lo Construye Todo",
      description: "Nuestra IA genera automáticamente tu landing page, emails de marketing, productos digitales y automatizaciones.",
      features: ["Landing page responsive", "Secuencias de email", "Contenido optimizado"],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500"
    },
    {
      icon: "fas fa-rocket",
      number: "3",
      title: "Actívalo y Empieza a Vender",
      description: "Conecta tu dominio, configura los pagos y comienza a recibir clientes automáticamente.",
      features: ["Pagos automatizados", "Métricas en tiempo real", "Soporte incluido"],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500"
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cómo Funciona AutoBiz.AI
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tres simples pasos para tener tu negocio digital funcionando y generando ingresos
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center card-hover">
              <div className={`bg-gradient-to-br ${step.color} w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <i className={`${step.icon} text-white text-2xl`}></i>
              </div>
              <div className={`absolute -top-2 -right-2 ${step.bgColor} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold`}>
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 mb-6">
                {step.description}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                {step.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600 mt-2 first:mt-0">
                    <i className={`fas fa-check ${step.bgColor === 'bg-primary' ? 'text-green-500' : step.bgColor === 'bg-purple-500' ? 'text-purple-500' : 'text-green-500'}`}></i>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
