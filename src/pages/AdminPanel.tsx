import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useConfig } from "@/contexts/ConfigContext";
import { useToast } from "@/hooks/use-toast";
import { Share2, Download, Copy, MessageCircle, Facebook, Twitter, ExternalLink } from "lucide-react";
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('geral');
  const [uploadingImages, setUploadingImages] = useState<Record<string, boolean>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement>>({});
  const {
    config,
    updateConfig,
    updateNestedConfig,
    exportConfig,
    importConfig
  } = useConfig();
  const {
    toast
  } = useToast();
  const handleImportConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const importedConfig = JSON.parse(e.target?.result as string);
          importConfig(importedConfig);
          toast({
            title: "Sucesso!",
            description: "Configurações importadas com sucesso!"
          });
        } catch (error) {
          toast({
            title: "Erro",
            description: "Erro ao importar configurações. Verifique o arquivo.",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    }
  };
  const uploadImage = async (file: File, fieldKey: string): Promise<string | null> => {
    setUploadingImages(prev => ({
      ...prev,
      [fieldKey]: true
    }));
    try {
      // Simular upload da imagem (aqui você implementaria o upload real)
      const formData = new FormData();
      formData.append('image', file);

      // Para demonstração, vamos criar um URL temporário
      const imageUrl = URL.createObjectURL(file);

      // Simular delay de upload
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Retornar um ID fictício baseado no nome do arquivo
      const fakeId = file.name.replace(/\.[^/.]+$/, "") + "_" + Date.now();
      setUploadingImages(prev => ({
        ...prev,
        [fieldKey]: false
      }));
      return fakeId;
    } catch (error) {
      setUploadingImages(prev => ({
        ...prev,
        [fieldKey]: false
      }));
      toast({
        title: "Erro",
        description: "Erro ao fazer upload da imagem",
        variant: "destructive"
      });
      return null;
    }
  };
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, section: string, field: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erro",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive"
      });
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erro",
        description: "A imagem deve ter no máximo 5MB.",
        variant: "destructive"
      });
      return;
    }
    const fieldKey = `${section}_${field}`;
    const newImageId = await uploadImage(file, fieldKey);
    if (newImageId) {
      updateConfig(section as any, field, newImageId);
    }
  };

  // Generate shareable link for the main page
  const generateShareableLink = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/`;
  };

  // Share to social media platforms
  const shareToSocial = (platform: string, url: string) => {
    const encodedUrl = encodeURIComponent(url);
    const text = encodeURIComponent(`Confira este e-book incrível: ${config.geral.nomeEbook}`);
    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Copy link to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Sucesso!",
        description: "Link copiado para a área de transferência!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao copiar link. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  // Generate markdown content from config
  const generateMarkdownContent = (configData: any) => {
    return `# Configurações do E-book - ${configData.geral.nomeEbook}

## 📋 Informações Gerais
- **Nome do E-book:** ${configData.geral.nomeEbook}
- **Subtítulo:** ${configData.geral.subtitulo}
- **Faixa Etária:** ${configData.geral.faixaEtaria}
- **WhatsApp:** ${configData.geral.whatsapp}
- **E-mail de Suporte:** ${configData.geral.emailSuporta}

## 🧭 Navegação
- **Logo:** ${configData.navegacao.logo}
- **Nome da Empresa:** ${configData.navegacao.nomeEmpresa}

## 🚀 Seção Principal (Hero)
### Título: ${configData.hero.titulo}
### Subtítulo: ${configData.hero.subtitulo}
### Descrições:
- ${configData.hero.descricao1}
- ${configData.hero.descricao2}
### Botão CTA: ${configData.hero.botaoCta}
### Imagem: ${configData.hero.imagemUrl}

## ✨ Seção de Benefícios
### Título: ${configData.beneficios.titulo}
### Subtítulo: ${configData.beneficios.subtitulo}

#### Benefício 1
- **Título:** ${configData.beneficios.beneficio1.titulo}
- **Descrição:** ${configData.beneficios.beneficio1.descricao}

#### Benefício 2
- **Título:** ${configData.beneficios.beneficio2.titulo}
- **Descrição:** ${configData.beneficios.beneficio2.descricao}

#### Benefício 3
- **Título:** ${configData.beneficios.beneficio3.titulo}
- **Descrição:** ${configData.beneficios.beneficio3.descricao}

#### Benefício 4
- **Título:** ${configData.beneficios.beneficio4.titulo}
- **Descrição:** ${configData.beneficios.beneficio4.descricao}

## 📦 Pacotes
### Título: ${configData.pacotes.titulo}
### Subtítulo: ${configData.pacotes.subtitulo}
### Botão de Compra: ${configData.pacotes.botaoCompra}

#### Pacote Middle
- **Nome:** ${configData.pacotes.middle.nome}
- **Idade:** ${configData.pacotes.middle.idade}
- **Atividades:** ${configData.pacotes.middle.atividades}
- **Descrição:** ${configData.pacotes.middle.descricao}
- **Preço:** R$ ${configData.pacotes.middle.preco}

#### Pacote Rich
- **Nome:** ${configData.pacotes.rich.nome}
- **Idade:** ${configData.pacotes.rich.idade}
- **Atividades:** ${configData.pacotes.rich.atividades}
- **Descrição:** ${configData.pacotes.rich.descricao}
- **Preço:** R$ ${configData.pacotes.rich.preco}

#### Pacote Super
- **Nome:** ${configData.pacotes.super.nome}
- **Idade:** ${configData.pacotes.super.idade}
- **Atividades:** ${configData.pacotes.super.atividades}
- **Descrição:** ${configData.pacotes.super.descricao}
- **Preço:** R$ ${configData.pacotes.super.preco}

