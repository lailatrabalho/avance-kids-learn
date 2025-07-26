import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useConfig } from "@/contexts/ConfigContext";

const ThankYou = () => {
  const { config } = useConfig();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Acabei de adquirir o e-book Avance e gostaria de suporte. Podem me ajudar?");
    const link = `https://wa.me/${config.geral.whatsapp}?text=${message}`;
    window.open(link, '_blank');
  };

  const shareSuccess = () => {
    const text = "Acabei de adquirir o E-book Avance para educação infantil! 📚✨ Material incrível para o desenvolvimento das crianças de 3 a 6 anos.";
    
    if (navigator.share) {
      navigator.share({
        title: 'E-book Avance',
        text: text,
        url: window.location.href
      });
    } else {
      const message = encodeURIComponent(text);
      const link = `https://wa.me/?text=${message}`;
      window.open(link, '_blank');
    }
  };

  const faqData = [
    {
      question: "Não recebi o e-mail com o material",
      answer: "Não se preocupe! Nosso sistema é automatizado e confiável. Verifique sua caixa de spam/lixo eletrônico, aguarde até 5 minutos, ou entre em contato via WhatsApp.",
      icon: "📧"
    },
    {
      question: "Posso imprimir quantas vezes quiser?",
      answer: "Absolutamente SIM! O material é 100% seu após a compra. Downloads ilimitados, impressões ilimitadas, acesso vitalício e atualizações gratuitas.",
      icon: "🖨️"
    },
    {
      question: "Como funciona a garantia de 7 dias?",
      answer: "Garantia TOTAL e SEM COMPLICAÇÕES! 100% do seu dinheiro de volta se não ficar satisfeito por QUALQUER motivo. Sem burocracia, sem perguntas, reembolso em até 48h.",
      icon: "🛡️"
    },
    {
      question: "Preciso de conhecimento específico para usar?",
      answer: "NÃO! Foi criado especialmente para pais sem formação pedagógica. Instruções passo a passo, objetivos claros, dicas de aplicação e adaptações por idade.",
      icon: "🎓"
    },
    {
      question: "O material funciona para crianças com necessidades especiais?",
      answer: "SIM! Nosso material é inclusivo e respeitoso. Educação inclusiva com atividades adaptáveis, respeita o tempo individual e metodologia sensorial.",
      icon: "💙"
    },
    {
      question: "Quanto tempo leva para ver resultados?",
      answer: "RESULTADOS RÁPIDOS! 1ª semana: maior interesse e concentração. 2-3 semanas: melhorias na coordenação. 1 mês: progressos significativos em todas as áreas.",
      icon: "⚡"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="bg-white shadow-sm py-3 px-4 md:py-4 md:px-6">
        <div className="container mx-auto flex justify-center">
          <div className="font-fredoka text-lg md:text-2xl text-dark-blue">🚀 AVANCE - OBRIGADO!</div>
        </div>
      </nav>

      {/* Success Hero Section */}
      <section className="bg-gradient-to-br from-light-green via-light-green to-light-green relative overflow-hidden py-8 md:py-16 px-4 md:px-6">
        <div className="container mx-auto text-center">
          {/* Success Animation */}
          <div className="mb-6 md:mb-8 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 md:w-20 md:h-20 text-light-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <h1 className="font-fredoka text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white mb-4 md:mb-6 leading-tight px-2">
            🎉 {config.obrigado.titulo}
            <br />
            <span className="text-gold">{config.obrigado.subtitulo}</span>
          </h1>
          
          <p className="font-poppins text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            {config.obrigado.descricao}
          </p>
          
          {/* Success Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl mb-2">📧</div>
              <h3 className="font-fredoka text-white text-base md:text-lg">E-MAIL ENVIADO</h3>
              <p className="font-poppins text-white/80 text-xs md:text-sm">Material chegará em até 5 minutos</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl mb-2">🔓</div>
              <h3 className="font-fredoka text-white text-base md:text-lg">ACESSO LIBERADO</h3>
              <p className="font-poppins text-white/80 text-xs md:text-sm">Download imediato disponível</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 sm:col-span-2 md:col-span-1">
              <div className="text-2xl md:text-3xl mb-2">🛡️</div>
              <h3 className="font-fredoka text-white text-base md:text-lg">GARANTIA ATIVA</h3>
              <p className="font-poppins text-white/80 text-xs md:text-sm">7 dias de satisfação garantida</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-10 md:py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-fredoka text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue mb-4 leading-tight">
              {config.obrigado.videoTitulo}
            </h2>
            <p className="font-poppins text-muted-foreground text-sm md:text-lg px-4">
              {config.obrigado.videoDescricao}
            </p>
          </div>
          
          <div className="relative bg-dark-blue rounded-2xl md:rounded-3xl p-4 md:p-8 mb-8 md:mb-12 shadow-2xl">
            <div className="aspect-video bg-gray-800 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-dark-blue to-purple flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 cursor-pointer hover:bg-white/30 transition">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l7-5-7-5z"/>
                    </svg>
                  </div>
                  <h3 className="font-fredoka text-lg md:text-xl mb-2">TUTORIAL COMPLETO</h3>
                  <p className="font-poppins text-xs md:text-sm opacity-80">Clique para assistir (5 minutos)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-10 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-fredoka text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue mb-4">
              PRÓXIMOS PASSOS
            </h2>
            <p className="font-poppins text-muted-foreground text-sm md:text-lg px-4">
              Siga estas etapas simples para começar a usar seu material hoje mesmo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 text-center shadow-lg card-hover">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple to-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-white font-bold text-lg md:text-2xl">
                1
              </div>
              <h3 className="font-fredoka text-lg md:text-xl text-dark-blue mb-3 md:mb-4">VERIFIQUE SEU E-MAIL</h3>
              <p className="font-poppins text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
                Em até 5 minutos você receberá um e-mail com o link para download. Verifique também a caixa de spam.
              </p>
              <div className="bg-purple/10 p-3 md:p-4 rounded-xl">
                <div className="text-xl md:text-2xl mb-2">📧</div>
                <p className="font-poppins text-xs md:text-sm text-muted-foreground">
                  <strong>Assunto:</strong> "Seu E-book Avance está pronto!"
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 text-center shadow-lg card-hover">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-light-green to-accent rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-white font-bold text-lg md:text-2xl">
                2
              </div>
              <h3 className="font-fredoka text-lg md:text-xl text-dark-blue mb-3 md:mb-4">FAÇA O DOWNLOAD</h3>
              <p className="font-poppins text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
                Clique no link recebido e baixe todos os arquivos PDF. Salve em uma pasta organizada no seu computador.
              </p>
              <div className="bg-light-green/10 p-3 md:p-4 rounded-xl">
                <div className="text-xl md:text-2xl mb-2">💾</div>
                <p className="font-poppins text-xs md:text-sm text-muted-foreground">
                  <strong>Formato:</strong> PDF de alta qualidade
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 text-center shadow-lg card-hover">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange to-coral rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-white font-bold text-lg md:text-2xl">
                3
              </div>
              <h3 className="font-fredoka text-lg md:text-xl text-dark-blue mb-3 md:mb-4">COMECE A USAR</h3>
              <p className="font-poppins text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
                Imprima as atividades adequadas para a idade da sua criança e comece a jornada de aprendizado!
              </p>
              <div className="bg-orange/10 p-3 md:p-4 rounded-xl">
                <div className="text-xl md:text-2xl mb-2">🖨️</div>
                <p className="font-poppins text-xs md:text-sm text-muted-foreground">
                  <strong>Dica:</strong> Use papel sulfite A4 comum
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 md:py-20 px-4 md:px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-fredoka text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue mb-4 md:mb-6 leading-tight px-2">
              PERGUNTAS MAIS FREQUENTES
              <br />
              <span className="text-coral">DOS NOSSOS CLIENTES</span>
            </h2>
            <p className="font-poppins text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto px-4">
              Selecionamos as principais dúvidas para facilitar sua decisão. Se precisar de mais informações, nossa equipe está pronta para ajudar!
            </p>
          </div>
          
          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl md:rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                <button 
                  onClick={() => toggleFaq(index + 1)}
                  className="w-full p-4 md:p-6 lg:p-8 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg flex-shrink-0">
                      <span className="text-xl">{faq.icon}</span>
                    </div>
                    <h3 className="font-fredoka text-lg lg:text-xl text-dark-blue">{faq.question}</h3>
                  </div>
                  <svg 
                    className={`w-6 h-6 text-dark-blue transform transition-transform duration-300 flex-shrink-0 ${
                      expandedFaq === index + 1 ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {expandedFaq === index + 1 && (
                  <div className="px-4 md:px-6 lg:px-20 pb-6 md:pb-8">
                    <div className="border-t border-gray-100 pt-4 md:pt-6">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-6 rounded-xl md:rounded-2xl">
                        <p className="font-poppins text-muted-foreground text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 md:mt-12">
            <div className="bg-gradient-to-r from-primary via-purple to-primary p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl border border-white/20">
              <h3 className="font-fredoka text-xl md:text-2xl mb-3 md:mb-4 text-white drop-shadow-lg">💬 Ainda tem dúvidas?</h3>
              <p className="font-poppins mb-4 md:mb-6 text-white text-sm md:text-base px-2 drop-shadow-md">Nossa equipe está pronta para esclarecer qualquer questão!</p>
              <Button onClick={openWhatsApp} className="bg-gold hover:bg-yellow-500 text-black font-poppins font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg hover-scale w-full sm:w-auto">
                FALAR COM ESPECIALISTA 📱
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-10 md:py-16 px-4 md:px-6 bg-dark-blue">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="font-fredoka text-xl md:text-3xl text-white mb-4 md:mb-6 px-2">
            🌟 SUA JORNADA DE SUCESSO COMEÇA AGORA!
          </h2>
          <p className="font-poppins text-white/90 text-sm md:text-lg mb-6 md:mb-8 px-4">
            Lembre-se: cada atividade realizada é um passo importante no desenvolvimento da sua criança. 
            Estamos aqui para apoiar você nessa jornada incrível de aprendizado.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Button 
              onClick={openWhatsApp}
              className="bg-coral hover:bg-red-600 text-white font-poppins font-semibold py-3 md:py-4 px-4 md:px-6 rounded-xl transition text-sm md:text-base"
            >
              📞 SUPORTE IMEDIATO
            </Button>
            <Button 
              onClick={shareSuccess}
              className="bg-light-green hover:bg-green-600 text-white font-poppins font-semibold py-3 md:py-4 px-4 md:px-6 rounded-xl transition text-sm md:text-base"
            >
              📱 COMPARTILHAR SUCESSO
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-4 md:py-6 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <div className="font-fredoka text-xl md:text-3xl text-white mb-3 md:mb-6">🚀 AVANCE</div>
          <p className="font-poppins text-white/80 mb-2 md:mb-4 text-sm md:text-base">
            Obrigado por confiar em nosso trabalho!
          </p>
          <p className="font-poppins text-white/60 text-xs md:text-sm px-2">
            © 2025 E-book Avance - Desenvolvido com 💙 para transformar a educação infantil
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ThankYou;