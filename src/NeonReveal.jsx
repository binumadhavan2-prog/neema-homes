import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./NeonReveal.css";

gsap.registerPlugin(ScrollTrigger);

// One ResizeObserver shared by every instance on the page, coalesced into a
// single refresh per frame. The portfolio grid puts a dozen of these on the
// home page, and an observer apiece would fire a dozen full ScrollTrigger
// refreshes — each one remeasuring every trigger on the page — for one
// layout change. The last instance to unmount tears it down.
let bodyObserver = null;
let observerRefs = 0;
let refreshQueued = false;

function observeBody() {
  observerRefs += 1;

  if (!bodyObserver) {
    bodyObserver = new ResizeObserver(() => {
      if (refreshQueued) return;
      refreshQueued = true;
      requestAnimationFrame(() => {
        refreshQueued = false;
        ScrollTrigger.refresh();
      });
    });
    bodyObserver.observe(document.body);
  }

  return () => {
    observerRefs -= 1;
    if (observerRefs === 0 && bodyObserver) {
      bodyObserver.disconnect();
      bodyObserver = null;
    }
  };
}

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
  flicker = true,
  replay = true
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

    // `restart none none reset`: sweep whenever it enters going down, and
    // once it has left upwards put it back to hidden so the next pass gets
    // the sweep again. Scrolling up into it from below leaves it revealed —
    // re-running the sweep under a reader moving the other way would read
    // as a glitch rather than as an entrance.
    const timeline = gsap.timeline({
      scrollTrigger: replay
        ? { trigger: el, start, toggleActions: "restart none none reset" }
        : { trigger: el, start, once: true }
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
    const unobserve = observeBody();

    // A photograph has no height until it loads. On a cold load the whole
    // page is short enough that every trigger sits inside the viewport and
    // fires at once, and then the images arrive and push the grid down — so
    // the sweep is spent before the photo it belongs to is ever on screen.
    // Remeasure once the images inside this instance have landed.
    const images = [...el.querySelectorAll("img")].filter((img) => !img.complete);
    let outstanding = images.length;
    const onImageSettled = () => {
      outstanding -= 1;
      if (outstanding <= 0) ScrollTrigger.refresh();
    };
    images.forEach((img) => {
      img.addEventListener("load", onImageSettled, { once: true });
      img.addEventListener("error", onImageSettled, { once: true });
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", onImageSettled);
        img.removeEventListener("error", onImageSettled);
      });
      unobserve();
      timeline.scrollTrigger?.kill();
      timeline.kill();
      gsap.set([bar, content], { clearProps: "all" });
    };
  }, [duration, ease, start, flicker, replay]);

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
