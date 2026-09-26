const TRACK_PROGRESS_KEY = 'ocean:v1:trackProgress';
const DAILY_ACTIVITY_KEY = 'ocean:v1:dailyActivity';

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readByUser(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Só LEITURA por enquanto. Nada ainda escreve progresso ou atividade —
// isso é o Passo 4 da Etapa 9 (finalizar uma sessão de exercícios).
// Por isso todo usuário novo chega aqui com tudo vazio, o que é o
// comportamento correto para quem nunca estudou.
export async function getDashboardInputs(userId) {
  await delay();
  const allTrackProgress = readByUser(TRACK_PROGRESS_KEY);
  const allDailyActivity = readByUser(DAILY_ACTIVITY_KEY);

  return {
    trackProgress: allTrackProgress[userId] || {},
    dailyActivity: allDailyActivity[userId] || [],
  };
}