# Revisão do conteúdo: Piano: Evoluindo e Teoria: Harmonia e Escalas (Etapa 17.2)

Este documento mostra, em formato de leitura, tudo o que o arquivo `add-content-piano-teoria.sql` cadastra. Use-o para revisar o conteúdo **antes** de rodar o SQL (ou depois, se preferir: o SQL pode ser executado de novo para aplicar ajustes).

**Resumo:** 2 trilhas, 6 etapas, 11 lições, 43 exercícios (27 de múltipla escolha, 14 de verdadeiro/falso e 2 de áudio).

## O que conferir (onde o seu olhar vale mais)

- **Correção musical:** fórmulas das escalas, notas dos acordes, armaduras, graus do campo harmônico e tipos de cadência. Todas as respostas corretas estão marcadas com ✅.
- **Nível e linguagem:** o texto está adequado para quem já sabe o básico (nível intermediário)? Algum termo precisa de explicação?
- **Repertório (lição "Peças clássicas de iniciação"):** citei o Prelúdio em Dó maior (Bach), a Sonata Fácil em Dó maior (Mozart), Für Elise (Beethoven) e o Álbum para a Juventude (Schumann). Troque por peças que você considere mais adequadas, se quiser.
- **Exercícios de áudio:** são 2 ("maior ou menor?" e "3ª maior ou menor?"). O som é sintetizado (onda triangular), então ouça antes de aprovar: a diferença precisa ficar perceptível.
- **Notação:** o texto usa sustenido (Fá#), bemol (Mi♭), nomes de notas em solfejo (Dó, Ré, Mi...) e cifras para acordes (C, Dm, G). Confira se a mistura faz sentido para o seu público.

**Como ajustar:** me diga o que mudar (ou aponte o texto) e eu regenero o SQL. Rodar o arquivo de novo atualiza os textos sem duplicar nada.

---

## Piano: Evoluindo (`piano-evoluindo`)

### Etapa 1: Escalas e acordes

#### Lição 1: Escalas maiores e menores

**Conteúdo**

- **Escala maior: a fórmula.** Toda escala maior segue a mesma sequência de tons (T) e semitons (S): T – T – S – T – T – T – S. Em Dó maior, isso dá Dó, Ré, Mi, Fá, Sol, Lá, Si, usando só as teclas brancas.
- **Escala menor natural.** A escala menor natural segue outra fórmula: T – S – T – T – S – T – T. Lá menor natural usa só teclas brancas: Lá, Si, Dó, Ré, Mi, Fá, Sol. Lá menor é a relativa menor de Dó maior: as duas usam as mesmas notas.
- 🔊 **Demonstração sonora** (C4). Ouça a nota Dó, ponto de partida da escala de Dó maior.

**Exercícios**

1. *(múltipla escolha)* Qual é a fórmula de tons (T) e semitons (S) da escala maior?
   - a) T – T – S – T – T – T – S ✅
   - b) T – S – T – T – S – T – T
   - c) S – T – T – S – T – T – T
   - *Explicação mostrada ao aluno:* A escala maior é T – T – S – T – T – T – S. A segunda opção é a fórmula da escala menor natural.
2. *(verdadeiro ou falso)* Lá menor natural e Dó maior usam exatamente as mesmas notas.
   - Resposta: **Verdadeiro** ✅
   - *Explicação mostrada ao aluno:* Sim. Lá menor é a relativa menor de Dó maior: as mesmas notas, mas começando em Lá.
3. *(múltipla escolha)* Qual é a 7ª nota da escala de Dó maior?
   - a) Dó
   - b) Lá
   - c) Si ✅
   - *Explicação mostrada ao aluno:* Dó, Ré, Mi, Fá, Sol, Lá, Si: a sétima nota é Si.
4. *(verdadeiro ou falso)* Na escala maior, os semitons ficam entre o 2º e o 3º graus e entre o 5º e o 6º graus.
   - Resposta: **Falso** ✅
   - *Explicação mostrada ao aluno:* Os semitons ficam entre o 3º e o 4º graus e entre o 7º e o 8º graus (Mi–Fá e Si–Dó, em Dó maior).

#### Lição 2: Acordes e inversões

**Conteúdo**

