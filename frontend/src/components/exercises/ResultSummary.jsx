import { Link } from 'react-router-dom';
import { Card, buttonBaseClasses, buttonVariants } from '../ui';

function ResultSummary({ correctCount, totalCount, trackSlug, nextLessonId }) {
  const scorePercent = Math.round((correctCount / totalCount) * 100);
  const isGood = scorePercent >= 70;

  return (
    <Card className="space-y-4 text-center">
      <div>
        <p className="text-4xl">{isGood ? '🎉' : '💪'}</p>
        <h1 className="mt-2 text-xl font-bold text-ink-900">
          {isGood ? 'Boa sessão!' : 'Você está avançando'}
        </h1>
        <p className="mt-1 text-ink-500">
          Você acertou {correctCount} de {totalCount} exercícios ({scorePercent}%).
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {nextLessonId && (
          <Link
            to={`/exercicio/${nextLessonId}`}
            className={`${buttonBaseClasses} ${buttonVariants.primary} w-full`}
          >
            Próxima lição
          </Link>
        )}
        <Link
          to={`/trilhas/${trackSlug}`}
          className={`${buttonBaseClasses} ${buttonVariants.secondary} w-full`}
        >
          Voltar à trilha
        </Link>
      </div>
    </Card>
  );
}

export default ResultSummary;