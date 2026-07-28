import { aboutMe } from '../data';

export default function Contact({ setRef, isVisible }) {
  return (
    <section id="contact" ref={setRef('contact')} className={isVisible ? 'in-view' : ''}>
      <div className="reveal">
        <div className="eyebrow">CONTACT</div>
        <h2 className="h2">Contact &amp; Links</h2>
        <div className="contact-cards">
          <div className="card elev-sm"><i className="ph ph-envelope-simple" /> dickseung23@naver.com</div>
          <div className="card elev-sm"><i className="ph ph-phone" /> 010-7455-8101</div>
          <div className="card elev-sm"><i className="ph ph-map-pin" /> 경기도 남양주시</div>
        </div>
        <div>
          <h3 className="h3">About me</h3>
          <ul className="about-list">
            {aboutMe.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
        <div className="cta-row" style={{ marginTop: 'var(--space-6)' }}>
          <a className="btn btn-primary" href="https://github.com/kimjiseung97?tab=repositories" target="_blank" rel="noopener noreferrer">
            <i className="ph ph-github-logo" /> GitHub
          </a>
          <a className="btn btn-secondary" href="https://devjiseunglog.tistory.com/" target="_blank" rel="noopener noreferrer">
            <i className="ph ph-notebook" /> 블로그
          </a>
        </div>
      </div>
    </section>
  );
}