- **Tríades maiores e menores.** Uma tríade tem três notas: fundamental, terça e quinta. Na tríade maior, a terça fica 4 semitons acima da fundamental; na menor, 3 semitons. Dó maior: Dó – Mi – Sol. Dó menor: Dó – Mi♭ – Sol.
- **Inversões.** Inverter um acorde é mudar a nota mais grave. Dó – Mi – Sol está em posição fundamental. Mi – Sol – Dó é a 1ª inversão (terça no baixo). Sol – Dó – Mi é a 2ª inversão (quinta no baixo). As notas são as mesmas; só a ordem muda.
- 🔊 **Demonstração sonora** (C4 + E4 + G4). Ouça o acorde de Dó maior.
- 🔊 **Demonstração sonora** (C4 + Eb4 + G4). Agora ouça o acorde de Dó menor. Compare: o som costuma parecer mais sombrio.

**Exercícios**

1. *(múltipla escolha)* Quais notas formam o acorde de Dó maior?
   - a) Dó – Mi – Sol ✅
   - b) Dó – Fá – Lá
   - c) Dó – Mi♭ – Sol
   - *Explicação mostrada ao aluno:* Dó maior = fundamental (Dó), terça maior (Mi) e quinta (Sol). Com Mi♭ seria Dó menor.
2. *(múltipla escolha)* Mi – Sol – Dó é qual posição do acorde de Dó maior?
   - a) Posição fundamental
   - b) 1ª inversão ✅
   - c) 2ª inversão
   - *Explicação mostrada ao aluno:* Na 1ª inversão, a terça (Mi) fica no baixo.
3. *(verdadeiro ou falso)* Na 1ª inversão, a quinta do acorde fica como nota mais grave.
   - Resposta: **Falso** ✅
   - *Explicação mostrada ao aluno:* Na 1ª inversão, a nota mais grave é a terça (Mi, em Dó maior). A quinta no baixo é a 2ª inversão.
4. *(áudio)* Ouça o acorde. Ele é maior ou menor?
   - 🔊 Som tocado: D4 + F4 + A4
   - a) Maior
   - b) Menor ✅
   - *Explicação mostrada ao aluno:* Era Ré menor (Ré – Fá – Lá). A terça menor dá o caráter menor, em geral mais sombrio.

### Etapa 2: Leitura e expressão

#### Lição 3: Leitura de partitura

**Conteúdo**

- **Pauta e claves.** A pauta tem 5 linhas e 4 espaços. A clave indica o nome das notas: no piano, a mão direita costuma ler na clave de Sol e a esquerda, na clave de Fá.
- **Clave de Sol: linhas e espaços.** Na clave de Sol, as linhas, de baixo para cima, são Mi, Sol, Si, Ré, Fá. Os espaços, de baixo para cima, são Fá, Lá, Dó, Mi.
- 💡 **Dica.** Memorize primeiro só as linhas, depois só os espaços, e por fim junte tudo.
- ✍️ **Prática.** Em um papel, desenhe uma pauta e escreva as notas Mi, Sol, Si, Ré e Fá nas cinco linhas, de baixo para cima. Depois confira com o texto acima.

**Exercícios**

1. *(múltipla escolha)* Quantas linhas e quantos espaços tem a pauta?
   - a) 5 linhas e 4 espaços ✅
   - b) 4 linhas e 5 espaços
   - c) 5 linhas e 5 espaços
   - *Explicação mostrada ao aluno:* A pauta tem 5 linhas e 4 espaços.
2. *(múltipla escolha)* Quais são as linhas da clave de Sol, de baixo para cima?
   - a) Fá – Lá – Dó – Mi
   - b) Sol – Si – Ré – Fá – Lá
   - c) Mi – Sol – Si – Ré – Fá ✅
   - *Explicação mostrada ao aluno:* As linhas são Mi – Sol – Si – Ré – Fá. Fá – Lá – Dó – Mi são os espaços.
3. *(verdadeiro ou falso)* Em geral, a mão esquerda do pianista lê a clave de Fá.
   - Resposta: **Verdadeiro** ✅
   - *Explicação mostrada ao aluno:* A clave de Fá cobre as notas mais graves, normalmente tocadas pela mão esquerda.
4. *(múltipla escolha)* Na clave de Sol, qual nota fica na 3ª linha (contando de baixo para cima)?
   - a) Si ✅
   - b) Sol
   - c) Ré
   - *Explicação mostrada ao aluno:* As linhas são Mi, Sol, Si, Ré, Fá. A terceira é Si.

#### Lição 4: Dinâmica e articulação

**Conteúdo**

