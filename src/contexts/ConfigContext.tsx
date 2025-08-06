import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BenefitItem {
  titulo: string;
  descricao: string;
}

interface PackageItem {
  nome: string;
  idade: string;
  atividades: string;
  descricao: string;
  preco: string;
}

interface TestimonialItem {
  nome: string;
  cargo: string;
  texto: string;
  inicial: string;
  imagem?: string;
}

interface ConfigData {
  geral: {
    nomeEbook: string;
    subtitulo: string;
    faixaEtaria: string;
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
    botaoCta: string;
    imagemUrl: string;
  };
  beneficios: {
    titulo: string;
    subtitulo: string;
    beneficio1: BenefitItem;
    beneficio2: BenefitItem;
    beneficio3: BenefitItem;
    beneficio4: BenefitItem;
  };
  pacotes: {
    titulo: string;
    subtitulo: string;
    middle: PackageItem;
    rich: PackageItem;
    super: PackageItem;
    expert: PackageItem;
    botaoCompra: string;
  };
  publicoAlvo: {
    titulo: string;
    textoIntroducao: string;
    card1: {
      titulo: string;
      descricao: string;
      detalhe: string;
    };
    card2: {
      titulo: string;
      descricao: string;
      detalhe: string;
    };
    card3: {
      titulo: string;
      descricao: string;
      detalhe: string;
    };
    card4: {
      titulo: string;
      descricao: string;
      detalhe: string;
    };
    ctaTexto: string;
    ctaSubtexto: string;
  };
  faq: {
    titulo: string;
    subtitulo: string;
    numeroWhatsApp: string;
    mensagemPadrao: string;
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
  depoimentos: {
    titulo: string;
    depoimento1: TestimonialItem;
    depoimento2: TestimonialItem;
    depoimento3: TestimonialItem;
  };
  obrigado: {
    titulo: string;
    subtitulo: string;
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
      pergunta1: { pergunta: string; resposta: string; };
      pergunta2: { pergunta: string; resposta: string; };
      pergunta3: { pergunta: string; resposta: string; };
      pergunta4: { pergunta: string; resposta: string; };
      pergunta5: { pergunta: string; resposta: string; };
    };
    compartilhamento: {
      titulo: string;
      texto: string;
    };
  };
  cores: {
    primaria: string;
    secundaria: string;
    dourado: string;
    verde: string;
    roxo: string;
    azul: string;
  };
}

