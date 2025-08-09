import { useConfig } from "@/contexts/ConfigContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Settings, Save, Eye, FileText, Users, Heart, Star, Shield, Palette, HelpCircle, Gift, Target } from "lucide-react";

const AdminPanel = () => {
  const { config, loading, updateConfig, updateNestedConfig } = useConfig();
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
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="geral" className="flex items-center text-xs">
              <Settings className="h-3 w-3 mr-1" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="hero" className="flex items-center text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="beneficios" className="flex items-center text-xs">
              <Star className="h-3 w-3 mr-1" />
              Benefícios
            </TabsTrigger>
            <TabsTrigger value="pacotes" className="flex items-center text-xs">
              <Gift className="h-3 w-3 mr-1" />
              Pacotes
            </TabsTrigger>
            <TabsTrigger value="depoimentos" className="flex items-center text-xs">
              <Users className="h-3 w-3 mr-1" />
              Depoimentos
            </TabsTrigger>
            <TabsTrigger value="publico" className="flex items-center text-xs">
              <Target className="h-3 w-3 mr-1" />
              Público
            </TabsTrigger>
            <TabsTrigger value="garantia" className="flex items-center text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Garantia
            </TabsTrigger>
            <TabsTrigger value="obrigado" className="flex items-center text-xs">
              <Heart className="h-3 w-3 mr-1" />
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



          {/* Benefícios */}
          <TabsContent value="beneficios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seção Benefícios</CardTitle>
                <CardDescription>Configure a seção de benefícios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="beneficiosTitulo">Título</Label>
                  <Input
                    id="beneficiosTitulo"
                    value={config.beneficios?.titulo || ""}
                    onChange={(e) => handleInputChange("beneficios", "titulo", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="beneficiosSubtitulo">Subtítulo</Label>
                  <Input
                    id="beneficiosSubtitulo"
                    value={config.beneficios?.subtitulo || ""}
                    onChange={(e) => handleInputChange("beneficios", "subtitulo", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pacotes */}
          <TabsContent value="pacotes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seção Pacotes</CardTitle>
                <CardDescription>Configure a seção de pacotes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pacotesTitulo">Título</Label>
                  <Input
                    id="pacotesTitulo"
                    value={config.pacotes?.titulo || ""}
                    onChange={(e) => handleInputChange("pacotes", "titulo", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pacotesSubtitulo">Subtítulo</Label>
                  <Input
                    id="pacotesSubtitulo"
                    value={config.pacotes?.subtitulo || ""}
                    onChange={(e) => handleInputChange("pacotes", "subtitulo", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="pacotesBotaoCompra">Texto do Botão</Label>
                  <Input
                    id="pacotesBotaoCompra"
                    value={config.pacotes?.botaoCompra || ""}
                    onChange={(e) => handleInputChange("pacotes", "botaoCompra", e.target.value)}
                    placeholder="Comprar Agora"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Depoimentos */}
          <TabsContent value="depoimentos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seção Depoimentos</CardTitle>
                <CardDescription>Configure os depoimentos de clientes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="depoimentosTitulo">Título da Seção</Label>
                  <Input
                    id="depoimentosTitulo"
                    value={config.depoimentos?.titulo || ""}
                    onChange={(e) => handleInputChange("depoimentos", "titulo", e.target.value)}
                  />
                </div>
                
                {/* Depoimento 1 */}
                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Depoimento 1</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="depoimento1Nome">Nome</Label>
                      <Input
                        id="depoimento1Nome"
                        value={config.depoimentos?.depoimento1?.nome || ""}
                        onChange={(e) => updateNestedConfig("depoimentos", "depoimento1", "nome", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="depoimento1Cargo">Cargo</Label>
                      <Input
                        id="depoimento1Cargo"
                        value={config.depoimentos?.depoimento1?.cargo || ""}
                        onChange={(e) => updateNestedConfig("depoimentos", "depoimento1", "cargo", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="depoimento1Texto">Texto</Label>
                      <Textarea
                        id="depoimento1Texto"
                        value={config.depoimentos?.depoimento1?.texto || ""}
                        onChange={(e) => updateNestedConfig("depoimentos", "depoimento1", "texto", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </Card>

                {/* Depoimento 2 */}
                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Depoimento 2</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="depoimento2Nome">Nome</Label>
                      <Input
                        id="depoimento2Nome"
                        value={config.depoimentos?.depoimento2?.nome || ""}
                        onChange={(e) => updateNestedConfig("depoimentos", "depoimento2", "nome", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="depoimento2Cargo">Cargo</Label>
                      <Input
                        id="depoimento2Cargo"
                        value={config.depoimentos?.depoimento2?.cargo || ""}
                        onChange={(e) => updateNestedConfig("depoimentos", "depoimento2", "cargo", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="depoimento2Texto">Texto</Label>
                      <Textarea
                        id="depoimento2Texto"
                        value={config.depoimentos?.depoimento2?.texto || ""}
                        onChange={(e) => updateNestedConfig("depoimentos", "depoimento2", "texto", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </Card>

                {/* Depoimento 3 */}
                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Depoimento 3</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="depoimento3Nome">Nome</Label>
                      <Input
                        id="depoimento3Nome"
                        value={config.depoimentos?.depoimento3?.nome || ""}
                        onChange={(e) => updateNestedConfig("depoimentos", "depoimento3", "nome", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="depoimento3Cargo">Cargo</Label>
                      <Input
                        id="depoimento3Cargo"
                        value={config.depoimentos?.depoimento3?.cargo || ""}
                        onChange={(e) => updateNestedConfig("depoimentos", "depoimento3", "cargo", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="depoimento3Texto">Texto</Label>
                      <Textarea
                        id="depoimento3Texto"
                        value={config.depoimentos?.depoimento3?.texto || ""}
                        onChange={(e) => updateNestedConfig("depoimentos", "depoimento3", "texto", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Público Alvo */}
          <TabsContent value="publico" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Público Alvo</CardTitle>
                <CardDescription>Configure a seção do público alvo</CardDescription>
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
                  <Label htmlFor="publicoTextoIntroducao">Texto de Introdução</Label>
                  <Textarea
                    id="publicoTextoIntroducao"
                    value={config.publicoAlvo?.textoIntroducao || ""}
                    onChange={(e) => handleInputChange("publicoAlvo", "textoIntroducao", e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="publicoCtaTexto">Texto CTA</Label>
                  <Input
                    id="publicoCtaTexto"
                    value={config.publicoAlvo?.ctaTexto || ""}
                    onChange={(e) => handleInputChange("publicoAlvo", "ctaTexto", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="publicoCtaSubtexto">Subtexto CTA</Label>
                  <Input
                    id="publicoCtaSubtexto"
                    value={config.publicoAlvo?.ctaSubtexto || ""}
                    onChange={(e) => handleInputChange("publicoAlvo", "ctaSubtexto", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Garantia */}
          <TabsContent value="garantia" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seção Garantia</CardTitle>
                <CardDescription>Configure a seção de garantia</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="garantiaSeloTexto1">Selo Texto 1</Label>
                  <Input
                    id="garantiaSeloTexto1"
                    value={config.garantia?.seloTexto1 || ""}
                    onChange={(e) => handleInputChange("garantia", "seloTexto1", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="garantiaSeloTexto2">Selo Texto 2</Label>
                  <Input
                    id="garantiaSeloTexto2"
                    value={config.garantia?.seloTexto2 || ""}
                    onChange={(e) => handleInputChange("garantia", "seloTexto2", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="garantiaSeloTexto3">Selo Texto 3</Label>
                  <Input
                    id="garantiaSeloTexto3"
                    value={config.garantia?.seloTexto3 || ""}
                    onChange={(e) => handleInputChange("garantia", "seloTexto3", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="garantiaCard1Titulo">Card 1 - Título</Label>
                  <Input
                    id="garantiaCard1Titulo"
                    value={config.garantia?.card1Titulo || ""}
                    onChange={(e) => handleInputChange("garantia", "card1Titulo", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="garantiaCard1Descricao">Card 1 - Descrição</Label>
                  <Textarea
                    id="garantiaCard1Descricao"
                    value={config.garantia?.card1Descricao || ""}
                    onChange={(e) => handleInputChange("garantia", "card1Descricao", e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="garantiaCard2Titulo">Card 2 - Título</Label>
                  <Input
                    id="garantiaCard2Titulo"
                    value={config.garantia?.card2Titulo || ""}
                    onChange={(e) => handleInputChange("garantia", "card2Titulo", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="garantiaCard2Descricao">Card 2 - Descrição</Label>
                  <Textarea
                    id="garantiaCard2Descricao"
                    value={config.garantia?.card2Descricao || ""}
                    onChange={(e) => handleInputChange("garantia", "card2Descricao", e.target.value)}
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
                <CardDescription>Configure a página de agradecimento</CardDescription>
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
                  <Label htmlFor="obrigadoVideoTitulo">Título do Vídeo</Label>
                  <Input
                    id="obrigadoVideoTitulo"
                    value={config.obrigado?.videoTitulo || ""}
                    onChange={(e) => handleInputChange("obrigado", "videoTitulo", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="obrigadoVideoDescricao">Descrição do Vídeo</Label>
                  <Textarea
                    id="obrigadoVideoDescricao"
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
