import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onLogin: (email: string, password: string) => Promise<boolean>;
  loading: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onLogin, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setIsSubmitting(false);
      return;
    }

    const success = await onLogin(email, password);
    
    if (!success) {
      setError('Email ou senha incorretos');
    }
    
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Acesso Administrativo</h2>
          <p className="text-white/80 text-center text-sm">
            Entre com suas credenciais para acessar o painel
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="seu@email.com"
                  disabled={isSubmitting || loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  disabled={isSubmitting || loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isSubmitting || loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isSubmitting || loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Entrando...
                </div>
              ) : (
                'Entrar no Painel'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center text-xs text-gray-500">
              <Lock className="w-4 h-4 mr-1" />
              Acesso seguro e criptografado
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;