import { strengths } from '../data';

export default function About({ setRef, isVisible }) {
  return (
    <section id="about" ref={setRef('about')} className={isVisible ? 'in-view' : ''}>
      <div className="reveal">
        <div className="eyebrow">ABOUT</div>
        <h2 className="h2">강점</h2>
        <div className="grid-about">
          {strengths.map((s) => (
            <div className="card" key={s.title}>
              <div className="card-icon"><i className={`ph ${s.icon}`} /></div>
              <div className="card-title">{s.title}</div>
              <div className="card-body">{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
