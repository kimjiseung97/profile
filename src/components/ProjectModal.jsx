import { projects } from '../data';

export default function ProjectModal({ index, onClose }) {
  if (index == null) return null;
  const p = projects[index];

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-title">{p.name}</div>
        <div className="tag tag-outline" style={{ width: 'fit-content', marginBottom: 'var(--space-4)' }}>
          {p.tag}
        </div>
        <div className="dialog-body">
          <ul>
            {p.detail.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
        <div className="dialog-actions">
          <button className="btn btn-secondary" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}
