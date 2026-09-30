export const levelLabels = { beginner: 'Iniciante', intermediate: 'Intermediário' };

export const experienceLabels = {
  none: 'Nunca teve contato com música',
  some: 'Já teve algum contato',
  regular: 'Estuda com regularidade',
};

// Traduz uma lista de slugs (ex.: ['violao', 'piano']) para os nomes de
// exibição, usando um catálogo (areas, goals ou styles) como referência.
export function findNames(list, slugs) {
  return slugs.map((slug) => list.find((item) => item.slug === slug)?.name).filter(Boolean);
}