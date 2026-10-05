import { Card } from '../ui';

const weekdayLabels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function ActivityChart({ days }) {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-ink-900">Atividade dos últimos 14 dias</h2>
      <div className="mt-4 flex items-end justify-between gap-1">
        {days.map((day) => {
          const weekday = new Date(`${day.date}T00:00:00`).getDay();
          return (
            <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
              <div
                title={day.date}
                className={`h-10 w-full rounded-md ${day.studied ? 'bg-ocean-600' : 'bg-ocean-100'}`}
              />
              <span className="text-xs text-ink-400">{weekdayLabels[weekday]}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default ActivityChart;