import { experience } from '../data';

export default function Experience({ setRef, isVisible }) {
  return (
    <section id="experience" ref={setRef('experience')} className={isVisible ? 'in-view' : ''}>
      <div className="reveal">
        <div className="eyebrow">EXPERIENCE</div>
        <h2 className="h2">경력</h2>
        <div className="exp-list">
          {experience.map((job) => (
            <div className="card elev-sm exp-card" key={job.company}>
              <div className="card-kicker">{job.period}</div>
              <div className="card-title">{job.company} · {job.role}</div>
              {job.groups.map((g, i) => (
                <div className="exp-group" key={i}>
                  {g.heading && <div className="exp-group-heading">{g.heading}</div>}
                  <ul>
                    {g.items.map((it, j) => <li key={j}>{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
