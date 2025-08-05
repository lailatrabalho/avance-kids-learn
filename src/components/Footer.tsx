import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Footer = () => {
  return (
    <footer className="gradient-hero py-8 sm:py-12 px-4 sm:px-6">
      <div className="container mx-auto text-center">
        <div className="fredoka text-2xl sm:text-3xl text-white mb-4 sm:mb-6">🚀 AVANCE</div>
        
        <Dialog>
          <DialogTrigger asChild>
            <button className="poppins text-sm sm:text-base text-white/80 mb-3 sm:mb-4 hover:text-white transition-colors cursor-pointer underline">
              © 2025 – Avance | Copyright.
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center mb-4">⚖️ Direitos Autorais</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm leading-relaxed">
              <p className="font-semibold">
                © 2025 – Avance | Todos os direitos reservados.
              </p>
              
              <p>
                Este material é protegido pela Lei de Direitos Autorais (Lei nº 9.610/1998). A reprodução total ou parcial deste e-book, por quaisquer meios (físicos, digitais ou eletrônicos), sem a autorização expressa e por escrito dos autores e/ou detentores dos direitos, é estritamente proibida e constitui crime passível de sanções civis e penais.
              </p>
              
              <p>
                É vedada a distribuição gratuita ou comercial deste conteúdo em qualquer plataforma, grupo de mensagens, redes sociais ou mídias físicas, sem autorização formal. O uso deste material é exclusivo para o comprador e para fins pedagógicos dentro de sala de aula.
              </p>
              
              <p>
                O conteúdo foi desenvolvido com dedicação, responsabilidade e compromisso com a educação. Ao respeitar os direitos autorais, você contribui com o trabalho de educadores e autores independentes.
              </p>
              
              <p>
                Denúncias de uso indevido ou reprodução não autorizada podem ser encaminhadas para:
                <br />
                📩 suporte@avance.com.br
              </p>
            </div>
          </DialogContent>
        </Dialog>
        
        <p className="poppins text-xs sm:text-sm text-white/60">
          Desenvolvido com <span className="text-gold" style={{fontSize: '1.1em'}}>💛</span> para transformar a educação infantil
        </p>
      </div>
    </footer>
  );
};

export default Footer;