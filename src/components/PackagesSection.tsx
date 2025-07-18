import { Button } from "@/components/ui/button";
import childReading1 from "@/assets/child-reading-1.jpg";
import childReading2 from "@/assets/child-reading-2.jpg";
import childReading3 from "@/assets/child-reading-3.jpg";
import childReading4 from "@/assets/child-reading-4.jpg";

const PackagesSection = () => {
  const handlePurchaseClick = () => {
    window.open('https://pay.kiwify.com.br/3dFCqAu', '_blank');
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gray-50" id="conteudo">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="fredoka text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue mb-4">
            ESCOLHA O PACOTE IDEAL
            <br />
            <span className="text-coral">PARA SUA CRIANÇA</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* PACOTE MIDDLE */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
            <div className="gradient-card-1 p-6 text-white">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-2 fredoka">Pré-Silábico</div>
                                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs fredoka">12 ATIVIDADES</div>
                            </div>
                            <div className="w-16 h-16 bg-white rounded-full overflow-hidden">
                                <img src={childReading1} alt="Criança lendo livro 1" className="w-full h-full object-cover" />
                            </div>
                        </div>
              <h3 className="fredoka text-lg sm:text-xl mb-3">PACOTE MIDDLE</h3>
              <p className="poppins text-xs sm:text-sm leading-relaxed text-white/90">Atividades fundamentais de alfabetização inicial, reconhecimento de formas e cores básicas para desenvolvimento motor.</p>
              <div className="mt-4 flex items-center">
                <span className="poppins text-sm">Primeiras atividades</span>
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* PACOTE RICH */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
            <div className="gradient-card-2 p-6 text-white">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-2 fredoka">Silábicos</div>
                                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs fredoka">15 ATIVIDADES</div>
                            </div>
                            <div className="w-16 h-16 bg-white rounded-full overflow-hidden">
                                <img src={childReading2} alt="Criança lendo livro 2" className="w-full h-full object-cover" />
                            </div>
                        </div>
              <h3 className="fredoka text-lg sm:text-xl mb-3">PACOTE RICH</h3>
              <p className="poppins text-xs sm:text-sm leading-relaxed text-white/90">Exercícios de coordenação motora, primeiras palavras, números até 10 e atividades de associação e memória.</p>
              <div className="mt-4 flex items-center">
                <span className="poppins text-sm">Desenvolvimento médio</span>
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* PACOTE SUPER */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
            <div className="gradient-card-3 p-6 text-white">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-2 fredoka">Silábico Alfabético</div>
                                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs fredoka">20 ATIVIDADES</div>
                            </div>
                            <div className="w-16 h-16 bg-white rounded-full overflow-hidden">
                                <img src={childReading3} alt="Criança lendo livro 3" className="w-full h-full object-cover" />
                            </div>
                        </div>
              <h3 className="fredoka text-lg sm:text-xl mb-3">PACOTE SUPER</h3>
              <p className="poppins text-xs sm:text-sm leading-relaxed text-white/90">Leitura de palavras simples, operações matemáticas básicas, desenvolvimento da escrita e atividades de lógica.</p>
              <div className="mt-4 flex items-center">
                <span className="poppins text-sm">Nível avançado</span>
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* PACOTE EXPERT */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl card-hover relative">
            <div className="gradient-card-4 p-6 text-white">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-2 fredoka">Alfabéticos Leitores Fluentes</div>
                                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs fredoka">25 ATIVIDADES</div>
                            </div>
                            <div className="w-16 h-16 bg-white rounded-full overflow-hidden">
                                <img src={childReading4} alt="Criança lendo livro 4" className="w-full h-full object-cover" />
                            </div>
                        </div>
              <h3 className="fredoka text-lg sm:text-xl mb-3">PACOTE EXPERT</h3>
              <p className="poppins text-xs sm:text-sm leading-relaxed text-white/90">Todos os pacotes reunidos! Kit completo com progressão total do desenvolvimento infantil de 3 a 8 anos.</p>
              <div className="mt-4 flex items-center">
                <span className="poppins text-sm">Completo e progressivo</span>
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Botão Central */}
        <div className="text-center">
          <Button 
            onClick={handlePurchaseClick}
            className="inline-flex items-center justify-center w-full sm:max-w-xs sm:mx-auto text-sm sm:text-base lg:text-lg px-6 py-3 rounded-full shadow-2xl hover-scale font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white fredoka"
          >
            <span className="rocket-animation mr-2">🚀</span> QUERO AVANÇAR
          </Button>
          <p className="poppins text-gray-600 mt-4 text-xs sm:text-sm text-center">
            Escolha qualquer pacote e comece a transformar o aprendizado da sua criança hoje mesmo!
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;