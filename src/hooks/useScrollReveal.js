import { useEffect, useRef } from "react";

/**
 * Menambahkan class "is-visible" ke elemen saat masuk viewport, dipakai
 * bersama class CSS ".pg-reveal" untuk efek fade saat scroll.
 * Cukup pasang ref ini ke elemen pembungkus tiap section/card.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Kalau prefers-reduced-motion aktif, langsung tampilkan tanpa animasi.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      node.classList.add("is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
