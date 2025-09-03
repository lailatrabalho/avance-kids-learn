# Design Document - Sistema E-book Avance

## Arquitetura Geral

### Visão Arquitetural
O sistema E-book Avance é uma Single Page Application (SPA) construída em React com TypeScript, focada em conversão de vendas e facilidade de gestão de conteúdo.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Visitante     │    │  Comprador      │    │ Administrador   │
│   (Público)     │    │  (Pós-compra)   │    │  (Autenticado)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Página Inicial │    │ Página Obrigado │    │ Painel Admin    │
│     (Index)     │    │   (ThankYou)    │    │  (Protected)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Stack Tecnológico

**Frontend:**
- React 18 com TypeScript
- Tailwind CSS para estilização
- Lucide React para ícones
- React Router para navegação

**Gerenciamento de Estado:**
- Context API para configurações globais
- localStorage para persistência de dados
- useState/useEffect para estado local

**Autenticação:**
- Context personalizado (AuthContext)
- Sessão baseada em localStorage
- Proteção de rotas com HOC

## Componentes e Interfaces

### Estrutura de Componentes

```
src/
├── components/
│   ├── ui/                    # Componentes base (shadcn/ui)
│   ├── LoginModal.tsx         # Modal de autenticação
│   ├── ProtectedAdminPanel.tsx # Wrapper de proteção
│   └── TestimonialsSection.tsx # Seção de depoimentos
├── contexts/
│   ├── AuthContext.tsx        # Gerenciamento de autenticação
│   └── ConfigContext.tsx      # Gerenciamento de configurações
├── pages/
│   ├── Index.tsx             # Página principal de vendas
│   ├── ThankYou.tsx          # Página pós-compra
│   ├── AdminPanel.tsx        # Painel administrativo
│   └── NotFound.tsx          # Página 404
└── App.tsx                   # Roteamento principal
```

### Interfaces de Dados

```typescript
interface Config {
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
    beneficio1: BeneficioItem;
    beneficio2: BeneficioItem;
    beneficio3: BeneficioItem;
    beneficio4: BeneficioItem;
  };
  pacotes: {
    titulo: string;
    subtitulo: string;
    middle: PacoteItem;
    rich: PacoteItem;
    super: PacoteItem;
    expert: PacoteItem;
    botaoCompra: string;
  };
  depoimentos: {
    titulo: string;
    depoimento1: DepoimentoItem;
    depoimento2: DepoimentoItem;
    depoimento3: DepoimentoItem;
  };
  obrigado: {
    titulo: string;
    subtitulo: string;
    descricao: string;
    videoTitulo: string;
    videoDescricao: string;
    videoUrl?: string;
    videoLargura?: string;
    videoProporcao?: string;
    // Seção de aprendizagem
    aprendizagemTitulo: string;
    aprendizagemSubtitulo: string;
    aprendizagemCard1Titulo: string;
    aprendizagemCard1Descricao: string;
    // ... outros cards
    dicaEspecialTitulo: string;
    dicaEspecialTexto: string;
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
```

## Fluxo de Dados

### 1. Configurações Globais
```
ConfigContext → localStorage ↔ AdminPanel
     ↓
  Páginas Públicas (Index, ThankYou)
```

### 2. Autenticação
```
LoginModal → AuthContext → localStorage
     ↓
ProtectedAdminPanel → AdminPanel
```

### 3. Upload de Arquivos
```
AdminPanel → handleImageUpload/handleVideoUpload
     ↓
Simulação de Upload → ConfigContext → Páginas
```

## Design de Interface

### Paleta de Cores
- **Primária:** Azul (#2E4DA7) - Confiança e profissionalismo
- **Secundária:** Coral (#EA4C57) - Energia e ação
- **Dourado:** (#FFC107) - Premium e valor
- **Verde:** (#4CAF50) - Sucesso e aprovação
- **Roxo:** (#8B5CF6) - Criatividade e educação
- **Gradientes:** Combinações suaves para elementos de destaque

### Tipografia
- **Títulos:** Font Fredoka (amigável, educativa)
- **Corpo:** Font Poppins (legível, moderna)
- **Hierarquia:** h1 (3xl-6xl), h2 (2xl-5xl), h3 (xl-2xl), body (sm-lg)

### Layout Responsivo
```
Mobile First Approach:
- Base: 320px+
- SM: 640px+ (tablets)
- MD: 768px+ (desktop pequeno)
- LG: 1024px+ (desktop)
- XL: 1280px+ (desktop grande)
```

### Componentes de UI

**Botões:**
- Primário: Gradiente azul-roxo com hover effects
- Secundário: Outline com hover fill
- CTA: Gradiente coral-vermelho com animações

**Cards:**
- Fundo branco com sombras sutis
- Bordas arredondadas (rounded-xl/2xl)
- Hover effects com transform scale

**Modais:**
- Backdrop blur com overlay escuro
- Animações de entrada/saída
- Foco automático e navegação por teclado

## Tratamento de Erros

### Estratégias de Error Handling

**Upload de Arquivos:**
```typescript
try {
  const result = await uploadFile(file);
  updateConfig(section, field, result);
  showSuccessMessage();
} catch (error) {
  showErrorMessage('Erro no upload');
  resetUploadState();
}
```

**Autenticação:**
```typescript
const login = async (email, password) => {
  try {
    if (validateCredentials(email, password)) {
      setUser(userData);
      return true;
    }
    throw new Error('Credenciais inválidas');
  } catch (error) {
    showErrorMessage(error.message);
    return false;
  }
};
```

**Fallbacks:**
- Valores padrão para configurações ausentes
- Imagens placeholder para uploads falhados
- Estados de loading para operações assíncronas

## Estratégia de Testes

### Testes Unitários
- Componentes isolados com React Testing Library
- Funções utilitárias e helpers
- Contextos e hooks customizados

### Testes de Integração
- Fluxos completos de usuário
- Interação entre componentes
- Persistência de dados

### Testes E2E (Futuros)
- Jornada completa do visitante
- Fluxo de administração
- Responsividade em diferentes dispositivos

## Performance e Otimização

### Estratégias Implementadas

**Code Splitting:**
- Lazy loading de páginas
- Componentes sob demanda

**Otimização de Imagens:**
- Compressão automática
- Formatos modernos (WebP quando possível)
- Loading lazy para imagens below-the-fold

**Caching:**
- localStorage para configurações
- Sessão de usuário persistente
- Cache de componentes com React.memo

**Bundle Optimization:**
- Tree shaking automático
- Minificação de CSS/JS
- Remoção de código morto

## Segurança

### Medidas Implementadas

**Autenticação:**
- Validação de credenciais no frontend
- Sessão com timeout implícito
- Logout seguro com limpeza de dados

**Upload de Arquivos:**
- Validação de tipo de arquivo
- Limite de tamanho (5MB imagens, 100MB vídeos)
- Sanitização de nomes de arquivo

**Proteção de Rotas:**
- HOC para proteção de páginas administrativas
- Redirecionamento automático para login
- Verificação de sessão em cada acesso

### Considerações Futuras
- Implementação de JWT tokens
- Rate limiting para uploads
- Criptografia de dados sensíveis
- Auditoria de ações administrativas

---

*Este documento de design serve como guia técnico para manutenção e evolução do sistema E-book Avance.*