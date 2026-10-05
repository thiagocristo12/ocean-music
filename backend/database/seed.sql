-- ============================================================
-- Ocean Music — Dados iniciais (seed)
-- Espelha o conteúdo hoje em data/catalog.js, data/tracks.js,
-- data/trackContent.js e data/exerciseContent.js.
-- ============================================================

-- ========== Catálogo ==========

INSERT INTO areas (slug, name, position) VALUES
  ('violao', 'Violão', 1),
  ('piano', 'Piano', 2),
  ('canto', 'Canto', 3),
  ('teoria', 'Teoria Musical', 4),
  ('ritmo', 'Ritmo', 5),
  ('performance', 'Performance', 6);

INSERT INTO styles (slug, name, position) VALUES
  ('rock', 'Rock', 1),
  ('sertanejo', 'Sertanejo', 2),
  ('classico', 'Clássico', 3),
  ('pop', 'Pop', 4);

INSERT INTO goals (slug, name, area_id, position) VALUES
  ('aprender-acordes', 'Aprender acordes', (SELECT id FROM areas WHERE slug = 'violao'), 1),
  ('tocar-primeiras-musicas', 'Tocar minhas primeiras músicas', (SELECT id FROM areas WHERE slug = 'violao'), 2),
  ('ler-partitura', 'Ler partitura', (SELECT id FROM areas WHERE slug = 'piano'), 3),
  ('melhorar-ritmo', 'Melhorar meu ritmo', (SELECT id FROM areas WHERE slug = 'ritmo'), 4),
  ('entender-teoria', 'Entender teoria musical', (SELECT id FROM areas WHERE slug = 'teoria'), 5),
  ('aperfeicoar-teoria', 'Aperfeiçoar minha teoria', (SELECT id FROM areas WHERE slug = 'teoria'), 6),
  ('cantar-afinado', 'Cantar afinado', (SELECT id FROM areas WHERE slug = 'canto'), 7),
  ('perder-medo-de-se-apresentar', 'Perder o medo de se apresentar', (SELECT id FROM areas WHERE slug = 'performance'), 8);

-- ========== Trilhas ==========

INSERT INTO tracks (slug, title, area_id, level, total_lessons, position) VALUES
  ('violao-primeiros-passos', 'Violão: Primeiros Passos', (SELECT id FROM areas WHERE slug = 'violao'), 'beginner', 6, 1),
  ('violao-evoluindo', 'Violão: Evoluindo', (SELECT id FROM areas WHERE slug = 'violao'), 'intermediate', 5, 2),
  ('piano-primeiros-passos', 'Piano: Primeiros Passos', (SELECT id FROM areas WHERE slug = 'piano'), 'beginner', 6, 3),
  ('piano-evoluindo', 'Piano: Evoluindo', (SELECT id FROM areas WHERE slug = 'piano'), 'intermediate', 6, 4),
  ('teoria-fundamentos', 'Teoria Musical: Fundamentos', (SELECT id FROM areas WHERE slug = 'teoria'), 'beginner', 6, 5),
  ('teoria-harmonia-escalas', 'Teoria Musical: Harmonia e Escalas', (SELECT id FROM areas WHERE slug = 'teoria'), 'intermediate', 5, 6),
  ('canto-primeiros-passos', 'Canto: Primeiros Passos', (SELECT id FROM areas WHERE slug = 'canto'), 'beginner', 5, 7),
  ('ritmo-rock-sertanejo', 'Ritmo: Levadas de Rock e Sertanejo', (SELECT id FROM areas WHERE slug = 'ritmo'), 'beginner', 4, 8),
  ('performance-primeiros-passos', 'Performance: Primeiros Passos no Palco', (SELECT id FROM areas WHERE slug = 'performance'), 'beginner', 4, 9);

INSERT INTO track_goals (track_id, goal_id)
  SELECT t.id, g.id FROM tracks t, goals g WHERE
    (t.slug = 'violao-primeiros-passos' AND g.slug IN ('aprender-acordes', 'tocar-primeiras-musicas')) OR
    (t.slug = 'violao-evoluindo' AND g.slug = 'aprender-acordes') OR
    (t.slug = 'piano-primeiros-passos' AND g.slug = 'ler-partitura') OR
    (t.slug = 'piano-evoluindo' AND g.slug IN ('ler-partitura', 'aperfeicoar-teoria')) OR
    (t.slug = 'teoria-fundamentos' AND g.slug = 'entender-teoria') OR
    (t.slug = 'teoria-harmonia-escalas' AND g.slug IN ('aperfeicoar-teoria', 'entender-teoria')) OR
    (t.slug = 'canto-primeiros-passos' AND g.slug = 'cantar-afinado') OR
    (t.slug = 'ritmo-rock-sertanejo' AND g.slug = 'melhorar-ritmo') OR
    (t.slug = 'performance-primeiros-passos' AND g.slug = 'perder-medo-de-se-apresentar');

