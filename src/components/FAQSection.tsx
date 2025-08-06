import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConfig } from "@/contexts/ConfigContext";

const FAQSection = () => {
  const { config } = useConfig();
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const handleAtendimentoWhatsApp = () => {
    let mensagem = config.faq.mensagemPadrao;
    if (nome) mensagem += `\nMeu nome é: ${nome}`;
    if (whatsapp) mensagem += `\nMeu WhatsApp: ${whatsapp}`;
    const numero = config.faq.numeroWhatsApp;
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="gradient-faq p-6 sm:p-8 lg:p-12 rounded-3xl text-white text-center">
          <h2 className="fredoka text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6">
            {config.faq.titulo}
          </h2>
          <p className="poppins text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
            {config.faq.subtitulo}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white/10 p-4 rounded-xl">
              <Input 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome" 
                className="w-full p-3 rounded-lg text-dark-blue poppins bg-white"
              />
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <Input 
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                type="tel" 
                placeholder="Seu WhatsApp" 
                className="w-full p-3 rounded-lg text-dark-blue poppins bg-white"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleAtendimentoWhatsApp}
            className="inline-flex items-center justify-center w-full sm:max-w-xs sm:mx-auto text-sm sm:text-base lg:text-lg px-6 py-3 rounded-full shadow-2xl hover-scale font-black bg-gold hover:bg-yellow-500 text-black poppins border-4 border-white hover:border-yellow-200 transition-all duration-300"
          >
            SOLICITAR ATENDIMENTO
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;