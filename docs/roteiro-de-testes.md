# Ocean Music: roteiro de testes manuais (Etapa 16)

Salvar em `docs/roteiro-de-testes.md`. Serve como guia de teste agora e como **evidência de testes** na monografia e na banca.

**Como usar:** execute cada linha, anote ✅ (passou) ou ❌ (falhou) na coluna **Resultado**. Em caso de ❌, escreva em "Observações" o que apareceu. Me envie só as linhas ❌, com o ID.

Linhas com ⭐ são as **essenciais**. Se o tempo for curto, faça só elas (cerca de 20 minutos).

---

## 0. Preparação

1. Backend rodando (`npm run dev` dentro de `backend/`) e frontend rodando (`npm run dev` dentro de `frontend/`).
2. Contas de teste (senha `senha1234` nas duas): `ana@ocean.music` e `bruno@ocean.music`. Se o login de uma delas falhar com "E-mail ou senha incorretos", o hash dela no banco ainda é o placeholder: gere um hash novo (comando no `estado-do-projeto.md`) e atualize com `UPDATE`, usando aspas simples.
3. Uma **conta nova**, criada por você durante o teste (e-mail à sua escolha).
4. Navegador com DevTools (`F12`). Para testar sem resíduos, use uma janela anônima.
5. Antes de usar `psql`: `$env:PGCLIENTENCODING = "UTF8"` e `chcp 65001`.

> Dica: o app guarda o rascunho do onboarding em `localStorage`. Se algum teste de perfil/onboarding se comportar de modo estranho, apague as chaves `ocean:v1:onboardingDraft:*` (F12 → Application → Local Storage).

---

## A. Autenticação

| ID | Passo | Esperado | Resultado |
|---|---|---|---|
| A01 ⭐ | Em `/cadastro`, preencher nome, e-mail novo e senha de 8+ caracteres | Vai para `/onboarding` | ⬜ |
| A02 | Em `/cadastro`, enviar tudo vazio | Três mensagens de erro (nome, e-mail, senha), sem enviar | ⬜ |
| A03 | Senha com menos de 8 caracteres | "Use pelo menos 8 caracteres." | ⬜ |
| A04 ⭐ | Cadastrar com `ana@ocean.music` | "Esse e-mail já está cadastrado." embaixo do campo e-mail | ⬜ |
| A05 ⭐ | Login com Ana (`senha1234`) | Vai para `/dashboard` | ⬜ |
| A06 ⭐ | Login com senha errada | "E-mail ou senha incorretos." | ⬜ |
| A07 | Login com e-mail que não existe | A mesma mensagem da A06 | ⬜ |
| A08 ⭐ | Logada, apertar `F5` | Continua logada, na mesma página | ⬜ |
| A09 ⭐ | Clicar em "Sair" | Vai para `/login`; o cookie `ocean_session` some (F12 → Application → Cookies) | ⬜ |
| A10 ⭐ | Deslogado, abrir `/dashboard` na barra de endereço | Vai para `/login` | ⬜ |
| A11 | Logada, abrir `/login` ou `/cadastro` | Vai direto para `/dashboard` | ⬜ |
| A12 | Cadastro com nome de mais de 120 caracteres | Mensagem genérica "Não foi possível criar sua conta. Tente novamente." (o servidor recusa com 422) | ⬜ |

## B. Onboarding

Use a **conta nova**.

