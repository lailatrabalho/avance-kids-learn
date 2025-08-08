
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enforced?: boolean; // se true, impede fechar sem autenticar
}

const DEFAULT_EMAIL = "trabalholaila7@gmail.com";
const DEFAULT_PASSWORD = "Lailaavance1020@";

export default function LoginModal({ open, onOpenChange, enforced = true }: LoginModalProps) {
  const { toast } = useToast();
  const { signIn } = useSupabaseAuth();
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [submitting, setSubmitting] = useState(false);

  const handleOpenChange = (next: boolean) => {
    if (enforced && !submitting) {
      // Não permite fechar enquanto não autenticar
      if (next === false) return;
    }
    onOpenChange(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    setSubmitting(false);

    if (error) {
      console.error("Erro ao entrar:", error);
      toast({
        title: "Falha no login",
        description: `Verifique o e-mail e a senha. Detalhes: ${error.message}`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Login realizado",
      description: "Acesso ao painel liberado.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Área Administrativa</DialogTitle>
          <DialogDescription>
            Faça login para acessar o Painel Admin.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Entrando..." : "Entrar"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Dica: use o e-mail e a senha fornecidos.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
