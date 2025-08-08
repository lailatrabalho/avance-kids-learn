import { useConfig } from "@/contexts/ConfigContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Settings, Save, Eye, FileText, Users, Heart } from "lucide-react";

const AdminPanel = () => {
  const { config, loading, updateConfig } = useConfig();
  const [activeTab, setActiveTab] = useState("geral");
  const [isSaving, setIsSaving] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateConfig(config);
      alert("Configurações salvas com sucesso!");
    } catch (error) {
      alert("Erro ao salvar configurações");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    updateConfig({
      ...config,
      [section]: {
        ...config[section],
        [field]: value
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-sm text-gray-500">Gerencie as configurações do seu site</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => window.open("/", "_blank")}
                className="flex items-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                Visualizar Site
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="geral" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="hero" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="publico" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Público
            </TabsTrigger>
            <TabsTrigger value="obrigado" className="flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Obrigado
            </TabsTrigger>
          </TabsList>

          {/* Configurações Gerais */}
          <TabsContent value="geral" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>
                  Configure as informações básicas do seu site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="titulo">Título do Site</Label>
                    <Input
                      id="titulo"
                      value={config.geral?.titulo || ""}
                      onChange={(e) => handleInputChange("geral", "titulo", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="numeroWhatsApp">Número WhatsApp</Label>
                    <Input
                      id="numeroWhatsApp"
                      value={config.geral?.numeroWhatsApp || ""}
                      onChange={(e) => handleInputChange("geral", "numeroWhatsApp", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={config.geral?.descricao || ""}
                    onChange={(e) => handleInputChange("geral", "descricao", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Seção Hero */}
          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seção Hero</CardTitle>
                <CardDescription>
                  Configure a seção principal da página inicial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="heroTitulo">Título Principal</Label>
                  <Input
                    id="heroTitulo"
                    value={config.hero?.titulo || ""}
                    onChange={(e) => handleInputChange("hero", "titulo", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="heroSubtitulo">Subtítulo</Label>
                  <Input
                    id="heroSubtitulo"
                    value={config.hero?.subtitulo || ""}
                    onChange={(e) => handleInputChange("hero", "subtitulo", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="heroDescricao">Descrição</Label>
                  <Textarea
                    id="heroDescricao"
                    value={config.hero?.descricao || ""}
                    onChange={(e) => handleInputChange("hero", "descricao", e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="heroPreco">Preço</Label>
                    <Input
                      id="heroPreco"
                      value={config.hero?.preco || ""}
                      onChange={(e) => handleInputChange("hero", "preco", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="heroPrecoOriginal">Preço Original</Label>
                    <Input
                      id="heroPrecoOriginal"
                      value={config.hero?.precoOriginal || ""}
                      onChange={(e) => handleInputChange("hero", "precoOriginal", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Público Alvo */}
          <TabsContent value="publico" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Público Alvo</CardTitle>
                <CardDescription>
                  Configure a seção de público alvo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="publicoTitulo">Título</Label>
                  <Input
                    id="publicoTitulo"
                    value={config.publicoAlvo?.titulo || ""}
                    onChange={(e) => handleInputChange("publicoAlvo", "titulo", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="publicoSubtitulo">Subtítulo</Label>
                  <Input
                    id="publicoSubtitulo"
                    value={config.publicoAlvo?.subtitulo || ""}
                    onChange={(e) => handleInputChange("publicoAlvo", "subtitulo", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="publicoDescricao">Descrição</Label>
                  <Textarea
                    id="publicoDescricao"
                    value={config.publicoAlvo?.descricao || ""}
                    onChange={(e) => handleInputChange("publicoAlvo", "descricao", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Página Obrigado */}
          <TabsContent value="obrigado" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Página de Obrigado</CardTitle>
                <CardDescription>
                  Configure a página de agradecimento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="obrigadoTitulo">Título</Label>
                  <Input
                    id="obrigadoTitulo"
                    value={config.obrigado?.titulo || ""}
                    onChange={(e) => handleInputChange("obrigado", "titulo", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="obrigadoSubtitulo">Subtítulo</Label>
                  <Input
                    id="obrigadoSubtitulo"
                    value={config.obrigado?.subtitulo || ""}
                    onChange={(e) => handleInputChange("obrigado", "subtitulo", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="obrigadoDescricao">Descrição</Label>
                  <Textarea
                    id="obrigadoDescricao"
                    value={config.obrigado?.descricao || ""}
                    onChange={(e) => handleInputChange("obrigado", "descricao", e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="videoTitulo">Título do Vídeo</Label>
                  <Input
                    id="videoTitulo"
                    value={config.obrigado?.videoTitulo || ""}
                    onChange={(e) => handleInputChange("obrigado", "videoTitulo", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="videoDescricao">Descrição do Vídeo</Label>
                  <Textarea
                    id="videoDescricao"
                    value={config.obrigado?.videoDescricao || ""}
                    onChange={(e) => handleInputChange("obrigado", "videoDescricao", e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
