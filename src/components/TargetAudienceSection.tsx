import { useConfig } from "@/contexts/ConfigContext";

const TargetAudienceSection = () => {
  const { config } = useConfig();

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="fredoka text-4xl lg:text-5xl text-blue-900 mb-8 leading-tight">
            {config.publicoAlvo.titulo}
          </h2>
          {/* Card com informação introdutória */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto mb-12 card-hover">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                👩‍🏫
              </div>
            </div>
            <p className="poppins text-gray-700 text-lg leading-relaxed">
              {config.publicoAlvo.textoIntroducao}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover h-full">
            <div className="gradient-card-1 p-6 text-white h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-2 fredoka">🧠 Potencialização</div>
                  <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs fredoka">APRENDIZADO</div>
                </div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🧠</span>
                </div>
              </div>
              <h3 className="fredoka text-lg sm:text-xl mb-3">{config.publicoAlvo.card1.titulo}</h3>
              <p className="poppins text-xs sm:text-sm leading-relaxed text-white/90 flex-grow">{config.publicoAlvo.card1.descricao}</p>
              <div className="mt-4 flex items-center">
                <span className="poppins text-sm">{config.publicoAlvo.card1.detalhe}</span>
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover h-full">
            <div className="gradient-card-2 p-6 text-white h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-2 fredoka">📚 Material Pronto</div>
                  <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs fredoka">ECONOMIA DE TEMPO</div>
                </div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📚</span>
                </div>
              </div>
              <h3 className="fredoka text-lg sm:text-xl mb-3">{config.publicoAlvo.card2.titulo}</h3>
              <p className="poppins text-xs sm:text-sm leading-relaxed text-white/90 flex-grow">{config.publicoAlvo.card2.descricao}</p>
              <div className="mt-4 flex items-center">
                <span className="poppins text-sm">{config.publicoAlvo.card2.detalhe}</span>
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover h-full">
            <div className="gradient-card-3 p-6 text-white h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-2 fredoka">👩‍🏫 Progresso</div>
                  <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs fredoka">TURMAS AVANÇANDO</div>
                </div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👩‍🏫</span>
                </div>
              </div>
              <h3 className="fredoka text-lg sm:text-xl mb-3">{config.publicoAlvo.card3.titulo}</h3>
              <p className="poppins text-xs sm:text-sm leading-relaxed text-white/90 flex-grow">{config.publicoAlvo.card3.descricao}</p>
              <div className="mt-4 flex items-center">
                <span className="poppins text-sm">{config.publicoAlvo.card3.detalhe}</span>
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover h-full">
            <div className="gradient-card-4 p-6 text-white h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-2 fredoka">❤️ Ensino com Afeto</div>
                  <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs fredoka">PROPÓSITO</div>
                </div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">❤️</span>
                </div>
              </div>
              <h3 className="fredoka text-lg sm:text-xl mb-3">{config.publicoAlvo.card4.titulo}</h3>
              <p className="poppins text-xs sm:text-sm leading-relaxed text-white/90 flex-grow">{config.publicoAlvo.card4.descricao}</p>
              <div className="mt-4 flex items-center">
                <span className="poppins text-sm">{config.publicoAlvo.card4.detalhe}</span>
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action Final */}
        <div className="text-center mt-12 relative">
          {/* Ícones decorativos animados */}
          <div className="absolute top-0 left-1/4 text-blue-900/60 text-2xl animate-bounce">🌟</div>
          <div className="absolute top-4 right-1/4 text-blue-900/60 text-xl animate-bounce" style={{ animationDelay: '0.5s' }}>✨</div>
          <div className="absolute bottom-8 left-1/3 text-blue-900/60 text-lg animate-bounce" style={{ animationDelay: '1s' }}>🎯</div>
          <div className="absolute bottom-4 right-1/3 text-blue-900/60 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>🚀</div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-blue-100 shadow-lg">
              <div className="space-y-2 sm:space-y-3">
                <h3 className="fredoka text-base sm:text-lg md:text-xl lg:text-2xl text-blue-900 leading-tight text-center px-2" translate="no">
                  {config.publicoAlvo.ctaTexto}
                </h3>
                <h3 className="fredoka text-base sm:text-lg md:text-xl lg:text-2xl text-coral leading-tight text-center font-bold px-2" translate="no">
                  {config.publicoAlvo.ctaSubtexto}
                </h3>
              </div>
              <div className="flex justify-center mt-4">
                <div className="text-2xl sm:text-3xl bounce-slow">🚀</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;