#### Pacote Expert
- **Nome:** ${configData.pacotes.expert.nome}
- **Idade:** ${configData.pacotes.expert.idade}
- **Atividades:** ${configData.pacotes.expert.atividades}
- **Descrição:** ${configData.pacotes.expert.descricao}
- **Preço:** R$ ${configData.pacotes.expert.preco}

## 🎯 Público Alvo
### Título: ${configData.publicoAlvo.titulo}
### Introdução: ${configData.publicoAlvo.textoIntroducao}
### CTA: ${configData.publicoAlvo.ctaTexto}
### CTA Subtexto: ${configData.publicoAlvo.ctaSubtexto}

#### Cards do Público Alvo
1. **${configData.publicoAlvo.card1.titulo}**
   - Descrição: ${configData.publicoAlvo.card1.descricao}
   - Detalhe: ${configData.publicoAlvo.card1.detalhe}

2. **${configData.publicoAlvo.card2.titulo}**
   - Descrição: ${configData.publicoAlvo.card2.descricao}
   - Detalhe: ${configData.publicoAlvo.card2.detalhe}

3. **${configData.publicoAlvo.card3.titulo}**
   - Descrição: ${configData.publicoAlvo.card3.descricao}
   - Detalhe: ${configData.publicoAlvo.card3.detalhe}

4. **${configData.publicoAlvo.card4.titulo}**
   - Descrição: ${configData.publicoAlvo.card4.descricao}
   - Detalhe: ${configData.publicoAlvo.card4.detalhe}

## 💬 Depoimentos
### Título: ${configData.depoimentos.titulo}

#### Depoimento 1
- **Nome:** ${configData.depoimentos.depoimento1.nome}
- **Cargo:** ${configData.depoimentos.depoimento1.cargo}
- **Inicial:** ${configData.depoimentos.depoimento1.inicial}
- **Texto:** ${configData.depoimentos.depoimento1.texto}

#### Depoimento 2
- **Nome:** ${configData.depoimentos.depoimento2.nome}
- **Cargo:** ${configData.depoimentos.depoimento2.cargo}
- **Inicial:** ${configData.depoimentos.depoimento2.inicial}
- **Texto:** ${configData.depoimentos.depoimento2.texto}

#### Depoimento 3
- **Nome:** ${configData.depoimentos.depoimento3.nome}
- **Cargo:** ${configData.depoimentos.depoimento3.cargo}
- **Inicial:** ${configData.depoimentos.depoimento3.inicial}
- **Texto:** ${configData.depoimentos.depoimento3.texto}

## ❓ FAQ
### Título: ${configData.faq.titulo}
### Subtítulo: ${configData.faq.subtitulo}
### WhatsApp: ${configData.faq.numeroWhatsApp}
### Mensagem Padrão: ${configData.faq.mensagemPadrao}

## 🛡️ Garantia
### Selo de Garantia
- **Texto 1:** ${configData.garantia.seloTexto1}
- **Texto 2:** ${configData.garantia.seloTexto2}
- **Texto 3:** ${configData.garantia.seloTexto3}

### Cards de Garantia
#### Card 1 - Garantia Incondicional
- **Título:** ${configData.garantia.card1Titulo}
- **Descrição:** ${configData.garantia.card1Descricao}

#### Card 2 - Dinheiro de Volta
- **Título:** ${configData.garantia.card2Titulo}
- **Descrição:** ${configData.garantia.card2Descricao}

### Funcionalidades
- **Funcionalidade 1:** ${configData.garantia.funcionalidade1}
- **Funcionalidade 2:** ${configData.garantia.funcionalidade2}
- **Funcionalidade 3:** ${configData.garantia.funcionalidade3}

## 🎉 Página de Obrigado
### Informações Principais
- **Título:** ${configData.obrigado.titulo}
- **Subtítulo:** ${configData.obrigado.subtitulo}
- **Descrição:** ${configData.obrigado.descricao}

### Vídeo
- **Título do Vídeo:** ${configData.obrigado.videoTitulo}
- **Descrição do Vídeo:** ${configData.obrigado.videoDescricao}

### Próximos Passos
- **Título:** ${configData.obrigado.proximosPassos.titulo}
- **Passo 1:** ${configData.obrigado.proximosPassos.passo1}
- **Passo 2:** ${configData.obrigado.proximosPassos.passo2}
- **Passo 3:** ${configData.obrigado.proximosPassos.passo3}

### Informações Importantes
- **Título:** ${configData.obrigado.informacoesImportantes.titulo}
- **Info 1:** ${configData.obrigado.informacoesImportantes.info1}
- **Info 2:** ${configData.obrigado.informacoesImportantes.info2}
- **Info 3:** ${configData.obrigado.informacoesImportantes.info3}

### FAQ Completo
#### ${configData.obrigado.faqCompleto.titulo}

1. **${configData.obrigado.faqCompleto.pergunta1.pergunta}**
   - ${configData.obrigado.faqCompleto.pergunta1.resposta}

2. **${configData.obrigado.faqCompleto.pergunta2.pergunta}**
   - ${configData.obrigado.faqCompleto.pergunta2.resposta}

3. **${configData.obrigado.faqCompleto.pergunta3.pergunta}**
   - ${configData.obrigado.faqCompleto.pergunta3.resposta}

4. **${configData.obrigado.faqCompleto.pergunta4.pergunta}**
   - ${configData.obrigado.faqCompleto.pergunta4.resposta}

5. **${configData.obrigado.faqCompleto.pergunta5.pergunta}**
   - ${configData.obrigado.faqCompleto.pergunta5.resposta}

### Compartilhamento
- **Título:** ${configData.obrigado.compartilhamento.titulo}
- **Texto:** ${configData.obrigado.compartilhamento.texto}

