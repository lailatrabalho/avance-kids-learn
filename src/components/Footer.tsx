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
          <DialogContent className="max-w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[85vh] overflow-y-auto m-2 sm:m-4">
            <DialogHeader className="pb-2">
              <DialogTitle className="text-sm sm:text-base md:text-lg font-bold text-center mb-2 px-1" translate="no">⚖️ Direitos Autorais</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm leading-relaxed px-2 sm:px-3 pb-2">
              <div className="bg-blue-50 rounded-lg p-2 sm:p-3 border-l-4 border-blue-500">
                <p className="font-semibold text-blue-900 text-xs sm:text-sm">
                  © 2025 – Avance | Todos os direitos reservados.
                </p>
              </div>
              
              <p className="text-justify text-xs sm:text-sm">
                Este material é protegido pela Lei de Direitos Autorais (Lei nº 9.610/1998). A reprodução total ou parcial deste e-book, por quaisquer meios (físicos, digitais ou eletrônicos), sem a autorização expressa e por escrito dos autores e/ou detentores dos direitos, é estritamente proibida e constitui crime passível de sanções civis e penais.
              </p>
              
              <p className="text-justify text-xs sm:text-sm">
                É vedada a distribuição gratuita ou comercial deste conteúdo em qualquer plataforma, grupo de mensagens, redes sociais ou mídias físicas, sem autorização formal. O uso deste material é exclusivo para o comprador e para fins pedagógicos dentro de sala de aula.
              </p>
              
              <p className="text-justify text-xs sm:text-sm">
                O conteúdo foi desenvolvido com dedicação, responsabilidade e compromisso com a educação. Ao respeitar os direitos autorais, você contribui com o trabalho de educadores e autores independentes.
              </p>
              
              <div className="bg-red-50 rounded-lg p-2 sm:p-3 border-l-4 border-red-500">
                <p className="font-semibold text-red-900 mb-1 text-xs sm:text-sm">📢 Denúncias</p>
                <p className="text-xs sm:text-sm">
                  Denúncias de uso indevido ou reprodução não autorizada podem ser encaminhadas para:
                  <br />
                  <span className="font-mono bg-gray-100 px-1 sm:px-2 py-1 rounded text-xs mt-1 inline-block break-all">📩 suporte@avance.com.br</span>
                </p>
              </div>
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