- **Dinâmica.** Dinâmica é a variação de volume. Da mais fraca para a mais forte: pp (pianíssimo), p (piano), mp (meio piano), mf (meio forte), f (forte) e ff (fortíssimo).
- **Articulação.** Articulação é a forma de atacar cada nota. Staccato: notas curtas e destacadas, marcadas com um ponto. Legato: notas ligadas, sem pausa entre elas, marcadas com uma linha curva (ligadura).
- 💡 **Dica.** O nome do instrumento vem de pianoforte: ao contrário do cravo, ele permitia tocar fraco (piano) ou forte (forte) na mesma tecla, só variando a força do toque.
- ✍️ **Prática.** Toque a mesma nota quatro vezes, com o metrônomo: primeiro em p, depois mf, depois f e, por fim, volte para p. Ouça o volume mudar só pela força do toque. Metrônomo embutido em 60 BPM.

**Exercícios**

1. *(múltipla escolha)* O que significa a indicação f na partitura?
   - a) Forte ✅
   - b) Fraco
   - c) Rápido
   - *Explicação mostrada ao aluno:* f vem de forte. Para tocar fraco, a indicação é p (piano).
2. *(múltipla escolha)* Qual é a ordem correta, do mais fraco para o mais forte?
   - a) pp – p – mp – mf – f – ff ✅
   - b) p – pp – mf – mp – ff – f
   - c) ff – f – mf – mp – p – pp
   - *Explicação mostrada ao aluno:* A ordem crescente é pp – p – mp – mf – f – ff.
3. *(múltipla escolha)* Notas curtas e destacadas, marcadas com um ponto, são chamadas de:
   - a) Legato
   - b) Fortíssimo
   - c) Staccato ✅
   - *Explicação mostrada ao aluno:* Staccato é a articulação de notas curtas e destacadas.
4. *(verdadeiro ou falso)* No legato, há uma pausa curta entre cada nota.
   - Resposta: **Falso** ✅
   - *Explicação mostrada ao aluno:* No legato, as notas são ligadas, sem pausa entre elas.

### Etapa 3: Repertório

#### Lição 5: Peças clássicas de iniciação

**Conteúdo**

- **Por onde começar.** Muitos pianistas começam com peças curtas, como o Prelúdio em Dó maior de Bach, a Sonata Fácil em Dó maior de Mozart, Für Elise (Para Elisa), de Beethoven, e peças do Álbum para a Juventude, de Schumann. Elas treinam leitura, pulso e expressão.
- **Como estudar uma peça.** Divida a peça em frases curtas. Estude cada mão separada, devagar, e só depois junte as duas. Aumente o andamento aos poucos, sem perder a regularidade.
- ✍️ **Prática.** Escolha uma frase de 2 a 4 compassos da sua peça e toque, mãos separadas, com o metrônomo em 60 BPM. Só aumente 5 BPM quando conseguir tocar três vezes seguidas sem erro. Metrônomo embutido em 60 BPM.

**Exercícios**

1. *(múltipla escolha)* Qual é uma boa estratégia para aprender uma peça nova?
   - a) Tocar tudo no andamento final desde o começo
   - b) Dividir em frases curtas e estudar cada mão separada ✅
   - c) Estudar só a mão direita até decorar a peça inteira
   - *Explicação mostrada ao aluno:* Frases curtas, mãos separadas e andamento lento formam a base de um estudo eficiente.
2. *(verdadeiro ou falso)* Aumentar o andamento aos poucos ajuda a manter a regularidade.
   - Resposta: **Verdadeiro** ✅
   - *Explicação mostrada ao aluno:* Sim. Acelerar de forma gradual evita erros e mantém o pulso estável.
3. *(múltipla escolha)* Quem compôs Für Elise (Para Elisa)?
   - a) Mozart
   - b) Schumann
   - c) Beethoven ✅
   - *Explicação mostrada ao aluno:* Beethoven. Mozart compôs a Sonata Fácil em Dó maior, e Schumann, o Álbum para a Juventude.
4. *(múltipla escolha)* Para que serve o metrônomo no estudo de uma peça?
   - a) Afinar o piano
   - b) Manter o pulso regular ✅
   - c) Aumentar o volume
   - *Explicação mostrada ao aluno:* O metrônomo marca um pulso constante, ajudando a tocar com regularidade.

#### Lição 6: Subir ao palco

**Conteúdo**

