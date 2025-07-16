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
    <nav className="bg-white shadow-sm py-4 px-6 border-b-2 border-gold/20 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="fredoka text-2xl text-dark-blue">🚀 AVANCE</div>
        <div className="hidden md:flex space-x-8 poppins">
          <button 
            onClick={() => scrollToSection('sobre')}
            className="text-dark-blue hover:text-coral transition-all duration-300 font-semibold text-base hover:scale-110 transform story-link"
          >
            Sobre
          </button>
          <button 
            onClick={() => scrollToSection('conteudo')}
            className="text-dark-blue hover:text-coral transition-all duration-300 font-semibold text-base hover:scale-110 transform story-link"
          >
            Conteúdo
          </button>
          <button 
            onClick={() => scrollToSection('depoimentos')}
            className="text-dark-blue hover:text-coral transition-all duration-300 font-semibold text-base hover:scale-110 transform story-link"
          >
            Depoimentos
          </button>
        </div>
        <Button 
          onClick={handleWhatsAppClick}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white poppins font-bold text-sm px-6 py-3 rounded-full shadow-lg hover-scale border-2 border-white"
        >
          <span className="text-lg mr-2">💬</span>
          WhatsApp
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;