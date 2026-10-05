# Ocean Music: ponto de continuidade

## Ambiente
- Windows, PowerShell, VS Code. Pasta: C:\Users\Usuario\Desktop\Coisas do Thiago\DEV\ocean-music
- Node 22.15.0 · Git 2.41 · PostgreSQL 18.6 (psql). psql já no PATH do usuário.
- Repositório no GitHub (branch main). Uma branch por etapa (etapa-NN-nome).
- ATENÇÃO: não usar a pasta antiga Documents\ocean-music (abandonada, desatualizada).

## Banco de dados (criado na Etapa 12)
- Banco: ocean_music
- Superusuário: postgres (senha definida na instalação do PostgreSQL)
- Usuário da aplicação: ocean_app / senha: ocean_dev_password (só dev local)
- Rodar scripts SQL: schema.sql como `postgres` (dono das tabelas); seed.sql
  e uso do dia a dia como `ocean_app` (tem GRANT explícito em tabelas e
  sequences existentes + ALTER DEFAULT PRIVILEGES para tabelas futuras — D-52)
- Se o terminal mostrar acentos quebrados (ex. "Viol├úo"), rodar `chcp 65001`
  antes do psql — é só exibição, os dados estão certos em UTF-8
- Scripts em backend/database/schema.sql e backend/database/seed.sql
- Seed inclui usuários de demonstração Ana e Bruno (password_hash é
  PLACEHOLDER_ETAPA_13, ainda não funcional para login)
- Testado: consulta SQL que reproduz a pontuação de recomendação bate com
  utils/recommend.js (Violão: Primeiros Passos = 10 pontos pro perfil da Ana)

## Stack e regras
- Front-end: React + Vite + Tailwind 3.4 (fixado) · JavaScript · react-router-dom
- Back-end: Node.js nativo (node:http), SEM Express · driver pg · PostgreSQL
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
- Um arquivo de componente (.jsx) só pode exportar componentes (regra do Fast
  Refresh). Constantes/funções auxiliares vão para um .js separado.
- Rotas reaproveitadas com parâmetro variável precisam de key={param} num
  wrapper, senão o estado interno do componente "vaza" de uma página pra outra.
- Hooks sempre rodam, mesmo em um render que só vai redirecionar (<Navigate />).
  Qualquer efeito que salva algo precisa de guarda explícita pra não salvar
  em cenários que vão só redirecionar.
- SEMPRE testar cada tela também recarregando com F5 na própria página, não
  só navegando por links.
- PostgreSQL: GRANT em DATABASE não dá permissão sobre tabelas de outro dono;
  precisa de GRANT explícito em ALL TABLES/SEQUENCES + ALTER DEFAULT PRIVILEGES.

## Progresso
- [x] Etapa 1 a 11: ver commits no histórico do Git e docs/decisoes.md
      (D-01 a D-46) para o detalhe de cada uma. Resumo: toda a aplicação
      React está completa e navegável com dados mock (localStorage) —
      cadastro, login, onboarding, dashboard com recomendação personalizada,
      trilhas, exercícios com gravação de progresso real, edição de perfil,
      tela de progresso. CHECKPOINT 1 alcançado na Etapa 9.
- [x] Etapa 12: Banco PostgreSQL — schema.sql (16 tabelas) e seed.sql
      (catálogo completo, 9 trilhas, conteúdo completo só da trilha
      "Violão: Primeiros Passos", 2 usuários de demonstração).
      Decisões D-47 a D-52.
- [ ] Etapa 13: Integração completa (PRÓXIMA — é grande, dividir em
      sub-blocos): servidor Node.js sem Express (node:http + roteador
      próprio), conexão com o banco via pg, autenticação real
      (crypto.scrypt + sessão em cookie httpOnly), endpoints REST,
      troca de cada service do front-end (mock → HTTP real) sem reescrever
      telas. Ao final: MVP real rodando com React + Node + PostgreSQL
      >>> será o CHECKPOINT 2 <<<

## Observações
- Cuidado com a pasta do terminal: rodar npm sempre dentro de `frontend`.
- Decisões registradas em docs/decisoes.md (D-01 a D-52).
- Duas contas de teste mock já usadas desde a Etapa 7: "Ana" (iniciante,
  violão, rock, objetivo aprender acordes) e "Bruno" (intermediário,
  piano/teoria, clássico, objetivo aperfeiçoar teoria). As mesmas personas
  existem agora também como seed no banco (ids fixos
  11111111-...-111111111111 e 22222222-...-222222222222).
- Ao começar a Etapa 13, sugerir dividir em sub-blocos nesta ordem:
  1) servidor base + conexão com banco, 2) autenticação real,
  3) catálogo/perfil, 4) trilhas/exercícios/progresso,
  5) troca dos services do front-end um de cada vez.