import { Button } from "@/components/ui/button";
import { useConfig } from "@/contexts/ConfigContext";

const HeroSection = () => {
  const { config } = useConfig();
  
  const handlePurchaseClick = () => {
    window.open('https://pay.kiwify.com.br/3dFCqAu', '_blank');
  };

  return (
    <section className="gradient-hero relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-white z-10 relative order-2 lg:order-1 animate-fade-in">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg border border-white/20 hover-scale">
              📖 NOVO E-BOOK
            </div>
            <h1 className="fredoka text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 leading-tight">
              <span className="block transform hover:scale-105 transition-transform duration-300">{config.hero.titulo}</span>
              <br />
              <span className="text-gold drop-shadow-lg">{config.hero.subtitulo}</span>
              <br />
              <span className="text-sm sm:text-base lg:text-lg poppins font-normal opacity-90">{config.geral.faixaEtaria}</span>
            </h1>
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 poppins">
              <div className="flex items-start group">
                <div className="w-3 h-3 bg-gold rounded-full mr-3 mt-2 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
                <span className="text-sm sm:text-base opacity-95 group-hover:opacity-100 transition-opacity duration-300">{config.hero.descricao1}</span>
              </div>
              <div className="flex items-start group">
                <div className="w-3 h-3 bg-gold rounded-full mr-3 mt-2 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
                <span className="text-sm sm:text-base opacity-95 group-hover:opacity-100 transition-opacity duration-300">{config.hero.descricao2}</span>
              </div>
            </div>
            <Button 
              onClick={handlePurchaseClick}
              className="bg-gold hover:bg-yellow-500 text-black poppins font-bold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl hover:shadow-2xl hover-scale transition-all duration-300 w-full sm:w-auto border-2 border-gold/20 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
              <span className="relative z-10">{config.hero.botaoCta}</span>
            </Button>
          </div>
          
          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="blob bg-white/10 w-60 h-60 sm:w-80 sm:h-80 absolute top-4 sm:top-10 right-4 sm:right-10 blur-sm"></div>
            <div className="relative z-10 floating group">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <img 
                src={config.hero.imagemUrl} 
                alt="E-book Avance" 
                className="w-full max-w-xs sm:max-w-md mx-auto rounded-2xl shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-500 border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced floating elements */}
      <div className="absolute top-20 left-20 text-4xl text-white/30 floating hover:text-white/50 transition-colors duration-300">📚</div>
      <div className="absolute bottom-20 right-20 text-4xl text-white/30 floating hover:text-white/50 transition-colors duration-300" style={{ animationDelay: '1s' }}>✏️</div>
      <div className="absolute top-1/3 right-10 text-3xl text-white/20 floating" style={{ animationDelay: '2s' }}>🎨</div>
      <div className="absolute bottom-1/3 left-10 text-3xl text-white/20 floating" style={{ animationDelay: '3s' }}>⭐</div>
    </section>
  );
};

export default HeroSection;