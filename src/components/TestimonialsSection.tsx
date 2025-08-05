import { useConfig } from "@/contexts/ConfigContext";

const TestimonialsSection = () => {
  const { config } = useConfig();
  
  const testimonials = [
    {
      name: config.depoimentos.depoimento1.nome,
      role: config.depoimentos.depoimento1.cargo,
      avatar: config.depoimentos.depoimento1.inicial,
      text: config.depoimentos.depoimento1.texto,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      icon: "👩‍🏫",
      category: "Professora",
      borderColor: "border-t-coral",
      imageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
    },
    {
      name: config.depoimentos.depoimento2.nome,
      role: config.depoimentos.depoimento2.cargo,
      avatar: config.depoimentos.depoimento2.inicial,
      text: config.depoimentos.depoimento2.texto,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      icon: "👨‍👧",
      category: "Pai",
      borderColor: "border-t-dark-blue",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
    },
    {
      name: config.depoimentos.depoimento3.nome,
      role: config.depoimentos.depoimento3.cargo,
      avatar: config.depoimentos.depoimento3.inicial,
      text: config.depoimentos.depoimento3.texto,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
      icon: "👩‍💼",
      category: "Coordenadora",
      borderColor: "border-t-purple",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&auto=format&q=80"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 gradient-hero relative overflow-hidden" id="depoimentos">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gold rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-white rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-16 w-20 h-20 bg-gold rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      {/* Floating elements similar to hero */}
      <div className="absolute top-20 left-20 text-4xl text-white/20 floating">💬</div>
      <div className="absolute bottom-20 right-20 text-4xl text-white/20 floating" style={{ animationDelay: '1s' }}>⭐</div>

      <div className="container mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl animate-bounce">
            <span className="text-3xl">💬</span>
          </div>
          <h2 className="fredoka text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            O QUE DIZEM OS
            <br />
            <span className="text-gold">PAIS E PROFESSORES</span>
          </h2>
          <p className="poppins text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            <strong className="text-gold">Muitas famílias</strong> já transformaram o aprendizado das suas crianças
          </p>
          
          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gold">98%</div>
              <div className="text-sm text-white/70">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gold">10k+</div>
              <div className="text-sm text-white/70">Famílias</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gold">5.0</div>
              <div className="text-sm text-white/70">Avaliação</div>
            </div>
          </div>
        </div>
        

        
        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className={`bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border-2 border-gray-100 ${testimonial.borderColor} border-t-4 hover:border-blue-200 hover:shadow-3xl relative overflow-hidden transition-all duration-300 card-hover`}>
                
                {/* Decorative quote */}
                <div className="absolute top-4 right-4 text-4xl text-gray-200">"</div>
                
                {/* Header */}
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-white bg-gray-100">
                    <img 
                      src={testimonial.imageUrl} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) nextElement.style.display = 'flex';
                      }}
                    />
                    <div className={`w-full h-full bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg hidden`}>
                      {testimonial.avatar}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="fredoka text-lg sm:text-xl text-dark-blue mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="poppins text-sm sm:text-base text-gray-700 mb-1">
                      {testimonial.role}
                    </p>
                    <div className="flex items-center">
                      <span className="text-xl mr-2">{testimonial.icon}</span>
                      <span className="text-xs text-coral font-medium">{testimonial.category}</span>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial text */}
                <blockquote className="poppins text-base sm:text-lg text-gray-800 leading-relaxed mb-6 italic font-medium">
                  "{testimonial.text}"
                </blockquote>
                
                {/* Footer with stars */}
                <div className="flex items-center justify-between">
                  <div className="flex text-yellow-400 text-lg">
                    <span className="animate-pulse" style={{animationDelay: '0s'}}>⭐</span>
                    <span className="animate-pulse" style={{animationDelay: '0.2s'}}>⭐</span>
                    <span className="animate-pulse" style={{animationDelay: '0.4s'}}>⭐</span>
                    <span className="animate-pulse" style={{animationDelay: '0.6s'}}>⭐</span>
                    <span className="animate-pulse" style={{animationDelay: '0.8s'}}>⭐</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-dark-blue font-semibold">Avaliação 5.0</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <div className="gradient-faq rounded-3xl p-8 sm:p-12 shadow-2xl max-w-3xl mx-auto relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 text-4xl opacity-20">🎉</div>
            <div className="absolute bottom-4 right-4 text-4xl opacity-20">🚀</div>
            
            <div className="relative z-10">
              <h3 className="fredoka text-2xl sm:text-3xl text-white mb-4">
                Junte-se a milhares de famílias satisfeitas!
              </h3>
              <p className="poppins text-white/90 text-lg mb-6">
                Transforme o aprendizado da sua criança hoje mesmo
              </p>
              <div className="flex items-center justify-center space-x-4 text-white/80">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  <span>Resultados comprovados</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">✓</span>
                  <span>Garantia de 7 dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;