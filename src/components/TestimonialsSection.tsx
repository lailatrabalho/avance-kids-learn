const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Juliana Santos",
      role: "Professora - Rio de Janeiro",
      avatar: "J",
      text: "Transformou completamente minhas aulas! As crianças ficam super engajadas e os pais elogiam o desenvolvimento em casa.",
      color: "bg-coral"
    },
    {
      name: "Carlos Oliveira", 
      role: "Pai - São Paulo",
      avatar: "C",
      text: "Meu filho de 4 anos adora as atividades! Em 2 meses já reconhece todas as letras e números até 20.",
      color: "bg-light-green"
    },
    {
      name: "Ana Maria",
      role: "Coordenadora - Minas Gerais", 
      avatar: "A",
      text: "Implementei em toda a escola. Material de qualidade excepcional com resultados comprovados!",
      color: "bg-purple"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50" id="depoimentos">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="fredoka text-4xl lg:text-5xl text-dark-blue mb-4">
            O QUE DIZEM OS PAIS E PROFESSORES
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold mr-4`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="fredoka text-lg text-dark-blue">{testimonial.name}</h4>
                  <p className="poppins text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="poppins text-gray-700 italic">
                "{testimonial.text}"
              </p>
              <div className="flex text-gold mt-4">⭐⭐⭐⭐⭐</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;