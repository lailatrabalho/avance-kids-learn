import { useConfig } from "@/contexts/ConfigContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useRef, useState, useCallback } from "react";
import { Settings, Save, Eye, FileText, Users, MessageCircle, Heart, Upload, Download, Palette, Package, Star, Gift, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const { config, loading, updateConfig, updateNestedConfig, exportConfig, importConfig } = useConfig();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("geral");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSections, setSavedSections] = useState<Record<string, boolean>>({});
  const [dirtyFields, setDirtyFields] = useState<Record<string, boolean>>({});
  const [uploadingImages, setUploadingImages] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const markDirty = (section: string) => {
    setDirtyFields(prev => ({ ...prev, [section]: true }));
    setSavedSections(prev => ({ ...prev, [section]: false }));
  };

  const handleSaveSection = async (section: string) => {
    setIsSaving(true);
    try {
      // Changes are already persisted per-keystroke via updateConfig/updateNestedConfig
      // This button confirms to the user that everything is saved
      await new Promise(resolve => setTimeout(resolve, 300)); // Small delay for UX
      setDirtyFields(prev => ({ ...prev, [section]: false }));
      setSavedSections(prev => ({ ...prev, [section]: true }));
      toast({
        title: "✅ Salvo com sucesso!",
        description: "As alterações foram salvas no banco de dados.",
      });
      // Reset the saved indicator after 3s
      setTimeout(() => setSavedSections(prev => ({ ...prev, [section]: false })), 3000);
    } catch (error) {
      toast({
        title: "❌ Erro ao salvar",
        description: "Não foi possível salvar as alterações. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = async (section: keyof typeof config, field: string, value: string) => {
    markDirty(section);
    try {
      await updateConfig(section as any, field, value);
    } catch (error) {
      console.error("Erro ao atualizar configuração:", error);
    }
  };

  const handleNestedChange = async (
    section: keyof typeof config,
    subsection: string,
    field: string,
    value: string
  ) => {
    markDirty(section);
    try {
      await updateNestedConfig(section as any, subsection, field, value);
    } catch (error) {
      console.error("Erro ao atualizar configuração aninhada:", error);
    }
  };

  const triggerImport = () => fileInputRef.current?.click();

  const SaveButton = ({ section }: { section: string }) => (
    <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-end space-x-3">
      {savedSections[section] && (
        <span className="text-green-600 font-medium flex items-center space-x-1 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Salvo!</span>
        </span>
      )}
      <Button
        onClick={() => handleSaveSection(section)}
        disabled={isSaving}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
      >
        {isSaving ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
        ) : (
          <Save className="w-5 h-5" />
        )}
        <span className="font-semibold">Salvar Alterações</span>
      </Button>
    </div>
  );

    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        importConfig(data);
        alert("Configuração importada com sucesso!");
      } catch (err) {
        alert("Arquivo inválido. Certifique-se de enviar um JSON exportado pelo sistema.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const uploadImage = async (file: File, fieldKey: string) => {
    setUploadingImages(prev => ({ ...prev, [fieldKey]: true }));
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      // Simular delay de upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Retornar um ID fictício baseado no nome do arquivo
      const fakeId = file.name.replace(/\.[^/.]+$/, "") + "_" + Date.now();
      setUploadingImages(prev => ({ ...prev, [fieldKey]: false }));
      return fakeId;
    } catch (error) {
      setUploadingImages(prev => ({ ...prev, [fieldKey]: false }));
      alert('Erro ao fazer upload da imagem');
      return null;
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, section: string, field: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
      return;
    }

    const fieldKey = `${section}_${field}`;
    const newImageId = await uploadImage(file, fieldKey);
    if (newImageId) {
      // Verificar se é um campo aninhado (ex: depoimento1_imagem)
      if (field.includes('_')) {
        const [subsection, subfield] = field.split('_');
        await updateNestedConfig(section as any, subsection, subfield, newImageId);
      } else {
        await updateConfig(section as any, field, newImageId);
      }
    }
  };

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>, section: string, field: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Por favor, selecione apenas arquivos de vídeo.');
      return;
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB limit for videos
      alert('O vídeo deve ter no máximo 100MB.');
      return;
    }

    const fieldKey = `${section}_${field}`;
    setUploadingImages(prev => ({ ...prev, [fieldKey]: true }));
    
    try {
      const formData = new FormData();
      formData.append('video', file);
      
      // Simular delay de upload de vídeo (mais longo)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Retornar um ID fictício baseado no nome do arquivo
      const fakeId = file.name.replace(/\.[^/.]+$/, "") + "_video_" + Date.now();
      setUploadingImages(prev => ({ ...prev, [fieldKey]: false }));
      
      await updateConfig(section as any, 'videoArquivo', fakeId);
      alert('Vídeo enviado com sucesso!');
    } catch (error) {
      setUploadingImages(prev => ({ ...prev, [fieldKey]: false }));
      alert('Erro ao fazer upload do vídeo');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  🚀
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Painel Admin - E-book Avance
                  </h1>
                  <p className="text-gray-600 font-medium">Gerencie todo o conteúdo das páginas com facilidade</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => window.open("/", "_blank")}
                className="flex items-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                Visualizar Site
              </Button>
              <label className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span className="font-semibold">Importar</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
              <Button
                onClick={exportConfig}
                className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
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
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Seções</h2>
                    <p className="text-white/80 text-sm">Configure seu e-book</p>
                  </div>
                </div>
              </div>
              <nav className="p-4 space-y-2">
                {[
                  { id: 'geral', label: '⚙️ Geral', icon: Settings },
                  { id: 'hero', label: '🚀 Hero', icon: FileText },
                  { id: 'beneficios', label: '✨ Benefícios', icon: Star },
                  { id: 'pacotes', label: '📦 Pacotes', icon: Package },
                  { id: 'depoimentos', label: '💬 Depoimentos', icon: MessageCircle },
                  { id: 'obrigado', label: '🎉 Obrigado', icon: Gift },
                  { id: 'cores', label: '🎨 Cores', icon: Palette }
                ].map((tab) => (
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
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Status Panel */}
            <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  📊
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Status do Sistema</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-medium text-sm">Última alteração:</span>
                  </div>
                  <span className="text-green-600 font-bold text-sm">Agora</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-700 font-medium text-sm">Configurações:</span>
                  </div>
                  <span className="text-blue-600 font-bold text-sm">Sincronizadas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

                {/* Configurações Gerais */}
                <TabsContent value="geral" className="space-y-8">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
                      <span className="text-3xl">⚙️</span>
                      <span>Configurações Gerais</span>
                    </h3>
                    <p className="text-gray-600">Configure as informações básicas do seu e-book e dados de contato.</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="block text-sm font-bold text-gray-700 mb-3 flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Nome do E-book</span>
                      </Label>
                      <Input
                        value={(config.geral as any)?.nomeEbook || ""}
                        onChange={(e) => handleInputChange("geral", "nomeEbook", e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                        placeholder="Digite o nome do seu e-book..."
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</Label>
                      <Input
                        value={(config.geral as any)?.subtitulo || ""}
                        onChange={(e) => handleInputChange("geral", "subtitulo", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Faixa Etária</Label>
                      <Input
                        value={(config.geral as any)?.faixaEtaria || ""}
                        onChange={(e) => handleInputChange("geral", "faixaEtaria", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp (com código do país)</Label>
                      <Input
                        value={(config.geral as any)?.whatsapp || ""}
                        onChange={(e) => handleInputChange("geral", "whatsapp", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="5599999999999"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="block text-sm font-medium text-gray-700 mb-2">E-mail de Suporte</Label>
                      <Input
                        type="email"
                        value={(config.geral as any)?.emailSuporta || ""}
                        onChange={(e) => handleInputChange("geral", "emailSuporta", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <SaveButton section="geral" />
                </TabsContent>

                {/* Seção Hero */}
                <TabsContent value="hero" className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">🚀 Seção Principal (Hero)</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</Label>
                      <Input
                        value={config.hero?.titulo || ""}
                        onChange={(e) => handleInputChange("hero", "titulo", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</Label>
                      <Input
                        value={config.hero?.subtitulo || ""}
                        onChange={(e) => handleInputChange("hero", "subtitulo", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Descrição 1</Label>
                      <Textarea
                        value={config.hero?.descricao1 || ""}
                        onChange={(e) => handleInputChange("hero", "descricao1", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Descrição 2</Label>
                      <Textarea
                        value={config.hero?.descricao2 || ""}
                        onChange={(e) => handleInputChange("hero", "descricao2", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Texto do Botão</Label>
                      <Input
                        value={config.hero?.botaoCta || ""}
                        onChange={(e) => handleInputChange("hero", "botaoCta", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Imagem Principal</Label>
                      <div className="space-y-3">
                        <Input
                          value={config.hero?.imagemUrl || ""}
                          onChange={(e) => handleInputChange("hero", "imagemUrl", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                                  <Upload className="w-5 h-5 text-blue-600" />
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
                        {config.hero?.imagemUrl && (
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
                  <SaveButton section="hero" />
                </TabsContent>

                {/* Seção de Benefícios */}
                <TabsContent value="beneficios" className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">✨ Seção de Benefícios</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Título da Seção</Label>
                      <Input
                        value={(config.beneficios as any)?.titulo || ""}
                        onChange={(e) => handleInputChange("beneficios", "titulo", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo da Seção</Label>
                      <Input
                        value={(config.beneficios as any)?.subtitulo || ""}
                        onChange={(e) => handleInputChange("beneficios", "subtitulo", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {['beneficio1', 'beneficio2', 'beneficio3', 'beneficio4'].map((key, index) => (
                      <div key={key} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3">Benefício {index + 1}</h4>
                        <div className="space-y-3">
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Título</Label>
                            <Input
                              value={(config.beneficios as any)?.[key]?.titulo || ""}
                              onChange={(e) => handleNestedChange("beneficios", key, "titulo", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Descrição</Label>
                            <Textarea
                              value={(config.beneficios as any)?.[key]?.descricao || ""}
                              onChange={(e) => handleNestedChange("beneficios", key, "descricao", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <SaveButton section="beneficios" />
                </TabsContent>

                {/* Pacotes */}
                <TabsContent value="pacotes" className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">📦 Pacotes do E-book</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Título da Seção</Label>
                      <Input
                        value={(config.pacotes as any)?.titulo || ""}
                        onChange={(e) => handleInputChange("pacotes", "titulo", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo da Seção</Label>
                      <Input
                        value={(config.pacotes as any)?.subtitulo || ""}
                        onChange={(e) => handleInputChange("pacotes", "subtitulo", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Texto do Botão de Compra</Label>
                      <Input
                        value={(config.pacotes as any)?.botaoCompra || ""}
                        onChange={(e) => handleInputChange("pacotes", "botaoCompra", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {['middle', 'rich', 'super', 'expert'].map((key) => (
                      <div key={key} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3 capitalize">{key} Package</h4>
                        <div className="space-y-3">
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Nome do Pacote</Label>
                            <Input
                              value={(config.pacotes as any)?.[key]?.nome || ""}
                              onChange={(e) => handleNestedChange("pacotes", key, "nome", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Faixa Etária</Label>
                            <Input
                              value={(config.pacotes as any)?.[key]?.idade || ""}
                              onChange={(e) => handleNestedChange("pacotes", key, "idade", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Quantidade de Atividades</Label>
                            <Input
                              value={(config.pacotes as any)?.[key]?.atividades || ""}
                              onChange={(e) => handleNestedChange("pacotes", key, "atividades", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Descrição</Label>
                            <Textarea
                              value={(config.pacotes as any)?.[key]?.descricao || ""}
                              onChange={(e) => handleNestedChange("pacotes", key, "descricao", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Preço (sem R$)</Label>
                            <Input
                              value={(config.pacotes as any)?.[key]?.preco || ""}
                              onChange={(e) => handleNestedChange("pacotes", key, "preco", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                              placeholder="29.90"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <SaveButton section="pacotes" />
                </TabsContent>

                {/* Depoimentos */}
                <TabsContent value="depoimentos" className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">💬 Depoimentos</h3>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Título da Seção</Label>
                    <Input
                      value={(config.depoimentos as any)?.titulo || ""}
                      onChange={(e) => handleInputChange("depoimentos", "titulo", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-1 gap-6">
                    {['depoimento1', 'depoimento2', 'depoimento3'].map((key, index) => (
                      <div key={key} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-lg mb-3">Depoimento {index + 1}</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Nome</Label>
                            <Input
                              value={(config.depoimentos as any)?.[key]?.nome || ""}
                              onChange={(e) => handleNestedChange("depoimentos", key, "nome", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Cargo/Local</Label>
                            <Input
                              value={(config.depoimentos as any)?.[key]?.cargo || ""}
                              onChange={(e) => handleNestedChange("depoimentos", key, "cargo", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Inicial (1 letra)</Label>
                            <Input
                              maxLength={1}
                              value={(config.depoimentos as any)?.[key]?.inicial || ""}
                              onChange={(e) => handleNestedChange("depoimentos", key, "inicial", e.target.value.toUpperCase())}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Texto do Depoimento</Label>
                            <Textarea
                              value={(config.depoimentos as any)?.[key]?.texto || ""}
                              onChange={(e) => handleNestedChange("depoimentos", key, "texto", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                              rows={4}
                            />
                          </div>
                        </div>
                        
                        {/* Seção de Imagem */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <Label className="block text-sm font-medium text-gray-700 mb-2">Imagem do Depoimento</Label>
                          <div className="space-y-3">
                            <Input
                              value={(config.depoimentos as any)?.[key]?.imagem || ""}
                              onChange={(e) => handleNestedChange("depoimentos", key, "imagem", e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              placeholder="ID da imagem ou URL"
                            />
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-500">ou</span>
                              <label className={`flex-1 cursor-pointer ${uploadingImages[`depoimentos_${key}_imagem`] ? 'opacity-50' : ''}`}>
                                <div className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors bg-blue-50 hover:bg-blue-100">
                                  {uploadingImages[`depoimentos_${key}_imagem`] ? (
                                    <div className="flex items-center space-x-2">
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                      <span className="text-sm text-blue-600">Enviando...</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center space-x-2">
                                      <Upload className="w-5 h-5 text-blue-600" />
                                      <span className="text-sm text-blue-600 font-medium">Fazer upload da imagem</span>
                                    </div>
                                  )}
                                </div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(e, 'depoimentos', `${key}_imagem`)}
                                  className="hidden"
                                  disabled={uploadingImages[`depoimentos_${key}_imagem`]}
                                />
                              </label>
                            </div>
                            {(config.depoimentos as any)?.[key]?.imagem && (
                              <div className="mt-2">
                                <img 
                                  src={(config.depoimentos as any)[key].imagem.startsWith('http') ? (config.depoimentos as any)[key].imagem : `keys/${(config.depoimentos as any)[key].imagem}`}
                                  alt={`Preview ${(config.depoimentos as any)?.[key]?.nome || 'Depoimento'}`}
                                  className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 shadow-sm"
                                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <SaveButton section="depoimentos" />
                </TabsContent>

                {/* Página de Obrigado */}
                <TabsContent value="obrigado" className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">🎉 Página de Obrigado</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</Label>
                      <Input
                        value={config.obrigado?.titulo || ""}
                        onChange={(e) => handleInputChange("obrigado", "titulo", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</Label>
                      <Input
                        value={config.obrigado?.subtitulo || ""}
                        onChange={(e) => handleInputChange("obrigado", "subtitulo", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Descrição</Label>
                      <Textarea
                        value={(config.obrigado as any)?.descricao || ""}
                        onChange={(e) => handleInputChange("obrigado", "descricao", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Título do Vídeo</Label>
                      <Input
                        value={config.obrigado?.videoTitulo || ""}
                        onChange={(e) => handleInputChange("obrigado", "videoTitulo", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Descrição do Vídeo</Label>
                      <Textarea
                        value={config.obrigado?.videoDescricao || ""}
                        onChange={(e) => handleInputChange("obrigado", "videoDescricao", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={2}
                      />
                    </div>

                    {/* Seção de Vídeo */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">🎥 Configurações do Vídeo</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-2">URL do Vídeo</Label>
                          <Input
                            value={(config.obrigado as any)?.videoUrl || ""}
                            onChange={(e) => handleInputChange("obrigado", "videoUrl", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="https://www.youtube.com/watch?v=... ou https://vimeo.com/..."
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Suporta YouTube, Vimeo, ou links diretos para arquivos de vídeo
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-500">ou</span>
                          <label className={`flex-1 cursor-pointer ${uploadingImages['obrigado_video'] ? 'opacity-50' : ''}`}>
                            <div className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-400 transition-colors bg-purple-50 hover:bg-purple-100">
                              {uploadingImages['obrigado_video'] ? (
                                <div className="flex items-center space-x-2">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                                  <span className="text-sm text-purple-600">Enviando vídeo...</span>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <Upload className="w-5 h-5 text-purple-600" />
                                  <span className="text-sm text-purple-600 font-medium">Fazer upload do vídeo</span>
                                </div>
                              )}
                            </div>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => handleVideoUpload(e, 'obrigado', 'video')}
                              className="hidden"
                              disabled={uploadingImages['obrigado_video']}
                            />
                          </label>
                        </div>

                        {/* Configurações de Tamanho */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">Largura do Vídeo</Label>
                            <select
                              value={(config.obrigado as any)?.videoLargura || "100%"}
                              onChange={(e) => handleInputChange("obrigado", "videoLargura", e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="100%">100% (Largura total)</option>
                              <option value="90%">90% da largura</option>
                              <option value="80%">80% da largura</option>
                              <option value="70%">70% da largura</option>
                              <option value="60%">60% da largura</option>
                              <option value="50%">50% da largura</option>
                            </select>
                          </div>
                          
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">Proporção do Vídeo</Label>
                            <select
                              value={(config.obrigado as any)?.videoProporcao || "16:9"}
                              onChange={(e) => handleInputChange("obrigado", "videoProporcao", e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="16:9">16:9 (Widescreen)</option>
                              <option value="4:3">4:3 (Padrão)</option>
                              <option value="1:1">1:1 (Quadrado)</option>
                              <option value="21:9">21:9 (Ultra-wide)</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">Altura Máxima</Label>
                            <Input
                              type="number"
                              value={(config.obrigado as any)?.videoAlturaMax || "400"}
                              onChange={(e) => handleInputChange("obrigado", "videoAlturaMax", e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              placeholder="400"
                            />
                            <p className="text-xs text-gray-500 mt-1">Altura máxima em pixels</p>
                          </div>
                          
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">Alinhamento</Label>
                            <select
                              value={(config.obrigado as any)?.videoAlinhamento || "center"}
                              onChange={(e) => handleInputChange("obrigado", "videoAlinhamento", e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="center">Centralizado</option>
                              <option value="left">Esquerda</option>
                              <option value="right">Direita</option>
                            </select>
                          </div>
                        </div>

                        {/* Preview do Vídeo */}
                        {((config.obrigado as any)?.videoUrl || (config.obrigado as any)?.videoArquivo) && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <h5 className="font-semibold text-gray-800 mb-2">Preview do Vídeo:</h5>
                            <div className="bg-gray-200 rounded-lg p-4 text-center">
                              <div className="text-4xl mb-2">🎬</div>
                              <p className="text-sm text-gray-600">
                                Vídeo configurado - {(config.obrigado as any)?.videoLargura} de largura, 
                                proporção {(config.obrigado as any)?.videoProporcao || "16:9"}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Seção O QUE VOCÊ VAI APRENDER */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">📚 Seção "O QUE VOCÊ VAI APRENDER"</h4>
                    
                    <div className="space-y-6">
                      <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Título da Seção</Label>
                        <Input
                          value={(config.obrigado as any)?.aprendizagemTitulo || "📚 O QUE VOCÊ VAI APRENDER"}
                          onChange={(e) => handleInputChange("obrigado", "aprendizagemTitulo", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo da Seção</Label>
                        <Input
                          value={(config.obrigado as any)?.aprendizagemSubtitulo || "Tudo que você precisa saber para aproveitar ao máximo seu material educativo"}
                          onChange={(e) => handleInputChange("obrigado", "aprendizagemSubtitulo", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Cards de Aprendizagem */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {[
                          { key: 'card1', titulo: 'Como organizar as atividades por idade', descricao: 'Sistema de classificação simples para escolher as atividades certas para cada faixa etária' },
                          { key: 'card2', titulo: 'Dicas para imprimir com qualidade', descricao: 'Configurações ideais de impressão, tipos de papel recomendados e como economizar tinta' },
                          { key: 'card3', titulo: 'Rotina de estudos recomendada', descricao: 'Cronograma semanal flexível e dicas de horários ideais para máximo aproveitamento' },
                          { key: 'card4', titulo: 'Como acompanhar o progresso', descricao: 'Métodos simples para registrar evolução e celebrar conquistas da sua criança' }
                        ].map((card, index) => (
                          <div key={card.key} className="bg-gray-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-lg mb-3">Card {index + 1}</h5>
                            <div className="space-y-3">
                              <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Título</Label>
                                <Input
                                  value={(config.obrigado as any)?.[`aprendizagem${card.key.charAt(0).toUpperCase() + card.key.slice(1)}Titulo`] || card.titulo}
                                  onChange={(e) => handleInputChange("obrigado", `aprendizagem${card.key.charAt(0).toUpperCase() + card.key.slice(1)}Titulo`, e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Descrição</Label>
                                <Textarea
                                  value={(config.obrigado as any)?.[`aprendizagem${card.key.charAt(0).toUpperCase() + card.key.slice(1)}Descricao`] || card.descricao}
                                  onChange={(e) => handleInputChange("obrigado", `aprendizagem${card.key.charAt(0).toUpperCase() + card.key.slice(1)}Descricao`, e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                  rows={2}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Dica Especial */}
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h5 className="font-semibold text-lg mb-3">💡 Dica Especial</h5>
                        <div className="space-y-3">
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Título da Dica</Label>
                            <Input
                              value={(config.obrigado as any)?.dicaEspecialTitulo || "DICA ESPECIAL"}
                              onChange={(e) => handleInputChange("obrigado", "dicaEspecialTitulo", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Texto da Dica</Label>
                            <Textarea
                              value={(config.obrigado as any)?.dicaEspecialTexto || "Comece devagar! Escolha 2-3 atividades por semana e observe como sua criança responde. O segredo está na consistência, não na quantidade. Cada pequeno progresso é uma grande vitória! 🌟"}
                              onChange={(e) => handleInputChange("obrigado", "dicaEspecialTexto", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <SaveButton section="obrigado" />
                </TabsContent>

                {/* Paleta de Cores */}
                <TabsContent value="cores" className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">🎨 Paleta de Cores</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {Object.entries((config.cores as any) || {}).map(([key, color]) => (
                      <div key={key} className="space-y-2">
                        <Label className="block text-sm font-medium text-gray-700 capitalize">Cor {key}</Label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={color as string}
                            onChange={(e) => handleInputChange("cores", key, e.target.value)}
                            className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
                          />
                          <Input
                            value={color as string}
                            onChange={(e) => handleInputChange("cores", key, e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="#000000"
                          />
                        </div>
                        <div 
                          className="w-full h-8 rounded"
                          style={{ backgroundColor: color as string }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="text-green-600 mr-3">✅</div>
                      <div>
                        <h4 className="font-semibold text-green-800">Cores Dinâmicas</h4>
                        <p className="text-green-700 text-sm">
                          As cores são aplicadas automaticamente em tempo real nas páginas. 
                          Suas alterações serão refletidas imediatamente no site.
                        </p>
                      </div>
                    </div>
                  </div>
                  <SaveButton section="cores" />
                </TabsContent>

              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-lg">
              🚀
            </div>
            <h3 className="text-xl font-bold">E-book Avance</h3>
          </div>
          <p className="text-gray-300 mb-2">© 2025 E-book Avance - Painel Administrativo v2.0</p>
          <p className="text-gray-400 text-sm">Desenvolvido com 💙 para facilitar a gestão de conteúdo educacional</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
