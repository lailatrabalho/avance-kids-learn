
// trocamos o ícone 'WhatsApp' que não existe no lucide-react por 'MessageCircle'
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useConfig } from '@/contexts/ConfigContext';

const ThankYou = () => {
  const { config, loading } = useConfig();
  


  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="bg-green-100 rounded-2xl p-6 sm:p-8 lg:p-10 border border-green-200 shadow-xl mb-8">
            <div className="flex items-center justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-3xl shadow-md">
                🎉
              </div>
            </div>
            <h2 className="fredoka text-2xl sm:text-3xl lg:text-4xl text-green-800 mb-4 leading-tight">
              {config.obrigado.titulo}
            </h2>
            <p className="poppins text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
              {config.obrigado.subtitulo}
            </p>
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-inner">
              <p className="poppins text-gray-600 text-sm sm:text-base leading-relaxed">
                {config.obrigado.instrucoes}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 lg:p-10 border border-blue-100 shadow-xl">
            <div className="flex items-center justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl shadow-md">
                <MessageCircle />
              </div>
            </div>
            <h3 className="fredoka text-xl sm:text-2xl text-blue-800 mb-4">
              Precisa de ajuda?
            </h3>
            <p className="poppins text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
              {config.obrigado.textoSuporte}
            </p>
            <Button asChild>
              <a
                href={`https://wa.me/${config.geral.numeroWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-sm sm:text-base transition-colors duration-300"
              >
                Fale conosco no WhatsApp
              </a>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ThankYou;

