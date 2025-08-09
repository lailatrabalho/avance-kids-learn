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
      alert("Configurações salvas com sucesso!");
    } catch (error) {
      alert("Erro ao salvar configurações");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = async (section: string, field: string, value: string) => {
    try {
      await updateConfig(section as any, field, value);
    } catch (error) {
      console.error("Erro ao atualizar configuração:", error);
    }
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="geral" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="hero" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Hero
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
                  <Label htmlFor="heroDescricao1">Descrição 1</Label>
                  <Textarea
                    id="heroDescricao1"
                    value={config.hero?.descricao1 || ""}
                    onChange={(e) => handleInputChange("hero", "descricao1", e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="heroDescricao2">Descrição 2</Label>
                  <Textarea
                    id="heroDescricao2"
                    value={config.hero?.descricao2 || ""}
                    onChange={(e) => handleInputChange("hero", "descricao2", e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="heroDescricao3">Descrição 3</Label>
                  <Textarea
                    id="heroDescricao3"
                    value={config.hero?.descricao3 || ""}
                    onChange={(e) => handleInputChange("hero", "descricao3", e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="heroImagemUrl">URL da Imagem</Label>
                  <Input
                    id="heroImagemUrl"
                    value={config.hero?.imagemUrl || ""}
                    onChange={(e) => handleInputChange("hero", "imagemUrl", e.target.value)}
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
                  <Label htmlFor="obrigadoInstrucoes">Instruções</Label>
                  <Textarea
                    id="obrigadoInstrucoes"
                    value={config.obrigado?.instrucoes || ""}
                    onChange={(e) => handleInputChange("obrigado", "instrucoes", e.target.value)}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="obrigadoTextoSuporte">Texto de Suporte</Label>
                  <Textarea
                    id="obrigadoTextoSuporte"
                    value={config.obrigado?.textoSuporte || ""}
                    onChange={(e) => handleInputChange("obrigado", "textoSuporte", e.target.value)}
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
