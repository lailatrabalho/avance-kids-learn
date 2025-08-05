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
}

interface ConfigData {
  geral: {
    nomeEbook: string;
    subtitulo: string;
    faixaEtaria: string;
    whatsapp: string;
    emailSuporta: string;
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
    videoDescricao: 'Assista ao vídeo completo e descubra como aproveitar ao máximo cada atividade'
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