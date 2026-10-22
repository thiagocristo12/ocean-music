# Ocean Music: ponto de continuidade
 
## Ambiente
- Windows, PowerShell, VS Code. Pasta: C:\Users\Usuario\Desktop\Coisas do Thiago\DEV\ocean-music
- Node 22.15.0 · Git 2.41 · PostgreSQL 18.6 (psql, já no PATH)
- Repositório no GitHub (branch main). Uma branch por etapa/sub-bloco.
- Dois (ou três) terminais em paralelo ao trabalhar: Terminal 1 = backend
  (`npm run dev`, dentro de backend/, fica aberto); Terminal 2 = frontend
  (`npm run dev`, dentro de frontend/, fica aberto); Terminal 3 = livre
  para git, psql, testes.

## Banco de dados
- Banco: ocean_music · superusuário: postgres · usuário da app: ocean_app
  (senha ocean_dev_password, dev local)
- schema.sql como `postgres` (precisou de GRANT CREATE ON SCHEMA public
  também, para funções); seed.sql e uso do dia a dia como `ocean_app`
  (GRANT explícito em tabelas/sequences — D-52)
- Scripts em backend/database/schema.sql e backend/database/seed.sql
- backend/database/add-audio-content.sql (Etapa 14): adiciona audio_demo,
  practice+metrônomo e exercício audio_choice à trilha de violão. Já
  aplicado ao banco em uso.
- Contas de teste REAIS (senha senha1234 para ambas):
  ana@ocean.music (beginner, violão, aprender-acordes, rock)
  bruno@ocean.music (intermediate, piano+teoria, aperfeiçoar-teoria, clássico)
- Se precisar resetar senha de um usuário do seed: gerar hash com
  `node -e "import('./src/core/password.js').then(m => m.hashPassword('senha1234').then(h => console.log(h)))"`
  (rodar dentro de backend/), depois UPDATE no banco usando aspas SIMPLES
  (PowerShell interpreta $ dentro de aspas duplas e corrompe o hash)

## ⚠️ IMPORTANTE: sempre usar UTF-8 ao rodar psql no Windows
- SEMPRE rodar `$env:PGCLIENTENCODING = "UTF8"` e `chcp 65001` antes de
  qualquer `psql -f algumScript.sql` ou sessão interativa
- Causa raiz de um bug já corrigido (D-84): o `psql` no Windows carregou
  o seed.sql original com codificação Windows-1252 em vez de UTF-8,
  corrompendo todo texto acentuado no banco (ex.: "Violão" virou "ViolÃ£o")
- O `psql` sozinho PODE mascarar esse tipo de erro (retraduz na exibição
  por coincidência) — a forma confiável de verificar é sempre consultar
  via API (`http://localhost:3001/api/...`), nunca só pelo terminal do psql
- Se precisar corrigir de novo no futuro: função `fix_mojibake` usando
  `convert_from(convert_to(texto, 'WIN1252'), 'UTF8')` — NÃO usar LATIN1
  (falha silenciosamente em maiúsculas acentuadas tipo "É", "Á")
  Rodar: UPDATE em areas.name, styles.name, goals.name, tracks.title,
  stages.title, lessons.title, lessons.content (jsonb::text), exercises.prompt,
  exercises.explanation, exercises.payload (jsonb::text)
  Verificar com: SELECT ... WHERE coluna LIKE '%Ã%' (deve voltar vazio)
  ocean_app pode precisar de GRANT CREATE ON SCHEMA public TO ocean_app
  (como postgres) antes de conseguir criar a função de correção

## Backend — COMPLETO desde a Etapa 13
- Node.js nativo (node:http), SEM Express. backend/src/: config/ · core/
  (router.js com suporte a middlewares, http.js, errors.js, password.js,
  cookies.js) · database/ (pool.js) · modules/<nome>/ (repository, service,
  controller) — health, auth, catalog, profile, tracks, lessons, progress
