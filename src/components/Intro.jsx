export default function Intro({ setRef, isActive }) {
  return (
    <>
      <section id="intro" ref={setRef('intro')}>
        <div className="tag tag-accent" style={{ width: 'fit-content', marginBottom: 'var(--space-4)' }}>
          백엔드 개발자
        </div>
        <h1>
          어제보다 오늘,<br />오늘보다 내일<br />더 나아지는 개발자<br />
          <span style={{ color: 'var(--color-accent-300)' }}>김지승</span>
        </h1>
        <div className="contact-line">
          <span><i className="ph ph-envelope-simple" /> dickseung23@naver.com</span>
          <span><i className="ph ph-phone" /> 010-7455-8101</span>
          <span><i className="ph ph-map-pin" /> 경기도 남양주시</span>
        </div>
        <div className="cta-row">
          <a className="btn btn-primary" href="https://github.com/kimjiseung97?tab=repositories" target="_blank" rel="noopener noreferrer">
            <i className="ph ph-github-logo" /> GitHub
          </a>
          <a className="btn btn-secondary" href="https://devjiseunglog.tistory.com/" target="_blank" rel="noopener noreferrer">
            <i className="ph ph-notebook" /> 블로그
          </a>
        </div>
      </section>
      <div className="scroll-cue" style={{ opacity: isActive ? 1 : 0 }}>
        <span>SCROLL</span>
        <i className="ph ph-arrow-down" />
      </div>
    </>
  );
}