---
*Documento gerado automaticamente pelo Painel Admin - ${new Date().toLocaleDateString('pt-BR')}*`;
  };

  // Export configuration as PDF with markdown formatting
  const exportToPDFMarkdown = async () => {
    try {
      const markdownContent = generateMarkdownContent(config);

      // Create a new jsPDF instance
      const pdf = new jsPDF();

      // Set font
      pdf.setFont("helvetica");

      // Add title
      pdf.setFontSize(20);
      pdf.setTextColor(40, 40, 40);
      pdf.text(`Configurações - ${config.geral.nomeEbook}`, 20, 30);

      // Add generation date
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 20, 40);

      // Split markdown content into lines and add to PDF
      const lines = markdownContent.split('\n');
      let yPosition = 60;
      const pageHeight = pdf.internal.pageSize.height;
      const margin = 20;
      const lineHeight = 6;
      lines.forEach((line, index) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 30;
        }

        // Format different types of markdown
        if (line.startsWith('# ')) {
          pdf.setFontSize(16);
          pdf.setTextColor(0, 100, 200);
          pdf.text(line.substring(2), margin, yPosition);
          yPosition += lineHeight + 2;
        } else if (line.startsWith('## ')) {
          pdf.setFontSize(14);
          pdf.setTextColor(50, 50, 50);
          pdf.text(line.substring(3), margin, yPosition);
          yPosition += lineHeight + 1;
        } else if (line.startsWith('### ')) {
          pdf.setFontSize(12);
          pdf.setTextColor(70, 70, 70);
          pdf.text(line.substring(4), margin, yPosition);
          yPosition += lineHeight;
        } else if (line.startsWith('#### ')) {
          pdf.setFontSize(11);
          pdf.setTextColor(90, 90, 90);
          pdf.text(line.substring(5), margin + 5, yPosition);
          yPosition += lineHeight;
        } else if (line.startsWith('- ')) {
          pdf.setFontSize(10);
          pdf.setTextColor(40, 40, 40);
          pdf.text(line, margin + 10, yPosition);
          yPosition += lineHeight;
        } else if (line.trim() !== '') {
          pdf.setFontSize(10);
          pdf.setTextColor(40, 40, 40);

          // Split long lines
          const maxWidth = 170;
          const splitLines = pdf.splitTextToSize(line, maxWidth);
          splitLines.forEach((splitLine: string) => {
            if (yPosition > pageHeight - 30) {
              pdf.addPage();
              yPosition = 30;
            }
            pdf.text(splitLine, margin + 5, yPosition);
            yPosition += lineHeight;
          });
        } else {
          yPosition += 3; // Empty line spacing
        }
      });

      // Save the PDF
      const fileName = `${config.geral.nomeEbook.replace(/[^a-zA-Z0-9]/g, '_')}_configuracoes_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      toast({
        title: "Sucesso!",
        description: "PDF gerado e baixado com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao gerar PDF. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  // Share modal component
  const ShareModal = () => {
    const shareUrl = generateShareableLink();
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    React.useEffect(() => {
      // Generate QR code
      QRCode.toDataURL(shareUrl, {
        width: 200
      }).then(url => setQrCodeUrl(url)).catch(err => console.error(err));
    }, [shareUrl]);
    return <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Compartilhar Página Principal</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* URL Display and Copy */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link da página principal:
            </label>
            <div className="flex items-center space-x-2">
              <Input value={shareUrl} readOnly className="flex-1" />
              <Button onClick={() => copyToClipboard(shareUrl)} size="sm" variant="outline">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Compartilhar em:
            </label>
            <div className="grid grid-cols-3 gap-3">
              <Button onClick={() => shareToSocial('whatsapp', shareUrl)} className="bg-green-500 hover:bg-green-600 text-white" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button onClick={() => shareToSocial('facebook', shareUrl)} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              <Button onClick={() => shareToSocial('twitter', shareUrl)} className="bg-black hover:bg-gray-800 text-white" size="sm">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
            </div>
          </div>

          {/* QR Code */}
          {qrCodeUrl && <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium text-gray-700">
                QR Code:
              </label>
              <img src={qrCodeUrl} alt="QR Code" className="border rounded-lg" />
            </div>}

          {/* Preview Link */}
          <div className="pt-4 border-t">
            <Button onClick={() => window.open(shareUrl, '_blank')} variant="outline" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visualizar página principal
            </Button>
          </div>
        </div>
      </DialogContent>;
  };
  const renderGeral = () => <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
          <span className="text-3xl">⚙️</span>
          <span>Configurações Gerais</span>
        </h3>
        <p className="text-gray-700">Configure as informações básicas do seu e-book e dados de contato.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center space-x-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Nome do E-book</span>
          </label>
          <Input type="text" value={config.geral.nomeEbook} onChange={e => updateConfig('geral', 'nomeEbook', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" placeholder="Digite o nome do seu e-book..." />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">Subtítulo</label>
          <Input type="text" value={config.geral.subtitulo} onChange={e => updateConfig('geral', 'subtitulo', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">Faixa Etária</label>
          <Input type="text" value={config.geral.faixaEtaria} onChange={e => updateConfig('geral', 'faixaEtaria', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">WhatsApp (com código do país)</label>
          <Input type="text" value={config.geral.whatsapp} onChange={e => updateConfig('geral', 'whatsapp', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" placeholder="5599999999999" />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-800 mb-3">E-mail de Suporte</label>
          <Input type="email" value={config.geral.emailSuporta} onChange={e => updateConfig('geral', 'emailSuporta', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" />
        </div>
      </div>
    </div>;
  const renderHero = () => <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">🚀 Seção Principal (Hero)</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</label>
          <Input type="text" value={config.hero.titulo} onChange={e => updateConfig('hero', 'titulo', e.target.value)} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
          <Input type="text" value={config.hero.subtitulo} onChange={e => updateConfig('hero', 'subtitulo', e.target.value)} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descrição 1</label>
          <textarea value={config.hero.descricao1} onChange={e => updateConfig('hero', 'descricao1', e.target.value)} className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring" rows={3} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descrição 2</label>
          <textarea value={config.hero.descricao2} onChange={e => updateConfig('hero', 'descricao2', e.target.value)} className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring" rows={3} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Texto do Botão</label>
          <Input type="text" value={config.hero.botaoCta} onChange={e => updateConfig('hero', 'botaoCta', e.target.value)} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Imagem Principal</label>
          <div className="space-y-3">
            <Input type="text" value={config.hero.imagemUrl} onChange={e => updateConfig('hero', 'imagemUrl', e.target.value)} placeholder="ID da imagem ou URL" />
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">ou</span>
              <label className={`flex-1 cursor-pointer ${uploadingImages['hero_imagemUrl'] ? 'opacity-50' : ''}`}>
                <div className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors bg-blue-50 hover:bg-blue-100">
                  {uploadingImages['hero_imagemUrl'] ? <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm text-blue-600">Enviando...</span>
                    </div> : <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <span className="text-sm text-blue-600 font-medium">Fazer upload da imagem</span>
                    </div>}
                </div>
                <input type="file" accept="image/*" onChange={e => handleImageUpload(e, 'hero', 'imagemUrl')} className="hidden" disabled={uploadingImages['hero_imagemUrl']} />
              </label>
            </div>
            {config.hero.imagemUrl && <div className="mt-2">
                <img src={config.hero.imagemUrl.startsWith('http') ? config.hero.imagemUrl : `keys/${config.hero.imagemUrl}`} alt="Preview" className="w-32 h-32 object-cover rounded-lg border shadow-sm" onError={e => {
              (e.target as HTMLImageElement).style.display = 'none';
            }} />
              </div>}
          </div>
        </div>
      </div>
    </div>;
  const renderBeneficios = () => <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">✨ Seção de Benefícios</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Título da Seção</label>
          <Input type="text" value={config.beneficios.titulo} onChange={e => updateConfig('beneficios', 'titulo', e.target.value)} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo da Seção</label>
          <Input type="text" value={config.beneficios.subtitulo} onChange={e => updateConfig('beneficios', 'subtitulo', e.target.value)} />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {(['beneficio1', 'beneficio2', 'beneficio3', 'beneficio4'] as const).map((key, index) => <div key={key} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-3">Benefício {index + 1}</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <Input type="text" value={config.beneficios[key].titulo} onChange={e => updateNestedConfig('beneficios', key, 'titulo', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea value={config.beneficios[key].descricao} onChange={e => updateNestedConfig('beneficios', key, 'descricao', e.target.value)} className="w-full p-2 border border-input rounded focus:ring-2 focus:ring-ring" rows={3} />
              </div>
            </div>
          </div>)}
      </div>
    </div>;
  const renderPacotes = () => <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">📦 Pacotes do E-book</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Título da Seção</label>
          <Input type="text" value={config.pacotes.titulo} onChange={e => updateConfig('pacotes', 'titulo', e.target.value)} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo da Seção</label>
          <Input type="text" value={config.pacotes.subtitulo} onChange={e => updateConfig('pacotes', 'subtitulo', e.target.value)} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Texto do Botão de Compra</label>
          <Input type="text" value={config.pacotes.botaoCompra} onChange={e => updateConfig('pacotes', 'botaoCompra', e.target.value)} />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {(['middle', 'rich', 'super', 'expert'] as const).map(key => <div key={key} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-3 capitalize">{key} Package</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Pacote</label>
                <Input type="text" value={config.pacotes[key].nome} onChange={e => updateNestedConfig('pacotes', key, 'nome', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Faixa Etária</label>
                <Input type="text" value={config.pacotes[key].idade} onChange={e => updateNestedConfig('pacotes', key, 'idade', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade de Atividades</label>
                <Input type="text" value={config.pacotes[key].atividades} onChange={e => updateNestedConfig('pacotes', key, 'atividades', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea value={config.pacotes[key].descricao} onChange={e => updateNestedConfig('pacotes', key, 'descricao', e.target.value)} className="w-full p-2 border border-input rounded focus:ring-2 focus:ring-ring" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço (sem R$)</label>
                <Input type="text" value={config.pacotes[key].preco} onChange={e => updateNestedConfig('pacotes', key, 'preco', e.target.value)} placeholder="29.90" />
              </div>
            </div>
          </div>)}
      </div>
    </div>;

  const renderNavegacao = () => <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
          <span className="text-3xl">🧭</span>
          <span>Navegação</span>
        </h3>
        <p className="text-gray-700">Configure o logo e nome da empresa na navegação.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">Logo/Emoji</label>
          <Input type="text" value={config.navegacao.logo} onChange={e => updateConfig('navegacao', 'logo', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" placeholder="🚀" />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">Nome da Empresa</label>
          <Input type="text" value={config.navegacao.nomeEmpresa} onChange={e => updateConfig('navegacao', 'nomeEmpresa', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" placeholder="AVANCE" />
        </div>
      </div>
    </div>;
  const renderPublicoAlvo = () => <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
          <span className="text-3xl">🎯</span>
          <span>Público Alvo</span>
        </h3>
        <p className="text-gray-700">Configure a seção "Pra quem é este material?"</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">Título da Seção</label>
          <Input type="text" value={config.publicoAlvo.titulo} onChange={e => updateConfig('publicoAlvo', 'titulo', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">Texto de Introdução</label>
          <textarea value={config.publicoAlvo.textoIntroducao} onChange={e => updateConfig('publicoAlvo', 'textoIntroducao', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" rows={3} />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">Call to Action - Texto</label>
          <Input type="text" value={config.publicoAlvo.ctaTexto} onChange={e => updateConfig('publicoAlvo', 'ctaTexto', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">Call to Action - Subtexto</label>
          <Input type="text" value={config.publicoAlvo.ctaSubtexto} onChange={e => updateConfig('publicoAlvo', 'ctaSubtexto', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {(['card1', 'card2', 'card3', 'card4'] as const).map((key, index) => <div key={key} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h4 className="font-bold text-lg mb-4 text-gray-800">Card {index + 1}</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Título</label>
                <Input type="text" value={config.publicoAlvo[key].titulo} onChange={e => updateNestedConfig('publicoAlvo', key, 'titulo', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Descrição</label>
                <textarea value={config.publicoAlvo[key].descricao} onChange={e => updateNestedConfig('publicoAlvo', key, 'descricao', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Detalhe</label>
                <Input type="text" value={config.publicoAlvo[key].detalhe} onChange={e => updateNestedConfig('publicoAlvo', key, 'detalhe', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
              </div>
            </div>
          </div>)}
      </div>
    </div>;
  const renderFAQ = () => <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
          <span className="text-3xl">❓</span>
          <span>FAQ / Dúvidas</span>
        </h3>
        <p className="text-gray-700">Configure a seção de dúvidas e atendimento.</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">Título da Seção</label>
          <Input type="text" value={config.faq.titulo} onChange={e => updateConfig('faq', 'titulo', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">Subtítulo</label>
          <textarea value={config.faq.subtitulo} onChange={e => updateConfig('faq', 'subtitulo', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" rows={3} />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">Número do WhatsApp</label>
          <Input type="text" value={config.faq.numeroWhatsApp} onChange={e => updateConfig('faq', 'numeroWhatsApp', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" placeholder="559491334167" />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-3">Mensagem Padrão do WhatsApp</label>
          <Input type="text" value={config.faq.mensagemPadrao} onChange={e => updateConfig('faq', 'mensagemPadrao', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" />
        </div>
      </div>
    </div>;
  const renderGarantia = () => <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
          <span className="text-3xl">🛡️</span>
          <span>Garantia</span>
        </h3>
        <p className="text-gray-700">Configure todos os textos da seção de garantia.</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h4 className="font-bold text-lg mb-4 text-gray-800">Selo de Garantia</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Texto 1 (GARANTIA)</label>
              <Input type="text" value={config.garantia.seloTexto1} onChange={e => updateConfig('garantia', 'seloTexto1', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Texto 2 (7 DIAS)</label>
              <Input type="text" value={config.garantia.seloTexto2} onChange={e => updateConfig('garantia', 'seloTexto2', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Texto 3 (Satisfação)</label>
              <Input type="text" value={config.garantia.seloTexto3} onChange={e => updateConfig('garantia', 'seloTexto3', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h4 className="font-bold text-lg mb-4 text-gray-800">Card 1 - Garantia Incondicional</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Título</label>
                <Input type="text" value={config.garantia.card1Titulo} onChange={e => updateConfig('garantia', 'card1Titulo', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Descrição</label>
                <textarea value={config.garantia.card1Descricao} onChange={e => updateConfig('garantia', 'card1Descricao', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" rows={4} />
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-bold text-lg mb-4 text-gray-800">Card 2 - Dinheiro de Volta</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Título</label>
                <Input type="text" value={config.garantia.card2Titulo} onChange={e => updateConfig('garantia', 'card2Titulo', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Descrição</label>
                <textarea value={config.garantia.card2Descricao} onChange={e => updateConfig('garantia', 'card2Descricao', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" rows={4} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
          <h4 className="font-bold text-lg mb-4 text-gray-800">Funcionalidades</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Funcionalidade 1</label>
              <Input type="text" value={config.garantia.funcionalidade1} onChange={e => updateConfig('garantia', 'funcionalidade1', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Funcionalidade 2</label>
              <Input type="text" value={config.garantia.funcionalidade2} onChange={e => updateConfig('garantia', 'funcionalidade2', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Funcionalidade 3</label>
              <Input type="text" value={config.garantia.funcionalidade3} onChange={e => updateConfig('garantia', 'funcionalidade3', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
            </div>
          </div>
        </div>
      </div>
    </div>;



  // Função específica para upload de imagens dos depoimentos
  const handleDepoimentoImageUpload = (file: File, depoimentoKey: 'depoimento1' | 'depoimento2' | 'depoimento3') => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        updateNestedConfig('depoimentos', depoimentoKey, 'imagem', base64String);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo de imagem válido.",
        variant: "destructive",
      });
    }
  };

  // Função para upload de vídeo
  const handleVideoUpload = (file: File) => {
    if (file && file.type.startsWith('video/')) {
      // Validar tamanho (máximo 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "Erro",
          description: "O vídeo deve ter no máximo 50MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        updateConfig('obrigado', 'videoUrl', base64String);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo de vídeo válido.",
        variant: "destructive",
      });
    }
  };



  const renderDepoimentos = () => <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
          <span className="text-3xl">💬</span>
          <span>Depoimentos</span>
        </h3>
        <p className="text-gray-700">Configure os depoimentos dos clientes, incluindo suas imagens.</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h4 className="font-bold text-lg mb-4 text-gray-800">Título da Seção</h4>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Título</label>
            <Input type="text" value={config.depoimentos.titulo} onChange={e => updateConfig('depoimentos', 'titulo', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" />
          </div>
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          {/* Depoimento 1 */}
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-bold text-lg mb-4 text-gray-800">Depoimento 1</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Nome</label>
                  <Input type="text" value={config.depoimentos.depoimento1.nome} onChange={e => updateNestedConfig('depoimentos', 'depoimento1', 'nome', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Cargo</label>
                  <Input type="text" value={config.depoimentos.depoimento1.cargo} onChange={e => updateNestedConfig('depoimentos', 'depoimento1', 'cargo', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Inicial (fallback)</label>
                  <Input type="text" maxLength={1} value={config.depoimentos.depoimento1.inicial} onChange={e => updateNestedConfig('depoimentos', 'depoimento1', 'inicial', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">URL da Imagem</label>
                  <Input type="url" value={config.depoimentos.depoimento1.imagem || ''} onChange={e => updateNestedConfig('depoimentos', 'depoimento1', 'imagem', e.target.value)} placeholder="https://exemplo.com/imagem.jpg" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Ou fazer upload da imagem</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleDepoimentoImageUpload(file, 'depoimento1');
                      }}
                      className="hidden"
                      id="upload-depoimento1"
                    />
                    <label
                      htmlFor="upload-depoimento1"
                      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span>Escolher arquivo</span>
                    </label>
                    {config.depoimentos.depoimento1.imagem && (
                      <button
                        onClick={() => updateNestedConfig('depoimentos', 'depoimento1', 'imagem', '')}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Preview da Imagem</label>
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
                    {config.depoimentos.depoimento1.imagem ? (
                      <img src={config.depoimentos.depoimento1.imagem} alt={config.depoimentos.depoimento1.nome} className="w-full h-full object-cover" onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }} />
                    ) : null}
                    <div className={`w-full h-full flex items-center justify-center text-gray-500 font-bold text-lg ${config.depoimentos.depoimento1.imagem ? 'hidden' : 'flex'}`}>
                      {config.depoimentos.depoimento1.inicial}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Texto do Depoimento</label>
              <textarea value={config.depoimentos.depoimento1.texto} onChange={e => updateNestedConfig('depoimentos', 'depoimento1', 'texto', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" rows={3} />
            </div>
          </div>

          {/* Depoimento 2 */}
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h4 className="font-bold text-lg mb-4 text-gray-800">Depoimento 2</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Nome</label>
                  <Input type="text" value={config.depoimentos.depoimento2.nome} onChange={e => updateNestedConfig('depoimentos', 'depoimento2', 'nome', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Cargo</label>
                  <Input type="text" value={config.depoimentos.depoimento2.cargo} onChange={e => updateNestedConfig('depoimentos', 'depoimento2', 'cargo', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Inicial (fallback)</label>
                  <Input type="text" maxLength={1} value={config.depoimentos.depoimento2.inicial} onChange={e => updateNestedConfig('depoimentos', 'depoimento2', 'inicial', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">URL da Imagem</label>
                  <Input type="url" value={config.depoimentos.depoimento2.imagem || ''} onChange={e => updateNestedConfig('depoimentos', 'depoimento2', 'imagem', e.target.value)} placeholder="https://exemplo.com/imagem.jpg" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Ou fazer upload da imagem</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleDepoimentoImageUpload(file, 'depoimento2');
                      }}
                      className="hidden"
                      id="upload-depoimento2"
                    />
                    <label
                      htmlFor="upload-depoimento2"
                      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span>Escolher arquivo</span>
                    </label>
                    {config.depoimentos.depoimento2.imagem && (
                      <button
                        onClick={() => updateNestedConfig('depoimentos', 'depoimento2', 'imagem', '')}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Preview da Imagem</label>
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
                    {config.depoimentos.depoimento2.imagem ? (
                      <img src={config.depoimentos.depoimento2.imagem} alt={config.depoimentos.depoimento2.nome} className="w-full h-full object-cover" onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }} />
                    ) : null}
                    <div className={`w-full h-full flex items-center justify-center text-gray-500 font-bold text-lg ${config.depoimentos.depoimento2.imagem ? 'hidden' : 'flex'}`}>
                      {config.depoimentos.depoimento2.inicial}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Texto do Depoimento</label>
              <textarea value={config.depoimentos.depoimento2.texto} onChange={e => updateNestedConfig('depoimentos', 'depoimento2', 'texto', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" rows={3} />
            </div>
          </div>

          {/* Depoimento 3 */}
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h4 className="font-bold text-lg mb-4 text-gray-800">Depoimento 3</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Nome</label>
                  <Input type="text" value={config.depoimentos.depoimento3.nome} onChange={e => updateNestedConfig('depoimentos', 'depoimento3', 'nome', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Cargo</label>
                  <Input type="text" value={config.depoimentos.depoimento3.cargo} onChange={e => updateNestedConfig('depoimentos', 'depoimento3', 'cargo', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Inicial (fallback)</label>
                  <Input type="text" maxLength={1} value={config.depoimentos.depoimento3.inicial} onChange={e => updateNestedConfig('depoimentos', 'depoimento3', 'inicial', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">URL da Imagem</label>
                  <Input type="url" value={config.depoimentos.depoimento3.imagem || ''} onChange={e => updateNestedConfig('depoimentos', 'depoimento3', 'imagem', e.target.value)} placeholder="https://exemplo.com/imagem.jpg" className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Ou fazer upload da imagem</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleDepoimentoImageUpload(file, 'depoimento3');
                      }}
                      className="hidden"
                      id="upload-depoimento3"
                    />
                    <label
                      htmlFor="upload-depoimento3"
                      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span>Escolher arquivo</span>
                    </label>
                    {config.depoimentos.depoimento3.imagem && (
                      <button
                        onClick={() => updateNestedConfig('depoimentos', 'depoimento3', 'imagem', '')}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Preview da Imagem</label>
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
                    {config.depoimentos.depoimento3.imagem ? (
                      <img src={config.depoimentos.depoimento3.imagem} alt={config.depoimentos.depoimento3.nome} className="w-full h-full object-cover" onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }} />
                    ) : null}
                    <div className={`w-full h-full flex items-center justify-center text-gray-500 font-bold text-lg ${config.depoimentos.depoimento3.imagem ? 'hidden' : 'flex'}`}>
                      {config.depoimentos.depoimento3.inicial}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-bold text-gray-800 mb-2">Texto do Depoimento</label>
              <textarea value={config.depoimentos.depoimento3.texto} onChange={e => updateNestedConfig('depoimentos', 'depoimento3', 'texto', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" rows={3} />
            </div>
          </div>
        </div>
      </div>
    </div>;

  const renderObrigado = () => <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
          <span className="text-3xl">🎉</span>
          <span>Página de Obrigado</span>
        </h3>
        <p className="text-gray-700">Configure todos os elementos da página de agradecimento.</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h4 className="font-bold text-lg mb-4 text-gray-800">Informações Principais</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Título Principal</label>
              <Input type="text" value={config.obrigado.titulo} onChange={e => updateConfig('obrigado', 'titulo', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Subtítulo</label>
              <Input type="text" value={config.obrigado.subtitulo} onChange={e => updateConfig('obrigado', 'subtitulo', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Descrição</label>
              <textarea value={config.obrigado.descricao} onChange={e => updateConfig('obrigado', 'descricao', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-800" rows={3} />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
          <h4 className="font-bold text-lg mb-4 text-gray-800">Seção de Vídeo</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Título do Vídeo</label>
              <Input type="text" value={config.obrigado.videoTitulo} onChange={e => updateConfig('obrigado', 'videoTitulo', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Descrição do Vídeo</label>
              <textarea value={config.obrigado.videoDescricao} onChange={e => updateConfig('obrigado', 'videoDescricao', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" rows={2} />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">URL do Vídeo</label>
              <Input 
                type="url" 
                value={config.obrigado.videoUrl || ''} 
                onChange={e => updateConfig('obrigado', 'videoUrl', e.target.value)} 
                placeholder="https://youtube.com/embed/... ou URL direta do vídeo" 
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Ou fazer upload do vídeo</label>
              <div className="flex items-center space-x-3">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleVideoUpload(file);
                  }}
                  className="hidden"
                  id="upload-video"
                />
                <label
                  htmlFor="upload-video"
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 shadow-lg border-2 border-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Escolher vídeo</span>
                </label>
                {config.obrigado.videoUrl && (
                  <button
                    onClick={() => updateConfig('obrigado', 'videoUrl', '')}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Remover
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Máximo 50MB. Formatos suportados: MP4, WebM, AVI, MOV</p>
            </div>

            {/* Ajuste de tamanho do vídeo */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className="font-bold text-md mb-3 text-gray-800">Ajustar Tamanho do Player</h5>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Largura (px)</label>
                  <Input 
                    type="number" 
                    value={config.obrigado.videoWidth || 560} 
                    onChange={e => updateConfig('obrigado', 'videoWidth', parseInt(e.target.value) || 560)} 
                    min="200"
                    max="1200"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Altura (px)</label>
                  <Input 
                    type="number" 
                    value={config.obrigado.videoHeight || 315} 
                    onChange={e => updateConfig('obrigado', 'videoHeight', parseInt(e.target.value) || 315)} 
                    min="150"
                    max="800"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" 
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center space-x-2">
                <button
                  onClick={() => {
                    updateConfig('obrigado', 'videoWidth', 560);
                    updateConfig('obrigado', 'videoHeight', 315);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                >
                  16:9 (560x315)
                </button>
                <button
                  onClick={() => {
                    updateConfig('obrigado', 'videoWidth', 640);
                    updateConfig('obrigado', 'videoHeight', 480);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                >
                  4:3 (640x480)
                </button>
                <button
                  onClick={() => {
                    updateConfig('obrigado', 'videoWidth', 800);
                    updateConfig('obrigado', 'videoHeight', 450);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                >
                  Grande (800x450)
                </button>
              </div>
            </div>

            {/* Preview do vídeo */}
            {config.obrigado.videoUrl && (
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h5 className="font-bold text-md mb-3 text-gray-800">Preview do Vídeo</h5>
                <div className="flex justify-center">
                  {config.obrigado.videoUrl.includes('youtube.com') || config.obrigado.videoUrl.includes('youtu.be') ? (
                    <iframe
                      width={config.obrigado.videoWidth || 560}
                      height={config.obrigado.videoHeight || 315}
                      src={config.obrigado.videoUrl}
                      title="Video Preview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg shadow-lg"
                    ></iframe>
                  ) : (
                    <video
                      width={config.obrigado.videoWidth || 560}
                      height={config.obrigado.videoHeight || 315}
                      controls
                      className="rounded-lg shadow-lg"
                    >
                      <source src={config.obrigado.videoUrl} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Tamanho: {config.obrigado.videoWidth || 560}x{config.obrigado.videoHeight || 315}px
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-bold text-lg mb-4 text-gray-800">Próximos Passos</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Título</label>
                <Input type="text" value={config.obrigado.proximosPassos.titulo} onChange={e => updateNestedConfig('obrigado', 'proximosPassos', 'titulo', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Passo 1</label>
                <Input type="text" value={config.obrigado.proximosPassos.passo1} onChange={e => updateNestedConfig('obrigado', 'proximosPassos', 'passo1', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Passo 2</label>
                <Input type="text" value={config.obrigado.proximosPassos.passo2} onChange={e => updateNestedConfig('obrigado', 'proximosPassos', 'passo2', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Passo 3</label>
                <Input type="text" value={config.obrigado.proximosPassos.passo3} onChange={e => updateNestedConfig('obrigado', 'proximosPassos', 'passo3', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h4 className="font-bold text-lg mb-4 text-gray-800">Informações Importantes</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Título</label>
                <Input type="text" value={config.obrigado.informacoesImportantes.titulo} onChange={e => updateNestedConfig('obrigado', 'informacoesImportantes', 'titulo', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Info 1</label>
                <Input type="text" value={config.obrigado.informacoesImportantes.info1} onChange={e => updateNestedConfig('obrigado', 'informacoesImportantes', 'info1', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Info 2</label>
                <Input type="text" value={config.obrigado.informacoesImportantes.info2} onChange={e => updateNestedConfig('obrigado', 'informacoesImportantes', 'info2', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Info 3</label>
                <Input type="text" value={config.obrigado.informacoesImportantes.info3} onChange={e => updateNestedConfig('obrigado', 'informacoesImportantes', 'info3', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
          <h4 className="font-bold text-lg mb-4 text-gray-800">FAQ Completo</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Título do FAQ</label>
              <Input type="text" value={config.obrigado.faqCompleto.titulo} onChange={e => updateNestedConfig('obrigado', 'faqCompleto', 'titulo', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
            </div>
            
            {['pergunta1', 'pergunta2', 'pergunta3', 'pergunta4', 'pergunta5'].map((key, index) => <div key={key} className="bg-white p-4 rounded-lg border border-gray-200">
                <h5 className="font-bold text-md mb-3 text-gray-800">Pergunta {index + 1}</h5>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1">Pergunta</label>
                    <Input type="text" value={(config.obrigado.faqCompleto as any)[key].pergunta} onChange={e => {
                  const updated = {
                    ...(config.obrigado.faqCompleto as any)[key],
                    pergunta: e.target.value
                  };
                  updateNestedConfig('obrigado', 'faqCompleto', key, updated);
                }} className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-1">Resposta</label>
                    <textarea value={(config.obrigado.faqCompleto as any)[key].resposta} onChange={e => {
                  const updated = {
                    ...(config.obrigado.faqCompleto as any)[key],
                    resposta: e.target.value
                  };
                  updateNestedConfig('obrigado', 'faqCompleto', key, updated);
                }} className="w-full p-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" rows={2} />
                  </div>
                </div>
              </div>)}
          </div>
        </div>

        <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
          <h4 className="font-bold text-lg mb-4 text-gray-800">Compartilhamento</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Título</label>
              <Input type="text" value={config.obrigado.compartilhamento.titulo} onChange={e => updateNestedConfig('obrigado', 'compartilhamento', 'titulo', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Texto para Compartilhar</label>
              <textarea value={config.obrigado.compartilhamento.texto} onChange={e => updateNestedConfig('obrigado', 'compartilhamento', 'texto', e.target.value)} className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800" rows={3} />
            </div>
          </div>
        </div>
      </div>
    </div>;
  const tabs = [{
    id: 'geral',
    label: '⚙️ Geral',
    component: renderGeral
  }, {
    id: 'navegacao',
    label: '🧭 Navegação',
    component: renderNavegacao
  }, {
    id: 'hero',
    label: '🚀 Hero',
    component: renderHero
  }, {
    id: 'beneficios',
    label: '✨ Benefícios',
    component: renderBeneficios
  }, {
    id: 'pacotes',
    label: '📦 Pacotes',
    component: renderPacotes
  }, {
    id: 'publico-alvo',
    label: '🎯 Público Alvo',
    component: renderPublicoAlvo
  }, {
    id: 'faq',
    label: '❓ FAQ',
    component: renderFAQ
  }, {
    id: 'garantia',
    label: '🛡️ Garantia',
    component: renderGarantia
  }, {
    id: 'depoimentos',
    label: '💬 Depoimentos',
    component: renderDepoimentos
  }, {
    id: 'obrigado',
    label: '🎉 Obrigado',
    component: renderObrigado
  }];
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-6 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                🚀
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  Painel Admin - E-book Avance
                </h1>
                <p className="text-gray-600 font-medium text-sm lg:text-base">Gerencie todo o conteúdo das páginas com facilidade</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {/* Share Page Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 text-sm lg:text-base font-semibold">
                    <Share2 className="w-4 h-4" />
                    <span>Compartilhar</span>
                  </Button>
                </DialogTrigger>
                <ShareModal />
              </Dialog>
              
              <label className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 lg:px-4 py-2 lg:py-3 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 text-sm lg:text-base">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4"></path>
                </svg>
                <span className="font-semibold">Importar</span>
                <input type="file" accept=".json" onChange={handleImportConfig} className="hidden" />
              </label>
              
              <Button onClick={exportConfig} className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 text-sm lg:text-base">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span className="font-semibold hidden sm:inline">Exportar JSON</span>
                <span className="font-semibold sm:hidden">JSON</span>
              </Button>
              
              <Button onClick={exportToPDFMarkdown} className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 text-sm lg:text-base">
                <Download className="w-4 h-4" />
                <span className="font-semibold hidden sm:inline">Exportar PDF</span>
                <span className="font-semibold sm:hidden">PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white bg-cyan-600">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Seções</h2>
                    <p className="text-white/80 text-sm">Configure seu e-book</p>
                  </div>
                </div>
              </div>
              <nav className="p-4 space-y-2">
                {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${activeTab === tab.id ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:transform hover:scale-102'}`}>
                    <span className="text-lg">{tab.label.split(' ')[0]}</span>
                    <span className="flex-1">{tab.label.substring(tab.label.indexOf(' ') + 1)}</span>
                    {activeTab === tab.id && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>}
                  </button>)}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg">
                    {tabs.find(tab => tab.id === activeTab)?.label.split(' ')[0]}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </h2>
                </div>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-24"></div>
              </div>
              {tabs.find(tab => tab.id === activeTab)?.component()}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default AdminPanel;