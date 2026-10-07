import * as catalogRepository from './catalogRepository.js';

// Formato idêntico ao data/catalog.js do mock: { slug, name } para áreas e
// estilos; { slug, name, areaSlug } para objetivos (usado para filtrar os
// objetivos pela área escolhida no onboarding — ver StepGoals.jsx).
export async function getOptions() {
  const [areas, styles, goals] = await Promise.all([
    catalogRepository.listAreas(),
    catalogRepository.listStyles(),
    catalogRepository.listGoals(),
  ]);

  return {
    areas: areas.map((area) => ({ slug: area.slug, name: area.name })),
    styles: styles.map((style) => ({ slug: style.slug, name: style.name })),
    goals: goals.map((goal) => ({ slug: goal.slug, name: goal.name, areaSlug: goal.area_slug })),
  };
}