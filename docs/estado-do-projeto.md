# Ocean Music: ponto de continuidade

## Ambiente
- Windows, PowerShell, VS Code. Pasta: C:\Users\Usuario\Desktop\Coisas do Thiago\DEV\ocean-music
- Node 22.15.0 · Git 2.41 · PostgreSQL 18.6 (psql, já no PATH)
- Repositório no GitHub (branch main). Uma branch por etapa/sub-bloco.
- Dois (ou três) terminais em paralelo ao trabalhar: Terminal 1 = backend
  (`npm run dev`, dentro de backend/, fica aberto); Terminal 2 = frontend
  (`npm run dev`, dentro de frontend/, fica aberto); Terminal 3 = livre
  para git, psql, testes.

## Banco de dados (Etapa 12)
- Banco: ocean_music · superusuário: postgres · usuário da app: ocean_app
  (senha ocean_dev_password, dev local)
- schema.sql como `postgres`; seed.sql e uso do dia a dia como `ocean_app`
  (GRANT explícito em tabelas/sequences — D-52)
- Scripts em backend/database/schema.sql e backend/database/seed.sql
- Contas de teste REAIS (senha senha1234 para ambas):
  ana@ocean.music (beginner, violão, aprender-acordes, rock)
  bruno@ocean.music (intermediate, piano+teoria, aperfeiçoar-teoria, clássico)
- Se precisar resetar senha de um usuário do seed: gerar hash com
  `node -e "import('./src/core/password.js').then(m => m.hashPassword('senha1234').then(h => console.log(h)))"`
  (rodar dentro de backend/), depois UPDATE no banco usando aspas SIMPLES
  (PowerShell interpreta $ dentro de aspas duplas e corrompe o hash)

## Backend — COMPLETO (Etapa 13)
- Node.js nativo (node:http), SEM Express. backend/src/: config/ · core/
  (router.js com suporte a middlewares, http.js, errors.js, password.js,
  cookies.js) · database/ (pool.js) · modules/<nome>/ (repository, service,
  controller) — health, auth, catalog, profile, tracks, lessons, progress
- Rodar: cd backend && npm run dev (precisa de backend/.env, não commitado)
- Todos os endpoints implementados e testados manualmente via
  Invoke-RestMethod: /api/health, /api/auth/* , /api/catalog/options,
  /api/me/profile (GET/PUT), /api/tracks (+ /:slug), /api/lessons/:id,
  /api/me/progress (GET + POST complete-lesson)
- Decisão importante: GET /api/lessons/:id devolve a `solution` do exercício
  (D-65) — avaliação continua no navegador, igual ao mock. Simplificação
  consciente pro escopo do TCC; melhoria de segurança registrada p/ "Futuro"

## Frontend ligado à API real (sub-bloco 13.5) — COMPLETO
- services/apiClient.js: cliente HTTP central, usa fetch nativo +
  credentials: 'same-origin' (cookie de sessão funciona via proxy do Vite)
- TODOS os services trocados de mock pra API real: authService,
  profileService (rascunho do onboarding continua em localStorage — D-74),
  progressService, + trackService e lessonService (novos, não existiam no
  mock — D-76)
- Arquivos de mock REMOVIDOS: data/tracks.js, data/trackContent.js,
  data/exerciseContent.js, utils/lessonContent.js
- data/catalog.js AINDA EXISTE (áreas/estilos/objetivos estáticos, D-81)
- Testes automatizados (recommend.test.js, goalProgress.test.js) com dados
  de teste PRÓPRIOS dentro do arquivo, não mais importando data/tracks.js (D-80)

## >>> CHECKPOINT 2 ALCANÇADO <<<
Ocean Music completo rodando com React + Node.js (sem Express) + PostgreSQL.
13 das 17 etapas do plano original concluídas.

## Padrões de código descobertos (aplicar sempre)

### Front-end
- useEffect que busca dados: NENHUM setState direto no corpo do efeito,
  nem antes nem depois de outras linhas. Tudo dentro de .then():
  `Promise.resolve().then(() => { /* resets aqui dentro tbm */ return fetch(...); }).then(resultado => { if (isCancelled) return; setState(...); })`
- Um arquivo de componente (.jsx) só pode exportar componentes. Constantes/
  funções auxiliares vão para um .js separado.
- Rotas reaproveitadas com parâmetro variável precisam de key={param}.
- Hooks sempre rodam mesmo em render que só vai redirecionar.
- Testar cada tela recarregando com F5, não só navegando por links.
- Parâmetro de função não usado (compatibilidade de assinatura): prefixar
  com `_` — precisou de ajuste no eslint.config.js (no-unused-vars,
  argsIgnorePattern: '^_', D-82)
- Antes de apagar um arquivo, buscar quem ainda o importa com Select-String
  SEM excluir *.test.js (um erro de busca deixou passar 2 casos — D-83)

### Backend
- Roteador próprio aceita middlewares: router.METODO(path, [mw], handler)
- AppError(code, status, message) pra erros esperados; bug vira 500 genérico
- Toda escrita em múltiplas tabelas relacionadas usa transação
  (BEGIN/COMMIT/ROLLBACK) — perfil e progresso
- GREATEST() no ON CONFLICT DO UPDATE pra "nunca recuar" (progresso/nota)
- Nunca confiar em índice/posição vindo do cliente — recalcular no servidor

### PowerShell (testes manuais de API)
- NÃO usar `curl` puro (vira Invoke-WebRequest, pede confirmação). Preferir
  Invoke-RestMethod; `| ConvertTo-Json -Depth 5` pra ver objetos aninhados
- `-SessionVariable $session` na 1ª chamada / `-WebSession $session` depois,
  pra manter cookie entre chamadas
- `try { ... } catch { $_.ErrorDetails.Message }` pra capturar erro da API
- CUIDADO com `$` dentro de aspas DUPLAS — PowerShell interpreta como
  variável e apaga silenciosamente o que não reconhece (aconteceu com hash
  de senha). Usar aspas SIMPLES pra literais com `$`

## Stack e regras gerais (desde o início do projeto)
- React + Vite + Tailwind 3.4 (fixado) · JavaScript · react-router-dom
- Testes: vitest (`npm run test`)
- Sessão em tabela (não JWT) · tabela `areas` (não `instruments`) ·
  resultado do exercício como fase da mesma rota /exercicio/:id
- Recomendação por regras e pontuação: área +3, objetivo +3, estilo +2,
  nível igual +2, nível acima do usuário −3. Motivos em ordem fixa:
  objetivo > área > estilo > nível.

## Progresso
- [x] Etapas 1 a 13: aplicação completa, React + Node + PostgreSQL rodando
      de ponta a ponta. CHECKPOINT 1 na Etapa 9, CHECKPOINT 2 na Etapa 13.
      Decisões D-01 a D-83 em docs/decisoes.md.
- [ ] Etapa 14: Web Audio API (próxima)
- [ ] Etapa 15: Responsividade (revisão)
- [ ] Etapa 16: Testes e correções (revisão geral)
- [ ] Etapa 17: Refinamento (UX/UI, acessibilidade, performance, código)

## Observações
- Cuidado com a pasta do terminal: rodar npm sempre dentro de `frontend`
  ou `backend`, conforme o caso.
- Pedido em aberto do usuário: preparar lista de destaques para apresentação
  ao professor sobre o progresso do TCC (ver resposta com o resumo).