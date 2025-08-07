import { Button } from "@/components/ui/button";

// WhatsApp SVG Icon Component
const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
  </svg>
);

const Navigation = () => {
  const handleWhatsAppClick = () => {
    const numeroWhatsApp = "559491334167";
    const mensagem = encodeURIComponent("Olá! Gostaria de adquirir o e-book Avance para Educação Infantil. Pode me ajudar?");
    const link = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    window.open(link, '_blank');
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg py-3 sm:py-4 px-4 sm:px-6 border-b-2 border-gold/30 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="fredoka text-lg sm:text-xl md:text-2xl text-dark-blue hover:scale-105 transition-transform duration-300 cursor-pointer" translate="no">
          🚀 AVANCE
        </div>
        <div className="hidden lg:flex space-x-6 xl:space-x-8 poppins">
          <button 
            onClick={() => scrollToSection('sobre')}
            className="text-dark-blue hover:text-coral transition-all duration-300 font-semibold text-sm xl:text-base hover:scale-110 transform story-link relative group"
          >
            <span className="relative z-10">Sobre</span>
            <div className="absolute inset-0 bg-coral/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
          </button>
          <button 
            onClick={() => scrollToSection('conteudo')}
            className="text-dark-blue hover:text-coral transition-all duration-300 font-semibold text-sm xl:text-base hover:scale-110 transform story-link relative group"
          >
            <span className="relative z-10">Conteúdo</span>
            <div className="absolute inset-0 bg-coral/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
          </button>
          <button 
            onClick={() => scrollToSection('depoimentos')}
            className="text-dark-blue hover:text-coral transition-all duration-300 font-semibold text-sm xl:text-base hover:scale-110 transform story-link relative group"
          >
            <span className="relative z-10">Depoimentos</span>
            <div className="absolute inset-0 bg-coral/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
          </button>
        </div>
        <Button 
          onClick={handleWhatsAppClick}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white poppins font-bold text-xs sm:text-sm px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full shadow-lg hover:shadow-xl hover-scale border-2 border-green-400/20 relative overflow-hidden group transition-all duration-300 min-h-[40px] sm:min-h-[44px]"
          translate="no"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
          <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" />
          <span className="relative z-10 text-xs sm:text-sm">WhatsApp</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;