- **Nervosismo é normal.** Sentir frio na barriga antes de tocar é comum, até entre profissionais. O que ajuda não é eliminar o nervosismo, mas se preparar: conhecer bem a peça e ensaiar nas condições da apresentação.
- **Antes de se apresentar.** Toque a peça de ponta a ponta, sem parar, para alguém ou gravando em vídeo. Se errar, continue: na apresentação não dá para voltar. Antes de começar, respire fundo e relaxe os ombros e os braços.
- 💡 **Dica.** A plateia costuma perceber menos erros do que o músico imagina. Seguir em frente é melhor do que parar.
- ✍️ **Prática.** Toque sua peça de ponta a ponta três vezes seguidas, sem parar para corrigir erros, com o metrônomo em um andamento confortável. Metrônomo embutido em 70 BPM.

**Exercícios**

1. *(múltipla escolha)* O que ajuda a lidar com o nervosismo antes de tocar?
   - a) Evitar ensaiar para não se cansar
   - b) Tocar mais rápido para acabar logo
   - c) Ensaiar a peça de ponta a ponta, simulando a apresentação ✅
   - *Explicação mostrada ao aluno:* Ensaiar sem parar, nas condições da apresentação, prepara o corpo e a mente.
2. *(verdadeiro ou falso)* Se errar durante a apresentação, o melhor é parar e recomeçar do início.
   - Resposta: **Falso** ✅
   - *Explicação mostrada ao aluno:* O ideal é continuar tocando. Praticar a peça sem parar prepara você para isso.
3. *(verdadeiro ou falso)* Sentir nervosismo antes de tocar é normal, mesmo entre profissionais.
   - Resposta: **Verdadeiro** ✅
   - *Explicação mostrada ao aluno:* Sim. O nervosismo é comum; o que importa é se preparar para conviver com ele.

---

## Teoria Musical: Harmonia e Escalas (`teoria-harmonia-escalas`)

### Etapa 1: Tonalidades

#### Lição 1: Tonalidades e armaduras

**Conteúdo**

- **O que é uma tonalidade.** Tonalidade é o conjunto de notas e o centro (a tônica) em torno do qual uma música se organiza. Uma música em Sol maior usa as notas da escala de Sol maior, e Sol é a nota de repouso.
- **Armadura de clave.** A armadura é o grupo de sustenidos (#) ou bemóis (♭) escrito no início da pauta, logo depois da clave. Ela indica a tonalidade. Dó maior não tem alterações; Sol maior tem 1 sustenido (Fá#); Fá maior tem 1 bemol (Si♭).
- **Ordem dos sustenidos.** Os sustenidos aparecem sempre na mesma ordem: Fá, Dó, Sol, Ré, Lá, Mi, Si. Cada tonalidade com sustenidos está uma quinta acima da anterior: Dó (nenhum), Sol (1), Ré (2), Lá (3), Mi (4).
- 🔊 **Demonstração sonora** (G3 + B3 + D4). Ouça o acorde de Sol maior, o acorde de repouso da tonalidade de Sol maior.

**Exercícios**

1. *(múltipla escolha)* Quantos sustenidos tem a armadura de Sol maior?
   - a) Nenhum
   - b) 1 (Fá#) ✅
   - c) 2 (Fá# e Dó#)
   - *Explicação mostrada ao aluno:* Sol maior tem 1 sustenido: Fá#.
2. *(múltipla escolha)* Qual tonalidade tem 2 sustenidos (Fá# e Dó#)?
   - a) Sol maior
   - b) Lá maior
   - c) Ré maior ✅
   - *Explicação mostrada ao aluno:* Ré maior tem 2 sustenidos: Fá# e Dó#. Sol maior tem 1, e Lá maior tem 3.
3. *(verdadeiro ou falso)* Dó maior não tem nenhum sustenido nem bemol na armadura.
   - Resposta: **Verdadeiro** ✅
   - *Explicação mostrada ao aluno:* Sim. Dó maior usa só as teclas brancas, sem alterações.
4. *(múltipla escolha)* Onde fica escrita a armadura de clave?
   - a) No início da pauta, logo depois da clave ✅
   - b) No fim da música
   - c) Só sobre as notas alteradas
   - *Explicação mostrada ao aluno:* A armadura fica no início da pauta, logo depois da clave, e vale para a música inteira.

#### Lição 2: Escalas menores

**Conteúdo**

