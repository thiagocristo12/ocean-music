import { Component } from 'react';
import { Button, Card, buttonBaseClasses, buttonVariants } from './ui';

// Rede de segurança: se qualquer tela quebrar ao ser desenhada, mostra uma
// mensagem amigável em vez de uma tela em branco (decisão D-100).
// Precisa ser uma classe: é o único jeito do React de "capturar" erros de renderização.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Erro de renderização:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center bg-ocean-50 p-4">
        <Card className="w-full max-w-sm space-y-4 text-center">
          <h1 className="text-xl font-bold text-ink-900">Algo deu errado</h1>
          <p className="text-ink-500">
            Não foi possível mostrar esta tela. Tente recarregar a página.
          </p>
          <Button fullWidth onClick={() => window.location.reload()}>
            Recarregar a página
          </Button>
          <a href="/" className={`${buttonBaseClasses} ${buttonVariants.secondary} w-full`}>
            Ir para o início
          </a>
        </Card>
      </main>
    );
  }
}

export default ErrorBoundary;