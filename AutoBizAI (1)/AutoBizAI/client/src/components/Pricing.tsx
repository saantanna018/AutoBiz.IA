import { Button } from "@/components/ui/button";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Gratis",
      description: "Para empezar a experimentar",
      features: [
        { name: "1 negocio digital", included: true },
        { name: "Landing page básica", included: true },
        { name: "100 emails/mes", included: true },
        { name: "Soporte por email", included: true },
        { name: "Dominio personalizado", included: false },
        { name: "Automatizaciones avanzadas", included: false }
      ],
      buttonText: "Comenzar Gratis",
      buttonClass: "bg-gray-900 hover:bg-gray-800 text-white",
      popular: false
    },
    {
      name: "Pro", 
      price: "€29",
      priceSubtext: "/mes",
      description: "Para hacer crecer tu negocio",
      features: [
        { name: "5 negocios digitales", included: true, highlight: true },
        { name: "Landing pages ilimitadas", included: true },
        { name: "10,000 emails/mes", included: true },
        { name: "Dominio personalizado", included: true },
        { name: "Automatizaciones avanzadas", included: true },
        { name: "Soporte prioritario", included: true }
      ],
      buttonText: "Suscribirse Ahora",
      buttonClass: "bg-primary hover:bg-primary/90 text-white",
      popular: true
    },
    {
      name: "Business",
      price: "€69", 
      priceSubtext: "/mes",
      description: "Para equipos y empresas",
      features: [
        { name: "Negocios ilimitados", included: true, highlight: true },
        { name: "Todo del plan Pro", included: true },
        { name: "100,000 emails/mes", included: true },
        { name: "IA personalizada", included: true },
        { name: "Integraciones avanzadas", included: true },
        { name: "Soporte 24/7", included: true }
      ],
      buttonText: "Contactar Ventas",
      buttonClass: "bg-gray-900 hover:bg-gray-800 text-white",
      popular: false
    }
  ];

  return (
    <section id="precios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Planes que Crecen Contigo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empieza gratis y escala tu negocio con funcionalidades avanzadas
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-lg p-8 border-2 relative transition-all hover:shadow-xl ${
                plan.popular 
                  ? 'border-primary transform scale-105' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Más Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {plan.price}
                  {plan.priceSubtext && (
                    <span className="text-lg font-normal text-gray-600">{plan.priceSubtext}</span>
                  )}
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    {feature.included ? (
                      <i className="fas fa-check text-green-500 mr-3"></i>
                    ) : (
                      <i className="fas fa-times text-gray-400 mr-3"></i>
                    )}
                    <span className={`${'highlight' in feature && feature.highlight ? 'font-medium' : ''} ${
                      feature.included ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-3 px-6 font-semibold ${plan.buttonClass}`}
                onClick={() => {
                  if (plan.name === "Starter") {
                    // For free plan, show signup modal
                    const signupButton = document.querySelector('[data-signup-trigger]') as HTMLButtonElement;
                    if (signupButton) {
                      signupButton.click();
                    }
                  } else if (plan.name === "Business") {
                    // For business plan, open contact form
                    window.open('mailto:contact@autobiz.ai?subject=Business Plan Inquiry', '_blank');
                  } else {
                    // For Pro plan, redirect to signup with plan info
                    const signupButton = document.querySelector('[data-signup-trigger]') as HTMLButtonElement;
                    if (signupButton) {
                      signupButton.click();
                    }
                  }
                }}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
        
        {/* Additional pricing info */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Todos los planes incluyen prueba gratuita de 14 días
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-500 flex-wrap gap-4">
            <div className="flex items-center">
              <i className="fas fa-lock mr-2"></i>
              <span>Pago seguro</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-undo mr-2"></i>
              <span>Cancela cuando quieras</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-headset mr-2"></i>
              <span>Soporte incluido</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
