import { Chip } from '../ui';
import { areas } from '../../data/catalog.js';

function AreaFilter({ selectedAreaSlug, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip selected={!selectedAreaSlug} onClick={() => onSelect(null)}>
        Todas
      </Chip>
      {areas.map((area) => (
        <Chip
          key={area.slug}
          selected={selectedAreaSlug === area.slug}
          onClick={() => onSelect(area.slug)}
        >
          {area.name}
        </Chip>
      ))}
    </div>
  );
}

export default AreaFilter;