import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ebook.jpg";

const HeroSection = () => {
  const handlePurchaseClick = () => {
    window.open('https://pay.kiwify.com.br/3dFCqAu', '_blank');
  };

  return (
    <section className="gradient-hero relative overflow-hidden py-20 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white z-10 relative">
            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              📖 NOVO E-BOOK
            </div>
            <h1 className="fredoka text-4xl lg:text-6xl mb-6 leading-tight">
              E-BOOK AVANCE
              <br />
              <span className="text-gold">EDUCAÇÃO INFANTIL</span>
              <br />
              <span className="text-lg poppins font-normal">DE 3 A 6 ANOS</span>
            </h1>
            <div className="space-y-4 mb-8 poppins">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                <span>Atividades prontas para imprimir que desenvolvem habilidades essenciais</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                <span>Métodos aprovados por pedagogos especializados em primeira infância</span>
              </div>
            </div>
            <Button 
              onClick={handlePurchaseClick}
              className="bg-gold hover:bg-yellow-500 text-black poppins font-bold text-lg px-8 py-4 rounded-full shadow-lg hover-scale bounce-slow"
            >
              ADQUIRIR MATERIAL
            </Button>
          </div>
          
          <div className="relative">
            <div className="blob bg-white/10 w-80 h-80 absolute top-10 right-10"></div>
            <div className="relative z-10 floating">
              <img 
                src={heroImage} 
                alt="E-book Avance" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
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