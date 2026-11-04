import { useEffect, useState } from 'react';
import { Button, Card } from './ui';

const messages = {
  connection: {
    title: 'Sem conexão com o servidor',
    text: 'Não conseguimos falar com o servidor. Verifique sua conexão e tente novamente.',
  },
  server: {
    title: 'O servidor encontrou um problema',
    text: 'Algo deu errado do nosso lado. Tente novamente em instantes.',
  },
};

// Cobre a tela inteira quando o apiClient avisa que a comunicação falhou.
// Funciona para TODAS as páginas sem precisar mexer em nenhuma delas.
function ConnectionBanner() {
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    function handleProblem(event) {
      // A página inicial é estática: continua acessível sem servidor.
      if (window.location.pathname === '/') return;
      setProblem(event.detail?.kind === 'server' ? 'server' : 'connection');
    }

    window.addEventListener('ocean:connection-problem', handleProblem);
    return () => window.removeEventListener('ocean:connection-problem', handleProblem);
  }, []);

  if (!problem) return null;

  const { title, text } = messages[problem];

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="connection-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ocean-50 p-4"
    >
      <Card className="w-full max-w-sm space-y-4 text-center">
        <h1 id="connection-title" className="text-xl font-bold text-ink-900">
          {title}
        </h1>
        <p className="text-ink-500">{text}</p>
        <Button fullWidth onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </Card>
    </div>
  );
}

export default ConnectionBanner;