| ID | Passo | Esperado | Resultado |
|---|---|---|---|
| B01 ⭐ | Logo após o cadastro | "Passo 1 de 5" (nível e experiência) | ⬜ |
| B02 | Passo 1 sem escolher nada | "Continuar" desabilitado até escolher nível **e** experiência | ⬜ |
| B03 ⭐ | Passo 2: marcar 3 áreas, tentar uma quarta | Números 1, 2, 3 pela ordem de clique; a quarta é ignorada; "Continuar" só liga com 1 ou mais | ⬜ |
| B04 | Desmarcar a 1ª área escolhida | A numeração das demais se ajusta | ⬜ |
| B05 ⭐ | Passo 3 (objetivos) | Só aparecem objetivos das áreas escolhidas; dá para avançar sem marcar nada | ⬜ |
| B06 | Passo 4 (estilos) | Até 3 estilos; opcional | ⬜ |
| B07 ⭐ | Passo 5 (resumo): clicar em "Editar" ao lado de "Áreas de interesse" | Volta ao passo 2, com as escolhas preservadas | ⬜ |
| B08 ⭐ | Concluir com "Ir para meu painel" | Vai para `/dashboard` | ⬜ |
| B09 | Com outra conta nova, avançar até o passo 3 e apertar `F5` | Volta ao **Passo 1**, mas com as respostas já preenchidas (o rascunho guarda as respostas, não o número do passo) | ⬜ |
| B10 | Logada com onboarding concluído, abrir `/onboarding` | Vai para `/dashboard` | ⬜ |
| B11 | Com conta nova que NÃO terminou o onboarding, abrir `/dashboard` | Vai para `/onboarding` | ⬜ |

## C. Perfil e edição

Use a **Ana**.

| ID | Passo | Esperado | Resultado |
|---|---|---|---|
| C01 ⭐ | Clicar em "Perfil" | Mostra nome, e-mail, nível, experiência, áreas, objetivos e estilos | ⬜ |
| C02 ⭐ | Clicar em "Editar perfil" | Abre no Passo 1 com os dados atuais já marcados e o aviso "Editando seu perfil" | ⬜ |
| C03 ⭐ | Adicionar uma área, ir até o resumo e clicar em "Salvar alterações" | Volta a `/perfil` mostrando a nova área | ⬜ |
| C04 | Em outra edição, mudar algo e clicar em "Cancelar" antes de salvar | Volta a `/perfil` e nada mudou | ⬜ |
| C05 | Escolher duas áreas em ordem (ex.: Teoria, depois Violão) e salvar | Em `/perfil` a ordem se mantém | ⬜ |
| C06 ⭐ | Depois de C03, abrir o Dashboard | As recomendações refletem a nova área | ⬜ |

> No fim, devolva a Ana ao perfil original (nível iniciante, área Violão, objetivo "Aprender acordes", estilo Rock) para não atrapalhar a demonstração.

## D. Recomendação personalizada

| ID | Passo | Esperado | Resultado |
|---|---|---|---|
| D01 ⭐ | Dashboard da Ana (perfil original) | Destaque "Violão: Primeiros Passos" | ⬜ |
| D02 ⭐ | Dashboard do Bruno | Destaque de Piano ou Teoria (ex.: "Piano: Evoluindo"), **diferente** da Ana | ⬜ |
| D03 ⭐ | Olhar os cartões "Recomendado para você" | Cada cartão mostra até 2 motivos; o motivo do objetivo ("Ajuda a...") vem antes do da área | ⬜ |
| D04 | Abrir `/trilhas` | Seção "Para você" com 3 recomendações | ⬜ |
| D05 ⭐ | Em `/trilhas`, clicar no filtro "Piano" | A grade "Todas as trilhas" mostra só as 2 de Piano; "Para você" não muda | ⬜ |
| D06 | Clicar em "Todas" | Voltam as 9 trilhas | ⬜ |

## E. Trilhas

| ID | Passo | Esperado | Resultado |
|---|---|---|---|
| E01 | `/trilhas`, grade "Todas as trilhas" | 9 trilhas, com barra de progresso | ⬜ |
| E02 ⭐ | Abrir "Violão: Primeiros Passos" | 3 etapas com 2 lições cada | ⬜ |
| E03 ⭐ | Olhar os status das lições (conta sem progresso) | Primeira como "Sugerida" (▶); as demais "Não iniciada"; nenhuma trancada | ⬜ |
| E04 | Clicar no cabeçalho de uma etapa | Abre e fecha | ⬜ |
| E05 ⭐ | Abrir "Piano: Primeiros Passos" | Mensagem "O conteúdo completo desta trilha ainda está sendo preparado", sem tela branca | ⬜ |
| E06 | Abrir `/trilhas/nao-existe` | "Trilha não encontrada", com botão para voltar | ⬜ |
| E07 | `F5` em `/trilhas/violao-primeiros-passos` | Continua na mesma trilha | ⬜ |

