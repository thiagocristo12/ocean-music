# Ocean Music: ponto de continuidade

## Ambiente
- Windows, PowerShell, VS Code. Pasta: C:\Users\Usuario\Desktop\Coisas do Thiago\DEV\ocean-music
- Node 22.15.0 · Git 2.41 · PostgreSQL 18.6 (psql, já no PATH do usuário)
- Repositório no GitHub (branch main). Uma branch por etapa/sub-bloco.
- ATENÇÃO: não usar a pasta antiga Documents\ocean-music (abandonada, desatualizada).
- Dois terminais em paralelo ao trabalhar no backend: Terminal 1 roda
  `npm run dev` dentro de backend/ (fica aberto, recarrega sozinho com
  --watch); Terminal 2 é livre para rodar comandos de teste (psql,
  Invoke-RestMethod) sem derrubar o servidor.

## Banco de dados (Etapa 12)
- Banco: ocean_music · superusuário: postgres · usuário da app: ocean_app
  (senha ocean_dev_password, só dev local)
- schema.sql como `postgres` (dono das tabelas); seed.sql e uso do dia a dia
  como `ocean_app` (tem GRANT explícito — D-52)
- Se acentos aparecerem quebrados no terminal (psql OU Invoke-RestMethod),
  é só exibição (chcp 65001 ajuda no psql) — os dados estão certos em UTF-8
- Scripts em backend/database/schema.sql e backend/database/seed.sql
- Seed inclui Ana (ana@ocean.music) e Bruno (bruno@ocean.music), senha
  senha1234 para ambos — hashes scrypt reais (D-64, corrigido no sub-bloco 13.3)

## Backend (Etapa 13, em andamento)
- Node.js nativo (node:http), SEM Express. Estrutura em backend/src/:
  config/ (env.js) · core/ (router.js, http.js, errors.js, password.js,
  cookies.js) · database/ (pool.js) · modules/<nome>/ (repository, service,
  controller — um grupo de pastas por domínio: health, auth, catalog, profile)
- app.js registra todas as rotas; server.js sobe o http.createServer
- Rodar: cd backend && npm run dev (precisa de backend/.env, NÃO commitado —
  ver .env.example para o formato)
- Autenticação real: scrypt (password.js) + sessão em tabela + cookie
  HttpOnly (cookies.js). Login: POST /api/auth/login. Logout invalida a
  sessão no banco de verdade (testado).
- requireAuth.js é um middleware reaproveitável — router.js foi estendido
  pra aceitar router.METODO(path, [middlewares], handler)
- Endpoints prontos e testados: /api/health, /api/auth/register,
  /api/auth/login, /api/auth/logout, /api/auth/me, /api/catalog/options,
  GET e PUT /api/me/profile
- PRÓXIMO (sub-bloco 13.4): trilhas, lições/exercícios (sem vazar a
  solution ao cliente), progresso (completeLesson, streak, dashboard) —
  é o maior sub-bloco, considerar dividir em duas partes
- Depois (13.5): trocar cada service do front-end de mock pra HTTP real

## Testando a API manualmente (PowerShell)
- NÃO usar `curl` puro — no PowerShell isso chama Invoke-WebRequest, que
  pede confirmação de segurança. Preferir Invoke-RestMethod direto.
- Para ver JSON aninhado sem resumo truncado (`@{user=}`), usar
  `| ConvertTo-Json -Depth 5` ou acessar a propriedade final direto
  (`$response.data.user.id`)
- Para manter cookie de sessão entre chamadas: `-SessionVariable session`
  na primeira chamada, `-WebSession $session` nas seguintes
- Para capturar a mensagem de erro de uma chamada que falhou:
  `try { Invoke-RestMethod ... } catch { $_.ErrorDetails.Message }`
- CUIDADO com `$` dentro de aspas DUPLAS no PowerShell: ele tenta
  interpretar como variável e apaga o que não reconhece (aconteceu com um
  hash de senha contendo `$`, de forma silenciosa — sem erro aparente).
  Para literais com `$` (como hashes scrypt), usar aspas SIMPLES, ou montar
  em uma variável antes: `$hash = 'scrypt$...'` depois usar `"...'$hash'..."`
- Para gerar um hash de senha manualmente (ex.: resetar senha de um
  usuário do seed): a partir de backend/, rodar
  `node -e "import('./src/core/password.js').then(m => m.hashPassword('senha1234').then(h => console.log(h)))"`
  e colar o resultado num UPDATE no banco (com aspas simples!)

## Stack e regras (front-end, já consolidado)
- React + Vite + Tailwind 3.4 (fixado) · JavaScript · react-router-dom
- Testes: vitest (`npm run test`), em frontend/src/utils/*.test.js
- Sessão em tabela (não JWT) · tabela `areas` (não `instruments`) ·
  resultado do exercício como fase da mesma rota /exercicio/:id
- Mock primeiro, com camada services/ para trocar por API depois, sem
  mudar as telas (é exatamente isso que o sub-bloco 13.5 vai fazer)
- Recomendação por regras e pontuação: área +3, objetivo +3, estilo +2,
  nível igual +2, nível acima do usuário −3. Motivos em ordem fixa:
  objetivo > área > estilo > nível.

## Padrões de código (front-end) descobertos (aplicar sempre)
- useEffect que busca dados: nenhum setState direto no corpo do efeito.
  Sempre `Promise.resolve().then(...).then((resultado) => { if (isCancelled) return; setState(...); })`
- Um arquivo de componente (.jsx) só pode exportar componentes. Constantes/
  funções auxiliares vão para um .js separado.
- Rotas reaproveitadas com parâmetro variável precisam de key={param} num
  wrapper, senão o estado interno do componente "vaza" de uma página pra outra.
- Hooks sempre rodam, mesmo em um render que só vai redirecionar
  (<Navigate />). Efeitos que salvam algo precisam de guarda explícita.
- SEMPRE testar cada tela também recarregando com F5, não só navegando por links.

## Progresso
- [x] Etapas 1 a 11: aplicação React completa e navegável com dados mock.
      Ver docs/decisoes.md (D-01 a D-46) para detalhes de cada etapa.
      CHECKPOINT 1 alcançado na Etapa 9.
- [x] Etapa 12: Banco PostgreSQL — schema.sql (16 tabelas) e seed.sql
      completo. Decisões D-47 a D-52.
- [~] Etapa 13: Integração completa (em andamento, dividida em sub-blocos)
  - [x] 13.1: servidor Node sem Express + conexão com o banco (D-53 a D-56)
  - [x] 13.2: autenticação real — scrypt, sessão em cookie (D-57 a D-60)
  - [x] 13.3: catálogo e perfil — endpoints testados e validados (D-61 a D-64)
  - [ ] 13.4: trilhas, exercícios e progresso (PRÓXIMO — maior sub-bloco)
  - [ ] 13.5: trocar services do front-end de mock para HTTP real
        (ao final: MVP real rodando com React + Node + PostgreSQL,
        será o CHECKPOINT 2)

## Observações
- Cuidado com a pasta do terminal: rodar npm sempre dentro de `frontend`
  ou `backend`, conforme o caso.
- Decisões registradas em docs/decisoes.md (D-01 a D-64).
- Contas de teste disponíveis AGORA no backend real (não mais só mock):
  ana@ocean.music / senha1234 (perfil: beginner, violão, aprender-acordes,
  rock) e bruno@ocean.music / senha1234 (perfil original do seed, nível
  intermediate — hash ainda PENDE ser corrigido do mesmo jeito que a Ana,
  se ainda não foi feito ao retomar).