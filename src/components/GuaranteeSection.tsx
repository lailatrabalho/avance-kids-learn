const GuaranteeSection = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
      <div className="container mx-auto text-center">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Selo Principal com Garantia */}
            <div className="w-80 h-80 md:w-96 md:h-96 mx-auto relative">
              {/* Triple rotating rings for more impact */}
              <div className="absolute inset-0 rounded-full border-8 border-dashed border-gold animate-spin opacity-80" style={{animationDuration: '25s'}}></div>
              <div className="absolute inset-2 rounded-full border-6 border-dotted border-yellow-300 animate-spin opacity-60" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
              <div className="absolute inset-6 rounded-full border-4 border-solid border-white/30 animate-pulse"></div>
              
              {/* Outer glow effect */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-gold via-yellow-300 to-gold animate-pulse" style={{boxShadow: '0 0 100px rgba(255,193,7,0.8)'}}></div>
              
              {/* Main seal circle with enhanced gradient */}
              <div className="absolute inset-10 bg-gradient-to-br from-gold via-yellow-200 to-gold rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
                {/* Inner white circle */}
                <div className="w-56 h-56 md:w-64 md:h-64 bg-white rounded-full shadow-inner flex flex-col items-center justify-center p-6 relative overflow-hidden">
                  {/* Sparkle effects inside */}
                  <div className="absolute top-3 left-4 text-gold text-sm animate-bounce">✨</div>
                  <div className="absolute top-4 right-5 text-yellow-400 text-sm animate-bounce" style={{animationDelay: '0.5s'}}>⭐</div>
                  <div className="absolute bottom-6 left-5 text-gold text-sm animate-bounce" style={{animationDelay: '1s'}}>💫</div>
                  <div className="absolute bottom-4 right-4 text-yellow-500 text-sm animate-bounce" style={{animationDelay: '1.5s'}}>🌟</div>
                  
                  {/* Guarantee icon */}
                  <div className="text-4xl md:text-5xl mb-3 animate-pulse">🛡️</div>
                  
                  {/* Main text */}
                  <h3 className="fredoka text-xl md:text-2xl text-dark-blue mb-2 leading-tight drop-shadow-lg">GARANTIA</h3>
                  <div className="relative">
                    <h4 className="fredoka text-3xl md:text-4xl text-coral mb-2 animate-pulse drop-shadow-xl">7 DIAS</h4>
                    <div className="absolute -inset-1 bg-gradient-to-r from-coral via-red-500 to-coral rounded-full opacity-20 animate-ping"></div>
                  </div>
                  <p className="poppins text-sm md:text-base text-gray-700 text-center leading-tight mb-3 font-semibold">
                    Satisfação <strong className="text-dark-blue">TOTAL</strong> ou seu dinheiro de volta
                  </p>
                  
                  {/* Enhanced Stars */}
                  <div className="flex text-gold text-lg md:text-xl space-x-1 animate-bounce">
                    <span style={{animationDelay: '0s'}}>⭐</span>
                    <span style={{animationDelay: '0.2s'}}>⭐</span>
                    <span style={{animationDelay: '0.4s'}}>⭐</span>
                    <span style={{animationDelay: '0.6s'}}>⭐</span>
                    <span style={{animationDelay: '0.8s'}}>⭐</span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced floating badges around the seal */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-xs font-bold fredoka shadow-2xl border-2 border-white animate-bounce">
                ✓ APROVADO
              </div>
              <div className="absolute top-16 -right-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold fredoka transform rotate-12 shadow-2xl border-2 border-white animate-pulse">
                ✓ 100% SEGURO
              </div>
              <div className="absolute bottom-16 -left-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold fredoka transform -rotate-12 shadow-2xl border-2 border-white animate-pulse">
                ✓ CONFIÁVEL
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs font-bold fredoka shadow-2xl border-2 border-white animate-bounce">
                ✓ COMPROVADO
              </div>
              
              {/* Floating money back guarantee */}
              <div className="absolute top-1/2 -left-24 transform -translate-y-1/2 bg-gradient-to-r from-gold to-yellow-400 text-black px-4 py-2 rounded-2xl text-xs font-bold fredoka shadow-xl border-2 border-white animate-pulse">
                💰 DINHEIRO DE VOLTA
              </div>
              <div className="absolute top-1/2 -right-24 transform -translate-y-1/2 bg-gradient-to-r from-gold to-yellow-400 text-black px-4 py-2 rounded-2xl text-xs font-bold fredoka shadow-xl border-2 border-white animate-pulse">
                ⚡ SEM BUROCRACIA
              </div>
            </div>
          </div>
          
          {/* Guarantee Cards Side by Side */}
          <div className="mt-8 sm:mt-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Garantia Incondicional */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="text-3xl mb-3">🛡️</div>
                  <h3 className="fredoka text-lg text-dark-blue font-bold mb-3">
                    Garantia Incondicional de 7 Dias
                  </h3>
                  <p className="poppins text-sm text-gray-700 leading-relaxed">
                    Estamos tão confiantes na qualidade do nosso material que oferecemos 
                    <strong className="text-coral"> 7 dias de garantia incondicional</strong>. 
                    Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu investimento.
                  </p>
                </div>
              </div>

              {/* Card 2: Dinheiro de Volta */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="text-3xl mb-3">💰</div>
                  <h3 className="fredoka text-lg text-green-700 font-bold mb-3">
                    Satisfação Total ou Seu Dinheiro de Volta
                  </h3>
                  <p className="poppins text-sm text-gray-600 leading-relaxed mb-4">
                    Sem burocracia, sem perguntas. Reembolso em até 48 horas.
                  </p>
                  <div className="inline-flex items-center bg-green-500 text-white px-3 py-2 rounded-full text-xs font-bold">
                    <span className="mr-1">✓</span>
                    100% Garantido
                  </div>
                </div>
              </div>

            </div>
          </div>
            
          {/* Enhanced Features list */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm sm:text-base mt-8">
            <div className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 p-4 sm:p-6 rounded-2xl text-white shadow-lg hover-scale transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-pulse"></div>
              <div className="relative z-10 text-center">
                <div className="text-3xl sm:text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">🔒</div>
                <h4 className="poppins font-bold text-sm sm:text-base mb-2">Compra Segura</h4>
                <p className="poppins text-xs sm:text-sm opacity-90">Pagamento 100% protegido</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 p-4 sm:p-6 rounded-2xl text-white shadow-lg hover-scale transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-pulse"></div>
              <div className="relative z-10 text-center">
                <div className="text-3xl sm:text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">📱</div>
                <h4 className="poppins font-bold text-sm sm:text-base mb-2">Suporte 24h</h4>  
                <p className="poppins text-xs sm:text-sm opacity-90">Atendimento sempre disponível</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden gradient-faq p-4 sm:p-6 rounded-2xl text-white shadow-lg hover-scale transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-pulse"></div>
              <div className="relative z-10 text-center">
                <div className="text-3xl sm:text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">⚡</div>
                <h4 className="poppins font-bold text-sm sm:text-base mb-2">Entrega Imediata</h4>
                <p className="poppins text-xs sm:text-sm opacity-90">Acesso instantâneo ao conteúdo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default GuaranteeSection;