## F. Exercícios

Use uma **conta com perfil de violão** (a Ana ou a conta nova).

| ID | Passo | Esperado | Resultado |
|---|---|---|---|
| F01 ⭐ | Abrir "Conhecendo o violão" | Tela com o texto da lição e o botão "Começar exercícios" | ⬜ |
| F02 ⭐ | Exercício de múltipla escolha | "Verificar" só liga depois de escolher uma opção | ⬜ |
| F03 | Responder a opção **certa** | Painel verde "Muito bem!" com a explicação | ⬜ |
| F04 ⭐ | Responder a opção **errada** | Painel "Quase lá." com a explicação | ⬜ |
| F05 | Exercício de verdadeiro/falso | Dois botões; funciona igual ao anterior | ⬜ |
| F06 ⭐ | Terminar a lição | Resultado "Você acertou X de 3 exercícios" com "Próxima lição" e "Voltar à trilha" | ⬜ |
| F07 ⭐ | Clicar em "Próxima lição" | Aparece o **conteúdo da lição nova** (não o resultado da anterior) | ⬜ |
| F08 | "Voltar à trilha" | A lição concluída aparece "Concluída" (✓), a seguinte "Sugerida" | ⬜ |
| F09 | Abrir `/exercicio/naoexiste--nada` | "Lição não encontrada" | ⬜ |
| F10 | `F5` no meio de um exercício | Volta ao início da lição; o progresso já gravado antes não se perde | ⬜ |
| F11 | Refazer uma lição já concluída, errando tudo | O progresso da trilha **não diminui** | ⬜ |

## G. Áudio

Navegador com som ligado. Nada pode tocar sozinho.

| ID | Passo | Esperado | Resultado |
|---|---|---|---|
| G01 ⭐ | Abrir "Conhecendo o violão" e **não clicar em nada** | Nenhum som toca sozinho | ⬜ |
| G02 ⭐ | Clicar em "Ouvir" na tela do conteúdo | Toca uma nota (Mi); o botão anima enquanto toca | ⬜ |
| G03 ⭐ | No 3º exercício ("Qual nota você ouviu?"), clicar em "Ouvir novamente" | Toca uma nota (Lá) | ⬜ |
| G04 | Escolher "Lá (A)" e verificar | Resposta correta, painel verde | ⬜ |
| G05 ⭐ | Abrir a lição "Ritmos" | Aparece o cartão **Metrônomo** em 80 BPM | ⬜ |
| G06 ⭐ | Clicar em "Começar" | Cliques regulares; os 4 pontinhos pulsam em sincronia; o 1º de cada compasso soa mais agudo | ⬜ |
| G07 | Botões `−` e `+` | Mudam de 5 em 5 BPM, entre 40 e 200; com o metrônomo ligado ele continua no novo ritmo | ⬜ |
| G08 ⭐ | Com o metrônomo ligado, clicar em "Começar exercícios" (ou trocar de página) | O som **para** | ⬜ |
| G09 | Usar `Tab` e `Enter` nos botões de áudio | Têm foco visível e funcionam pelo teclado | ⬜ |

## H. Progresso e sequência

Use a **conta nova** para o estado "vazio" e a Ana/conta com lição concluída para o resto.

