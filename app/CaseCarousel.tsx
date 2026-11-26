"use client";

import { useRef, type ReactNode } from "react";

export function CaseCarousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);

  function scroll(direction: number) {
    const carousel = track.current;
    const firstCard = carousel?.firstElementChild;
    if (!carousel || !firstCard) return;

    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap);
    carousel.scrollBy({ left: direction * (firstCard.getBoundingClientRect().width + gap) });
  }

  return (
    <>
      <div className="case-controls">
        <button type="button" aria-label="Case anterior" aria-controls="case-carousel" onClick={() => scroll(-1)}>←</button>
        <button type="button" aria-label="Próximo case" aria-controls="case-carousel" onClick={() => scroll(1)}>→</button>
      </div>
      <div id="case-carousel" className="case-carousel" ref={track} tabIndex={0} role="region" aria-label="Cases de clientes">
        {children}
      </div>
    </>
  );
}
