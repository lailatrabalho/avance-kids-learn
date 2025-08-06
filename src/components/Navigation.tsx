import { Button } from "@/components/ui/button";

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
        <div className="fredoka text-xl sm:text-2xl text-dark-blue hover:scale-105 transition-transform duration-300 cursor-pointer">
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
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white poppins font-bold text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover-scale border-2 border-green-400/20 relative overflow-hidden group transition-all duration-300"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
          <span className="text-sm sm:text-lg mr-1 sm:mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300">💬</span>
          <span className="hidden sm:inline relative z-10">WhatsApp</span>
          <span className="sm:hidden relative z-10">Chat</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;