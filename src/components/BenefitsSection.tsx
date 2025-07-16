const BenefitsSection = () => {
  return (
    <section className="py-20 px-6 bg-white" id="sobre">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="fredoka text-4xl lg:text-5xl text-dark-blue mb-4">
            COM O AVANCE AS CRIANÇAS SE DESENVOLVEM
            <br />
            <span className="text-coral">EM MÚLTIPLAS ÁREAS</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="number-badge mx-auto mb-6">1</div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-2xl mb-4">
              <div className="text-5xl mb-4">💻</div>
            </div>
            <h3 className="fredoka text-xl text-dark-blue mb-2">APRENDEM A PROGRAMAR</h3>
            <p className="poppins text-gray-600 text-sm">Desenvolvem habilidades de alfabetização de forma lúdica e divertida com jogos educativos</p>
          </div>
          
          <div className="text-center">
            <div className="number-badge mx-auto mb-6">2</div>
            <div className="bg-gradient-to-br from-pink-100 to-red-100 p-6 rounded-2xl mb-4">
              <div className="text-5xl mb-4">🧠</div>
            </div>
            <h3 className="fredoka text-xl text-dark-blue mb-2">DESENVOLVEM LÓGICA E INTELIGÊNCIA</h3>
            <p className="poppins text-gray-600 text-sm">Atividades que estimulam o raciocínio lógico, criatividade e resolução de problemas</p>
          </div>
          
          <div className="text-center">
            <div className="number-badge mx-auto mb-6">3</div>
            <div className="bg-gradient-to-br from-green-100 to-teal-100 p-6 rounded-2xl mb-4">
              <div className="text-5xl mb-4">🗣️</div>
            </div>
            <h3 className="fredoka text-xl text-dark-blue mb-2">APRIMORAM O INGLÊS</h3>
            <p className="poppins text-gray-600 text-sm">Exercícios bilíngues que introduzem vocabulário em inglês de forma natural e divertida</p>
          </div>
          
          <div className="text-center">
            <div className="number-badge mx-auto mb-6">4</div>
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-2xl mb-4">
              <div className="text-5xl mb-4">🎯</div>
            </div>
            <h3 className="fredoka text-xl text-dark-blue mb-2">MELHORAM A PERFORMANCE ESCOLAR</h3>
            <p className="poppins text-gray-600 text-sm">Preparam as crianças para os desafios acadêmicos com atividades progressivas e estruturadas</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-400 via-gold to-orange-500 p-8 rounded-3xl mt-16 text-center shadow-2xl border-4 border-white relative overflow-hidden">
          {/* Brilho animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
          
          {/* Confetes decorativos */}
          <div className="absolute top-2 left-4 text-white/30 text-2xl animate-bounce">🎉</div>
          <div className="absolute top-4 right-6 text-white/30 text-xl animate-bounce" style={{ animationDelay: '0.5s' }}>⭐</div>
          <div className="absolute bottom-3 left-8 text-white/30 text-lg animate-bounce" style={{ animationDelay: '1s' }}>🎊</div>
          <div className="absolute bottom-2 right-4 text-white/30 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>✨</div>
          
          <div className="relative z-10">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-2 shadow-xl animate-bounce">
                <div className="text-5xl">🏆</div>
              </div>
              <h3 className="fredoka text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-lg leading-tight mb-4 text-center">
                CERTIFICADO<br />PERSONALIZADO
              </h3>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl mx-auto max-w-2xl">
              <p className="poppins text-dark-blue font-semibold text-lg mb-4">
                🎓 Reconhecimento oficial que motiva e valoriza o desenvolvimento de cada criança ao concluir as atividades propostas
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-xl">
                  <span className="mr-2">📜</span>
                  <span className="poppins font-semibold text-sm">Certificado Digital</span>
                </div>
                <div className="flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-xl">
                  <span className="mr-2">🎨</span>
                  <span className="poppins font-semibold text-sm">Design Exclusivo</span>
                </div>
                <div className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 text-white p-3 rounded-xl">
                  <span className="mr-2">👶</span>
                  <span className="poppins font-semibold text-sm">Nome da Criança</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;