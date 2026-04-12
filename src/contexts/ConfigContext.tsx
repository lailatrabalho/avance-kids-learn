import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRealTimeConfig } from '@/hooks/useRealTimeConfig';
import { ConfigService } from '@/services/configService';
import { ImageService } from '@/services/imageService';

// Updated interfaces to match Supabase structure
export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PackageItem {
  id: string;
  nome: string;
  descricao: string;
  imagem?: string;
}

export interface TestimonialItem {
  id: string;
  nome: string;
  cargo: string;
  texto: string;
  imagem?: string;
  inicial: string;
  categoria: string;
  avaliacao: number;
}

// Transformed config structure for backward compatibility
export interface ConfigData {
  geral: {
    titulo: string;
    descricao: string;
    numeroWhatsApp: string;
    linkCompra: string;
    faixaEtaria: string;
    nomeEbook: string;
    subtitulo: string;
    whatsapp: string;
    emailSuporta: string;
  };
  navegacao: {
    logo: string;
    nomeEmpresa: string;
  };
  hero: {
    titulo: string;
    subtitulo: string;
    descricao1: string;
    descricao2: string;
    descricao3: string;
    imagemUrl?: string;
    botaoCta: string;
  };
  beneficios: {
    titulo: string;
    subtitulo: string;
    items: BenefitItem[];
    beneficio1: { titulo: string; descricao: string };
    beneficio2: { titulo: string; descricao: string };
    beneficio3: { titulo: string; descricao: string };
    beneficio4: { titulo: string; descricao: string };
    certificado: { titulo: string; descricao: string; item1: string; item2: string; item3: string; };
  };
  pacotes: {
    titulo: string;
    subtitulo: string;
    botaoCompra: string;
    items: PackageItem[];
    middle: { nome: string; idade: string; atividades: string; descricao: string; preco: string };
    rich: { nome: string; idade: string; atividades: string; descricao: string; preco: string };
    super: { nome: string; idade: string; atividades: string; descricao: string; preco: string };
    expert: { nome: string; idade: string; atividades: string; descricao: string; preco: string };
  };
  depoimentos: {
    titulo: string;
    depoimento1: TestimonialItem;
    depoimento2: TestimonialItem;
    depoimento3: TestimonialItem;
  };
  publicoAlvo: {
    titulo: string;
    textoIntroducao: string;
    ctaTexto: string;
    ctaSubtexto: string;
    card1: { titulo: string; descricao: string; detalhe: string };
    card2: { titulo: string; descricao: string; detalhe: string };
    card3: { titulo: string; descricao: string; detalhe: string };
    card4: { titulo: string; descricao: string; detalhe: string };
  };
  obrigado: {
    titulo: string;
    subtitulo: string;
    instrucoes: string;
    textoSuporte: string;
    descricao: string;
    videoTitulo: string;
    videoDescricao: string;
    videoUrl?: string;
    videoWidth?: number;
    videoHeight?: number;
    proximosPassos: {
      titulo: string;
      passo1: string;
      passo2: string;
      passo3: string;
    };
    informacoesImportantes: {
      titulo: string;
      info1: string;
      info2: string;
      info3: string;
    };
    faqCompleto: {
      titulo: string;
      pergunta1: { pergunta: string; resposta: string };
      pergunta2: { pergunta: string; resposta: string };
      pergunta3: { pergunta: string; resposta: string };
      pergunta4: { pergunta: string; resposta: string };
      pergunta5: { pergunta: string; resposta: string };
    };
    compartilhamento: {
      titulo: string;
      texto: string;
    };
  };
  garantia: {
    seloTexto1: string;
    seloTexto2: string;
    seloTexto3: string;
    card1Titulo: string;
    card1Descricao: string;
    card2Titulo: string;
    card2Descricao: string;
    funcionalidade1: string;
    funcionalidade2: string;
    funcionalidade3: string;
  };
  faq: {
    titulo: string;
    subtitulo: string;
    numeroWhatsApp: string;
    mensagemPadrao: string;
  };
  contato: {
    telefoneWhatsApp: string;
    mensagemWhatsApp: string;
    mensagemAtendimento: string;
  };
  cores: {
    primaria: string;
    secundaria: string;
    terciaria: string;
    fundo: string;
    texto: string;
  };
}

