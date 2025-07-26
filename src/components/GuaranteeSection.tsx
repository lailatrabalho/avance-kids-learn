const GuaranteeSection = () => {
  return <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
      <div className="container mx-auto text-center">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Clean Guarantee Seal */}
            <div className="relative inline-block">
              <div className="w-72 h-72 sm:w-80 sm:h-80 mx-auto relative">
                
                {/* Outer golden ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 shadow-2xl">
                  {/* Inner dark ring */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-inner flex items-center justify-center relative">
                    
                    {/* GARANTIA text curved at top */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                      <h3 className="fredoka text-base sm:text-lg text-white font-bold tracking-[0.2em] drop-shadow-lg">GARANTIA</h3>
                    </div>
                    
                    {/* INCONDICIONAL text curved at bottom */}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <h3 className="fredoka text-base sm:text-lg text-white font-bold tracking-[0.15em] drop-shadow-lg">INCONDICIONAL</h3>
                    </div>
                    
                    {/* Inner golden circle */}
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 shadow-lg flex flex-col items-center justify-center relative">
                      {/* Subtle shine */}
                      <div className="absolute top-2 left-2 w-6 h-6 bg-white/30 rounded-full blur-sm"></div>
                      
                      {/* Top 3 stars */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-1 text-gray-800 text-xs">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>
                      
                      {/* Main "7 DIAS" text */}
                      <div className="text-center">
                        <h4 className="fredoka text-xl sm:text-2xl text-gray-800 font-extrabold leading-tight drop-shadow-md">
                          7 DIAS
                        </h4>
                      </div>
                      
                      {/* Bottom 3 stars */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 text-gray-800 text-xs">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>
                      
                      {/* Small laurel branches inside */}
                      <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-sm text-yellow-700">
                        🌿
                      </div>
                      
                      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-sm text-yellow-700 scale-x-[-1]">
                        🌿
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* External laurel branches */}
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-4xl text-yellow-600">
                  🌾
                </div>
                
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-4xl text-yellow-600 scale-x-[-1]">
                  🌾
                </div>
                
                {/* Bottom decorative ribbon */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                  <div className="w-1.5 h-3 bg-yellow-600 rounded-sm"></div>
                  <div className="w-1.5 h-3 bg-yellow-600 rounded-sm"></div>
                  <div className="w-1.5 h-3 bg-yellow-600 rounded-sm"></div>
                  <div className="w-1.5 h-3 bg-yellow-600 rounded-sm"></div>
                  <div className="w-1.5 h-3 bg-yellow-600 rounded-sm"></div>
                  <div className="w-1.5 h-3 bg-yellow-600 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Guarantee text */}
          <div className="mt-8 sm:mt-12 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="fredoka text-2xl sm:text-3xl text-dark-blue mb-4">
                🛡️ Garantia Incondicional de 7 Dias
              </h3>
              <p className="poppins text-lg text-gray-700 leading-relaxed">
                Estamos tão confiantes na qualidade do nosso material que oferecemos 
                <strong className="text-coral"> 7 dias de garantia incondicional</strong>. 
                Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu investimento.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 shadow-lg">
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h4 className="fredoka text-xl text-green-700 font-bold mb-3">
                  Satisfação Total ou Seu Dinheiro de Volta
                </h4>
                <p className="poppins text-gray-600 mb-4">
                  Sem burocracia, sem perguntas. Reembolso em até 48 horas.
                </p>
                <div className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  <span className="mr-2">✓</span>
                  100% Garantido
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
      </div>
    </section>;
};
export default GuaranteeSection;