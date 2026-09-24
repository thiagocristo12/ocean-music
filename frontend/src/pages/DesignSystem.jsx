import { useState } from 'react';
import { Button, Card, Chip, Input, ProgressBar } from '../components/ui';

const oceanColors = [
  { name: 'ocean-50', className: 'bg-ocean-50' },
  { name: 'ocean-100', className: 'bg-ocean-100' },
  { name: 'ocean-200', className: 'bg-ocean-200' },
  { name: 'ocean-300', className: 'bg-ocean-300' },
  { name: 'ocean-400', className: 'bg-ocean-400' },
  { name: 'ocean-500', className: 'bg-ocean-500' },
  { name: 'ocean-600', className: 'bg-ocean-600' },
  { name: 'ocean-700', className: 'bg-ocean-700' },
  { name: 'ocean-800', className: 'bg-ocean-800' },
  { name: 'ocean-900', className: 'bg-ocean-900' },
  { name: 'ocean-950', className: 'bg-ocean-950' },
];

const otherColors = [
  { name: 'aqua-400', className: 'bg-aqua-400' },
  { name: 'success', className: 'bg-success' },
  { name: 'danger', className: 'bg-danger' },
  { name: 'sun', className: 'bg-sun' },
  { name: 'ink-900', className: 'bg-ink-900' },
  { name: 'ink-500', className: 'bg-ink-500' },
  { name: 'ink-200', className: 'bg-ink-200' },
];

const musicStyles = ['Rock', 'Sertanejo', 'Clássico', 'Pop'];

function Section({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-ink-900">{title}</h2>
      {children}
    </section>
  );
}

function Swatch({ name, className }) {
  return (
    <div>
      <div className={`h-14 rounded-xl border border-ink-100 ${className}`} />
      <p className="mt-1 text-xs text-ink-500">{name}</p>
    </div>
  );
}

function DesignSystem() {
  const [selectedStyles, setSelectedStyles] = useState(['Rock']);
  const [name, setName] = useState('');

  function toggleStyle(style) {
    setSelectedStyles((current) =>
      current.includes(style) ? current.filter((s) => s !== style) : [...current, style]
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-10 p-4 sm:p-6 md:p-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-ocean-600">Etapa 3</p>
        <h1 className="text-3xl font-bold text-ink-900 md:text-4xl">Design System · Ocean Music</h1>
        <p className="mt-2 text-ink-500">
          Página temporária para visualizar cores, tipografia e componentes base.
        </p>
      </header>

      <Section title="Cores">
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-11">
          {oceanColors.map((color) => (
            <Swatch key={color.name} {...color} />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {otherColors.map((color) => (
            <Swatch key={color.name} {...color} />
          ))}
        </div>
      </Section>

      <Section title="Tipografia">
        <Card className="space-y-2">
          <p className="font-display text-3xl font-bold">Sora: títulos e destaques</p>
          <p className="text-lg">Inter: textos de lição com 18 px, fáceis de ler.</p>
          <p className="text-base text-ink-700">Inter 16 px: texto padrão da interface.</p>
          <p className="text-sm text-ink-500">Inter 14 px: legendas e informações de apoio.</p>
        </Card>
      </Section>

      <Section title="Botões">
        <div className="flex flex-wrap gap-3">
          <Button>Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="ghost">Discreto</Button>
          <Button disabled>Desabilitado</Button>
        </div>
        <Button fullWidth>Botão de largura total (mobile)</Button>
      </Section>

      <Section title="Card e barra de progresso">
        <Card className="space-y-4">
          <div>
            <p className="text-sm font-medium text-ocean-600">Continue de onde parou</p>
            <h3 className="text-xl font-semibold">Acordes básicos</h3>
            <p className="text-ink-500">Violão · Lição: Em e Am</p>
          </div>
          <ProgressBar value={60} label="Progresso da trilha" />
          <Button fullWidth>Continuar</Button>
        </Card>
        <Card className="space-y-4">
          <ProgressBar value={0} label="Começando (0%)" />
          <ProgressBar value={100} label="Concluído (100%)" />
        </Card>
      </Section>

      <Section title="Campos de formulário">
        <Card className="space-y-4">
          <Input
            label="Nome"
            placeholder="Como devemos te chamar?"
            hint="Aparece na saudação do painel."
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="Mínimo de 8 caracteres"
            error="Use pelo menos 8 caracteres."
          />
        </Card>
      </Section>

      <Section title="Chips (seleção)">
        <div className="flex flex-wrap gap-2">
          {musicStyles.map((style) => (
            <Chip
              key={style}
              selected={selectedStyles.includes(style)}
              onClick={() => toggleStyle(style)}
            >
              {style}
            </Chip>
          ))}
        </div>
        <p className="text-sm text-ink-500">
          Selecionados: {selectedStyles.length > 0 ? selectedStyles.join(', ') : 'nenhum'}
        </p>
      </Section>
    </main>
  );
}

export default DesignSystem;