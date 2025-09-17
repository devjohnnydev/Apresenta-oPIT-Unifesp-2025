import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Lock, Unlock, Save, Eye, Settings } from "lucide-react";
import { Link } from "wouter";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedSlide, setSelectedSlide] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const { toast } = useToast();

  // Simple authentication - in a real app, this would be more secure
  const handleAuth = () => {
    if (password === "admin2025") {
      setIsAuthenticated(true);
      toast({
        title: "Acesso liberado",
        description: "Bem-vindo ao painel administrativo!",
      });
    } else {
      toast({
        title: "Senha incorreta",
        description: "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const { data: presentation, isLoading } = useQuery({
    queryKey: ["/api/presentations/default"],
    enabled: isAuthenticated,
  });

  const updateMutation = useMutation({
    mutationFn: async (updates: any) => {
      const response = await fetch(`/api/presentations/default`, {
        method: "PATCH",
        body: JSON.stringify(updates),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error('Failed to update');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/presentations/default"] });
      toast({
        title: "Atualização salva",
        description: "As alterações foram salvas com sucesso!",
      });
      setEditingField(null);
      setEditValue("");
    },
    onError: () => {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    if (!selectedSlide || !editingField) return;

    const slide = (presentation as any).slides.find((s: any) => s.id === selectedSlide);
    if (!slide) return;

    let updates;
    if (editingField === "title" || editingField === "subtitle") {
      updates = {
        slides: (presentation as any).slides.map((s: any) =>
          s.id === selectedSlide ? { ...s, [editingField]: editValue } : s
        ),
      };
    } else {
      // Handle nested content updates
      const [section, field] = editingField.split(".");
      updates = {
        slides: (presentation as any).slides.map((s: any) =>
          s.id === selectedSlide
            ? {
                ...s,
                content: {
                  ...s.content,
                  [section]: field ? { ...s.content[section], [field]: editValue } : editValue,
                },
              }
            : s
        ),
      };
    }

    updateMutation.mutate(updates);
  };

  const startEditing = (slideId: string, field: string, currentValue: string) => {
    setSelectedSlide(slideId);
    setEditingField(field);
    setEditValue(currentValue);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Painel Administrativo</CardTitle>
            <CardDescription>
              Área restrita para edição da apresentação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha de Acesso</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite a senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAuth()}
                data-testid="input-admin-password"
              />
            </div>
            <Button onClick={handleAuth} className="w-full" data-testid="button-login">
              <Unlock className="w-4 h-4 mr-2" />
              Entrar
            </Button>
            <div className="text-center">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-back-presentation">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Apresentação
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados da apresentação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Painel Administrativo
                </h1>
                <p className="text-muted-foreground">
                  Gerencie o conteúdo da apresentação
                </p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" data-testid="button-view-presentation">
                <Eye className="w-4 h-4 mr-2" />
                Ver Apresentação
              </Button>
            </Link>
          </div>
        </div>

        {/* Slides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(presentation as any).slides.map((slide: any, index: number) => (
            <Card key={slide.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-blue-600">
                    Slide {index + 1}
                  </div>
                  <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {slide.type}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {slide.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-2"
                    onClick={() => startEditing(slide.id, "title", slide.title)}
                    data-testid={`button-edit-title-${slide.id}`}
                  >
                    <div className="text-xs text-muted-foreground">Título:</div>
                    <div className="font-medium line-clamp-2">{slide.title}</div>
                  </Button>
                  
                  {slide.subtitle && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-2"
                      onClick={() => startEditing(slide.id, "subtitle", slide.subtitle)}
                      data-testid={`button-edit-subtitle-${slide.id}`}
                    >
                      <div className="text-xs text-muted-foreground">Subtítulo:</div>
                      <div className="text-sm line-clamp-2">{slide.subtitle}</div>
                    </Button>
                  )}
                  
                  {/* Content fields preview */}
                  {slide.content && Object.keys(slide.content).length > 0 && (
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      Conteúdo: {Object.keys(slide.content).length} seções
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingField} onOpenChange={() => setEditingField(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Conteúdo</DialogTitle>
              <DialogDescription>
                Faça as alterações necessárias no conteúdo do slide.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-field">
                  {editingField === "title" ? "Título" : 
                   editingField === "subtitle" ? "Subtítulo" : 
                   `Campo: ${editingField}`}
                </Label>
                <Textarea
                  id="edit-field"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={6}
                  placeholder="Digite o novo conteúdo..."
                  data-testid="textarea-edit-content"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setEditingField(null)}
                  data-testid="button-cancel-edit"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  data-testid="button-save-edit"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updateMutation.isPending ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}