INSERT INTO track_styles (track_id, style_id)
  SELECT t.id, s.id FROM tracks t, styles s WHERE
    (t.slug = 'violao-primeiros-passos' AND s.slug IN ('rock', 'pop', 'sertanejo')) OR
    (t.slug = 'violao-evoluindo' AND s.slug IN ('rock', 'pop')) OR
    (t.slug = 'piano-primeiros-passos' AND s.slug IN ('classico', 'pop')) OR
    (t.slug = 'piano-evoluindo' AND s.slug = 'classico') OR
    (t.slug = 'teoria-harmonia-escalas' AND s.slug = 'classico') OR
    (t.slug = 'canto-primeiros-passos' AND s.slug = 'pop') OR
    (t.slug = 'ritmo-rock-sertanejo' AND s.slug IN ('rock', 'sertanejo'));

-- ========== Etapas e lições (completo só para Violão: Primeiros Passos) ==========

INSERT INTO stages (track_id, slug, title, position)
  SELECT id, 'fundamentos', 'Fundamentos', 1 FROM tracks WHERE slug = 'violao-primeiros-passos'
  UNION ALL
  SELECT id, 'acordes-basicos', 'Acordes básicos', 2 FROM tracks WHERE slug = 'violao-primeiros-passos'
  UNION ALL
  SELECT id, 'ritmos-e-musicas', 'Ritmos e músicas', 3 FROM tracks WHERE slug = 'violao-primeiros-passos';

INSERT INTO lessons (stage_id, slug, title, position, content) VALUES
  ((SELECT id FROM stages WHERE slug = 'fundamentos'), 'conhecendo-o-violao', 'Conhecendo o violão', 1,
   '[{"type":"text","title":"As partes do violão","body":"O violão tem corpo, braço e cordas. Você vai usar esses nomes o tempo todo, então vale a pena conhecê-los desde já."}]'),
  ((SELECT id FROM stages WHERE slug = 'fundamentos'), 'postura-e-maos', 'Postura e mãos', 2,
   '[{"type":"tip","body":"Sente-se com a coluna reta e apoie o violão no colo, sem forçar o pulso da mão que aperta as cordas."}]'),
  ((SELECT id FROM stages WHERE slug = 'acordes-basicos'), 'em-e-am', 'Acordes básicos: Em e Am', 1,
   '[{"type":"text","title":"O que é um acorde?","body":"Um acorde é um conjunto de notas tocadas juntas. Em e Am são dois dos primeiros acordes que todo violonista aprende."}]'),
  ((SELECT id FROM stages WHERE slug = 'acordes-basicos'), 'troca-de-acordes', 'Troca de acordes', 2,
   '[{"type":"tip","body":"Pratique trocar entre Em e Am devagar, contando até 4 a cada troca, antes de tentar acelerar."}]'),
  ((SELECT id FROM stages WHERE slug = 'ritmos-e-musicas'), 'ritmos', 'Ritmos', 1,
   '[{"type":"text","title":"Batida simples em 4/4","body":"Uma batida básica alterna entre para baixo e para cima, contando 1 e 2 e 3 e 4."}]'),
  ((SELECT id FROM stages WHERE slug = 'ritmos-e-musicas'), 'primeiras-musicas', 'Primeiras músicas', 2,
   '[{"type":"tip","body":"Escolha uma música com poucos acordes para começar, mesmo que ainda não saia perfeita."}]');

