import { education, certs } from '../data';

export default function Education({ setRef, isVisible }) {
  return (
    <section id="education" ref={setRef('education')} className={isVisible ? 'in-view' : ''}>
      <div className="reveal">
        <div className="eyebrow">EDUCATION</div>
        <h2 className="h2">학력 &amp; 자격</h2>
        <div className="edu-list">
          {education.map((e) => (
            <div className="card elev-sm edu-card" key={e.school}>
              <div className="card-kicker">{e.period}</div>
              <div className="card-title">{e.school}</div>
              <div className="card-body">{e.detail}</div>
            </div>
          ))}
        </div>
        <h3 className="h3">취득자격증</h3>
        <div className="cert-row">
          {certs.map((c) => <div className="tag tag-outline" key={c}>{c}</div>)}
        </div>
      </div>
    </section>
  );
}
