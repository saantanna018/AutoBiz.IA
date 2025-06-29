export default function RecentActivity() {
  const activities = [
    {
      type: "business_created",
      title: "Nuevo negocio creado",
      description: "Newsletter de Marketing Digital",
      time: "Hace 2 horas",
      icon: "fas fa-plus-circle",
      color: "text-green-600"
    },
    {
      type: "email_sent",
      title: "Campaña enviada",
      description: "Bienvenida a nuevos suscriptores - 234 emails",
      time: "Hace 4 horas",
      icon: "fas fa-envelope",
      color: "text-blue-600"
    },
    {
      type: "revenue",
      title: "Nueva venta",
      description: "eBook: Guía de Productividad - €29.99",
      time: "Hace 6 horas",
      icon: "fas fa-euro-sign",
      color: "text-green-600"
    },
    {
      type: "analytics",
      title: "Milestone alcanzado",
      description: "1,000 visitantes únicos este mes",
      time: "Hace 1 día",
      icon: "fas fa-chart-line",
      color: "text-purple-600"
    },
    {
      type: "website_updated",
      title: "Sitio web actualizado",
      description: "Nueva página de servicios publicada",
      time: "Hace 2 días",
      icon: "fas fa-globe",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          Ver todo
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0`}>
              <i className={`${activity.icon} ${activity.color} text-sm`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600 truncate">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-sm text-gray-600 hover:text-gray-900 font-medium">
          Cargar más actividad
        </button>
      </div>
    </div>
  );
}