INSERT INTO exercises (lesson_id, key, position, type, prompt, payload, solution, explanation) VALUES
  ((SELECT id FROM lessons WHERE slug = 'conhecendo-o-violao'), 'ex-1', 1, 'multiple_choice',
   'Quantas cordas tem um violão comum?',
   '{"options":[{"id":"a","text":"4"},{"id":"b","text":"6"},{"id":"c","text":"8"}]}',
   '{"correctOptionId":"b"}', 'O violão comum tem 6 cordas.'),
  ((SELECT id FROM lessons WHERE slug = 'conhecendo-o-violao'), 'ex-2', 2, 'true_false',
   'As cordas mais grossas do violão produzem sons mais agudos.', '{}',
   '{"value":false}', 'É o contrário: cordas mais grossas produzem sons mais graves.'),

  ((SELECT id FROM lessons WHERE slug = 'postura-e-maos'), 'ex-1', 1, 'true_false',
   'Forçar o pulso ajuda a tocar mais rápido.', '{}',
   '{"value":false}', 'Forçar o pulso machuca e atrapalha a técnica a longo prazo.'),
  ((SELECT id FROM lessons WHERE slug = 'postura-e-maos'), 'ex-2', 2, 'multiple_choice',
   'Para destros, qual mão geralmente aperta as cordas no braço do violão?',
   '{"options":[{"id":"a","text":"Direita"},{"id":"b","text":"Esquerda"}]}',
   '{"correctOptionId":"b"}', 'Para destros, a mão esquerda aperta as cordas e a direita toca.'),

  ((SELECT id FROM lessons WHERE slug = 'em-e-am'), 'ex-1', 1, 'multiple_choice',
   'Quais notas formam o acorde de Lá menor (Am)?',
   '{"options":[{"id":"a","text":"Lá, Dó, Mi"},{"id":"b","text":"Lá, Dó#, Mi"},{"id":"c","text":"Lá, Si, Mi"}]}',
   '{"correctOptionId":"a"}', 'Am tem Lá (fundamental), Dó (terça menor) e Mi (quinta).'),
  ((SELECT id FROM lessons WHERE slug = 'em-e-am'), 'ex-2', 2, 'true_false',
   'O acorde de Em pode ser tocado com apenas dois dedos.', '{}',
   '{"value":true}', 'Sim: um dedo na 5ª corda e outro na 4ª, ambos na 2ª casa.'),

  ((SELECT id FROM lessons WHERE slug = 'troca-de-acordes'), 'ex-1', 1, 'true_false',
   'É normal levar alguns dias para trocar de acorde sem travar.', '{}',
   '{"value":true}', 'Isso é parte natural do aprendizado — a repetição cria memória muscular.'),
  ((SELECT id FROM lessons WHERE slug = 'troca-de-acordes'), 'ex-2', 2, 'multiple_choice',
   'O que ajuda mais a ganhar velocidade na troca de acordes?',
   '{"options":[{"id":"a","text":"Praticar rápido desde o início"},{"id":"b","text":"Praticar devagar e com constância"},{"id":"c","text":"Trocar de violão"}]}',
   '{"correctOptionId":"b"}', 'Praticar devagar e com constância cria a base para acelerar depois.'),

  ((SELECT id FROM lessons WHERE slug = 'ritmos'), 'ex-1', 1, 'multiple_choice',
   'Em um compasso 4/4, quantos tempos você conta?',
   '{"options":[{"id":"a","text":"2"},{"id":"b","text":"3"},{"id":"c","text":"4"}]}',
   '{"correctOptionId":"c"}', '4/4 significa 4 tempos por compasso.'),
  ((SELECT id FROM lessons WHERE slug = 'ritmos'), 'ex-2', 2, 'true_false',
   'Uma batida de violão só pode usar movimentos para baixo.', '{}',
   '{"value":false}', 'A maioria das batidas combina movimentos para baixo e para cima.'),

  ((SELECT id FROM lessons WHERE slug = 'primeiras-musicas'), 'ex-1', 1, 'true_false',
   'Tocar uma música errando algumas vezes já é um bom sinal de progresso.', '{}',
   '{"value":true}', 'Errar faz parte do processo — o importante é continuar tentando.'),
  ((SELECT id FROM lessons WHERE slug = 'primeiras-musicas'), 'ex-2', 2, 'multiple_choice',
   'O que é mais importante ao tocar sua primeira música?',
   '{"options":[{"id":"a","text":"Tocar perfeitamente"},{"id":"b","text":"Manter o ritmo, mesmo com pequenos erros"},{"id":"c","text":"Tocar o mais rápido possível"}]}',
   '{"correctOptionId":"b"}', 'Manter o ritmo é mais importante que perfeição no começo.');

-- ========== Usuários de demonstração ==========
-- ⚠️ password_hash abaixo é um texto de PLACEHOLDER, só para a Etapa 12.
-- A Etapa 13 troca por um hash real gerado com crypto.scrypt (decisão
-- de segurança já prevista desde a análise arquitetural inicial).

INSERT INTO users (id, name, email, password_hash) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Ana', 'ana@ocean.music', 'PLACEHOLDER_ETAPA_13'),
  ('22222222-2222-2222-2222-222222222222', 'Bruno', 'bruno@ocean.music', 'PLACEHOLDER_ETAPA_13');

INSERT INTO profiles (user_id, level, prior_experience) VALUES
  ('11111111-1111-1111-1111-111111111111', 'beginner', 'none'),
  ('22222222-2222-2222-2222-222222222222', 'intermediate', 'regular');

INSERT INTO profile_areas (user_id, area_id, priority) VALUES
  ('11111111-1111-1111-1111-111111111111', (SELECT id FROM areas WHERE slug = 'violao'), 1),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM areas WHERE slug = 'piano'), 1),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM areas WHERE slug = 'teoria'), 2);

INSERT INTO profile_goals (user_id, goal_id) VALUES
  ('11111111-1111-1111-1111-111111111111', (SELECT id FROM goals WHERE slug = 'aprender-acordes')),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM goals WHERE slug = 'aperfeicoar-teoria'));

INSERT INTO profile_styles (user_id, style_id) VALUES
  ('11111111-1111-1111-1111-111111111111', (SELECT id FROM styles WHERE slug = 'rock')),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM styles WHERE slug = 'classico'));