interface ConfigContextType {
  config: ConfigData;
  loading: boolean;
  error: string | null;
  updateConfig: (section: keyof ConfigData, field: string, value: any) => Promise<void>;
  updateNestedConfig: (section: keyof ConfigData, subsection: string, field: string, value: any) => Promise<void>;
  uploadImage: (file: File, path: string) => Promise<string | null>;
  exportConfig: () => void;
  importConfig: (configData: ConfigData) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// Default configuration for fallback
const defaultConfig: ConfigData = {
  geral: {
    titulo: 'AVANCE - E-book Educativo',
    descricao: 'E-book interativo para desenvolvimento infantil',
    numeroWhatsApp: '5511999999999',
    linkCompra: 'https://pay.hotmart.com/example',
    faixaEtaria: 'DE 3 A 8 ANOS',
    nomeEbook: 'E-book AVANCE',
    subtitulo: 'Material educativo para desenvolvimento infantil',
    whatsapp: '5511999999999',
    emailSuporta: 'suporte@avance.com.br',
  },
  navegacao: {
    logo: '🚀',
    nomeEmpresa: 'AVANCE',
  },
  hero: {
    titulo: 'E-BOOK AVANCE',
    subtitulo: 'AVANCE NA EDUCAÇÃO INFANTIL',
    descricao1: 'Estimule o desenvolvimento cognitivo e criativo da sua criança',
    descricao2: 'Com atividades lúdicas e educativas',
    descricao3: 'Desenvolvido por especialistas em educação',
    imagemUrl: 'https://i.imgur.com/sMUelUm.png',
    botaoCta: 'QUERO AVANÇAR AGORA!',
  },
  beneficios: {
    titulo: 'BENEFÍCIOS DO NOSSO E-BOOK',
    subtitulo: 'EDUCATIVO PARA CRIANÇAS',
    items: [
      { id: '1', title: 'Jogos Interativos', description: 'Atividades lúdicas que estimulam o aprendizado', icon: 'gamepad' },
      { id: '2', title: 'Desenvolvimento da Lógica', description: 'Exercícios que trabalham o raciocínio lógico', icon: 'brain' },
      { id: '3', title: 'Coordenação Motora', description: 'Atividades que desenvolvem habilidades motoras', icon: 'hand' },
      { id: '4', title: 'Leitura e Escrita', description: 'Estímulo ao desenvolvimento da alfabetização', icon: 'book' },
    ],
    beneficio1: { titulo: 'Jogos Pedagógicos Educativos', descricao: 'Atividades lúdicas e interativas que estimulam o aprendizado' },
    beneficio2: { titulo: 'Desenvolvem Lógica e Inteligência', descricao: 'Atividades que estimulam o raciocínio lógico e criatividade' },
    beneficio3: { titulo: 'Desenvolvem a Coordenação Motora', descricao: 'Atividades práticas que estimulam o desenvolvimento motor' },
    beneficio4: { titulo: 'Melhoram os Níveis de Leitura e Escrita', descricao: 'Atividades que desenvolvem habilidades de alfabetização' },
    certificado: { 
      titulo: 'CERTIFICADO<br />PERSONALIZADO', 
      descricao: '🎓 Reconhecimento oficial que motiva e valoriza o desenvolvimento de cada criança ao concluir as atividades propostas', 
      item1: 'Certificado Digital', 
      item2: 'Design Exclusivo', 
      item3: 'Nome da Criança' 
    },
  },
  pacotes: {
    titulo: 'ESCOLHA SEU PACOTE',
    subtitulo: 'Pacotes desenvolvidos para cada necessidade',
    botaoCompra: 'QUERO COMPRAR AGORA',
    items: [
      { id: '1', nome: 'MIDDLE', descricao: 'Pacote básico com atividades fundamentais' },
      { id: '2', nome: 'RICH', descricao: 'Pacote intermediário com conteúdo ampliado' },
      { id: '3', nome: 'SUPER', descricao: 'Pacote avançado com recursos extras' },
      { id: '4', nome: 'EXPERT', descricao: 'Pacote completo com todo o conteúdo' },
    ],
    middle: { nome: 'MIDDLE', idade: 'Pré-Silábico', atividades: '12 ATIVIDADES', descricao: 'Atividades fundamentais de alfabetização inicial', preco: '29.90' },
    rich: { nome: 'RICH', idade: 'Silábicos', atividades: '15 ATIVIDADES', descricao: 'Exercícios de coordenação motora e primeiras palavras', preco: '39.90' },
    super: { nome: 'SUPER', idade: 'Silábico Alfabético', atividades: '20 ATIVIDADES', descricao: 'Leitura de palavras simples e operações matemáticas básicas', preco: '49.90' },
    expert: { nome: 'EXPERT', idade: 'Alfabéticos Leitores Fluentes', atividades: '25 ATIVIDADES', descricao: 'Kit completo com progressão total do desenvolvimento infantil', preco: '59.90' },
  },
  depoimentos: {
    titulo: 'O QUE DIZEM OS PAIS E PROFESSORES',
    depoimento1: { id: '1', nome: 'Maria Silva', cargo: 'Mãe de 2 crianças', texto: 'Excelente material!', inicial: 'MS', categoria: 'Pais', avaliacao: 5 },
    depoimento2: { id: '2', nome: 'Prof. João Santos', cargo: 'Professor', texto: 'Material muito bem estruturado', inicial: 'JS', categoria: 'Professores', avaliacao: 5 },
    depoimento3: { id: '3', nome: 'Ana Costa', cargo: 'Psicopedagoga', texto: 'Recomendo para todos os pais', inicial: 'AC', categoria: 'Especialistas', avaliacao: 5 },
  },
  publicoAlvo: {
    titulo: 'Para quem é este E-book?',
    textoIntroducao: 'Desenvolvido especialmente para crianças em fase de desenvolvimento',
    ctaTexto: 'Garante já o seu E-book e transforme o aprendizado da sua criança!',
    ctaSubtexto: 'Acesso imediato + Suporte completo + Garantia de 7 dias 🚀',
    card1: { titulo: 'Pais Dedicados', descricao: 'Que buscam estimular o desenvolvimento dos filhos', detalhe: 'Atividades família-criança' },
    card2: { titulo: 'Professores', descricao: 'Que querem recursos educativos inovadores', detalhe: 'Material didático complementar' },
    card3: { titulo: 'Crianças 4-8 anos', descricao: 'Em fase de desenvolvimento cognitivo', detalhe: 'Atividades adequadas para cada faixa etária' },
    card4: { titulo: 'Terapeutas', descricao: 'Que trabalham com desenvolvimento infantil', detalhe: 'Exercícios terapêuticos especializados' },
  },
  obrigado: {
    titulo: 'Obrigado pela sua compra!',
    subtitulo: 'Seu e-book será enviado em instantes',
    instrucoes: 'Verifique seu e-mail (incluindo a pasta de spam)',
    textoSuporte: 'Precisa de ajuda? Entre em contato conosco',
    descricao: 'Seu material educativo chegará no seu e-mail em até 5 minutos. Enquanto isso, confira as instruções abaixo.',
    videoTitulo: 'COMO USAR SEU MATERIAL',
    videoDescricao: 'Assista este vídeo rápido e aprenda a aproveitar ao máximo seu e-book educativo.',
    videoUrl: '',
    videoWidth: 560,
    videoHeight: 315,
    proximosPassos: {
      titulo: 'PRÓXIMOS PASSOS',
      passo1: 'Verifique seu e-mail em até 5 minutos',
      passo2: 'Faça o download dos arquivos PDF',
      passo3: 'Comece a usar com sua criança',
    },
    informacoesImportantes: {
      titulo: 'INFORMAÇÕES IMPORTANTES',
      info1: 'Material em formato PDF de alta qualidade',
      info2: 'Impressões ilimitadas permitidas',
      info3: 'Suporte via WhatsApp disponível',
    },
    faqCompleto: {
      titulo: 'PERGUNTAS FREQUENTES',
      pergunta1: {
        pergunta: 'Não recebi o e-mail com o material',
        resposta: 'Verifique sua caixa de spam e aguarde até 5 minutos. Se não receber, entre em contato via WhatsApp.',
      },
      pergunta2: {
        pergunta: 'Posso imprimir quantas vezes quiser?',
        resposta: 'Sim! O material é 100% seu após a compra. Downloads e impressões ilimitadas.',
      },
      pergunta3: {
        pergunta: 'Como funciona a garantia de 7 dias?',
        resposta: 'Garantia total! 100% do seu dinheiro de volta se não ficar satisfeito por qualquer motivo.',
      },
      pergunta4: {
        pergunta: 'Preciso de conhecimento específico para usar?',
        resposta: 'Não! Foi criado especialmente para pais sem formação pedagógica.',
      },
      pergunta5: {
        pergunta: 'Quanto tempo leva para ver resultados?',
        resposta: 'Resultados rápidos! Na primeira semana já é possível ver maior interesse e concentração.',
      },
    },
    compartilhamento: {
      titulo: 'COMPARTILHE SEU SUCESSO',
      texto: 'Ajude outros pais compartilhando sua experiência com o e-book Avance!',
    },
  },
  garantia: {
    seloTexto1: 'GARANTIA',
    seloTexto2: '7 DIAS',
    seloTexto3: 'Satisfação TOTAL ou seu dinheiro de volta',
    card1Titulo: 'Garantia Incondicional de 7 Dias',
    card1Descricao: 'Estamos tão confiantes na qualidade do nosso material que oferecemos 7 dias de garantia incondicional. Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu investimento.',
    card2Titulo: 'Satisfação Total ou Seu Dinheiro de Volta',
    card2Descricao: 'Sem burocracia, sem perguntas. Reembolso em até 48 horas.',
    funcionalidade1: 'Compra Segura - Pagamento 100% protegido',
    funcionalidade2: 'Suporte 24h - Atendimento sempre disponível',
    funcionalidade3: 'Entrega Imediata - Acesso instantâneo ao conteúdo',
  },
  faq: {
    titulo: 'Ainda tem dúvidas?',
    subtitulo: 'Entre em contato conosco pelo WhatsApp e tire todas as suas dúvidas!',
    numeroWhatsApp: '5511999999999',
    mensagemPadrao: 'Olá! Gostaria de saber mais sobre o e-book educativo.',
  },
  contato: {
    telefoneWhatsApp: '5511999999999',
    mensagemWhatsApp: 'Olá! Gostaria de saber mais sobre o e-book educativo.',
    mensagemAtendimento: 'Olá, {nome}! Meu WhatsApp é {whatsapp}. Gostaria de mais informações sobre o e-book.',
  },
  cores: {
    primaria: '#3B82F6',
    secundaria: '#8B5CF6',
    terciaria: '#F59E0B',
    fundo: '#FFFFFF',
    texto: '#1F2937',
  },
};

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { config: supabaseConfig, refreshConfig } = useRealTimeConfig();
  const [config, setConfig] = useState<ConfigData>(defaultConfig);

