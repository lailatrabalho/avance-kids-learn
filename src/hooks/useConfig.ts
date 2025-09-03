import { useStoredState } from './useStoredState';

export interface ConfigData {
  // Configurações Gerais
  geral: {
    nomeEbook: string;
    subtitulo: string;
    faixaEtaria: string;
    whatsapp: string;
    emailSuporta: string;
  };
  
  // Hero Section
  hero: {
    titulo: string;
    subtitulo: string;
    descricao1: string;
    descricao2: string;
    botaoCta: string;
    imagemUrl: string;
  };
  
  // Benefícios
  beneficios: {
    titulo: string;
    subtitulo: string;
    beneficio1: {
      titulo: string;
      descricao: string;
    };
    beneficio2: {
      titulo: string;
      descricao: string;
    };
    beneficio3: {
      titulo: string;
      descricao: string;
    };
    beneficio4: {
      titulo: string;
      descricao: string;
    };
  };
  
  // Pacotes
  pacotes: {
    titulo: string;
    subtitulo: string;
    botaoCompra: string;
    middle: {
      nome: string;
      idade: string;
      atividades: string;
      descricao: string;
      preco: string;
    };
    rich: {
      nome: string;
      idade: string;
      atividades: string;
      descricao: string;
      preco: string;
    };
    super: {
      nome: string;
      idade: string;
      atividades: string;
      descricao: string;
      preco: string;
    };
    expert: {
      nome: string;
      idade: string;
      atividades: string;
      descricao: string;
      preco: string;
    };
  };
  
  // Depoimentos
  depoimentos: {
    titulo: string;
    depoimento1: {
      nome: string;
      cargo: string;
      texto: string;
      inicial: string;
    };
    depoimento2: {
      nome: string;
      cargo: string;
      texto: string;
      inicial: string;
    };
    depoimento3: {
      nome: string;
      cargo: string;
      texto: string;
      inicial: string;
    };
  };
  
  // Página de Obrigado
  obrigado: {
    titulo: string;
    subtitulo: string;
    descricao: string;
    videoTitulo: string;
    videoDescricao: string;
  };
  
  // Cores do Site
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
  // Configurações Gerais
  geral: {
    nomeEbook: 'E-BOOK AVANCE',
    subtitulo: 'EDUCAÇÃO INFANTIL',
    faixaEtaria: 'DE 3 A 8 ANOS',
    whatsapp: '5599999999999',
    emailSuporta: 'contato@avance.com'
  },
  
  // Hero Section
  hero: {
    titulo: 'E-BOOK AVANCE',
    subtitulo: 'EDUCAÇÃO INFANTIL',
    descricao1: 'Atividades prontas para imprimir que desenvolvem habilidades essenciais',
    descricao2: 'Métodos aprovados por pedagogos especializados em primeira infância',
    botaoCta: 'ADQUIRIR MATERIAL',
    imagemUrl: 'https://i.imgur.com/sMUelUm.png'
  },
  
  // Benefícios
  beneficios: {
    titulo: 'COM O AVANCE AS CRIANÇAS SE DESENVOLVEM',
    subtitulo: 'EM MÚLTIPLAS ÁREAS',
    beneficio1: {
      titulo: 'APRENDEM A PROGRAMAR',
      descricao: 'Desenvolvem habilidades de alfabetização de forma lúdica e divertida com jogos educativos'
    },
    beneficio2: {
      titulo: 'DESENVOLVEM LÓGICA E INTELIGÊNCIA',
      descricao: 'Atividades que estimulam o raciocínio lógico, criatividade e resolução de problemas'
    },
    beneficio3: {
      titulo: 'APRIMORAM O INGLÊS',
      descricao: 'Exercícios bilíngues que introduzem vocabulário em inglês de forma natural e divertida'
    },
    beneficio4: {
      titulo: 'MELHORAM A PERFORMANCE ESCOLAR',
      descricao: 'Preparam as crianças para os desafios acadêmicos com atividades progressivas e estruturadas'
    }
  },
  
  // Pacotes
  pacotes: {
    titulo: 'CONHEÇA TODOS OS PACOTES',
    subtitulo: 'INCLUSOS NO SEU KIT COMPLETO',
    botaoCompra: 'QUERO AVANÇAR',
    middle: {
      nome: 'PACOTE MIDDLE',
      idade: '3-4 ANOS',
      atividades: '8 ATIVIDADES',
      descricao: 'Atividades fundamentais de alfabetização inicial, reconhecimento de formas e cores básicas para desenvolvimento motor.',
      preco: '29.90'
    },
    rich: {
      nome: 'PACOTE RICH',
      idade: '4-5 ANOS',
      atividades: '12 ATIVIDADES',
      descricao: 'Exercícios de coordenação motora, primeiras palavras, números até 10 e atividades de associação e memória.',
      preco: '49.90'
    },
    super: {
      nome: 'PACOTE SUPER',
      idade: '5-6 ANOS',
      atividades: '16 ATIVIDADES',
      descricao: 'Leitura de palavras simples, operações matemáticas básicas, desenvolvimento da escrita e atividades de lógica.',
      preco: '69.90'
    },
    expert: {
      nome: 'PACOTE EXPERT',
      idade: '3-8 ANOS',
      atividades: '25 ATIVIDADES',
      descricao: 'Todos os pacotes reunidos! Kit completo com progressão total do desenvolvimento infantil de 3 a 8 anos.',
      preco: '89.90'
    }
  },
  
  // Depoimentos
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
  
  // Página de Obrigado
  obrigado: {
    titulo: 'PARABÉNS!',
    subtitulo: 'SUA COMPRA FOI REALIZADA',
    descricao: 'Você acaba de dar o primeiro passo para transformar o desenvolvimento da sua criança! Em instantes você receberá todo o material em seu e-mail.',
    videoTitulo: 'VEJA COMO USAR SEU E-BOOK AVANCE',
    videoDescricao: 'Assista ao vídeo completo e descubra como aproveitar ao máximo cada atividade'
  },
  
  // Cores do Site
  cores: {
    primaria: '#2E4DA7', // dark-blue
    secundaria: '#EA4C57', // coral
    dourado: '#FFC107', // gold
    verde: '#4CAF50', // green
    roxo: '#8B5CF6', // purple
    azul: '#3B82F6' // blue
  }
};

export function useConfig() {
  const [config, setConfig] = useStoredState('admin-config', defaultConfig);
  
  return { config, setConfig };
}