| ID | Passo | Esperado | Resultado |
|---|---|---|---|
| H01 ⭐ | Concluir uma lição e abrir o Dashboard | Cartão "Continue de onde parou", barra acima de 0% e botão "Continuar" | ⬜ |
| H02 ⭐ | Cartão de sequência no Dashboard | Mostra 1 dia | ⬜ |
| H03 ⭐ | Abrir `/progresso` | Sequência atual e melhor sequência, gráfico de 14 dias com **hoje** marcado, objetivos com barra, trilhas em andamento | ⬜ |
| H04 | Conta nova, sem nenhuma lição feita, em `/progresso` | 0 dias, gráfico todo claro, "Você ainda não começou nenhuma trilha" | ⬜ |
| H05 | `F5` em `/progresso` | Continua na página, com os mesmos dados | ⬜ |
| H06 ⭐ | Sair e entrar de novo com a mesma conta | O progresso continua (agora está no banco) | ⬜ |
| H07 | Comparar Ana e Bruno | Cada um vê apenas o próprio progresso | ⬜ |

## I. Responsividade

DevTools → modo dispositivo (`Ctrl + Shift + M`) → **Responsive**. Repita em **360**, **768** e **1280** de largura.

| ID | Passo | Esperado | Resultado |
|---|---|---|---|
| I01 ⭐ | Percorrer Landing, cadastro, login, onboarding, dashboard, trilhas, detalhe, lição, progresso e perfil | Nenhuma tela com rolagem horizontal; nada cortado ou sobreposto | ⬜ |
| I02 ⭐ | Cabeçalho em **360** | Logo e "Sair" em cima, 4 abas embaixo, aba atual sublinhada | ⬜ |
| I03 | Cabeçalho em **768 e 1280** | Tudo em uma linha, página atual destacada | ⬜ |
| I04 | Onboarding em 360 | Botões "Voltar" e "Continuar" lado a lado, sem estourar | ⬜ |
| I05 ⭐ | Lição com metrônomo e exercício de áudio em 360 | Botões fáceis de tocar; o metrônomo cabe na largura | ⬜ |
| I06 | Landing em 360 e 1280 | Botões do topo empilhados no celular e lado a lado no desktop; 1 coluna de cartões no celular, 3 no desktop | ⬜ |
| I07 | Navegar com `Tab` em qualquer tela | Anel azul de foco visível em todos os botões e links | ⬜ |

## J. API (PowerShell, com o backend rodando)

Cada comando mostra a resposta do servidor. `curl.exe` (com `.exe`) é o programa real, diferente do apelido `curl` do PowerShell.

| ID | Comando | Esperado | Resultado |
|---|---|---|---|
| J01 ⭐ | `Invoke-RestMethod http://localhost:3001/api/health` | `status: ok` | ⬜ |
| J02 | `try { Invoke-RestMethod http://localhost:3001/api/nao-existe } catch { $_.ErrorDetails.Message }` | `NOT_FOUND` | ⬜ |
| J03 ⭐ | `curl.exe -s --path-as-is "http://localhost:3001/api/tracks/%E0%A4%A"` e **depois** J01 de novo | `INVALID_PATH`; o servidor **continua respondendo** | ⬜ |
| J04 ⭐ | `try { Invoke-RestMethod -Uri http://localhost:3001/api/auth/login -Method Post -ContentType 'application/json' -Body '{invalido' } catch { $_.ErrorDetails.Message }` | `INVALID_JSON` | ⬜ |
| J05 | Mesmo comando, com `-Body '5'` | `INVALID_JSON` ("deve ser um objeto JSON") | ⬜ |
| J06 | `$big = '{"t":"' + ('x' * 300000) + '"}'` e depois `try { Invoke-RestMethod -Uri http://localhost:3001/api/auth/login -Method Post -ContentType 'application/json' -Body $big } catch { $_.ErrorDetails.Message }` | `PAYLOAD_TOO_LARGE` | ⬜ |
| J07 | Cadastro com senha curta: `try { Invoke-RestMethod -Uri http://localhost:3001/api/auth/register -Method Post -ContentType 'application/json' -Body '{"name":"X","email":"x@y.com","password":"123"}' } catch { $_.ErrorDetails.Message }` | `VALIDATION_ERROR` | ⬜ |
| J08 ⭐ | `try { Invoke-RestMethod http://localhost:3001/api/me/progress } catch { $_.ErrorDetails.Message }` | `NOT_AUTHENTICATED` | ⬜ |