- **Três formas da escala menor.** A escala menor tem três formas: natural, harmônica e melódica. A natural usa as mesmas notas da relativa maior. As outras duas alteram notas para criar mais tensão em direção à tônica.
- **Menor harmônica.** A menor harmônica é a natural com o 7º grau elevado em um semitom. Em Lá menor: Lá, Si, Dó, Ré, Mi, Fá, Sol#. O salto de Fá para Sol# (um tom e meio) é a marca do seu som.
- **Menor melódica.** Na menor melódica, subindo, o 6º e o 7º graus são elevados. Em Lá menor: Lá, Si, Dó, Ré, Mi, Fá#, Sol#. Ao descer, ela costuma voltar à forma natural.
- 🔊 **Demonstração sonora** (A3 + C4 + E4). Ouça o acorde de Lá menor, tônica destas escalas.

**Exercícios**

1. *(múltipla escolha)* Qual forma da escala menor usa as mesmas notas da relativa maior, sem alterações?
   - a) Harmônica
   - b) Melódica
   - c) Natural ✅
   - *Explicação mostrada ao aluno:* A menor natural usa as mesmas notas da relativa maior. Lá menor natural e Dó maior, por exemplo.
2. *(múltipla escolha)* Qual é a escala de Lá menor harmônica?
   - a) Lá, Si, Dó, Ré, Mi, Fá, Sol# ✅
   - b) Lá, Si, Dó, Ré, Mi, Fá, Sol
   - c) Lá, Si, Dó#, Ré, Mi, Fá#, Sol#
   - *Explicação mostrada ao aluno:* A harmônica é a natural com o 7º grau elevado: Sol vira Sol#. A segunda opção é a natural; a terceira é Lá maior.
3. *(verdadeiro ou falso)* Na escala menor harmônica, o 7º grau é elevado em um semitom.
   - Resposta: **Verdadeiro** ✅
   - *Explicação mostrada ao aluno:* Sim. É isso que cria o salto de um tom e meio entre o 6º e o 7º graus.
4. *(verdadeiro ou falso)* Na escala menor melódica (subindo), apenas o 7º grau é elevado.
   - Resposta: **Falso** ✅
   - *Explicação mostrada ao aluno:* Subindo, a menor melódica eleva o 6º e o 7º graus.

### Etapa 2: Intervalos e campo harmônico

#### Lição 3: Intervalos e inversões

**Conteúdo**

- **Intervalo.** Intervalo é a distância entre duas notas. O nome tem um número, contado pelas notas da escala incluindo as duas pontas, e uma qualidade (justo, maior, menor, aumentado ou diminuto). De Dó a Sol há 5 notas (Dó, Ré, Mi, Fá, Sol): é uma 5ª justa.
- **Inversão de intervalos.** Inverter um intervalo é levar a nota mais grave uma oitava acima. O número do intervalo e o do invertido somam 9: uma 3ª vira 6ª, e uma 5ª vira 4ª. Maior vira menor (e vice-versa), aumentado vira diminuto, e o justo continua justo.
- 🔊 **Demonstração sonora** (C4 + E4). Ouça uma 3ª maior: Dó e Mi tocadas juntas.
- 🔊 **Demonstração sonora** (C4 + Eb4). Agora uma 3ª menor: Dó e Mi♭. Perceba a diferença.

**Exercícios**

1. *(múltipla escolha)* Qual é o intervalo entre Dó e Sol?
   - a) 3ª maior
   - b) 4ª justa
   - c) 5ª justa ✅
   - *Explicação mostrada ao aluno:* De Dó a Sol, contando as duas pontas: Dó, Ré, Mi, Fá, Sol = 5 notas. É uma 5ª justa.
2. *(múltipla escolha)* Ao inverter uma 3ª, obtemos uma:
   - a) 4ª
   - b) 6ª ✅
   - c) 7ª
   - *Explicação mostrada ao aluno:* O número do intervalo e o do invertido somam 9: 3 + 6 = 9.
3. *(verdadeiro ou falso)* Ao inverter uma 5ª justa, obtém-se uma 4ª justa.
   - Resposta: **Verdadeiro** ✅
   - *Explicação mostrada ao aluno:* Sim. 5 + 4 = 9, e o intervalo justo continua justo.
4. *(áudio)* Ouça as duas notas tocadas juntas. A terça é maior ou menor?
   - 🔊 Som tocado: E4 + G4
   - a) 3ª maior
   - b) 3ª menor ✅
   - *Explicação mostrada ao aluno:* De Mi a Sol são 3 semitons: uma 3ª menor, de som mais fechado. Mi–Sol# seria uma 3ª maior.

#### Lição 4: Campo harmônico

**Conteúdo**

