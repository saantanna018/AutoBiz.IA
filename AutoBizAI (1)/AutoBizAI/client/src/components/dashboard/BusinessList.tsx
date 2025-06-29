import { Business } from "@shared/schema";

interface BusinessListProps {
  businesses: Business[];
  onSelectBusiness: (id: number) => void;
  selectedBusinessId: number | null;
}

export default function BusinessList({ businesses, onSelectBusiness, selectedBusinessId }: BusinessListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return 'fas fa-check-circle';
      case 'paused': return 'fas fa-pause-circle';
      case 'draft': return 'fas fa-edit';
      default: return 'fas fa-circle';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Mis Negocios</h3>
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            Ver todos
          </button>
        </div>
      </div>

      <div className="p-6">
        {businesses.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-briefcase text-gray-400 text-xl"></i>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No tienes negocios aún</h4>
            <p className="text-gray-600 mb-4">Crea tu primer negocio digital con IA</p>
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium">
              Crear Negocio
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {businesses.map((business) => (
              <div 
                key={business.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedBusinessId === business.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onSelectBusiness(business.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{business.name}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(business.status)}`}>
                        <i className={`${getStatusIcon(business.status)} mr-1`}></i>
                        {business.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{business.description || 'Sin descripción'}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <i className="fas fa-tag mr-2"></i>
                        {business.niche}
                      </span>
                      <span className="flex items-center">
                        <i className="fas fa-euro-sign mr-2"></i>
                        €{business.revenue}
                      </span>
                      <span className="flex items-center">
                        <i className="fas fa-calendar mr-2"></i>
                        {new Date(business.createdAt).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                </div>

                {business.websiteUrl && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <a 
                      href={business.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      Ver sitio web
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}