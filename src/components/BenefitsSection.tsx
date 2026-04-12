
import { useConfig } from '@/contexts/ConfigContext';

const BenefitsSection = () => {
  const { config } = useConfig();
  return <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white" id="sobre">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="fredoka text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-dark-blue mb-4 leading-tight px-2 sm:px-0">
            <span className="block sm:inline">{config.beneficios.titulo}</span>
            <br className="hidden sm:block" />
            <span className="block sm:inline text-coral">{config.beneficios.subtitulo}</span>
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[
            { key: 'beneficio1', emoji: '🎲', color: 'green' },
            { key: 'beneficio2', emoji: '🧠', color: 'green' },
            { key: 'beneficio3', emoji: '✍️', color: 'green' },
            { key: 'beneficio4', emoji: '📖', color: 'green' }
          ].map((item, index) => {
            const benefit = (config.beneficios as any)[item.key];
            const benefitImage = benefit?.imagem ? (benefit.imagem.startsWith('http') ? benefit.imagem : `keys/${benefit.imagem}`) : null;
            
            return (
              <div key={item.key} className="group">
                <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-green-300 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 opacity-60"></div>
                  <div className="relative p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">{index + 1}</div>
                      <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        {benefitImage ? (
                          <img src={benefitImage} alt={benefit?.titulo} className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-4xl sm:text-5xl">{item.emoji}</span>
                        )}
                      </div>
                    </div>
                    <h3 className="fredoka text-lg sm:text-xl text-dark-blue mb-3 leading-tight font-semibold">{benefit?.titulo}</h3>
                    <p className="poppins text-gray-700 text-sm leading-relaxed">{benefit?.descricao}</p>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} className="p-4 sm:p-6 lg:p-8 rounded-3xl mt-12 sm:mt-16 text-center shadow-2xl border-4 border-white relative overflow-hidden">
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
              <h3 
                className="fredoka text-lg sm:text-xl md:text-2xl lg:text-3xl text-white drop-shadow-lg leading-tight mb-3 sm:mb-4 text-center"
                dangerouslySetInnerHTML={{ __html: (config.beneficios as any).certificado?.titulo }}
              />
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-2xl shadow-xl mx-auto max-w-2xl border border-white/30">
              <p className="poppins text-dark-blue font-semibold text-xs sm:text-sm lg:text-base mb-3 sm:mb-4">
                {(config.beneficios as any).certificado?.descricao}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row items-center justify-center bg-blue-600 text-white p-3 rounded-xl shadow-lg">
                  <span className="text-lg sm:text-base mb-1 sm:mb-0 sm:mr-2">📜</span>
                  <span className="poppins font-bold text-xs sm:text-sm text-center">{(config.beneficios as any).certificado?.item1}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center bg-green-600 text-white p-3 rounded-xl shadow-lg">
                  <span className="text-lg sm:text-base mb-1 sm:mb-0 sm:mr-2">🎨</span>
                  <span className="poppins font-bold text-xs sm:text-sm text-center">{(config.beneficios as any).certificado?.item2}</span>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }} className="flex flex-col sm:flex-row items-center justify-center text-white p-3 rounded-xl shadow-lg">
                  <span className="text-lg sm:text-base mb-1 sm:mb-0 sm:mr-2">👶</span>
                  <span className="poppins font-bold text-xs sm:text-sm text-center">{(config.beneficios as any).certificado?.item3}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default BenefitsSection;
