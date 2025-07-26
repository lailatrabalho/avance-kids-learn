import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import PackagesSection from "@/components/PackagesSection";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

// Nova sessão: Pra quem é este material
const TargetAudienceSection = () => (
  <section className="py-20 px-6 bg-white">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-16">
        <h2 className="fredoka text-4xl lg:text-5xl text-blue-900 mb-8 leading-tight">
          🎯 PRA QUEM É ESSE MATERIAL?
        </h2>
        {/* Card com informação introdutória */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto mb-12 card-hover">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
              👩‍🏫
            </div>
          </div>
          <p className="poppins text-gray-700 text-lg leading-relaxed">
            O <strong className="text-blue-900">Tarefinhas AVANCE</strong> foi feito especialmente para
            <strong className="text-purple-600"> professores da Educação Infantil</strong> e dos
            <strong className="text-blue-600"> primeiros anos do Ensino Fundamental</strong> que:
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover h-full">
          <div className="gradient-card-1 p-6 text-white h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-2 fredoka">🧠 Potencialização</div>
                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs fredoka">APRENDIZADO</div>
              </div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🧠</span>
              </div>
            </div>
            <h3 className="fredoka text-lg sm:text-xl mb-3">Querem potencializar o aprendizado</h3>
            <p className="poppins text-xs sm:text-sm leading-relaxed text-white/90 flex-grow">das crianças com atividades divertidas, criativas e bem estruturadas.</p>
            <div className="mt-4 flex items-center">
              <span className="poppins text-sm">Desenvolvimento criativo</span>
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover h-full">
          <div className="gradient-card-2 p-6 text-white h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-2 fredoka">📚 Material Pronto</div>
                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs fredoka">ECONOMIA DE TEMPO</div>
              </div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📚</span>
              </div>
            </div>
            <h3 className="fredoka text-lg sm:text-xl mb-3">Buscam um material pronto</h3>
            <p className="poppins text-xs sm:text-sm leading-relaxed text-white/90 flex-grow">que economiza tempo e facilita o planejamento das aulas.</p>
            <div className="mt-4 flex items-center">
              <span className="poppins text-sm">Planejamento facilitado</span>
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover h-full">
          <div className="gradient-card-3 p-6 text-white h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-2 fredoka">👩‍🏫 Progresso</div>
                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs fredoka">TURMAS AVANÇANDO</div>
              </div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👩‍🏫</span>
              </div>
            </div>
            <h3 className="fredoka text-lg sm:text-xl mb-3">Desejam ver suas turmas avançando</h3>
            <p className="poppins text-xs sm:text-sm leading-relaxed text-white/90 flex-grow">com confiança, de forma lúdica e consistente.</p>
            <div className="mt-4 flex items-center">
              <span className="poppins text-sm">Aprendizado lúdico</span>
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover h-full">
          <div className="gradient-card-4 p-6 text-white h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs mb-2 fredoka">❤️ Ensino com Afeto</div>
                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs fredoka">PROPÓSITO</div>
              </div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">❤️</span>
              </div>
            </div>
            <h3 className="fredoka text-lg sm:text-xl mb-3">Amam ensinar com propósito e afeto</h3>
            <p className="poppins text-xs sm:text-sm leading-relaxed text-white/90 flex-grow">respeitando o ritmo e o desenvolvimento de cada criança.</p>
            <div className="mt-4 flex items-center">
              <span className="poppins text-sm">Desenvolvimento individual</span>
              <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Call to Action Final */}
      <div className="text-center mt-12">
        <div className="gradient-gold p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto border-4 border-white relative overflow-hidden">
          {/* Confetes decorativos */}
          <div className="absolute top-2 left-4 text-white/40 text-2xl animate-bounce">🌟</div>
          <div className="absolute top-4 right-6 text-white/40 text-xl animate-bounce" style={{ animationDelay: '0.5s' }}>✨</div>
          <div className="absolute bottom-3 left-8 text-white/40 text-lg animate-bounce" style={{ animationDelay: '1s' }}>🎯</div>
          <div className="absolute bottom-2 right-4 text-white/40 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>🚀</div>
          <div className="relative z-10">
            <h3 className="fredoka text-2xl md:text-3xl text-white mb-4 drop-shadow-lg">
              Se você se identifica com isso,<br />
              <span className="text-blue-900">esse material foi feito exatamente para você!</span>
            </h3>
            <div className="flex justify-center">
              <div className="text-5xl bounce-slow">🚀</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Index = () => {
  // Add smooth scroll behavior and navigation effects
  useEffect(() => {
    // Add scroll effect to navigation
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 100) {
          nav.classList.add('shadow-lg');
        } else {
          nav.classList.remove('shadow-lg');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <BenefitsSection />
      <PackagesSection />
      <TargetAudienceSection />
      <FAQSection />
      <TestimonialsSection />
      <GuaranteeSection />
      <Footer />
    </div>
  );
};

export default Index;
