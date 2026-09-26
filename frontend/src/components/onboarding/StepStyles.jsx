import { Chip } from '../ui';

function StepStyles({ styles, selectedSlugs, onToggle }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-ink-900">Quais estilos você curte?</h2>
      <p className="mt-1 text-sm text-ink-500">
        Escolha até 3. Esse passo é opcional — se preferir, siga em frente sem marcar nada.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {styles.map((style) => (
          <Chip
            key={style.slug}
            selected={selectedSlugs.includes(style.slug)}
            onClick={() => onToggle(style.slug)}
          >
            {style.name}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default StepStyles;