import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConfig } from "@/contexts/ConfigContext";
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('geral');
  const [uploadingImages, setUploadingImages] = useState<Record<string, boolean>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement>>({});
  const { config, updateConfig, updateNestedConfig, exportConfig, importConfig } = useConfig();
  const { toast } = useToast();

  const handleImportConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedConfig = JSON.parse(e.target?.result as string);
          importConfig(importedConfig);
          toast({
            title: "Sucesso!",
            description: "Configurações importadas com sucesso!",
          });
        } catch (error) {
          toast({
            title: "Erro",
            description: "Erro ao importar configurações. Verifique o arquivo.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const uploadImage = async (file: File, fieldKey: string): Promise<string | null> => {
    setUploadingImages(prev => ({ ...prev, [fieldKey]: true }));
    
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
      
      setUploadingImages(prev => ({ ...prev, [fieldKey]: false }));
      return fakeId;
    } catch (error) {
      setUploadingImages(prev => ({ ...prev, [fieldKey]: false }));
      toast({
        title: "Erro",
        description: "Erro ao fazer upload da imagem",
        variant: "destructive",
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
        variant: "destructive",
      });
      return;
    }
    
    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erro",
        description: "A imagem deve ter no máximo 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    const fieldKey = `${section}_${field}`;
    const newImageId = await uploadImage(file, fieldKey);
    
    if (newImageId) {
      updateConfig(section as any, field, newImageId);
    }
  };

  const renderGeral = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
          <span className="text-3xl">⚙️</span>
          <span>Configurações Gerais</span>
        </h3>
        <p className="text-gray-600">Configure as informações básicas do seu e-book e dados de contato.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Nome do E-book</span>
          </label>
          <Input
            type="text"
            value={config.geral.nomeEbook}
            onChange={(e) => updateConfig('geral', 'nomeEbook', e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
            placeholder="Digite o nome do seu e-book..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
          <Input
            type="text"
            value={config.geral.subtitulo}
            onChange={(e) => updateConfig('geral', 'subtitulo', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Faixa Etária</label>
          <Input
            type="text"
            value={config.geral.faixaEtaria}
            onChange={(e) => updateConfig('geral', 'faixaEtaria', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp (com código do país)</label>
          <Input
            type="text"
            value={config.geral.whatsapp}
            onChange={(e) => updateConfig('geral', 'whatsapp', e.target.value)}
            placeholder="5599999999999"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">E-mail de Suporte</label>
          <Input
            type="email"
            value={config.geral.emailSuporta}
            onChange={(e) => updateConfig('geral', 'emailSuporta', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderHero = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">🚀 Seção Principal (Hero)</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</label>
          <Input
            type="text"
            value={config.hero.titulo}
            onChange={(e) => updateConfig('hero', 'titulo', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
          <Input
            type="text"
            value={config.hero.subtitulo}
            onChange={(e) => updateConfig('hero', 'subtitulo', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descrição 1</label>
          <textarea
            value={config.hero.descricao1}
            onChange={(e) => updateConfig('hero', 'descricao1', e.target.value)}
            className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descrição 2</label>
          <textarea
            value={config.hero.descricao2}
            onChange={(e) => updateConfig('hero', 'descricao2', e.target.value)}
            className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Texto do Botão</label>
          <Input
            type="text"
            value={config.hero.botaoCta}
            onChange={(e) => updateConfig('hero', 'botaoCta', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Imagem Principal</label>
          <div className="space-y-3">
            <Input
              type="text"
              value={config.hero.imagemUrl}
              onChange={(e) => updateConfig('hero', 'imagemUrl', e.target.value)}
              placeholder="ID da imagem ou URL"
            />
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">ou</span>
              <label className={`flex-1 cursor-pointer ${uploadingImages['hero_imagemUrl'] ? 'opacity-50' : ''}`}>
                <div className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors bg-blue-50 hover:bg-blue-100">
                  {uploadingImages['hero_imagemUrl'] ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm text-blue-600">Enviando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <span className="text-sm text-blue-600 font-medium">Fazer upload da imagem</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'hero', 'imagemUrl')}
                  className="hidden"
                  disabled={uploadingImages['hero_imagemUrl']}
                />
              </label>
            </div>
            {config.hero.imagemUrl && (
              <div className="mt-2">
                <img 
                  src={config.hero.imagemUrl.startsWith('http') ? config.hero.imagemUrl : `keys/${config.hero.imagemUrl}`} 
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBeneficios = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">✨ Seção de Benefícios</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Título da Seção</label>
          <Input
            type="text"
            value={config.beneficios.titulo}
            onChange={(e) => updateConfig('beneficios', 'titulo', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo da Seção</label>
          <Input
            type="text"
            value={config.beneficios.subtitulo}
            onChange={(e) => updateConfig('beneficios', 'subtitulo', e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {(['beneficio1', 'beneficio2', 'beneficio3', 'beneficio4'] as const).map((key, index) => (
          <div key={key} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-3">Benefício {index + 1}</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <Input
                  type="text"
                  value={config.beneficios[key].titulo}
                  onChange={(e) => updateNestedConfig('beneficios', key, 'titulo', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={config.beneficios[key].descricao}
                  onChange={(e) => updateNestedConfig('beneficios', key, 'descricao', e.target.value)}
                  className="w-full p-2 border border-input rounded focus:ring-2 focus:ring-ring"
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPacotes = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">📦 Pacotes do E-book</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Título da Seção</label>
          <Input
            type="text"
            value={config.pacotes.titulo}
            onChange={(e) => updateConfig('pacotes', 'titulo', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo da Seção</label>
          <Input
            type="text"
            value={config.pacotes.subtitulo}
            onChange={(e) => updateConfig('pacotes', 'subtitulo', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Texto do Botão de Compra</label>
          <Input
            type="text"
            value={config.pacotes.botaoCompra}
            onChange={(e) => updateConfig('pacotes', 'botaoCompra', e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {(['middle', 'rich', 'super', 'expert'] as const).map((key) => (
          <div key={key} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-3 capitalize">{key} Package</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Pacote</label>
                <Input
                  type="text"
                  value={config.pacotes[key].nome}
                  onChange={(e) => updateNestedConfig('pacotes', key, 'nome', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Faixa Etária</label>
                <Input
                  type="text"
                  value={config.pacotes[key].idade}
                  onChange={(e) => updateNestedConfig('pacotes', key, 'idade', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade de Atividades</label>
                <Input
                  type="text"
                  value={config.pacotes[key].atividades}
                  onChange={(e) => updateNestedConfig('pacotes', key, 'atividades', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={config.pacotes[key].descricao}
                  onChange={(e) => updateNestedConfig('pacotes', key, 'descricao', e.target.value)}
                  className="w-full p-2 border border-input rounded focus:ring-2 focus:ring-ring"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço (sem R$)</label>
                <Input
                  type="text"
                  value={config.pacotes[key].preco}
                  onChange={(e) => updateNestedConfig('pacotes', key, 'preco', e.target.value)}
                  placeholder="29.90"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDepoimentos = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">💬 Depoimentos</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Título da Seção</label>
        <Input
          type="text"
          value={config.depoimentos.titulo}
          onChange={(e) => updateConfig('depoimentos', 'titulo', e.target.value)}
        />
      </div>
      
      <div className="grid md:grid-cols-1 gap-6">
        {(['depoimento1', 'depoimento2', 'depoimento3'] as const).map((key, index) => (
          <div key={key} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-3">Depoimento {index + 1}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <Input
                  type="text"
                  value={config.depoimentos[key].nome}
                  onChange={(e) => updateNestedConfig('depoimentos', key, 'nome', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo/Local</label>
                <Input
                  type="text"
                  value={config.depoimentos[key].cargo}
                  onChange={(e) => updateNestedConfig('depoimentos', key, 'cargo', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inicial (1 letra)</label>
                <Input
                  type="text"
                  maxLength={1}
                  value={config.depoimentos[key].inicial}
                  onChange={(e) => updateNestedConfig('depoimentos', key, 'inicial', e.target.value.toUpperCase())}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Depoimento</label>
                <textarea
                  value={config.depoimentos[key].texto}
                  onChange={(e) => updateNestedConfig('depoimentos', key, 'texto', e.target.value)}
                  className="w-full p-2 border border-input rounded focus:ring-2 focus:ring-ring"
                  rows={4}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderObrigado = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">🎉 Página de Obrigado</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</label>
          <Input
            type="text"
            value={config.obrigado.titulo}
            onChange={(e) => updateConfig('obrigado', 'titulo', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
          <Input
            type="text"
            value={config.obrigado.subtitulo}
            onChange={(e) => updateConfig('obrigado', 'subtitulo', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
          <textarea
            value={config.obrigado.descricao}
            onChange={(e) => updateConfig('obrigado', 'descricao', e.target.value)}
            className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Título do Vídeo</label>
          <Input
            type="text"
            value={config.obrigado.videoTitulo}
            onChange={(e) => updateConfig('obrigado', 'videoTitulo', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descrição do Vídeo</label>
          <textarea
            value={config.obrigado.videoDescricao}
            onChange={(e) => updateConfig('obrigado', 'videoDescricao', e.target.value)}
            className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring"
            rows={2}
          />
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'geral', label: '⚙️ Geral', component: renderGeral },
    { id: 'hero', label: '🚀 Hero', component: renderHero },
    { id: 'beneficios', label: '✨ Benefícios', component: renderBeneficios },
    { id: 'pacotes', label: '📦 Pacotes', component: renderPacotes },
    { id: 'depoimentos', label: '💬 Depoimentos', component: renderDepoimentos },
    { id: 'obrigado', label: '🎉 Obrigado', component: renderObrigado }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  🚀
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Painel Admin - E-book Avance
                  </h1>
                  <p className="text-gray-600 font-medium">Gerencie todo o conteúdo das páginas com facilidade</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <label className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4"></path>
                </svg>
                <span className="font-semibold">Importar</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportConfig}
                  className="hidden"
                />
              </label>
              
              <Button
                onClick={exportConfig}
                className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span className="font-semibold">Exportar</span>
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
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
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
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:transform hover:scale-102'
                    }`}
                  >
                    <span className="text-lg">{tab.label.split(' ')[0]}</span>
                    <span className="flex-1">{tab.label.substring(tab.label.indexOf(' ') + 1)}</span>
                    {activeTab === tab.id && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    )}
                  </button>
                ))}
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
    </div>
  );
};

export default AdminPanel;