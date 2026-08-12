import { useEffect, useRef, useState } from 'react';

let mermaidId = 0;

export default function ArchitectureDiagram({ diagram }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    import('mermaid').then(({ default: mermaid }) => {
      if (cancelled) return;
      mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'strict', fontFamily: 'inherit' });
      const id = `mermaid-${++mermaidId}`;
      mermaid
        .render(id, diagram)
        .then(({ svg }) => {
          if (!cancelled && containerRef.current) containerRef.current.innerHTML = svg;
        })
        .catch(() => !cancelled && setError(true));
    });

    return () => {
      cancelled = true;
    };
  }, [diagram]);

  if (error) return null;
  return <div className="arch-diagram" ref={containerRef} />;
}
