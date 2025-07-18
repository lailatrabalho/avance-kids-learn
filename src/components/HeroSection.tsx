import { Button } from "@/components/ui/button";
// Using uploaded image directly

const HeroSection = () => {
  const handlePurchaseClick = () => {
    window.open('https://pay.kiwify.com.br/3dFCqAu', '_blank');
  };

  return (
    <section className="gradient-hero relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-white z-10 relative order-2 lg:order-1">
            <div className="inline-block bg-white/20 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              📖 NOVO E-BOOK
            </div>
            <h1 className="fredoka text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 leading-tight">
              E-BOOK AVANCE
              <br />
              <span className="text-gold">OS NÍVEIS DE ALFABETIZAÇÃO</span>
              <br />
              <span className="text-sm sm:text-base lg:text-lg poppins font-normal">DE 3 A 8 ANOS</span>
            </h1>
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 poppins">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base">Atividades prontas para imprimir que desenvolvem habilidades essenciais</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-gold rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-sm sm:text-base">Métodos aprovados por pedagogos especializados em primeira infância</span>
              </div>
            </div>
            <Button 
              onClick={handlePurchaseClick}
              className="bg-gold hover:bg-yellow-500 text-black poppins font-bold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover-scale bounce-slow w-full sm:w-auto"
            >
              ADQUIRIR MATERIAL
            </Button>
          </div>
          
          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="blob bg-white/10 w-60 h-60 sm:w-80 sm:h-80 absolute top-4 sm:top-10 right-4 sm:right-10"></div>
            <div className="relative z-10 floating">
              <img 
                src="/lovable-uploads/4a24f329-7319-4c8b-abac-61de42f6ab2b.png" 
                alt="E-book Avance" 
                className="w-full max-w-xs sm:max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 text-4xl text-white/20 floating">📚</div>
      <div className="absolute bottom-20 right-20 text-4xl text-white/20 floating" style={{ animationDelay: '1s' }}>✏️</div>
    </section>
  );
};

export default HeroSection;