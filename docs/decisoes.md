# Diário de decisões: Ocean Music

| ID | Decisão | Problema que resolve | Alternativas descartadas | Etapa |
|---|---|---|---|---|
| D-01 | Três camadas: React → API Node.js → PostgreSQL | Separa responsabilidades; cada parte evolui sem quebrar as outras | Monolito com renderização no servidor | 1 |
| D-02 | Node.js nativo (`node:http`), sem Express | Cumpre a documentação do TCC; permite aprender HTTP na prática | Express, Fastify | 1 |
| D-03 | Banco relacional (PostgreSQL) | Dados muito relacionados (usuário, trilha, progresso); integridade referencial | NoSQL | 1 |
| D-04 | Tabela `areas` no lugar de `instruments` (**confirmada**) | Teoria, Ritmo, Canto e Performance não são instrumentos | Manter `instruments` | 1 |
| D-05 | Sessão em tabela no lugar de JWT (**confirmada**) | Logout invalida a sessão de verdade; mais simples de explicar | JWT | 1 |
| D-06 | Resultado do exercício como fase da mesma rota `/exercicio/:id` (**confirmada**) | Evita perder o resultado ao recarregar; código mais simples | Rota `/resultado` separada | 1 |
| D-07 | Mock primeiro, com camada `services/` | Validar a interface antes do back-end e trocar mock por API sem reescrever telas | Back-end primeiro | 1 |
| D-08 | Recomendação por regras e pontuação | Resultado explicável e determinístico, sem dados para treinar modelos | Machine learning | 1 |
| D-09 | Tailwind CSS **3.4** (versão fixada) | Configuração em arquivo; evita a mudança de setup da v4 | Tailwind v4 | 2 |
| D-10 | Vite como ferramenta de build | React precisa de uma etapa de build e servidor de desenvolvimento | Create React App (descontinuado) | 2 |
| D-11 | `react-router-dom` só entra quando a primeira rota for criada | Não instalar dependência sem uso | Instalar tudo no início | 2 |
| D-12 | Paleta, fontes e sombras definidas como tokens no `tailwind.config.js` | Um único lugar para mudar a identidade visual; classes como `bg-ocean-600` em todo o projeto | Cores soltas em cada componente | 3 |
| D-13 | Fontes Sora e Inter via Google Fonts | Identidade tecnológica e boa leitura, sem instalar pacote | Instalar as fontes no projeto (funciona offline; avaliar no refinamento) | 3 |
| D-14 | `react-router-dom` instalado nesta etapa (executa a D-11) | A Landing precisa de links reais para /login e /cadastro | — | 4 |
| D-15 | Links de navegação usam `<Link>` com as classes do `Button` (`buttonBaseClasses`/`buttonVariants`), em vez do componente `<Button>` | Evita aninhar `<button>` dentro de `<a>`, o que é HTML inválido; `Button` fica reservado para ações reais (enviar formulário, clique em JS) | Usar sempre `<Button>` | 4 |
| D-16 | Autenticação MOCK com `localStorage` (chaves `ocean:v1:users` e `ocean:v1:session`) | Testar o fluxo completo de cadastro/login antes de existir backend | Backend primeiro (atrasaria todas as telas) | 5 |
| D-17 | Contexto de autenticação dividido em três arquivos: `AuthContext.js` (contexto puro), `AuthProvider.jsx` (componente) e `useAuth.js` (hook) | Mesma regra do Fast Refresh que corrigimos no `Button`: um arquivo de componente só pode exportar componentes | Um único arquivo (gera erro no `npm run lint`) | 5 |
| D-18 | Perfil musical em um `ProfileContext` separado do `AuthContext`, aninhado dentro do `AuthProvider` | Mantém autenticação e perfil como responsabilidades distintas; o perfil depende de qual usuário está logado | Guardar tudo dentro do `AuthContext` | 6 |
| D-19 | Rascunho do onboarding salvo em `localStorage` a cada passo (`ocean:v1:onboardingDraft:<id>`) | Se o usuário recarregar ou sair no meio do formulário, não perde o que já preencheu | Perder o rascunho ao sair (obrigaria recomeçar do zero) | 6 |
| D-20 | Catálogo de áreas/objetivos/estilos em `data/catalog.js`, servido via `profileService.getOptions()` | Fonte única de opções, fácil de expandir depois (ex.: novos estilos), já simula o formato de uma resposta de API | Opções escritas direto dentro dos componentes de cada passo | 6 |
| D-21 | Dashboard criado como página temporária nesta etapa (⚠️), com o painel completo chegando na Etapa 7 | O onboarding precisa de um destino depois de salvar o perfil | Deixar o usuário sem página para ir depois de concluir | 6 |
| D-22 | Recomendação em função pura (`utils/recommend.js`): área +3, objetivo +3, estilo +2, nível igual +2, nível acima −3 | Resultado determinístico e fácil de testar/defender no TCC; nenhum estado escondido | Calcular a pontuação dentro do componente React | 7 |
| D-23 | Sequência de estudos calculada (`utils/streak.js`) a partir de uma lista de datas com atividade, e não guardada como um número pronto | Sempre consistente com o histórico real; não existe risco de "esquecer" de atualizar um contador | Um campo `streakCount` incrementado manualmente | 7 |
| D-24 | `progressService.js` só tem funções de leitura nesta etapa | Ainda não existe nada que gere progresso (isso é a Etapa 9); a escrita entra junto com a conclusão de exercícios | Criar funções de escrita sem nada que as use ainda | 7 |
| D-25 | Cabeçalho comum (`AppHeader`) colocado em `src/layouts/`, não em `components/dashboard/` | É reaproveitável por qualquer página autenticada (Trilhas, Progresso, Perfil...), não só o Dashboard | Duplicar o cabeçalho em cada página | 7 |