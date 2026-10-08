import { pool } from '../../database/pool.js';

// Duas consultas auxiliares (não uma por trilha) para montar goalSlugs e
// styleSlugs de todas as trilhas de uma vez — evita o problema de "N+1
// consultas" (uma consulta extra para cada trilha da lista).
async function fetchGoalSlugsByTrackId() {
  const result = await pool.query(
    `SELECT tg.track_id, g.slug FROM track_goals tg JOIN goals g ON g.id = tg.goal_id`
  );
  return groupSlugsByTrackId(result.rows);
}

async function fetchStyleSlugsByTrackId() {
  const result = await pool.query(
    `SELECT ts.track_id, s.slug FROM track_styles ts JOIN styles s ON s.id = ts.style_id`
  );
  return groupSlugsByTrackId(result.rows);
}

function groupSlugsByTrackId(rows) {
  const map = {};
  for (const row of rows) {
    if (!map[row.track_id]) map[row.track_id] = [];
    map[row.track_id].push(row.slug);
  }
  return map;
}

export async function listTracks() {
  const [tracksResult, goalsByTrackId, stylesByTrackId] = await Promise.all([
    pool.query(
      `SELECT t.id, t.slug, t.title, a.slug AS area_slug, t.level, t.total_lessons, t.position
       FROM tracks t
       JOIN areas a ON a.id = t.area_id
       ORDER BY t.position`
    ),
    fetchGoalSlugsByTrackId(),
    fetchStyleSlugsByTrackId(),
  ]);

  return tracksResult.rows.map((track) => ({
    slug: track.slug,
    title: track.title,
    areaSlug: track.area_slug,
    level: track.level,
    totalLessons: track.total_lessons,
    position: track.position,
    goalSlugs: goalsByTrackId[track.id] ?? [],
    styleSlugs: stylesByTrackId[track.id] ?? [],
  }));
}

// Trilha + suas etapas + as lições de cada etapa, em ordem.
// Não inclui exercícios (isso é responsabilidade de lessonRepository,
// buscado só quando o usuário abre uma lição específica).
export async function findTrackBySlug(slug) {
  const trackResult = await pool.query(
    `SELECT t.id, t.slug, t.title, a.slug AS area_slug, t.level, t.total_lessons
     FROM tracks t
     JOIN areas a ON a.id = t.area_id
     WHERE t.slug = $1`,
    [slug]
  );
  const track = trackResult.rows[0];
  if (!track) return null;

  const rowsResult = await pool.query(
    `SELECT s.slug AS stage_slug, s.title AS stage_title, s.position AS stage_position,
            l.slug AS lesson_slug, l.title AS lesson_title, l.position AS lesson_position
     FROM stages s
     JOIN lessons l ON l.stage_id = s.id
     WHERE s.track_id = $1
     ORDER BY s.position, l.position`,
    [track.id]
  );

  // Agrupa as linhas (uma por lição) em etapas, preservando a ordem.
  const stagesBySlug = new Map();
  for (const row of rowsResult.rows) {
    if (!stagesBySlug.has(row.stage_slug)) {
      stagesBySlug.set(row.stage_slug, { slug: row.stage_slug, title: row.stage_title, lessons: [] });
    }
    stagesBySlug.get(row.stage_slug).lessons.push({ slug: row.lesson_slug, title: row.lesson_title });
  }

  return {
    slug: track.slug,
    title: track.title,
    areaSlug: track.area_slug,
    level: track.level,
    totalLessons: track.total_lessons,
    stages: [...stagesBySlug.values()],
  };
}