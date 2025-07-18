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
    <nav className="bg-white shadow-sm py-3 sm:py-4 px-4 sm:px-6 border-b-2 border-gold/20 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="fredoka text-xl sm:text-2xl text-dark-blue">🚀 AVANCE</div>
        <div className="hidden lg:flex space-x-6 xl:space-x-8 poppins">
          <button 
            onClick={() => scrollToSection('sobre')}
            className="text-dark-blue hover:text-coral transition-all duration-300 font-semibold text-sm xl:text-base hover:scale-110 transform story-link"
          >
            Sobre
          </button>
          <button 
            onClick={() => scrollToSection('conteudo')}
            className="text-dark-blue hover:text-coral transition-all duration-300 font-semibold text-sm xl:text-base hover:scale-110 transform story-link"
          >
            Conteúdo
          </button>
          <button 
            onClick={() => scrollToSection('depoimentos')}
            className="text-dark-blue hover:text-coral transition-all duration-300 font-semibold text-sm xl:text-base hover:scale-110 transform story-link"
          >
            Depoimentos
          </button>
        </div>
        <Button 
          onClick={handleWhatsAppClick}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white poppins font-bold text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover-scale border-2 border-white"
        >
          <span className="text-sm sm:text-lg mr-1 sm:mr-2">💬</span>
          <span className="hidden sm:inline">WhatsApp</span>
          <span className="sm:hidden">Chat</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;