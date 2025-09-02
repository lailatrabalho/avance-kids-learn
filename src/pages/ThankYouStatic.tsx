import React, { useState } from 'react';
import { useConfig } from '@/hooks/useConfig';

const ThankYouStatic = () => {
  const { config } = useConfig();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const openWhatsApp = () => {
    const message = 'Olá! Preciso de ajuda com o E-book Avance.';
    const url = `https://wa.me/${config.geral.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const shareSuccess = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'E-book Avance - Sucesso na Educação Infantil',
          text: 'Acabei de adquirir o E-book Avance para desenvolvimento infantil!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Erro ao compartilhar:', err);
      }
    } else {
      // Fallback: copiar para área de transferência
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const faqData = [
    {
      pergunta: 'Não recebi o e-mail com o material',
      resposta: 'Verifique sua caixa de spam e aguarde até 5 minutos. Se não receber, entre em contato via WhatsApp.',
      icon: '📧'
    },
    {
      pergunta: 'Posso imprimir quantas vezes quiser?',
      resposta: 'Sim! O material é 100% seu após a compra. Downloads e impressões ilimitadas.',
      icon: '🖨️'
    },
    {
      pergunta: 'Como funciona a garantia de 7 dias?',
      resposta: 'Garantia total! 100% do seu dinheiro de volta se não ficar satisfeito por qualquer motivo.',
      icon: '🛡️'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <style>{`
        .fredoka { font-family: 'Fredoka One', cursive; }
        .poppins { font-family: 'Poppins', sans-serif; }
        
        .bg-coral { background-color: #EA4C57; }
        .bg-dark-blue { background-color: #2E4DA7; }
        .bg-light-blue { background-color: #3B82F6; }
        .bg-gold { background-color: #FFC107; }
        .bg-orange { background-color: #FF8A00; }
        .bg-light-green { background-color: #4CAF50; }
        .bg-pink { background-color: #FFB6C1; }
        .bg-paper { background-color: #FDF7F0; }
        .bg-purple { background-color: #8B5CF6; }
        .bg-purple-light { background-color: #A78BFA; }
        
        .text-coral { color: #EA4C57; }
        .text-dark-blue { color: #2E4DA7; }
        .text-light-blue { color: #3B82F6; }
        .text-gold { color: #FFC107; }
        .text-orange { color: #FF8A00; }
        .text-light-green { color: #4CAF50; }
        
        .gradient-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .gradient-success {
          background: linear-gradient(135deg, #2E7D32 0%, #388E3C 50%, #4CAF50 100%);
        }
        
        .gradient-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .bounce-slow { 
          animation: bounce 2s infinite; 
        }
        
        .blob {
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: blob 7s ease-in-out infinite;
        }
        
        @keyframes blob {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
          75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }
        
        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.33); }
          80%, 100% { opacity: 0; }
        }
        
        .checkmark {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: block;
          stroke-width: 4;
          stroke: #4CAF50;
          stroke-miterlimit: 10;
          box-shadow: inset 0px 0px 0px #4CAF50;
          animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
        }
        
        @media (min-width: 768px) {
          .checkmark {
            width: 120px;
            height: 120px;
          }
        }
        
        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 4;
          stroke-miterlimit: 10;
          stroke: #4CAF50;
          fill: none;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        
        .checkmark__check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        
        @keyframes stroke {
          100% { stroke-dashoffset: 0; }
        }
        
        @keyframes scale {
          0%, 100% { transform: none; }
          50% { transform: scale3d(1.1, 1.1, 1); }
        }
        
        @keyframes fill {
          100% { box-shadow: inset 0px 0px 0px 60px #4CAF50; }
        }

        .step-card {
          transition: all 0.3s ease;
        }
        
        .step-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }
      `}</style>
      
      {/* Header */}
      <nav className="bg-white shadow-sm py-3 px-4 md:py-4 md:px-6">
        <div className="container mx-auto flex justify-center">
          <div className="fredoka text-lg md:text-2xl text-dark-blue">🚀 AVANCE - OBRIGADO!</div>
        </div>
      </nav>

      {/* Success Hero Section */}
      <section className="gradient-success relative overflow-hidden py-8 md:py-16 px-4 md:px-6">
        <div className="container mx-auto text-center">
          {/* Success Animation */}
          <div className="mb-6 md:mb-8 flex justify-center">
            <div className="relative">
              <svg className="checkmark w-20 h-20 md:w-32 md:h-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" fill="none" cx="26" cy="26" r="25"/>
                <path className="checkmark__check" fill="none" d="l14,20 l7,7 l16,-16"/>
              </svg>
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full bg-white pulse-ring"></div>
              <div className="absolute inset-0 rounded-full bg-white pulse-ring" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
          
          <h1 className="fredoka text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-4 md:mb-6 leading-tight px-2">
            🎉 {config.obrigado.titulo}
            <br />
            <span className="text-gold">{config.obrigado.subtitulo}</span>
          </h1>
          
          <p className="poppins text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            {config.obrigado.descricao}
          </p>
          
          {/* Success Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl mb-2">📧</div>
              <h3 className="fredoka text-white text-base md:text-lg">E-MAIL ENVIADO</h3>
              <p className="poppins text-white/80 text-xs md:text-sm">Material chegará em até 5 minutos</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl mb-2">🔓</div>
              <h3 className="fredoka text-white text-base md:text-lg">ACESSO LIBERADO</h3>
              <p className="poppins text-white/80 text-xs md:text-sm">Download imediato disponível</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 sm:col-span-2 md:col-span-1">
              <div className="text-2xl md:text-3xl mb-2">🛡️</div>
              <h3 className="fredoka text-white text-base md:text-lg">GARANTIA ATIVA</h3>
              <p className="poppins text-white/80 text-xs md:text-sm">7 dias de satisfação garantida</p>
            </div>
          </div>
        </div>
        
        {/* Floating celebration elements - Hidden on mobile for cleaner look */}
        <div className="hidden md:block absolute top-20 left-20 text-4xl text-white/30 floating">🎈</div>
        <div className="hidden md:block absolute bottom-20 right-20 text-4xl text-white/30 floating" style={{animationDelay: '1s'}}>🌟</div>
        <div className="hidden md:block absolute top-1/2 left-10 text-3xl text-white/20 floating" style={{animationDelay: '2s'}}>🎊</div>
      </section>

      {/* Video Explanation Section */}
      <section className="py-10 md:py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="fredoka text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue mb-4 leading-tight">
              {config.obrigado.videoTitulo}
            </h2>
            <p className="poppins text-gray-600 text-sm md:text-lg px-4">
              {config.obrigado.videoDescricao}
            </p>
          </div>
          
          {/* Video Container */}
          <div className="relative bg-dark-blue rounded-2xl md:rounded-3xl p-4 md:p-8 mb-8 md:mb-12 shadow-2xl">
            <div className="aspect-video bg-gray-800 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 relative overflow-hidden">
              {/* Video Placeholder - Replace with actual video embed */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-blue to-purple flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 cursor-pointer hover:bg-white/30 transition">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l7-5-7-5z"/>
                    </svg>
                  </div>
                  <h3 className="fredoka text-lg md:text-xl mb-2">TUTORIAL COMPLETO</h3>
                  <p className="poppins text-xs md:text-sm opacity-80">Clique para assistir (5 minutos)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="fredoka text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue mb-4 leading-tight">
              PERGUNTAS FREQUENTES
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <span className="text-2xl">{faq.icon}</span>
                    <span className="fredoka text-sm md:text-lg text-dark-blue">{faq.pergunta}</span>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {expandedFaq === index && (
                  <div className="px-4 md:px-6 pb-4 md:pb-6">
                    <div className="pl-8 md:pl-12">
                      <p className="poppins text-gray-600 text-sm md:text-base">{faq.resposta}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-10 md:py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="fredoka text-2xl sm:text-3xl md:text-4xl text-dark-blue mb-6 md:mb-8">
            PRECISA DE AJUDA?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <button
              onClick={openWhatsApp}
              className="bg-light-green hover:bg-green-600 text-white py-4 px-6 rounded-2xl fredoka text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <span>📱</span>
              <span>FALAR NO WHATSAPP</span>
            </button>
            
            <button
              onClick={shareSuccess}
              className="bg-purple hover:bg-purple-600 text-white py-4 px-6 rounded-2xl fredoka text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <span>🔗</span>
              <span>COMPARTILHAR</span>
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
            <p className="poppins text-gray-700 text-sm md:text-base">
              💙 <strong>Obrigado por confiar no E-book Avance!</strong> 
              <br />
              Sua jornada de sucesso na educação infantil começa agora!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-blue text-white py-8 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <div className="fredoka text-xl md:text-2xl mb-4">🚀 E-BOOK AVANCE</div>
          <p className="poppins text-white/80 text-sm">
            © 2025 E-book Avance. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ThankYouStatic;