const defaultConfig: ConfigData = {
  geral: {
    nomeEbook: 'E-BOOK AVANCE',
    subtitulo: 'EDUCAÇÃO INFANTIL',
    faixaEtaria: 'DE 3 A 8 ANOS',
    whatsapp: '5599999999999',
    emailSuporta: 'contato@avance.com'
  },
  navegacao: {
    logo: '🚀',
    nomeEmpresa: 'AVANCE'
  },
  hero: {
    titulo: 'E-BOOK AVANCE',
    subtitulo: 'OS NÍVEIS DE ALFABETIZAÇÃO',
    descricao1: 'Atividades prontas para imprimir que desenvolvem habilidades essenciais',
    descricao2: 'Métodos aprovados por pedagogos especializados em primeira infância',
    botaoCta: 'ADQUIRIR MATERIAL',
    imagemUrl: '/lovable-uploads/4a24f329-7319-4c8b-abac-61de42f6ab2b.png'
  },
  beneficios: {
    titulo: 'COM O AVANCE AS CRIANÇAS SE DESENVOLVEM',
    subtitulo: 'EM MÚLTIPLAS ÁREAS',
    beneficio1: {
      titulo: 'DESENVOLVEM ALFABETIZAÇÃO',
      descricao: 'Desenvolvem habilidades de alfabetização de forma lúdica e divertida com jogos educativos'
    },
    beneficio2: {
      titulo: 'DESENVOLVEM LÓGICA E INTELIGÊNCIA',
      descricao: 'Atividades que estimulam o raciocínio lógico, criatividade e resolução de problemas'
    },
    beneficio3: {
      titulo: 'APRIMORAM COORDENAÇÃO MOTORA',
      descricao: 'Exercícios que desenvolvem coordenação motora fina e grossa através de atividades práticas'
    },
    beneficio4: {
      titulo: 'MELHORAM A PERFORMANCE ESCOLAR',
      descricao: 'Preparam as crianças para os desafios acadêmicos com atividades progressivas e estruturadas'
    }
  },
  pacotes: {
    titulo: 'ESCOLHA O PACOTE IDEAL',
    subtitulo: 'PARA SUA CRIANÇA',
    middle: {
      nome: 'PACOTE MIDDLE',
      idade: '3-4 ANOS',
      atividades: '12 ATIVIDADES',
      descricao: 'Atividades fundamentais de alfabetização inicial, reconhecimento de formas e cores básicas para desenvolvimento motor.',
      preco: '29.90'
    },
    rich: {
      nome: 'PACOTE RICH',
      idade: '4-5 ANOS',
      atividades: '15 ATIVIDADES',
      descricao: 'Exercícios de coordenação motora, primeiras palavras, números até 10 e atividades de associação e memória.',
      preco: '49.90'
    },
    super: {
      nome: 'PACOTE SUPER',
      idade: '5-6 ANOS',
      atividades: '20 ATIVIDADES',
      descricao: 'Leitura de palavras simples, operações matemáticas básicas, desenvolvimento da escrita e atividades de lógica.',
      preco: '69.90'
    },
    expert: {
      nome: 'PACOTE EXPERT',
      idade: '3-8 ANOS',
      atividades: '25 ATIVIDADES',
      descricao: 'Todos os pacotes reunidos! Kit completo com progressão total do desenvolvimento infantil de 3 a 8 anos.',
      preco: '89.90'
    },
    botaoCompra: 'QUERO AVANÇAR'
  },
  publicoAlvo: {
    titulo: '🎯 PRA QUEM É ESSE MATERIAL?',
    textoIntroducao: 'O Tarefinhas AVANCE foi feito especialmente para professores da Educação Infantil e dos primeiros anos do Ensino Fundamental que:',
    card1: {
      titulo: 'Querem potencializar o aprendizado',
      descricao: 'das crianças com atividades divertidas, criativas e bem estruturadas.',
      detalhe: 'Desenvolvimento criativo'
    },
    card2: {
      titulo: 'Buscam um material pronto',
      descricao: 'que economiza tempo e facilita o planejamento das aulas.',
      detalhe: 'Planejamento facilitado'
    },
    card3: {
      titulo: 'Desejam ver suas turmas avançando',
      descricao: 'com confiança, de forma lúdica e consistente.',
      detalhe: 'Aprendizado lúdico'
    },
    card4: {
      titulo: 'Amam ensinar com propósito e afeto',
      descricao: 'respeitando o ritmo e o desenvolvimento de cada criança.',
      detalhe: 'Desenvolvimento individual'
    },
    ctaTexto: 'Se você se identifica com isso,',
    ctaSubtexto: 'esse material foi feito exatamente para você!'
  },
  faq: {
    titulo: 'AINDA TEM DÚVIDAS SOBRE O AVANCE?',
    subtitulo: 'Nossos consultores especializados em educação infantil estão prontos para esclarecer todas as suas questões e te ajudar a escolher o melhor pacote.',
    numeroWhatsApp: '559491334167',
    mensagemPadrao: 'Oi, quero mais informações sobre o E-BOOK AVANCE,'
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
    funcionalidade3: 'Entrega Imediata - Acesso instantâneo ao conteúdo'
  },
  depoimentos: {
    titulo: 'O QUE DIZEM OS PAIS E PROFESSORES',
    depoimento1: {
      nome: 'Juliana Santos',
      cargo: 'Professora - Rio de Janeiro',
      texto: 'Transformou completamente minhas aulas! As crianças ficam super engajadas e os pais elogiam o desenvolvimento em casa.',
      inicial: 'J'
    },
    depoimento2: {
      nome: 'Carlos Oliveira',
      cargo: 'Pai - São Paulo',
      texto: 'Meu filho de 4 anos adora as atividades! Em 2 meses já reconhece todas as letras e números até 20.',
      inicial: 'C'
    },
    depoimento3: {
      nome: 'Ana Maria',
      cargo: 'Coordenadora - Minas Gerais',
      texto: 'Implementei em toda a escola. Material de qualidade excepcional com resultados comprovados!',
      inicial: 'A'
    }
  },
  obrigado: {
    titulo: 'PARABÉNS!',
    subtitulo: 'SUA COMPRA FOI REALIZADA',
    descricao: 'Você acaba de dar o primeiro passo para transformar o desenvolvimento da sua criança! Em instantes você receberá todo o material em seu e-mail.',
    videoTitulo: 'VEJA COMO USAR SEU E-BOOK AVANCE',
    videoDescricao: 'Assista ao vídeo completo e descubra como aproveitar ao máximo cada atividade',
    videoUrl: '',
    videoWidth: 560,
    videoHeight: 315,
    proximosPassos: {
      titulo: 'PRÓXIMOS PASSOS:',
      passo1: '📧 Verifique seu e-mail (incluindo spam)',
      passo2: '📋 Imprima as atividades do seu pacote',
      passo3: '🎯 Comece a aplicar com suas crianças'
    },
    informacoesImportantes: {
      titulo: 'INFORMAÇÕES IMPORTANTES:',
      info1: '⏰ O material chegará em até 10 minutos',
      info2: '📱 Acesso vitalício ao conteúdo',
      info3: '🎯 Material para crianças de 3 a 8 anos'
    },
    faqCompleto: {
      titulo: 'PERGUNTAS FREQUENTES',
      pergunta1: {
        pergunta: 'Quanto tempo demora para receber o material?',
        resposta: 'O material é enviado automaticamente para seu e-mail em até 10 minutos após a confirmação do pagamento.'
      },
      pergunta2: {
        pergunta: 'O material é adequado para qual idade?',
        resposta: 'Nosso material é especialmente desenvolvido para crianças de 3 a 8 anos, com atividades progressivas para cada faixa etária.'
      },
      pergunta3: {
        pergunta: 'Posso imprimir quantas vezes quiser?',
        resposta: 'Sim! O material é seu e você pode imprimir quantas vezes precisar, para usar com várias crianças.'
      },
      pergunta4: {
        pergunta: 'Tem garantia?',
        resposta: 'Sim! Oferecemos 7 dias de garantia incondicional. Se não ficar satisfeito, devolvemos 100% do valor.'
      },
      pergunta5: {
        pergunta: 'Como posso entrar em contato?',
        resposta: 'Você pode entrar em contato pelo WhatsApp ou e-mail. Nosso suporte está sempre disponível para ajudar.'
      }
    },
    compartilhamento: {
      titulo: 'COMPARTILHE COM OUTROS EDUCADORES',
      texto: 'Acabei de adquirir o E-book AVANCE com atividades incríveis para crianças de 3 a 8 anos! 🚀📚 Material completo para desenvolver alfabetização, coordenação motora e muito mais. Super recomendo!'
    }
  },
  cores: {
    primaria: '#2E4DA7',
    secundaria: '#EA4C57',
    dourado: '#FFC107',
    verde: '#4CAF50',
    roxo: '#8B5CF6',
    azul: '#3B82F6'
  }
};

interface ConfigContextType {
  config: ConfigData;
  updateConfig: (section: keyof ConfigData, field: string, value: any) => void;
  updateNestedConfig: (section: keyof ConfigData, subsection: string, field: string, value: any) => void;
  exportConfig: () => void;
  importConfig: (configData: ConfigData) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

interface ConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<ConfigData>(defaultConfig);

  useEffect(() => {
    const savedConfig = localStorage.getItem('admin-config');
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (error) {
        console.error('Error loading config:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('admin-config', JSON.stringify(config));
  }, [config]);

  const updateConfig = (section: keyof ConfigData, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateNestedConfig = (section: keyof ConfigData, subsection: string, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...(prev[section] as any)[subsection],
          [field]: value
        }
      }
    }));
  };

  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'config-ebook-avance.json';
    link.click();
  };

  const importConfig = (configData: ConfigData) => {
    setConfig(configData);
  };

  return (
    <ConfigContext.Provider value={{
      config,
      updateConfig,
      updateNestedConfig,
      exportConfig,
      importConfig
    }}>
      {children}
    </ConfigContext.Provider>
  );
};