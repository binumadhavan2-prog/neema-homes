import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ScrollFloat.css";

gsap.registerPlugin(ScrollTrigger);

// Splits a string into characters and floats them up, scrubbed against the
// page scroll, so the word assembles itself as it comes into view.
// From React Bits (reactbits.dev), with three changes for this site:
// the split text is hidden from screen readers behind an aria-label, each
// char carries its index and glyph so CSS can stagger effects per letter,
// and the tween tears itself down on unmount.
export default function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03
}) {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split("").map((char, index) => (
      <span
        className="char"
        key={index}
        data-char={char}
        style={{ "--char-index": index }}
      >
        {char === " " ? " " : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const charElements = el.querySelectorAll(".char");

    // Someone who has asked for less motion still gets the wordmark — it
    // simply sits there, already assembled.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(charElements, { opacity: 1 });
      return;
    }

    const scroller =
      scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const tween = gsap.fromTo(
      charElements,
      {
        willChange: "opacity, transform",
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: "50% 0%"
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );

    // The hash router swaps whole pages under a footer that never unmounts,
    // and photos above settle in late — both change the page height without
    // a resize event, which would leave the trigger measuring the old page.
    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    observer.observe(document.body);

    return () => {
      observer.disconnect();
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(charElements, { clearProps: "all" });
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2
      ref={containerRef}
      className={`scroll-float ${containerClassName}`}
      aria-label={typeof children === "string" ? children : undefined}
    >
      <span className={`scroll-float-text ${textClassName}`} aria-hidden="true">
        {splitText}
      </span>
    </h2>
  );
}
