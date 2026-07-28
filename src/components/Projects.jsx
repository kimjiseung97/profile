import { projects } from '../data';

export default function Projects({ setRef, isVisible, onSelect }) {
  return (
    <section id="projects" ref={setRef('projects')} className={isVisible ? 'in-view' : ''}>
      <div className="reveal">
        <div className="eyebrow">PROJECTS</div>
        <h2 className="h2">프로젝트</h2>
        <div className="proj-grid">
          {projects.map((p, i) => (
            <div className="card elev-md proj-card" key={p.name} onClick={() => onSelect(i)}>
              <div className="proj-thumb"><i className="ph ph-image" /></div>
              <div className="proj-body">
                <div className="card-kicker">{p.tag}</div>
                <div className="card-title">{p.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
