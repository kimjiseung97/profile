import { useEffect, useState } from 'react';
import ArchitectureDiagram from './ArchitectureDiagram';

const CLOSE_DURATION = 180;

function GroupList({ groups }) {
  return groups.map((g, i) => (
    <div className="exp-group" key={i}>
      {g.heading && <div className="exp-group-heading">{g.heading}</div>}
      <ul>
        {g.items.map((it, j) => <li key={j}>{it}</li>)}
      </ul>
    </div>
  ));
}

export default function ProjectModal({ project, onClose }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (project != null) setClosing(false);
  }, [project]);

  if (project == null) return null;
  const p = project;
  const hasSections = Boolean(p.overview);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, CLOSE_DURATION);
  };

  return (
    <div className={`dialog-backdrop${closing ? ' closing' : ''}`} onClick={handleClose}>
      <div className={`dialog${hasSections ? ' dialog-lg' : ''}${p.architecture ? ' dialog-xl' : ''}${closing ? ' closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="dialog-title">{p.name}</div>
        <div className="tag tag-outline" style={{ width: 'fit-content', marginBottom: 'var(--space-4)' }}>
          {p.tag}
        </div>

        {hasSections ? (
          <div className="dialog-sections">
            <section className="dialog-section">
              <div className="dialog-section-heading"><i className="ph ph-buildings" />프로젝트 개요</div>
              <p className="dialog-section-text">{p.overview}</p>
            </section>

            {p.stack && (
              <section className="dialog-section">
                <div className="dialog-section-heading"><i className="ph ph-stack" />주요 기술 스택</div>
                <div className="stack-row">
                  {p.stack.map((s) => <span key={s} className="tag tag-accent">{s}</span>)}
                </div>
              </section>
            )}

            {p.architecture && (
              <section className="dialog-section">
                <div className="dialog-section-heading"><i className="ph ph-flow-arrow" />아키텍처</div>
                <div className="arch-list">
                  {p.architecture.map((a, i) => (
                    <div className="arch-item" key={i}>
                      <div className="arch-item-title">{a.title}</div>
                      <ArchitectureDiagram diagram={a.diagram} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {p.devItems && (
              <section className="dialog-section">
                <div className="dialog-section-heading"><i className="ph ph-code" />개발 항목</div>
                <GroupList groups={p.devItems} />
              </section>
            )}

            {p.achievements && (
              <section className="dialog-section">
                <div className="dialog-section-heading"><i className="ph ph-trophy" />주요 성과</div>
                <GroupList groups={p.achievements} />
              </section>
            )}

            {p.issues && (
              <section className="dialog-section">
                <div className="dialog-section-heading"><i className="ph ph-lightbulb" />이슈 해결 경험</div>
                <div className="issue-accordion">
                  {p.issues.map((iss, i) => (
                    <div className="issue-card" key={i}>
                      <div className="issue-header">
                        <span>{iss.title}</span>
                      </div>
                      <p className="issue-body">{iss.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="dialog-body">
            <ul>
              {p.detail.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        )}

        <div className="dialog-actions">
          <button className="btn btn-secondary" onClick={handleClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}