- **O que é o campo harmônico.** Campo harmônico é o conjunto de acordes formados sobre cada nota de uma escala, usando só as notas da própria escala. Em uma escala maior, são sete acordes, um para cada grau.
- **Campo harmônico de Dó maior.** Os acordes são: C (I), Dm (ii), Em (iii), F (IV), G (V), Am (vi) e Bdim (vii°). Os graus I, IV e V são maiores; ii, iii e vi são menores; e o vii° é diminuto.
- 💡 **Dica.** I, IV e V são os acordes principais: tônica, subdominante e dominante. Com só esses três já dá para acompanhar muitas músicas.
- 🔊 **Demonstração sonora** (C4 + E4 + G4). Acorde I (Dó maior): passa a sensação de repouso.
- 🔊 **Demonstração sonora** (G3 + B3 + D4). Acorde V (Sol maior): cria tensão e pede para voltar ao I.

**Exercícios**

1. *(múltipla escolha)* Quais são os acordes do campo harmônico de Dó maior, em ordem?
   - a) C – D – E – F – G – A – B
   - b) C – Dm – Em – F – G – A – Bdim
   - c) C – Dm – Em – F – G – Am – Bdim ✅
   - *Explicação mostrada ao aluno:* O campo harmônico de Dó maior é C – Dm – Em – F – G – Am – Bdim.
2. *(múltipla escolha)* Qual grau do campo harmônico de Dó maior é o acorde G?
   - a) IV
   - b) V ✅
   - c) vi
   - *Explicação mostrada ao aluno:* Dó (I), Ré (II), Mi (III), Fá (IV), Sol (V): G é o V grau, a dominante.
3. *(verdadeiro ou falso)* No campo harmônico maior, o acorde do grau vii é um acorde maior.
   - Resposta: **Falso** ✅
   - *Explicação mostrada ao aluno:* O grau vii forma um acorde diminuto (Bdim, em Dó maior).
4. *(múltipla escolha)* Em Sol maior, qual é o acorde do grau IV?
   - a) C ✅
   - b) D
   - c) Em
   - *Explicação mostrada ao aluno:* Sol (I), Lá (II), Si (III), Dó (IV): o acorde do IV grau é C.

### Etapa 3: Cadências

#### Lição 5: Cadências

**Conteúdo**

- **O que é uma cadência.** Cadência é a sequência de acordes que encerra uma frase musical, como uma pontuação: pode dar sensação de pausa, de conclusão ou de suspense.
- **Autêntica e plagal.** Cadência autêntica: V → I (G → C, em Dó maior). É a mais conclusiva, como um ponto final. Cadência plagal: IV → I (F → C), conhecida como o 'amém' dos hinos.
- **Semicadência e de engano.** Semicadência: termina no V e deixa a frase em suspenso, como uma vírgula. Cadência de engano: V → vi (G → Am). Esperávamos o I, mas a música surpreende indo para o vi.
- 🔊 **Demonstração sonora** (G3 + B3 + D4). Passo 1: ouça o acorde de Sol maior (V).
- 🔊 **Demonstração sonora** (C4 + E4 + G4). Passo 2: agora ouça o acorde de Dó maior (I). Em sequência, os dois formam a cadência autêntica.
- ✍️ **Prática.** Se tiver um teclado ou um violão por perto, toque G e depois C. Sinta a sensação de chegada ao tocar o C.

**Exercícios**

1. *(múltipla escolha)* Qual sequência forma a cadência autêntica em Dó maior?
   - a) F → C
   - b) C → Am
   - c) G → C ✅
   - *Explicação mostrada ao aluno:* A cadência autêntica é V → I (G → C). F → C é a cadência plagal.
2. *(múltipla escolha)* A cadência plagal (IV → I) é conhecida como:
   - a) Semicadência
   - b) O 'amém' dos hinos ✅
   - c) Cadência de engano
   - *Explicação mostrada ao aluno:* A cadência plagal (como F → C) é conhecida como o 'amém' dos hinos.
3. *(verdadeiro ou falso)* A semicadência termina no acorde V, deixando a frase em suspenso.
   - Resposta: **Verdadeiro** ✅
   - *Explicação mostrada ao aluno:* Sim. Terminar no V dá a sensação de vírgula, de que a música ainda vai continuar.
4. *(múltipla escolha)* Em Dó maior, G → Am é um exemplo de qual cadência?
   - a) De engano ✅
   - b) Autêntica
   - c) Plagal
   - *Explicação mostrada ao aluno:* Esperamos o I (C), mas a música vai para o vi (Am): é a cadência de engano.
