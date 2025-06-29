import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Building2, Users, DollarSign, TrendingUp, Plus, Settings, LogOut, Mail, Activity } from "lucide-react";
import type { Business, Analytics, EmailCampaign } from "@shared/schema";

export default function Dashboard() {
  const [selectedBusinessId, setSelectedBusinessId] = useState<number | null>(null);

  const { data: businesses = [] as Business[], isLoading: businessesLoading } = useQuery({
    queryKey: ["/api/businesses"],
  });

  const { data: analytics = [] as Analytics[], isLoading: analyticsLoading } = useQuery({
    queryKey: ["/api/analytics", selectedBusinessId],
    enabled: !!selectedBusinessId,
  });

  const { data: emailCampaigns = [] as EmailCampaign[] } = useQuery({
    queryKey: ["/api/email-campaigns", selectedBusinessId],
    enabled: !!selectedBusinessId,
  });

  const businessList = businesses as Business[];
  const analyticsList = analytics as Analytics[];
  const campaignsList = emailCampaigns as EmailCampaign[];
  
  const totalRevenue = businessList.reduce((sum: number, business: Business) => sum + parseFloat(business.revenue || '0'), 0);
  const totalCustomers = businessList.reduce((sum: number, business: Business) => sum + (business.settings as any)?.customers || 0, 0);
  const activeBusinesses = businessList.filter((b: Business) => b.status === 'active').length;

  if (businessesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AutoBiz.AI</h1>
              <p className="text-gray-600">Panel de Control</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Negocios Activos</CardTitle>
              <Building2 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeBusinesses}</div>
              <p className="text-xs text-green-600">+2 este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-600">+12% vs mes anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
              <p className="text-xs text-green-600">+8% crecimiento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversión</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-green-600">+0.5% mejora</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Ingresos por Mes</CardTitle>
              <CardDescription>Evolución de ingresos en los últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              {analyticsList.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsList}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Selecciona un negocio para ver análisis</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Últimas acciones en tus negocios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nuevo cliente registrado</p>
                    <p className="text-xs text-gray-500">Hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Campaña enviada: Newsletter</p>
                    <p className="text-xs text-gray-500">Hace 4 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Página web actualizada</p>
                    <p className="text-xs text-gray-500">Hace 1 día</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nuevo producto añadido</p>
                    <p className="text-xs text-gray-500">Hace 2 días</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Mis Negocios</CardTitle>
              <CardDescription>Gestiona todos tus negocios digitales</CardDescription>
            </div>
            <Button onClick={async () => {
              try {
                await fetch('/api/seed-demo-data', { method: 'POST' });
                window.location.reload();
              } catch (error) {
                console.error('Error seeding data:', error);
              }
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Demo
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(businesses as Business[]).map((business: Business) => (
                <div 
                  key={business.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedBusinessId === business.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedBusinessId(business.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{business.name}</h3>
                        <p className="text-sm text-gray-600">{business.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={business.status === 'active' ? 'default' : 'secondary'}>
                            {business.status === 'active' ? 'Activo' : 'Inactivo'}
                          </Badge>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{business.niche}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ${(business.revenue || 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {((business.settings as any)?.customers || 0).toLocaleString()} clientes
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {businessList.length === 0 && (
                <div className="text-center py-12">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes negocios aún</h3>
                  <p className="text-gray-500 mb-4">Crea datos de demostración para explorar AutoBiz.AI</p>
                  <Button onClick={async () => {
                    try {
                      await fetch('/api/seed-demo-data', { method: 'POST' });
                      window.location.reload();
                    } catch (error) {
                      console.error('Error seeding data:', error);
                    }
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Datos Demo
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Email Campaigns */}
        {selectedBusinessId && campaignsList.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Campañas de Email</CardTitle>
              <CardDescription>Campañas activas del negocio seleccionado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignsList.map((campaign: EmailCampaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Mail className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">{campaign.name}</h4>
                        <p className="text-sm text-gray-600">{campaign.subject}</p>
                        <Badge variant={campaign.status === 'sent' ? 'default' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex space-x-4 text-sm">
                        <div>
                          <span className="text-gray-500">Aperturas:</span>
                          <span className="ml-1 font-medium">{(campaign as any).opens || 0}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Clics:</span>
                          <span className="ml-1 font-medium">{(campaign as any).clicks || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}