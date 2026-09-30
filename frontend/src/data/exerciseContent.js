export const exerciseContent = {
  'violao-primeiros-passos--conhecendo-o-violao': {
    content: [
      {
        type: 'text',
        title: 'As partes do violão',
        body: 'O violão tem corpo, braço e cordas. Você vai usar esses nomes o tempo todo, então vale a pena conhecê-los desde já.',
      },
    ],
    exercises: [
      {
        key: 'ex-1',
        type: 'multiple_choice',
        prompt: 'Quantas cordas tem um violão comum?',
        payload: {
          options: [
            { id: 'a', text: '4' },
            { id: 'b', text: '6' },
            { id: 'c', text: '8' },
          ],
        },
        solution: { correctOptionId: 'b' },
        explanation: 'O violão comum tem 6 cordas.',
      },
      {
        key: 'ex-2',
        type: 'true_false',
        prompt: 'As cordas mais grossas do violão produzem sons mais agudos.',
        payload: {},
        solution: { value: false },
        explanation: 'É o contrário: cordas mais grossas produzem sons mais graves.',
      },
    ],
  },

  'violao-primeiros-passos--postura-e-maos': {
    content: [
      {
        type: 'tip',
        body: 'Sente-se com a coluna reta e apoie o violão no colo, sem forçar o pulso da mão que aperta as cordas.',
      },
    ],
    exercises: [
      {
        key: 'ex-1',
        type: 'true_false',
        prompt: 'Forçar o pulso ajuda a tocar mais rápido.',
        payload: {},
        solution: { value: false },
        explanation: 'Forçar o pulso machuca e atrapalha a técnica a longo prazo.',
      },
      {
        key: 'ex-2',
        type: 'multiple_choice',
        prompt: 'Para destros, qual mão geralmente aperta as cordas no braço do violão?',
        payload: {
          options: [
            { id: 'a', text: 'Direita' },
            { id: 'b', text: 'Esquerda' },
          ],
        },
        solution: { correctOptionId: 'b' },
        explanation: 'Para destros, a mão esquerda aperta as cordas e a direita toca.',
      },
    ],
  },

  'violao-primeiros-passos--em-e-am': {
    content: [
      {
        type: 'text',
        title: 'O que é um acorde?',
        body: 'Um acorde é um conjunto de notas tocadas juntas. Em e Am são dois dos primeiros acordes que todo violonista aprende.',
      },
    ],
    exercises: [
      {
        key: 'ex-1',
        type: 'multiple_choice',
        prompt: 'Quais notas formam o acorde de Lá menor (Am)?',
        payload: {
          options: [
            { id: 'a', text: 'Lá, Dó, Mi' },
            { id: 'b', text: 'Lá, Dó#, Mi' },
            { id: 'c', text: 'Lá, Si, Mi' },
          ],
        },
        solution: { correctOptionId: 'a' },
        explanation: 'Am tem Lá (fundamental), Dó (terça menor) e Mi (quinta).',
      },
      {
        key: 'ex-2',
        type: 'true_false',
        prompt: 'O acorde de Em pode ser tocado com apenas dois dedos.',
        payload: {},
        solution: { value: true },
        explanation: 'Sim: um dedo na 5ª corda e outro na 4ª, ambos na 2ª casa.',
      },
    ],
  },

  'violao-primeiros-passos--troca-de-acordes': {
    content: [
      {
        type: 'tip',
        body: 'Pratique trocar entre Em e Am devagar, contando até 4 a cada troca, antes de tentar acelerar.',
      },
    ],
    exercises: [
      {
        key: 'ex-1',
        type: 'true_false',
        prompt: 'É normal levar alguns dias para trocar de acorde sem travar.',
        payload: {},
        solution: { value: true },
        explanation: 'Isso é parte natural do aprendizado — a repetição cria memória muscular.',
      },
      {
        key: 'ex-2',
        type: 'multiple_choice',
        prompt: 'O que ajuda mais a ganhar velocidade na troca de acordes?',
        payload: {
          options: [
            { id: 'a', text: 'Praticar rápido desde o início' },
            { id: 'b', text: 'Praticar devagar e com constância' },
            { id: 'c', text: 'Trocar de violão' },
          ],
        },
        solution: { correctOptionId: 'b' },
        explanation: 'Praticar devagar e com constância cria a base para acelerar depois.',
      },
    ],
  },

  'violao-primeiros-passos--ritmos': {
    content: [
      {
        type: 'text',
        title: 'Batida simples em 4/4',
        body: 'Uma batida básica alterna entre para baixo e para cima, contando 1 e 2 e 3 e 4.',
      },
    ],
    exercises: [
      {
        key: 'ex-1',
        type: 'multiple_choice',
        prompt: 'Em um compasso 4/4, quantos tempos você conta?',
        payload: {
          options: [
            { id: 'a', text: '2' },
            { id: 'b', text: '3' },
            { id: 'c', text: '4' },
          ],
        },
        solution: { correctOptionId: 'c' },
        explanation: '4/4 significa 4 tempos por compasso.',
      },
      {
        key: 'ex-2',
        type: 'true_false',
        prompt: 'Uma batida de violão só pode usar movimentos para baixo.',
        payload: {},
        solution: { value: false },
        explanation: 'A maioria das batidas combina movimentos para baixo e para cima.',
      },
    ],
  },

  'violao-primeiros-passos--primeiras-musicas': {
    content: [
      {
        type: 'tip',
        body: 'Escolha uma música com poucos acordes para começar, mesmo que ainda não saia perfeita.',
      },
    ],
    exercises: [
      {
        key: 'ex-1',
        type: 'true_false',
        prompt: 'Tocar uma música errando algumas vezes já é um bom sinal de progresso.',
        payload: {},
        solution: { value: true },
        explanation: 'Errar faz parte do processo — o importante é continuar tentando.',
      },
      {
        key: 'ex-2',
        type: 'multiple_choice',
        prompt: 'O que é mais importante ao tocar sua primeira música?',
        payload: {
          options: [
            { id: 'a', text: 'Tocar perfeitamente' },
            { id: 'b', text: 'Manter o ritmo, mesmo com pequenos erros' },
            { id: 'c', text: 'Tocar o mais rápido possível' },
          ],
        },
        solution: { correctOptionId: 'b' },
        explanation: 'Manter o ritmo é mais importante que perfeição no começo.',
      },
    ],
  },
};