import { Button } from "@/components/ui/button";
import { useConfig } from '@/contexts/ConfigContext';
const PackagesSection = () => {
  const {
    config
  } = useConfig();
  const handlePurchaseClick = () => {
    window.open('https://pay.kiwify.com.br/3dFCqAu', '_blank');
  };
  return <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gray-50" id="conteudo">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="fredoka text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue mb-4">
            CONHEÇA TODOS OS PACOTES
            <br />
            <span className="text-coral">INCLUSOS NO SEU KIT COMPLETO</span>
          </h2>
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 max-w-2xl mx-auto">
            <p className="poppins text-dark-blue font-semibold text-sm md:text-base">
              ✨ <strong>Com sua compra, você terá acesso a TODOS os pacotes!</strong> 
              <br />
              <span className="text-sm opacity-80">Material progressivo para cada etapa do desenvolvimento da sua criança</span>
            </p>
          </div>
        </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {[
            { key: 'middle', gradient: 'gradient-card-1', img: 'https://i.imgur.com/rUT1xeR.jpeg' },
            { key: 'rich', gradient: 'gradient-card-2', img: 'https://i.imgur.com/YpcSJsf.jpeg' },
            { key: 'super', gradient: 'gradient-card-3', img: 'https://i.imgur.com/M6ByzwL.jpeg' },
            { key: 'expert', gradient: 'gradient-card-4', img: 'https://i.imgur.com/FDqaQzG.jpeg', featured: true }
          ].map((item) => {
            const pkg = (config.pacotes as any)[item.key];
            const pkgImage = pkg?.imagem ? (pkg.imagem.startsWith('http') ? pkg.imagem : `keys/${pkg.imagem}`) : item.img;
            return (
              <div key={item.key} className={`bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl card-hover group transition-all duration-500 border border-gray-100 ${item.featured ? 'shadow-2xl border-2 border-gold/20 ring-2 ring-gold/10' : ''}`}>
                {item.featured && <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-yellow-400/20 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>}
                <div className={`${item.gradient} p-6 text-white relative overflow-hidden h-full`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="space-y-2">
                      <div className="inline-block px-3 py-1 text-xs fredoka text-white font-semibold bg-white/20 backdrop-blur-md rounded shadow-none">{pkg?.idade}</div>
                      <div className="inline-block bg-white/30 backdrop-blur-md px-3 py-1 rounded-full text-xs fredoka text-white font-semibold shadow-none">{pkg?.atividades}</div>
                    </div>
                    <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex-shrink-0 shadow-lg ring-4 ring-white/20 group-hover:scale-110 transition-transform duration-300">
                      <img src={pkgImage} alt={pkg?.nome} className="w-full h-full object-cover" style={{ aspectRatio: '1/1' }} />
                    </div>
                  </div>
                  <div className="relative z-10 mb-3">
                    <h3 style={{ textShadow: 'none' }} className="fredoka text-lg sm:text-xl text-white group-hover:scale-105 transition-transform duration-300 px-0 mx-0 font-normal">PACOTE {pkg?.nome}</h3>
                  </div>
                  <div className="relative z-10 mb-4">
                    <p className="poppins text-xs sm:text-sm leading-relaxed text-white font-medium">{pkg?.descricao}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between relative z-10">
                    <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                      <span className="poppins text-sm text-white font-medium">{item.featured ? 'Completo e progressivo' : 'Nível de desenvolvimento'}</span>
                      <svg className="w-4 h-4 ml-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] block opacity-80 poppins">Preço unitário</span>
                      <span className="text-lg font-bold fredoka">R$ {pkg?.preco}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Botão Central Melhorado */}
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent blur-3xl"></div>
          <Button onClick={handlePurchaseClick} className="relative inline-flex items-center justify-center w-full sm:max-w-sm sm:mx-auto text-sm sm:text-base lg:text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl hover-scale font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-purple-600 hover:via-blue-600 hover:to-purple-600 text-white fredoka transition-all duration-500 border-2 border-blue-400/20 group overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
            <span className="rocket-animation mr-2 group-hover:scale-110 transition-transform duration-300">🚀</span> 
            <span className="relative z-10">{config.pacotes.botaoCompra}</span>
          </Button>
          <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 max-w-md mx-auto">
            <p className="poppins text-gray-700 text-xs sm:text-sm text-center font-medium">
              🎯 <strong>ACESSO A TODOS OS 4 PACOTES</strong> - Material completo para todas as idades!
            </p>
            <div className="flex justify-center items-center mt-2 space-x-4 text-xs text-gray-500">
              <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>Acesso imediato</span>
              <span className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>Suporte incluído</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default PackagesSection;