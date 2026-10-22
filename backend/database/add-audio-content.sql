-- ============================================================
-- Ocean Music — Conteúdo de áudio (Etapa 14)
-- Adiciona uma demonstração sonora, um exercício de identificação
-- de nota e um bloco de prática com metrônomo à trilha "Violão:
-- Primeiros Passos" (a única com conteúdo completo — D-50).
-- ============================================================

-- Lição "Conhecendo o violão": adiciona demonstração de áudio
UPDATE lessons l
SET content = '[
  {"type":"text","title":"As partes do violão","body":"O violão tem corpo, braço e cordas. Você vai usar esses nomes o tempo todo, então vale a pena conhecê-los desde já."},
  {"type":"audio_demo","caption":"Ouça como soa a nota Mi — a mesma da 1ª corda (a mais fina) do violão solta.","stimulus":{"kind":"note","note":"E4"}}
]'::jsonb
FROM stages s, tracks t
WHERE l.stage_id = s.id AND s.track_id = t.id
  AND t.slug = 'violao-primeiros-passos' AND l.slug = 'conhecendo-o-violao';

-- Lição "Conhecendo o violão": adiciona exercício de identificação de nota
INSERT INTO exercises (lesson_id, key, position, type, prompt, payload, solution, explanation)
SELECT l.id, 'ex-3', 3, 'audio_choice', 'Qual nota você ouviu?',
  '{"stimulus":{"kind":"note","note":"A4"},"options":[{"id":"a","text":"Lá (A)"},{"id":"b","text":"Dó (C)"},{"id":"c","text":"Sol (G)"}]}'::jsonb,
  '{"correctOptionId":"a"}'::jsonb,
  'Essa é a nota Lá (A) — a mesma da 5ª corda solta do violão.'
FROM lessons l
JOIN stages s ON s.id = l.stage_id
JOIN tracks t ON t.id = s.track_id
WHERE t.slug = 'violao-primeiros-passos' AND l.slug = 'conhecendo-o-violao'
ON CONFLICT (lesson_id, key) DO NOTHING;

-- Lição "Ritmos": adiciona prática com metrônomo
UPDATE lessons l
SET content = '[
  {"type":"text","title":"Batida simples em 4/4","body":"Uma batida básica alterna entre para baixo e para cima, contando 1 e 2 e 3 e 4."},
  {"type":"practice","instruction":"Use o metrônomo abaixo e bata palmas (ou toque as cordas soltas) a cada clique, contando 1, 2, 3 e 4.","metronomeBpm":80}
]'::jsonb
FROM stages s, tracks t
WHERE l.stage_id = s.id AND s.track_id = t.id
  AND t.slug = 'violao-primeiros-passos' AND l.slug = 'ritmos';