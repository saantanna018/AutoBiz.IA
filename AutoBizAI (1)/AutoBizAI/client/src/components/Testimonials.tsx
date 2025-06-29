export default function Testimonials() {
  const testimonials = [
    {
      name: "María González",
      role: "Marketing Consultant",
      content: "En menos de una hora tenía mi newsletter funcionando y generando suscriptores. La IA creó contenido que realmente conecta con mi audiencia.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b4e6045e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60"
    },
    {
      name: "Carlos Mendoza", 
      role: "Business Coach",
      content: "Pasé de idea a €2,000 en ventas en mi primer mes. La automatización de emails es increíble y el soporte es excelente.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60"
    },
    {
      name: "Ana Ruiz",
      role: "Creative Designer", 
      content: "Como diseñadora, pensé que necesitaría crear todo desde cero. AutoBiz.AI me dio más tiempo para enfocarme en mis clientes.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=60&h=60"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Lo que Dicen Nuestros Usuarios
          </h2>
          <p className="text-lg text-gray-600">
            Más de 10,000 emprendedores han lanzado sus negocios con AutoBiz.AI
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 card-hover">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="flex justify-center items-center space-x-8 text-gray-400 flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-users text-2xl"></i>
              <span className="text-lg font-semibold">10,000+ usuarios</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-star text-2xl"></i>
              <span className="text-lg font-semibold">4.9/5 rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-rocket text-2xl"></i>
              <span className="text-lg font-semibold">50,000+ negocios</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