- Rodar: cd backend && npm run dev (precisa de backend/.env, não commitado)
- Todos os endpoints implementados e testados: /api/health, /api/auth/*,
  /api/catalog/options, /api/me/profile (GET/PUT), /api/tracks (+ /:slug),
  /api/lessons/:id, /api/me/progress (GET + POST complete-lesson)
- GET /api/lessons/:id devolve a `solution` do exercício (D-65) —
  avaliação acontece no navegador. Simplificação consciente, documentada;
  melhoria de segurança registrada p/ "Futuro" (endpoint de avaliação
  no servidor)

## Frontend ligado à API real — COMPLETO desde a Etapa 13.5
- services/apiClient.js: cliente HTTP central (fetch nativo +
  credentials: 'same-origin', cookie de sessão via proxy do Vite)
- Todos os services em API real: authService, profileService (rascunho do
  onboarding continua em localStorage — D-74), progressService,
  trackService, lessonService
- data/catalog.js AINDA existe (áreas/estilos/objetivos estáticos, D-81)
- Testes automatizados com dados de teste próprios dentro do arquivo
  (não importam mais data/tracks.js — D-80, D-83)

## Web Audio API — COMPLETO (Etapa 14)
- frontend/src/audio/: notes.js (conversão nota↔MIDI↔frequência, função
  pura) + audioEngine.js (síntese por osciladores, SEM arquivos de áudio
  externos — D-86). AudioContext só é criado/retomado em gesto do usuário
  (clique) — D-87, obrigatório por política dos navegadores
- Metrônomo com "look-ahead scheduling" (agenda pelo relógio do
  AudioContext, não setTimeout puro) — D-88, por precisão
- hooks/useAudio.js: usePlayNote() e useMetronome(), ponte entre o motor
  (puro JS) e componentes React
- components/audio/: Waveform.jsx (indicador visual), PlayButton.jsx,
  MetronomeControl.jsx (com ajuste de BPM 40-200 e pulso visual 4 tempos)
- Novo tipo de exercício `audio_choice` (components/exercises/AudioChoice.jsx)
  registrado em registry.js — ZERO alteração em ExerciseShell.jsx, Exercise.jsx
  ou no backend, graças à arquitetura de registry (D-31) e exercises.type
  sem CHECK no banco (D-48, D-89)
- Novos blocos de conteúdo: `audio_demo` (demonstração sonora) e `practice`
  (com metrônomo embutido), tratados em ContentBlock.jsx
- Conteúdo de áudio inserido SÓ na trilha "Violão: Primeiros Passos" (única
  completa — D-50/D-90), tanto no banco em uso quanto no seed.sql (editado
  manualmente, 3 trechos) — ver backend/database/add-audio-content.sql
- Reconhecimento de pitch via microfone NÃO implementado (D-91) — decisão
  consciente, documentada como próximo passo (ver seção "Ideias discutidas")

## >>> CHECKPOINT 2 MANTIDO, Etapa 14 CONCLUÍDA <<<
Ocean Music completo (React + Node.js sem Express + PostgreSQL) com
recursos de áudio funcionando. 14 das 17 etapas do plano original concluídas.
 
## Ideias discutidas para o futuro (NÃO implementadas ainda — ver conversa
## do dia 2026-10-14 para o raciocínio completo)
- Afinador e metrônomo como "ferramentas livres" da plataforma (fora do
  contexto de uma lição específica) — viável e de baixo esforço, o
  MetronomeControl.jsx já existe e é reaproveitável; afinador visual
  (mostrar notas de referência das cordas, sem captar som) também simples
- Captar som do microfone para afinador "de verdade" ou para responder
  exercícios automaticamente — ALTO ESFORÇO (getUserMedia + AnalyserNode +
  algoritmo de detecção de pitch por autocorrelação). Já estava previsto
  no documento original como "não implementar na primeira versão" e no
  roadmap de áudio como Fase A4 (Futuro). Recomendado documentar como
  trabalho futuro na monografia, não implementar nas etapas finais
- Preencher as outras 8 trilhas com exercícios de verdade (hoje só têm
  título/etapas/lições, sem exercícios — D-50) — recomendado prioritário,
  esforço de CONTEÚDO (não de código), bom encaixe entre a Etapa 16 e 17.
  Sugestão: não precisa completar as 9, 2-3 trilhas bem feitas (cobrindo
  outras áreas além de violão, ex. Piano e Teoria) já dão boa variedade
  pra demonstração/banca
## Padrões de código descobertos (aplicar sempre)
 
### Front-end
- useEffect que busca dados: NENHUM setState direto no corpo do efeito,
  nem antes nem depois de outras linhas. Tudo dentro de .then()
- Um arquivo de componente (.jsx) só pode exportar componentes. Constantes/
  funções auxiliares vão para um .js separado
- Rotas reaproveitadas com parâmetro variável precisam de key={param}
- Hooks sempre rodam mesmo em render que só vai redirecionar
- Testar cada tela recarregando com F5, não só navegando por links
- Parâmetro de função não usado (compatibilidade de assinatura): prefixar
  com `_` — eslint.config.js tem no-unused-vars/argsIgnorePattern: '^_' (D-82)
- Antes de apagar um arquivo, buscar quem ainda o importa com Select-String
  SEM excluir *.test.js (um erro de busca deixou passar 2 casos — D-83)
- Áudio: qualquer função que toca som só pode ser chamada a partir de um
  gesto do usuário (onClick), nunca de um useEffect automático

### Backend
- Roteador próprio aceita middlewares: router.METODO(path, [mw], handler)
- AppError(code, status, message) pra erros esperados; bug vira 500 genérico
- Toda escrita em múltiplas tabelas relacionadas usa transação
  (BEGIN/COMMIT/ROLLBACK) — perfil e progresso
- GREATEST() no ON CONFLICT DO UPDATE pra "nunca recuar" (progresso/nota)
- Nunca confiar em índice/posição vindo do cliente — recalcular no servidor
- exercises.type SEM CHECK de propósito — permite novos tipos (ex.:
  audio_choice) sem migração de banco

### PowerShell (testes manuais de API / banco)
- NÃO usar `curl` puro (vira Invoke-WebRequest, pede confirmação). Preferir
  Invoke-RestMethod; `| ConvertTo-Json -Depth 5` pra ver objetos aninhados
- `-SessionVariable $session` na 1ª chamada / `-WebSession $session` depois
- `try { ... } catch { $_.ErrorDetails.Message }` pra capturar erro da API
- CUIDADO com `$` dentro de aspas DUPLAS — PowerShell interpreta como
  variável e apaga silenciosamente o que não reconhece. Usar aspas SIMPLES
  pra literais com `$` (ex.: hash de senha)
- SEMPRE $env:PGCLIENTENCODING = "UTF8" + chcp 65001 antes de psql

## Stack e regras gerais (desde o início do projeto)
- React + Vite + Tailwind 3.4 (fixado) · JavaScript · react-router-dom
- Testes: vitest (`npm run test`)
- Sessão em tabela (não JWT) · tabela `areas` (não `instruments`) ·
  resultado do exercício como fase da mesma rota /exercicio/:id
- Recomendação por regras e pontuação: área +3, objetivo +3, estilo +2,
  nível igual +2, nível acima do usuário −3. Motivos em ordem fixa:
  objetivo > área > estilo > nível.
- Logo oficial aplicada em toda a plataforma (emblema onda + nota musical,
  frontend/src/assets/logo.png) + favicons — D-85

## Progresso
- [x] Etapas 1 a 14: aplicação completa, React + Node + PostgreSQL rodando
      de ponta a ponta, com recursos de áudio (síntese, metrônomo,
      exercício audio_choice). CHECKPOINT 1 na Etapa 9, CHECKPOINT 2 na
      Etapa 13. Decisões D-01 a D-91 em docs/decisoes.md.
- [ ] Etapa 15: Responsividade — revisão em mobile/tablet/desktop,
      incluindo os novos controles de áudio (próxima)
- [ ] Etapa 16: Testes e correções (revisão geral)
- [ ] Etapa 17: Refinamento (UX/UI, acessibilidade, performance, código) —
      bom momento para encaixar: preencher mais trilhas com exercícios,
      afinador/metrônomo como ferramentas livres (ver seção de ideias acima)
      
## Observações
- Cuidado com a pasta do terminal: rodar npm sempre dentro de `frontend`
  ou `backend`, conforme o caso.
- Decisões registradas em docs/decisoes.md (D-01 a D-91).
- Material de apoio para apresentação/ensaio de banca já preparado em
  conversa anterior (roteiro de 15 min, com demo ao vivo sugerida —
  login Ana → Dashboard com motivos → trilha → exercício → progresso →
  login Bruno mostrando recomendação diferente)