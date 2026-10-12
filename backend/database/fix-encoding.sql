-- ============================================================
-- Ocean Music — Correção de codificação (mojibake)
-- Corrige dados inseridos com encoding errado durante o seed
-- inicial (Etapa 12). Causa: psql no Windows leu o arquivo
-- seed.sql com uma codificação diferente de UTF-8.
-- Esta função detecta e corrige automaticamente; se um texto já
-- estiver correto, ela o devolve sem alterar (seguro de rodar
-- mais de uma vez).
-- ============================================================

CREATE OR REPLACE FUNCTION fix_mojibake(input text) RETURNS text AS $$
BEGIN
  RETURN convert_from(convert_to(input, 'LATIN1'), 'UTF8');
EXCEPTION WHEN OTHERS THEN
  RETURN input;
END;
$$ LANGUAGE plpgsql;

-- Catálogo
UPDATE areas SET name = fix_mojibake(name);
UPDATE styles SET name = fix_mojibake(name);
UPDATE goals SET name = fix_mojibake(name);

-- Conteúdo
UPDATE tracks SET title = fix_mojibake(title);
UPDATE stages SET title = fix_mojibake(title);
UPDATE lessons SET title = fix_mojibake(title);
UPDATE lessons SET content = fix_mojibake(content::text)::jsonb;
UPDATE exercises SET prompt = fix_mojibake(prompt);
UPDATE exercises SET explanation = fix_mojibake(explanation);
UPDATE exercises SET payload = fix_mojibake(payload::text)::jsonb;

-- Limpeza: a função só era necessária para esta correção pontual
DROP FUNCTION fix_mojibake(text);