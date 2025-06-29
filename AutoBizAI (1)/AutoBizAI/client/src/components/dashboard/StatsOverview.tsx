import { Business } from "@shared/schema";

interface StatsOverviewProps {
  businesses: Business[];
}

export default function StatsOverview({ businesses }: StatsOverviewProps) {
  const stats = [
    {
      title: "Negocios Activos",
      value: businesses.filter(b => b.status === 'active').length,
      icon: "fas fa-briefcase",
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+12%",
      changeColor: "text-green-600"
    },
    {
      title: "Ingresos Totales",
      value: businesses.reduce((sum, b) => sum + parseFloat(b.revenue || "0"), 0).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }),
      icon: "fas fa-euro-sign",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+8.2%",
      changeColor: "text-green-600"
    },
    {
      title: "Visitantes Únicos",
      value: "2,847",
      icon: "fas fa-users",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "+15.3%",
      changeColor: "text-green-600"
    },
    {
      title: "Tasa de Conversión",
      value: "3.4%",
      icon: "fas fa-chart-line",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      change: "-2.1%",
      changeColor: "text-red-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <i className={`${stat.icon} ${stat.color} text-lg`}></i>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${stat.changeColor}`}>
              {stat.change}
            </span>
            <span className="text-sm text-gray-600 ml-2">vs mes anterior</span>
          </div>
        </div>
      ))}
    </div>
  );
}