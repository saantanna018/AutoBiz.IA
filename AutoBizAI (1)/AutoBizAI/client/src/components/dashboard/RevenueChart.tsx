import { Analytics } from "@shared/schema";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RevenueChartProps {
  analytics: Analytics[];
}

export default function RevenueChart({ analytics }: RevenueChartProps) {
  // Process analytics data for chart
  const chartData = analytics
    .filter(a => a.metric === 'revenue')
    .slice(0, 30) // Last 30 days
    .map(a => ({
      date: new Date(a.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
      value: parseFloat(a.value)
    }))
    .reverse();

  // If no data, show placeholder chart
  const placeholderData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
    value: Math.floor(Math.random() * 500) + 100
  }));

  const displayData = chartData.length > 0 ? chartData : placeholderData;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Ingresos por Día</h3>
          <p className="text-sm text-gray-600">Últimos 30 días</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-sm text-gray-600 hover:text-gray-900">7d</button>
          <button className="text-sm text-gray-600 hover:text-gray-900">30d</button>
          <button className="text-sm bg-primary text-white px-3 py-1 rounded-lg">90d</button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `€${value}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [`€${value}`, 'Ingresos']}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#2563eb" 
              strokeWidth={2}
              dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}