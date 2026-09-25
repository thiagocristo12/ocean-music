import { Link } from 'react-router-dom';
import Logo from '../components/brand/Logo.jsx';
import WaveDivider from '../components/brand/WaveDivider.jsx';
import { Button, Card, ProgressBar, buttonBaseClasses, buttonVariants } from '../components/ui';

const features = [
  {
    title: 'Perfil musical',
    description:
      'Conte seu nível, instrumento e objetivos. O Ocean Music usa isso para saber o que recomendar.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" />
      </svg>
    ),
  },
  {
    title: 'Trilhas no seu ritmo',
    description:
      'Conteúdos organizados em uma sequência lógica, sem módulos travados nem aulas longas.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="5" cy="6" r="2" />
        <circle cx="19" cy="12" r="2" />
        <circle cx="9" cy="18" r="2" />
        <path d="M7 7l10 4M11 17l6-4" />
      </svg>
    ),
  },
  {
    title: 'Prática de verdade',
    description:
      'Exercícios interativos e feedback claro depois de cada resposta, não só teoria para ler.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M4 14v-4M9 18v-12M14 15v-6M19 12v-1" />
      </svg>
    ),
  },
];

function Landing() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-gradient-to-br from-ocean-950 via-ocean-800 to-ocean-600">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
          <Logo variant="white" />
          <Link to="/login" className="text-sm font-medium text-white/90 hover:text-white">
            Entrar
          </Link>
        </div>

        <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 text-center sm:px-6 sm:pb-24">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Aprenda música do seu jeito
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ocean-100">
            O Ocean Music entende seu perfil e mostra o que estudar agora: teoria, prática e
            exercícios, em passos curtos.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/cadastro" className={`${buttonBaseClasses} ${buttonVariants.secondary}`}>
              Começar agora
            </Link>
            <Link
              to="/login"
              className={`${buttonBaseClasses} border border-white/40 text-white hover:bg-white/10`}
            >
              Já tenho conta
            </Link>
          </div>
        </div>

        <WaveDivider color="#EEF6FF" />
      </section>

      {/* RECURSOS */}
      <section className="bg-ocean-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-ink-900 sm:text-3xl">
            Como o Ocean Music funciona
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-100 text-ocean-700">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-ink-900">{feature.title}</h3>
                <p className="mt-1 text-ink-500">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRÉVIA */}
      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-md">
          <h2 className="text-center text-2xl font-bold text-ink-900 sm:text-3xl">
            Veja como fica o seu painel
          </h2>
          <p className="mt-2 text-center text-ink-500">
            Um exemplo do que você vê ao entrar, já adaptado ao seu perfil.
          </p>
          <Card className="mt-8 space-y-4">
            <div>
              <p className="text-sm font-medium text-ocean-600">Continue de onde parou</p>
              <h3 className="text-xl font-semibold text-ink-900">Acordes básicos</h3>
              <p className="text-ink-500">Violão · Lição: Em e Am</p>
            </div>
            <ProgressBar value={60} label="Progresso da trilha" />
            <Button fullWidth disabled>
              Continuar
            </Button>
          </Card>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="border-t border-ink-100 bg-ocean-50 px-4 py-8 text-center text-sm text-ink-500 sm:px-6">
        <p>Ocean Music · Projeto Final em Análise e Desenvolvimento de Sistemas</p>
      </footer>
    </main>
  );
}

export default Landing;