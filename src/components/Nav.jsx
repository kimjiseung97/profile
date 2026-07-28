import { navSections } from '../data';

export default function Nav({ active }) {
  return (
    <>
      <nav className="dots">
        {navSections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : ''}>
            <span className="label">{s.label}</span>
            <span className="dot" />
          </a>
        ))}
      </nav>
    </>
  );
}
