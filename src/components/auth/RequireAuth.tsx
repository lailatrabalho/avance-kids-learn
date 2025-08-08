
import { useEffect, useState } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import LoginModal from "./LoginModal";

interface RequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { session, loading } = useSupabaseAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      setOpen(!session);
    }
  }, [loading, session]);

  return (
    <div className="relative">
      {/* Conteúdo fica "desativado" se não autenticado */}
      <div className={!session ? "pointer-events-none blur-[2px]" : ""}>
        {children}
      </div>

      {/* Modal de login obrigatório */}
      <LoginModal open={open} onOpenChange={setOpen} enforced />
    </div>
  );
}
