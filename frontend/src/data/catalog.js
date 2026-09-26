export const areas = [
  { slug: 'violao', name: 'Violão' },
  { slug: 'piano', name: 'Piano' },
  { slug: 'canto', name: 'Canto' },
  { slug: 'teoria', name: 'Teoria Musical' },
  { slug: 'ritmo', name: 'Ritmo' },
  { slug: 'performance', name: 'Performance' },
];

export const styles = [
  { slug: 'rock', name: 'Rock' },
  { slug: 'sertanejo', name: 'Sertanejo' },
  { slug: 'classico', name: 'Clássico' },
  { slug: 'pop', name: 'Pop' },
];

// Cada objetivo está ligado a uma área. Isso permite filtrar
// os objetivos mostrados de acordo com o que o usuário já escolheu.
export const goals = [
  { slug: 'aprender-acordes', name: 'Aprender acordes', areaSlug: 'violao' },
  { slug: 'tocar-primeiras-musicas', name: 'Tocar minhas primeiras músicas', areaSlug: 'violao' },
  { slug: 'ler-partitura', name: 'Ler partitura', areaSlug: 'piano' },
  { slug: 'melhorar-ritmo', name: 'Melhorar meu ritmo', areaSlug: 'ritmo' },
  { slug: 'entender-teoria', name: 'Entender teoria musical', areaSlug: 'teoria' },
  { slug: 'aperfeicoar-teoria', name: 'Aperfeiçoar minha teoria', areaSlug: 'teoria' },
  { slug: 'cantar-afinado', name: 'Cantar afinado', areaSlug: 'canto' },
  {
    slug: 'perder-medo-de-se-apresentar',
    name: 'Perder o medo de se apresentar',
    areaSlug: 'performance',
  },
];