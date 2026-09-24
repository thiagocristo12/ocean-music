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