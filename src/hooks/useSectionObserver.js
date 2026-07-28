import { useEffect, useRef, useState } from 'react';

export function useSectionObserver(sectionIds) {
  const [visible, setVisible] = useState(() => new Set());
  const [active, setActive] = useState(sectionIds[0]);
  const refs = useRef({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => new Set(prev).add(entry.target.id));
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.35, rootMargin: '-10% 0px -10% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = refs.current[id];
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [sectionIds]);

  const setRef = (id) => (el) => {
    refs.current[id] = el;
  };

  return { visible, active, setRef };
}