  // Transform Supabase data to legacy format
  useEffect(() => {
    if (!supabaseConfig.loading) {
      const transformedConfig: ConfigData = {
        geral: {
          titulo: supabaseConfig.websiteConfig?.title || defaultConfig.geral.titulo,
          descricao: supabaseConfig.websiteConfig?.description || defaultConfig.geral.descricao,
          numeroWhatsApp: supabaseConfig.websiteConfig?.whatsapp_number || defaultConfig.geral.numeroWhatsApp,
          linkCompra: supabaseConfig.websiteConfig?.purchase_link || defaultConfig.geral.linkCompra,
          faixaEtaria: defaultConfig.geral.faixaEtaria,
          nomeEbook: defaultConfig.geral.nomeEbook,
          subtitulo: defaultConfig.geral.subtitulo,
          whatsapp: defaultConfig.geral.whatsapp,
          emailSuporta: defaultConfig.geral.emailSuporta,
        },
        navegacao: defaultConfig.navegacao,
        hero: {
          titulo: defaultConfig.hero.titulo,
          subtitulo: defaultConfig.hero.subtitulo,
          descricao1: supabaseConfig.heroSection?.description_1 || defaultConfig.hero.descricao1,
          descricao2: supabaseConfig.heroSection?.description_2 || defaultConfig.hero.descricao2,
          descricao3: supabaseConfig.heroSection?.description_3 || defaultConfig.hero.descricao3,
          imagemUrl: supabaseConfig.heroSection?.image_url || defaultConfig.hero.imagemUrl,
          botaoCta: defaultConfig.hero.botaoCta,
        },
        beneficios: {
          titulo: 'BENEFÍCIOS DO NOSSO E-BOOK',
          subtitulo: 'EDUCATIVO PARA CRIANÇAS',
          items: supabaseConfig.benefits?.map(b => ({
            id: b.id,
            title: b.title,
            description: b.description,
            icon: b.icon_name,
          })) || defaultConfig.beneficios.items,
          beneficio1: defaultConfig.beneficios.beneficio1,
          beneficio2: defaultConfig.beneficios.beneficio2,
          beneficio3: defaultConfig.beneficios.beneficio3,
          beneficio4: defaultConfig.beneficios.beneficio4,
          certificado: defaultConfig.beneficios.certificado,
        },
        pacotes: {
          titulo: 'ESCOLHA SEU PACOTE',
          subtitulo: 'Pacotes desenvolvidos para cada necessidade',
          botaoCompra: 'QUERO COMPRAR AGORA',
          items: supabaseConfig.packages?.map(p => ({
            id: p.id,
            nome: p.name,
            descricao: p.description,
            imagem: p.image_url || undefined,
          })) || defaultConfig.pacotes.items,
          middle: defaultConfig.pacotes.middle,
          rich: defaultConfig.pacotes.rich,
          super: defaultConfig.pacotes.super,
          expert: defaultConfig.pacotes.expert,
        },
        depoimentos: {
          titulo: 'O QUE DIZEM OS PAIS E PROFESSORES',
          depoimento1: (supabaseConfig.testimonials && supabaseConfig.testimonials[0]) ? {
            id: supabaseConfig.testimonials[0].id,
            nome: supabaseConfig.testimonials[0].name,
            cargo: supabaseConfig.testimonials[0].role,
            texto: supabaseConfig.testimonials[0].text,
            imagem: supabaseConfig.testimonials[0].image_url || undefined,
            inicial: supabaseConfig.testimonials[0].initials,
            categoria: supabaseConfig.testimonials[0].category,
            avaliacao: supabaseConfig.testimonials[0].rating,
          } : defaultConfig.depoimentos.depoimento1,
          depoimento2: (supabaseConfig.testimonials && supabaseConfig.testimonials[1]) ? {
            id: supabaseConfig.testimonials[1].id,
            nome: supabaseConfig.testimonials[1].name,
            cargo: supabaseConfig.testimonials[1].role,
            texto: supabaseConfig.testimonials[1].text,
            imagem: supabaseConfig.testimonials[1].image_url || undefined,
            inicial: supabaseConfig.testimonials[1].initials,
            categoria: supabaseConfig.testimonials[1].category,
            avaliacao: supabaseConfig.testimonials[1].rating,
          } : defaultConfig.depoimentos.depoimento2,
          depoimento3: (supabaseConfig.testimonials && supabaseConfig.testimonials[2]) ? {
            id: supabaseConfig.testimonials[2].id,
            nome: supabaseConfig.testimonials[2].name,
            cargo: supabaseConfig.testimonials[2].role,
            texto: supabaseConfig.testimonials[2].text,
            imagem: supabaseConfig.testimonials[2].image_url || undefined,
            inicial: supabaseConfig.testimonials[2].initials,
            categoria: supabaseConfig.testimonials[2].category,
            avaliacao: supabaseConfig.testimonials[2].rating,
          } : defaultConfig.depoimentos.depoimento3,
        },
        publicoAlvo: supabaseConfig.targetAudience ? {
          titulo: supabaseConfig.targetAudience.title,
          textoIntroducao: supabaseConfig.targetAudience.intro_text,
          ctaTexto: supabaseConfig.targetAudience.cta_text,
          ctaSubtexto: supabaseConfig.targetAudience.cta_subtext,
          card1: { titulo: supabaseConfig.targetAudience.card_1_title, descricao: supabaseConfig.targetAudience.card_1_description, detalhe: supabaseConfig.targetAudience.card_1_detail },
          card2: { titulo: supabaseConfig.targetAudience.card_2_title, descricao: supabaseConfig.targetAudience.card_2_description, detalhe: supabaseConfig.targetAudience.card_2_detail },
          card3: { titulo: supabaseConfig.targetAudience.card_3_title, descricao: supabaseConfig.targetAudience.card_3_description, detalhe: supabaseConfig.targetAudience.card_3_detail },
          card4: { titulo: supabaseConfig.targetAudience.card_4_title, descricao: supabaseConfig.targetAudience.card_4_description, detalhe: supabaseConfig.targetAudience.card_4_detail },
        } : defaultConfig.publicoAlvo,
        obrigado: {
          titulo: supabaseConfig.thankYouConfig?.title || defaultConfig.obrigado.titulo,
          subtitulo: supabaseConfig.thankYouConfig?.subtitle || defaultConfig.obrigado.subtitulo,
          instrucoes: supabaseConfig.thankYouConfig?.instructions || defaultConfig.obrigado.instrucoes,
          textoSuporte: supabaseConfig.thankYouConfig?.support_text || defaultConfig.obrigado.textoSuporte,
          descricao: defaultConfig.obrigado.descricao,
          videoTitulo: defaultConfig.obrigado.videoTitulo,
          videoDescricao: defaultConfig.obrigado.videoDescricao,
          videoUrl: defaultConfig.obrigado.videoUrl,
          videoWidth: defaultConfig.obrigado.videoWidth,
          videoHeight: defaultConfig.obrigado.videoHeight,
          proximosPassos: defaultConfig.obrigado.proximosPassos,
          informacoesImportantes: defaultConfig.obrigado.informacoesImportantes,
          faqCompleto: defaultConfig.obrigado.faqCompleto,
          compartilhamento: defaultConfig.obrigado.compartilhamento,
        },
        garantia: defaultConfig.garantia,
        faq: defaultConfig.faq,
        contato: defaultConfig.contato,
        cores: defaultConfig.cores,
      };

      setConfig(transformedConfig);
    } else {
      // Fallback to default config if Supabase data is not available
      setConfig(defaultConfig);
    }
  }, [supabaseConfig]);

