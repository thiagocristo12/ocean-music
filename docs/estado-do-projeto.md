# Ocean Music: ponto de continuidade

## Ambiente
- Windows, PowerShell, VS Code. Pasta: C:\Users\Usuario\Desktop\Coisas do Thiago\DEV\ocean-music
- Node 22.15.0 · Git 2.41 · PostgreSQL 18.6 (psql)
- Repositório no GitHub (branch main). Uma branch por etapa (etapa-NN-nome).
- ATENÇÃO: não usar a pasta antiga Documents\ocean-music (abandonada, desatualizada).

## Stack e regras
- Front-end: React + Vite + Tailwind 3.4 (fixado) · JavaScript · react-router-dom
- Back-end: Node.js nativo (node:http), SEM Express · driver pg · PostgreSQL (a partir da Etapa 12)
- Testes: vitest (`npm run test`), rodando em frontend/src/utils/*.test.js
- Sessão em tabela (não JWT) · tabela `areas` (não `instruments`) · resultado do
  exercício como fase da mesma rota /exercicio/:id
- Mock primeiro, com camada services/ para trocar por API depois, sem mudar as telas
- Recomendação por regras e pontuação: área +3, objetivo +3, estilo +2, nível
  igual +2, nível acima do usuário −3. Motivos exibidos em ordem fixa de
  prioridade: objetivo > área > estilo > nível.
- Sempre indicar MOCK ou IMPLEMENTAÇÃO REAL; código completo; explicar onde
  colocar, como executar e testar

## Padrões de código descobertos (aplicar sempre)
- useEffect que busca dados: nenhum setState direto no corpo do efeito.
  Sempre `Promise.resolve().then(...).then((resultado) => { if (isCancelled) return; setState(...); })`
  (regra do ESLint react-hooks/set-state-in-effect)
- Um arquivo de componente (.jsx) só pode exportar componentes (regra do Fast
  Refresh). Constantes/funções auxiliares vão para um .js separado.
- Rotas reaproveitadas com parâmetro variável (ex.: /exercicio/:id apontando
  pro mesmo componente em navegações sucessivas) precisam de key={param} num
  wrapper, senão o estado interno do componente "vaza" de uma página pra outra.
- Hooks sempre rodam, mesmo em um render que só vai redirecionar (<Navigate />).
  Qualquer efeito que salva algo (ex.: rascunho) precisa de uma guarda
  explícita pra não salvar em cenários que vão só redirecionar.
- SEMPRE testar cada tela também recarregando com F5 na própria página, não
  só navegando por links — pega bugs de carregamento inicial que passar por
  cliques não revela.

## Progresso
- [x] Etapa 1: arquitetura
- [x] Etapa 2: configuração (Vite, Tailwind, pastas, Git/GitHub)
- [x] Etapa 3: Design System (components/ui: Button, Card, ProgressBar, Input,
      Chip; página de apoio em /dev/ui)
- [x] Etapa 4: Landing Page + rotas (components/brand: Logo, WaveDivider;
      buttonBaseClasses/buttonVariants em components/ui/buttonStyles.js)
- [x] Etapa 5: Cadastro e Login — autenticação MOCK em localStorage
      (services/authService.js; context/AuthContext + AuthProvider;
      hooks/useAuth; routes/ProtectedRoute e RedirectIfAuth)
- [x] Etapa 6: Onboarding — formulário de perfil musical em 5 passos (MOCK)
      (data/catalog.js; services/profileService.js; context/ProfileContext +
      ProfileProvider; hooks/useProfile; routes/RequireOnboarding;
      components/onboarding/*; rascunho salvo em localStorage a cada passo)
- [x] Etapa 7: Dashboard real — recomendação personalizada e sequência de
      estudos (data/tracks.js: 9 trilhas mock; utils/recommend.js;
      utils/streak.js; services/progressService.js; layouts/AppHeader.jsx;
      components/dashboard/*)
- [x] Etapa 8: Trilhas — listagem (/trilhas) com "Para você" e filtro por
      área; detalhe (/trilhas/:slug) com acordeão de etapas e lições
      (data/trackContent.js; utils/trackProgress.js; components/tracks/*)
      Bug corrigido: ProfileProvider isLoading derivado (D-29)
- [x] Etapa 9: Exercícios — rota /exercicio/:id (3 fases: intro/exercise/
      result), registry de tipos (multiple_choice, true_false),
      gravação de progresso real (utils/exercises.js;
      data/exerciseContent.js; utils/lessonContent.js — conteúdo autoral só
      em "violao-primeiros-passos", demais lições usam fallback genérico;
      progressService.completeLesson; components/exercises/*)
      Bug corrigido: key={id} em ExerciseRoute (AppRoutes.jsx) para resetar
      estado ao trocar de lição pela mesma rota (D-37)
      >>> CHECKPOINT 1 ALCANÇADO: protótipo navegável ponta a ponta <<<
- [x] Etapa 10: Personalização — tela /perfil (somente leitura); edição de
      perfil via /onboarding?edit=1 (reaproveita os 5 passos, com botão
      "Cancelar" visível); motivos de recomendação em ordem fixa
      (utils/recommend.js: GOAL > AREA > STYLE > LEVEL); primeiros testes
      automatizados com vitest (recommend.test.js, streak.test.js)
      Bugs corrigidos: rascunho vazio "vazando" pro modo de edição quando o
      onboarding redirecionava sem `?edit=1` (D-42); logo do onboarding não
      é clicável de propósito, botão "Cancelar" adicionado no modo edição (D-43)
- [ ] Etapa 11: Progresso — tela /progresso com histórico de atividade,
      evolução por área/trilha, todos os objetivos (não só o primeiro) (próxima)

## Observações
- Cuidado com a pasta do terminal: rodar npm sempre dentro de `frontend`.
- Decisões registradas em docs/decisoes.md (D-01 a D-43).
- Duas contas de teste já usadas nas etapas anteriores:
  "Ana" (iniciante, violão, rock, objetivo aprender acordes) e
  "Bruno" (intermediário, piano/teoria, clássico, objetivo aperfeiçoar teoria)
  — úteis para continuar validando que perfis diferentes geram resultados
  diferentes nas próximas etapas.