import { useConfig } from "@/contexts/ConfigContext";

const TestimonialsSection = () => {
  const { config } = useConfig();
  const testimonials = [
    {
      name: config.depoimentos.depoimento1.nome,
      role: config.depoimentos.depoimento1.cargo,
      avatar: config.depoimentos.depoimento1.inicial,
      text: config.depoimentos.depoimento1.texto,
      color: "bg-coral"
    },
    {
      name: config.depoimentos.depoimento2.nome,
      role: config.depoimentos.depoimento2.cargo,
      avatar: config.depoimentos.depoimento2.inicial,
      text: config.depoimentos.depoimento2.texto,
      color: "bg-light-green"
    },
    {
      name: config.depoimentos.depoimento3.nome,
      role: config.depoimentos.depoimento3.cargo,
      avatar: config.depoimentos.depoimento3.inicial,
      text: config.depoimentos.depoimento3.texto,
      color: "bg-purple"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gray-50" id="depoimentos">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="fredoka text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark-blue mb-4">
            {config.depoimentos.titulo}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold mr-3 sm:mr-4 flex-shrink-0`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="fredoka text-base sm:text-lg text-dark-blue">{testimonial.name}</h4>
                  <p className="poppins text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="poppins text-sm sm:text-base text-gray-700 italic">
                "{testimonial.text}"
              </p>
              <div className="flex text-gold mt-4 text-sm sm:text-base">⭐⭐⭐⭐⭐</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;