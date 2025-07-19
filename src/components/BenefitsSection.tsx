
const BenefitsSection = () => {
  return <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white" id="sobre">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="fredoka text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue mb-4">
            COM O AVANCE AS CRIANÇAS SE DESENVOLVEM
            <br />
            <span className="text-coral">EM MÚLTIPLAS ÁREAS</span>
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="number-badge mx-auto mb-6">1</div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-2xl mb-4">
              <div className="text-5xl mb-4">🎲</div>
            </div>
            <h3 className="fredoka text-lg sm:text-xl text-dark-blue mb-2">JOGOS PEDAGÓGICOS EDUCATIVOS</h3>
            <p className="poppins text-gray-600 text-xs sm:text-sm">Atividades lúdicas e interativas que estimulam o aprendizado por meio de jogos, promovendo o raciocínio, a criatividade e a socialização das crianças.</p>
          </div>
          
          <div className="text-center">
            <div className="number-badge mx-auto mb-6">2</div>
            <div className="bg-gradient-to-br from-pink-100 to-red-100 p-6 rounded-2xl mb-4">
              <div className="text-5xl mb-4">🧠</div>
            </div>
            <h3 className="fredoka text-lg sm:text-xl text-dark-blue mb-2">DESENVOLVEM LÓGICA E INTELIGÊNCIA</h3>
            <p className="poppins text-gray-600 text-xs sm:text-sm">Atividades que estimulam o raciocínio lógico, criatividade e resolução de problemas</p>
          </div>
          
          <div className="text-center">
            <div className="number-badge mx-auto mb-6">3</div>
            <div className="bg-gradient-to-br from-green-100 to-teal-100 p-6 rounded-2xl mb-4">
              <div className="text-5xl mb-4">✍️</div>
            </div>
            <h3 className="fredoka text-lg sm:text-xl text-dark-blue mb-2">DESENVOLVEM A COORDENAÇÃO MOTORA</h3>
            <p className="poppins text-gray-600 text-xs sm:text-sm">Atividades práticas que estimulam o traçado, recorte, colagem e outras ações essenciais para o desenvolvimento motor das crianças.</p>
          </div>
          
          <div className="text-center">
            <div className="number-badge mx-auto mb-6">4</div>
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-2xl mb-4">
              <div className="text-5xl mb-4">📖</div>
            </div>
            <h3 className="fredoka text-lg sm:text-xl text-dark-blue mb-2">MELHORAM E AVANÇAM NO NÍVEIS DE LEITURA E ESCRITA</h3>
            <p className="poppins text-gray-600 text-xs sm:text-sm">Atividades que desenvolvem e aprimoram as habilidades de leitura e escrita, promovendo avanços significativos em cada etapa da alfabetização.</p>
          </div>
        </div>
      
        <div className="bg-gradient-to-r from-yellow-400 via-gold to-orange-500 p-4 sm:p-6 lg:p-8 rounded-3xl mt-12 sm:mt-16 text-center shadow-2xl border-4 border-white relative overflow-hidden">
          {/* Brilho animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
          
          {/* Confetes decorativos */}
          <div className="absolute top-2 left-4 text-white/30 text-2xl animate-bounce">🎉</div>
          <div className="absolute top-4 right-6 text-white/30 text-xl animate-bounce" style={{
          animationDelay: '0.5s'
        }}>⭐</div>
          <div className="absolute bottom-3 left-8 text-white/30 text-lg animate-bounce" style={{
          animationDelay: '1s'
        }}>🎊</div>
          <div className="absolute bottom-2 right-4 text-white/30 text-2xl animate-bounce" style={{
          animationDelay: '1.5s'
        }}>✨</div>
          
          <div className="relative z-10">
            <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center mb-2 shadow-xl animate-bounce">
                <div className="text-2xl sm:text-4xl lg:text-5xl">🏆</div>
              </div>
              <h3 className="fredoka text-lg sm:text-xl md:text-2xl lg:text-3xl text-white drop-shadow-lg leading-tight mb-3 sm:mb-4 text-center">
                CERTIFICADO<br />PERSONALIZADO
              </h3>
            </div>
            
            <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} className="backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-2xl shadow-xl mx-auto max-w-2xl border border-white/30">
              <p className="poppins text-dark-blue font-semibold text-xs sm:text-sm lg:text-base mb-3 sm:mb-4">
                🎓 Reconhecimento oficial que motiva e valoriza o desenvolvimento de cada criança ao concluir as atividades propostas
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row items-center justify-center bg-blue-600 text-white p-3 rounded-xl shadow-lg">
                  <span className="text-lg sm:text-base mb-1 sm:mb-0 sm:mr-2">📜</span>
                  <span className="poppins font-bold text-xs sm:text-sm text-center">Certificado Digital</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center bg-green-600 text-white p-3 rounded-xl shadow-lg">
                  <span className="text-lg sm:text-base mb-1 sm:mb-0 sm:mr-2">🎨</span>
                  <span className="poppins font-bold text-xs sm:text-sm text-center">Design Exclusivo</span>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }} className="flex flex-col sm:flex-row items-center justify-center text-white p-3 rounded-xl shadow-lg">
                  <span className="text-lg sm:text-base mb-1 sm:mb-0 sm:mr-2">👶</span>
                  <span className="poppins font-bold text-xs sm:text-sm text-center">Nome da Criança</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default BenefitsSection;
