import { useEffect, useRef } from 'react';

const easeInOutQuart = (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2);

let scrollAnimId = null;

function animateScrollTo(el, target, duration = 750, onComplete) {
  if (scrollAnimId) cancelAnimationFrame(scrollAnimId);
  const start = el.scrollLeft;
  const change = target - start;
  if (!change) {
    onComplete?.();
    return;
  }
  const startTime = performance.now();

  const step = (now) => {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / duration);
    el.scrollLeft = start + change * easeInOutQuart(t);
    if (t < 1) {
      scrollAnimId = requestAnimationFrame(step);
    } else {
      onComplete?.();
    }
  };
  requestAnimationFrame(step);
}

// With 3 copies of the project list rendered back-to-back, "setWidth" is the
// pixel width of exactly one copy. Whenever scrollLeft drifts into the first
// or third copy, we silently jump by +/- setWidth to the identical-looking
// position in the middle copy — the content is a clone, so the jump is
// invisible and forward/backward scrolling feels endless.
function normalizeScroll(track) {
  const setWidth = track.scrollWidth / 3;
  if (track.scrollLeft < setWidth - 2) {
    track.scrollLeft += setWidth;
  } else if (track.scrollLeft >= setWidth * 2 - 2) {
    track.scrollLeft -= setWidth;
  }
}

export default function Projects({ id, eyebrow, title, items, setRef, isVisible, onSelect }) {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false, lastX: 0, lastT: 0, vx: 0 });
  // The infinite-scroll clone trick only makes sense once there's more than
  // one card to loop through — with a single item it just shows 3 copies.
  const isLoopable = items.length > 1;
  const loop = isLoopable ? [...items, ...items, ...items] : items;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isLoopable) return;
    track.scrollLeft = track.scrollWidth / 3;
  }, [isLoopable]);

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track || !isLoopable) return;
    const card = track.querySelector('.proj-card');
    const step = card ? card.getBoundingClientRect().width + 24 : track.clientWidth * 0.8;
    const target = track.scrollLeft + dir * step;
    animateScrollTo(track, target, 750, () => normalizeScroll(track));
  };

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) {
      drag.current.active = false;
      drag.current.moved = false;
      return;
    }
    const track = trackRef.current;
    const now = performance.now();
    drag.current = { active: true, startX: e.clientX, scrollLeft: track.scrollLeft, moved: false, lastX: e.clientX, lastT: now, vx: 0 };
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const track = trackRef.current;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    track.scrollLeft = drag.current.scrollLeft - dx;

    const now = performance.now();
    const dt = now - drag.current.lastT;
    if (dt > 0) drag.current.vx = (e.clientX - drag.current.lastX) / dt;
    drag.current.lastX = e.clientX;
    drag.current.lastT = now;
  };

  const finishDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const track = trackRef.current;
    const momentum = drag.current.vx * -220;
    const target = track.scrollLeft + momentum;
    animateScrollTo(track, target, 520, () => isLoopable && normalizeScroll(track));
  };

  // setPointerCapture (used for mouse-drag) redirects the native click's
  // target to the track element, so per-card onClick never fires for a
  // plain mouse click. Resolve the actual card under the cursor here instead.
  const onPointerUp = (e) => {
    const wasMouseDrag = e.pointerType === 'mouse';
    const wasMoved = drag.current.moved;
    finishDrag();
    if (wasMouseDrag && !wasMoved) {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const cardEl = el && el.closest('.proj-card');
      if (cardEl && cardEl.dataset.index != null) {
        onSelect(items[Number(cardEl.dataset.index)]);
      }
    }
  };

  const handleSelect = (i) => {
    if (drag.current.moved) return;
    onSelect(items[i]);
  };

  return (
    <section id={id} ref={setRef(id)} className={isVisible ? 'in-view' : ''}>
      <div className="reveal">
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="h2">{title}</h2>
        <div className="proj-carousel">
          <div
            className="proj-track"
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={finishDrag}
            onPointerCancel={finishDrag}
          >
            {loop.map((p, i) => {
              const realIndex = i % items.length;
              return (
                <div className="card elev-md proj-card" key={`${p.name}-${i}`} data-index={realIndex} onClick={() => handleSelect(realIndex)}>
                  <div className="proj-thumb">
                    {p.thumb ? <img src={p.thumb} alt={p.name} /> : <i className="ph ph-image" />}
                  </div>
                  <div className="proj-body">
                    <div className="card-kicker">{p.tag}</div>
                    <div className="card-title">{p.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {isLoopable && (
          <div className="proj-controls">
            <button type="button" className="proj-arrow" onClick={() => scrollByCard(-1)} aria-label="이전 프로젝트">
              <i className="ph ph-caret-left" />
            </button>
            <button type="button" className="proj-arrow" onClick={() => scrollByCard(1)} aria-label="다음 프로젝트">
              <i className="ph ph-caret-right" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
