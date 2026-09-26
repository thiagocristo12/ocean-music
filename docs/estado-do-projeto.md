# Ocean Music: ponto de continuidade

## Ambiente
- Windows, PowerShell, VS Code. Pasta: C:\Users\Usuario\Desktop\Coisas do Thiago\DEV\ocean-music
- Node 22.15.0 · Git 2.41 · PostgreSQL 18.6 (psql)
- Repositório no GitHub (branch main). Uma branch por etapa (etapa-NN-nome).

## Stack e regras
- Front-end: React + Vite + Tailwind 3.4 (fixado) · JavaScript · react-router-dom (instalado na Etapa 4)
- Back-end: Node.js nativo (node:http), SEM Express · driver pg · PostgreSQL (a partir da Etapa 12)
- Sessão em tabela (não JWT) · tabela `areas` (não `instruments`) · resultado do exercício como fase da mesma rota /exercicio/:id
- Mock primeiro, com camada services/ para trocar por API depois, sem mudar as telas
- Recomendação por regras e pontuação: área +3, objetivo +3, estilo +2, nível igual +2, nível acima do usuário −3
- Sempre indicar MOCK ou IMPLEMENTAÇÃO REAL; código completo; explicar onde colocar, como executar e testar
- Padrão obrigatório em useEffect que busca dados: nenhum setState direto no corpo do efeito.
  Sempre `Promise.resolve().then(...).then((resultado) => { if (isCancelled) return; setState(...); })`
  (regra do ESLint react-hooks/set-state-in-effect, descoberta nas Etapas 6 e 7)
- Um arquivo de componente (.jsx) só pode exportar componentes (regra do Fast Refresh).
  Constantes/funções auxiliares vão para um .js separado (ex.: buttonStyles.js, AuthContext.js)

## Progresso
- [x] Etapa 1: arquitetura
- [x] Etapa 2: configuração (Vite, Tailwind, pastas, Git/GitHub)
- [x] Etapa 3: Design System (tokens no tailwind.config.js; componentes em
      frontend/src/components/ui: Button, Card, ProgressBar, Input, Chip;
      página de apoio em /dev/ui → pages/DesignSystem.jsx)
- [x] Etapa 4: Landing Page + rotas (react-router-dom instalado; AppRoutes.jsx;
      componentes de marca em components/brand: Logo, WaveDivider;
      buttonBaseClasses/buttonVariants separados em components/ui/buttonStyles.js
      para uso em <Link> que precisa parecer botão)
- [x] Etapa 5: Cadastro e Login — autenticação MOCK em localStorage
      (services/authService.js; context/AuthContext.js + AuthProvider.jsx;
      hooks/useAuth.js; routes/ProtectedRoute.jsx e RedirectIfAuth.jsx)
- [x] Etapa 6: Onboarding — formulário de perfil musical em 5 passos (MOCK)
      (data/catalog.js: areas/styles/goals; services/profileService.js;
      context/ProfileContext.js + ProfileProvider.jsx; hooks/useProfile.js;
      routes/RequireOnboarding.jsx; components/onboarding/*;
      rascunho salvo em localStorage a cada passo)
- [x] Etapa 7: Dashboard real — recomendação personalizada e sequência de estudos
      (data/tracks.js: catálogo mock de 9 trilhas; utils/recommend.js: função
      pura de pontuação; utils/streak.js: cálculo de sequência a partir de
      datas de atividade; services/progressService.js: só leitura por enquanto;
      layouts/AppHeader.jsx; components/dashboard/*)
- [ ] Etapa 8: Trilhas — listagem (/trilhas) e detalhe (/trilhas/:slug) (próxima)

## Observações
- Cuidado com a pasta do terminal: rodar npm sempre dentro de `frontend`.
- Decisões registradas em docs/decisoes.md (D-01 a D-25).
- Links "Começar"/"Ver trilha" do Dashboard ainda caem em "não encontrado" —
  normal até a Etapa 8 criar essas rotas.
- Progresso de trilha e atividade diária ainda sempre vêm vazios (todo usuário
  novo zera streak e progresso) — isso muda só na Etapa 9, quando os
  exercícios passarem a gravar em progressService.