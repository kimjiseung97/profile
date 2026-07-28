import { skillGroups } from '../data';

export default function Skills({ setRef, isVisible }) {
  return (
    <section id="skills" ref={setRef('skills')} className={isVisible ? 'in-view' : ''}>
      <div className="reveal">
        <div className="eyebrow">SKILLS</div>
        <h2 className="h2">기술 스택</h2>
        <div className="skill-groups">
          {skillGroups.map((grp) => (
            <div key={grp.name}>
              <div className="skill-group-name">{grp.name}</div>
              <div className="cert-row">
                {grp.items.map((sk) => <div className="tag tag-accent" key={sk}>{sk}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
