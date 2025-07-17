import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FAQSection = () => {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const handleAtendimentoWhatsApp = () => {
    let mensagem = `Oi, quero mais informações sobre o E-BOOK AVANCE,`;
    if (nome) mensagem += `\nMeu nome é: ${nome}`;
    if (whatsapp) mensagem += `\nMeu WhatsApp: ${whatsapp}`;
    const numero = '559491334167';
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="gradient-cta p-12 rounded-3xl text-white text-center">
          <h2 className="fredoka text-3xl lg:text-4xl mb-6">
            AINDA TEM DÚVIDAS SOBRE O AVANCE?
          </h2>
          <p className="poppins text-lg mb-8">
            Nossos consultores especializados em educação infantil estão prontos para esclarecer todas as suas questões e te ajudar a escolher o melhor pacote.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
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
            className="inline-flex items-center justify-center max-w-xs mx-auto text-base sm:text-lg px-6 py-3 rounded-full shadow-2xl hover-scale font-bold bg-gold hover:bg-yellow-500 text-black poppins"
          >
            SOLICITAR ATENDIMENTO
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;