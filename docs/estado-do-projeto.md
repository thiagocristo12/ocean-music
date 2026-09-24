# Ocean Music: ponto de continuidade

## Ambiente
- Windows, PowerShell, VS Code. Pasta: C:\Users\Usuario\Documents\ocean-music
- Node 22.15.0 · Git 2.41 · PostgreSQL 18.6 (psql)
- Repositório no GitHub (branch main). Uma branch por etapa (etapa-NN-nome).

## Stack e regras
- Front-end: React + Vite + Tailwind 3.4 (fixado) · JavaScript
- Back-end: Node.js nativo (node:http), SEM Express · driver pg · PostgreSQL
- react-router-dom será instalado na Etapa 4 (decisão D-11)
- Sessão em tabela (não JWT) · tabela `areas` (não `instruments`) · resultado do exercício como fase da mesma rota /exercicio/:id
- Mock primeiro, com camada services/ para trocar por API depois
- Recomendação por regras e pontuação (área +3, objetivo +3, estilo +2, nível +2; trilha de nível superior −3)
- Sempre indicar MOCK ou IMPLEMENTAÇÃO REAL; código completo; explicar onde colocar, como executar e testar

## Progresso
- [x] Etapa 1: arquitetura
- [x] Etapa 2: configuração (Vite, Tailwind, pastas, Git/GitHub)
- [x] Etapa 3: Design System (tokens no tailwind.config.js; componentes em
      frontend/src/components/ui: Button, Card, ProgressBar, Input, Chip;
      página temporária pages/DesignSystem.jsx)
- [ ] Etapa 4: Landing Page (próxima)

## Observações
- Cuidado com a pasta do terminal: rodar npm sempre dentro de `frontend`.
- Decisões registradas em docs/decisoes.md (D-01 a D-13).