import { strengths } from '../data';

export default function About({ setRef, isVisible }) {
  return (
    <section id="about" ref={setRef('about')} className={isVisible ? 'in-view' : ''}>
      <div className="reveal">
        <div className="eyebrow">ABOUT</div>
        <div className="grid-about">
          {strengths.map((s) => (
            <div className="card" key={s.title}>
              <div className="card-title">{s.title}</div>
              <div className="card-body">{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
