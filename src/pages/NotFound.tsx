import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "antd";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[image:var(--auth-bg)] p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold mb-2">Página não encontrada</h2>
          <p className="text-foreground/70 mb-8">
            Ops! A página que você está procurando não existe.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => window.history.back()}
            className="bg-auth-card hover:bg-background/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-[#1677FF] hover:shadow-[var(--shadow-glow)] transition-all duration-300 text-white"
          >
            <Home className="w-4 h-4 mr-2" />
            Ir para Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