  const updateConfig = async (section: keyof ConfigData, field: string, value: any) => {
    // Update local state immediately for UI responsiveness
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    // Update Supabase
    try {
      if (section === 'geral' && supabaseConfig.websiteConfig) {
        const fieldMap: { [key: string]: string } = {
          titulo: 'title',
          descricao: 'description',
          numeroWhatsApp: 'whatsapp_number',
          linkCompra: 'purchase_link',
        };
        await ConfigService.updateWebsiteConfig({
          id: supabaseConfig.websiteConfig.id,
          [fieldMap[field]]: value,
        });
      } else if (section === 'hero' && supabaseConfig.heroSection) {
        const fieldMap: { [key: string]: string } = {
          titulo: 'title',
          subtitulo: 'subtitle',
          descricao1: 'description_1',
          descricao2: 'description_2',
          descricao3: 'description_3',
          imagemUrl: 'image_url',
        };
        await ConfigService.updateHeroSection({
          id: supabaseConfig.heroSection.id,
          [fieldMap[field]]: value,
        });
      } else {
        // For sections not yet integrated with Supabase, just update local state
        console.log(`Section '${section}' updated locally only. Supabase integration pending.`);
      }
    } catch (error) {
      console.error('Error updating config:', error);
    }
  };

  const updateNestedConfig = async (section: keyof ConfigData, subsection: string, field: string, value: any) => {
    // Update local state immediately
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value,
        },
      },
    }));

    // Update Supabase based on section and subsection
    try {
      if (section === 'depoimentos') {
        const testimonialIndex = parseInt(subsection.replace('depoimento', '')) - 1;
        const testimonial = supabaseConfig.testimonials[testimonialIndex];
        if (testimonial) {
          const fieldMap: { [key: string]: string } = {
            nome: 'name',
            cargo: 'role',
            texto: 'text',
            imagem: 'image_url',
            inicial: 'initials',
            categoria: 'category',
            avaliacao: 'rating',
          };
          await ConfigService.updateTestimonial(testimonial.id, {
            [fieldMap[field]]: value,
          });
        }
      } else if (section === 'publicoAlvo' && supabaseConfig.targetAudience) {
        const fieldMap: { [key: string]: string } = {
          titulo: 'title',
          descricao: 'description',
          detalhe: 'detail',
        };
        const cardNum = subsection.replace('card', '');
        await ConfigService.updateTargetAudience({
          id: supabaseConfig.targetAudience.id,
          [`card_${cardNum}_${fieldMap[field]}`]: value,
        });
      }
    } catch (error) {
      console.error('Error updating nested config:', error);
    }
  };

  const uploadImage = async (file: File, path: string): Promise<string | null> => {
    return await ImageService.uploadImage(file, path);
  };

  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'config-siteavance.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importConfig = (configData: ConfigData) => {
    setConfig(configData);
    // Note: Full import functionality would need to update all Supabase tables
    console.log('Import functionality needs full implementation');
  };

  const value: ConfigContextType = {
    config,
    loading: supabaseConfig.loading,
    error: supabaseConfig.error,
    updateConfig,
    updateNestedConfig,
    uploadImage,
    exportConfig,
    importConfig,
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};