import { useEffect, useState } from 'react';
import { projects } from '../data';

const CLOSE_DURATION = 180;

export default function ProjectModal({ index, onClose }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (index != null) setClosing(false);
  }, [index]);

  if (index == null) return null;
  const p = projects[index];

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, CLOSE_DURATION);
  };

  return (
    <div className={`dialog-backdrop${closing ? ' closing' : ''}`} onClick={handleClose}>
      <div className={`dialog${closing ? ' closing' : ''}`} onClick={(e) => e.stopPropagation()}>
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
          <button className="btn btn-secondary" onClick={handleClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}
