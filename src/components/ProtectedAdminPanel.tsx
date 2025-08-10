import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/LoginModal';
import AdminPanel from '@/pages/AdminPanel';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, Shield } from 'lucide-react';

const ProtectedAdminPanel: React.FC = () => {
  const { user, loading, login, logout, isAuthenticated } = useAuth();

  // Se ainda está carregando, mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se não está autenticado, mostrar modal de login
  if (!isAuthenticated) {
    return (
      <>
        {/* Background com informações */}
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Área Restrita
            </h1>
            <p className="text-gray-600 mb-6">
              Esta é uma área administrativa protegida. 
              É necessário fazer login para continuar.
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-center text-sm text-gray-500">
                <Settings className="w-4 h-4 mr-2" />
                Painel Administrativo - E-book Avance
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Login */}
        <LoginModal 
          isOpen={!isAuthenticated} 
          onLogin={login} 
          loading={loading} 
        />
      </>
    );
  }

  // Se está autenticado, mostrar o painel com header de logout
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header com informações do usuário e logout */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mr-3">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Logado como: {user?.email}
                </p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Painel Administrativo */}
      <AdminPanel />
    </div>
  );
};

export default ProtectedAdminPanel;