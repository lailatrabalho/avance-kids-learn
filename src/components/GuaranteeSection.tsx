const GuaranteeSection = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto text-center">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Main Seal */}
            <div className="relative inline-block">
              <div className="w-80 h-80 mx-auto relative">
                {/* Outer rotating ring */}
                <div className="absolute inset-0 rounded-full border-8 border-dashed border-yellow-400 animate-spin" style={{ animationDuration: '20s' }}></div>
                
                {/* Main seal circle */}
                <div className="absolute inset-4 bg-gradient-to-br from-yellow-300 via-gold to-yellow-400 rounded-full shadow-2xl flex items-center justify-center">
                  {/* Inner white circle */}
                  <div className="w-60 h-60 bg-white rounded-full shadow-inner flex flex-col items-center justify-center p-6">
                    {/* Guarantee icon */}
                    <div className="text-5xl mb-3">🛡️</div>
                    
                    {/* Main text */}
                    <h3 className="fredoka text-2xl text-dark-blue mb-2 leading-tight">GARANTIA</h3>
                    <h4 className="fredoka text-3xl text-coral mb-2">7 DIAS</h4>
                    <p className="poppins text-sm text-gray-700 text-center leading-tight mb-3">
                      Satisfação total ou seu dinheiro de volta
                    </p>
                    
                    {/* Stars */}
                    <div className="flex text-yellow-400 text-lg">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                </div>
                
                {/* Decorative badges around the seal */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-light-green text-white px-3 py-1 rounded-full text-xs font-bold fredoka shadow-lg">
                  ✓ APROVADO
                </div>
                <div className="absolute top-12 -right-6 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold fredoka transform rotate-12 shadow-lg">
                  ✓ SEGURO
                </div>
                <div className="absolute bottom-12 -left-6 bg-purple text-white px-3 py-1 rounded-full text-xs font-bold fredoka transform -rotate-12 shadow-lg">
                  ✓ CONFIÁVEL
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-coral text-white px-3 py-1 rounded-full text-xs font-bold fredoka shadow-lg">
                  ✓ TESTADO
                </div>
              </div>
            </div>
          </div>
          
          {/* Guarantee text */}
          <div className="mt-8 max-w-xl mx-auto">
            <h3 className="fredoka text-2xl text-dark-blue mb-4">
              💎 Compromisso com a Qualidade
            </h3>
            <p className="poppins text-gray-700 mb-6">
              Estamos tão confiantes na qualidade do nosso material que oferecemos 
              <strong className="text-coral"> 7 dias de garantia incondicional</strong>. 
              Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu investimento.
            </p>
            
            {/* Features list */}
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center bg-gray-50 p-3 rounded-lg">
                <span className="text-light-green mr-2">🔒</span>
                <span className="poppins">Compra Segura</span>
              </div>
              <div className="flex items-center justify-center bg-gray-50 p-3 rounded-lg">
                <span className="text-primary mr-2">📱</span>
                <span className="poppins">Suporte 24h</span>
              </div>
              <div className="flex items-center justify-center bg-gray-50 p-3 rounded-lg">
                <span className="text-coral mr-2">⚡</span>
                <span className="poppins">Entrega Imediata</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;