Para J09 a J11, faça login primeiro (guarda o cookie em `$session`):

```powershell
Invoke-RestMethod -Uri http://localhost:3001/api/auth/login -Method Post -ContentType 'application/json' -Body '{"email":"ana@ocean.music","password":"senha1234"}' -SessionVariable session | Out-Null
```

| ID | Comando | Esperado | Resultado |
|---|---|---|---|
| J09 | `$b = @{level='beginner';priorExperience='none';areaSlugs=@('violao','violao');goalSlugs=@();styleSlugs=@()} \| ConvertTo-Json` e depois `try { Invoke-RestMethod -Uri http://localhost:3001/api/me/profile -Method Put -ContentType 'application/json' -Body $b -WebSession $session } catch { $_.ErrorDetails.Message }` | `VALIDATION_ERROR` (área repetida) | ⬜ |
| J10 | `$b = @{lessonId='violao-primeiros-passos--conhecendo-o-violao';scorePercent=50.5} \| ConvertTo-Json` e depois `try { Invoke-RestMethod -Uri http://localhost:3001/api/me/progress/complete-lesson -Method Post -ContentType 'application/json' -Body $b -WebSession $session } catch { $_.ErrorDetails.Message }` | `VALIDATION_ERROR` (nota decimal) | ⬜ |
| J11 | `$b = @{lessonId='algumacoisa';scorePercent=100} \| ConvertTo-Json` e depois o mesmo `try` da J10 | `LESSON_NOT_FOUND` | ⬜ |

## K. Robustez

| ID | Passo | Esperado | Resultado |
|---|---|---|---|
| K01 ⭐ | Logada, rodar `psql -U ocean_app -d ocean_music -c "DELETE FROM sessions;"` e clicar em "Trilhas" | Vai para `/login`, sem ficar preso em "Carregando..." | ⬜ |
| K02 | Colocar `throw new Error('teste');` como primeira linha da função `Profile` em `frontend/src/pages/Profile.jsx` e abrir `/perfil` | Tela "Algo deu errado" com os botões. **Apague a linha depois.** | ⬜ |
| K03 | Duas abas logadas: sair em uma e clicar em "Trilhas" na outra | A segunda vai para `/login` | ⬜ |
| K04 ⭐ | Procurar em todas as telas (onboarding, trilhas, exercícios, perfil) por textos como "Ã£" ou "Ã§" | Nenhum; todos os acentos corretos | ⬜ |
| K05 ⭐ | `F5` em `/dashboard`, `/trilhas`, `/progresso`, `/perfil` e no detalhe de uma trilha | Cada uma continua na própria página, sem voltar ao Dashboard | ⬜ |

---

## Limitações conhecidas (não são falhas deste roteiro)

- **8 das 9 trilhas não têm conteúdo** (decisão D-50). Só "Violão: Primeiros Passos" funciona de ponta a ponta. Na demonstração com o Bruno, mostre só o Dashboard dele.
- **Backend desligado:** hoje o app fica em "Carregando..." para sempre, porque o `ErrorBoundary` só captura erros de renderização, não falhas de rede. Tratamento previsto para a Etapa 17.
- **A resposta correta dos exercícios vai junto com o exercício** (decisão D-65): simplificação consciente do MVP.
- **Texto "1 dia seguidos"** no cartão de sequência do Dashboard (concordância): ajuste de redação previsto para a Etapa 17.
- **Recarregar o onboarding** volta ao Passo 1, mantendo as respostas.

## Resumo do ciclo de testes

| Data | Responsável | Total | ✅ | ❌ | Observações |
|---|---|---|---|---|---|
| | | | | | |

### Falhas encontradas

| ID | O que apareceu | Corrigido em |
|---|---|---|
| | | |
