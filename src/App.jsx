import { useState } from 'react';
import Nav from './components/Nav';
import Intro from './components/Intro';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Contact from './components/Contact';
import { useSectionObserver } from './hooks/useSectionObserver';
import './App.css';

const SECTION_IDS = ['intro', 'about', 'experience', 'education', 'skills', 'projects', 'contact'];

export default function App() {
  const { visible, active, setRef } = useSectionObserver(SECTION_IDS);
  const [activeProjectIdx, setActiveProjectIdx] = useState(null);

  return (
    <>
      <Nav active={active} />
      <Intro setRef={setRef} isActive={active === 'intro'} />
      <main>
        <About setRef={setRef} isVisible={visible.has('about')} />
        <Experience setRef={setRef} isVisible={visible.has('experience')} />
        <Education setRef={setRef} isVisible={visible.has('education')} />
        <Skills setRef={setRef} isVisible={visible.has('skills')} />
        <Projects setRef={setRef} isVisible={visible.has('projects')} onSelect={setActiveProjectIdx} />
        <Contact setRef={setRef} isVisible={visible.has('contact')} />
        <footer>© 2026 Kim Jiseung</footer>
      </main>
      <ProjectModal index={activeProjectIdx} onClose={() => setActiveProjectIdx(null)} />
    </>
  );
}
