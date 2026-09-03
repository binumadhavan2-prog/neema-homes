import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./NeonReveal.css";

gsap.registerPlugin(ScrollTrigger);

// A neon bar that sweeps across the container once it scrolls into view,
// uncovering the content in its wake. The bar is three stacked layers — a
// white-hot core, a coloured halo and a wide bloom — because a single
// glowing rule reads as a border rather than as light.
//
// Written for this site rather than pulled from a registry: it takes its
// colour from --gold, animates with the GSAP already in the bundle, and
// follows ScrollFloat.jsx's shape (reduced-motion guard, ResizeObserver
// refresh for the hash router, full teardown on unmount).
export default function NeonReveal({
  children,
  className = "",
  duration = 1.15,
  ease = "power2.inOut",
  start = "top 78%",
  flicker = true
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const bar = el.querySelector(".neon-reveal-bar");
    const content = el.querySelector(".neon-reveal-content");

    // Reduced motion still gets the content — it is simply already there,
    // with no bar and no sweep.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(content, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(bar, { opacity: 0 });
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: el, start, once: true }
    });

    // The bar leads and the clip follows it exactly, so the content appears
    // to be lit into existence by the light rather than wiped in beside it.
    // Both run off the same percentage across the same duration and ease,
    // which is what keeps the light on the edge it is revealing.
    timeline
      .fromTo(bar, { opacity: 0 }, { opacity: 1, duration: 0.18, ease: "power1.out" }, 0)
      .fromTo(bar, { left: "0%" }, { left: "100%", duration, ease }, 0)
      .fromTo(
        content,
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration, ease },
        0
      )
      .to(bar, { opacity: 0, duration: 0.28, ease: "power1.in" }, duration * 0.86);

    // A real tube does not strike cleanly. Two short dips while the bar
    // travels sell it as light rather than as a moving gradient.
    if (flicker) {
      timeline
        .to(bar, { opacity: 0.45, duration: 0.05 }, 0.22)
        .to(bar, { opacity: 1, duration: 0.07 }, 0.27)
        .to(bar, { opacity: 0.6, duration: 0.04 }, 0.5)
        .to(bar, { opacity: 1, duration: 0.06 }, 0.54);
    }

    // Photographs above settle in late and the hash router swaps whole
    // pages under this one, both of which change the page height without a
    // resize event and leave the trigger measuring a stale document.
    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    observer.observe(document.body);

    return () => {
      observer.disconnect();
      timeline.scrollTrigger?.kill();
      timeline.kill();
      gsap.set([bar, content], { clearProps: "all" });
    };
  }, [duration, ease, start, flicker]);

  return (
    <div ref={containerRef} className={`neon-reveal ${className}`}>
      <div className="neon-reveal-content">{children}</div>
      <span className="neon-reveal-bar" aria-hidden="true">
        <span className="neon-reveal-bloom" />
        <span className="neon-reveal-halo" />
        <span className="neon-reveal-core" />
      </span>
    </div>
  );
}
