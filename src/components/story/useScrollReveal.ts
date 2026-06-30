import { useEffect, useRef, useState } from "preact/hooks";

/**
 * Reveal-on-scroll: returns a ref + a `shown` flag that flips true the first
 * time the element scrolls into view. Pairs with the `.reveal` / `.is-in` CSS
 * in global.css. Degrades to always-shown where IntersectionObserver is absent
 * (e.g. very old browsers / SSR) so content is never hidden.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      options ?? { threshold: 0.15, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}
