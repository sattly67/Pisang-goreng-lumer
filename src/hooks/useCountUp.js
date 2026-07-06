import { useEffect, useRef, useState } from "react";

/**
 * Animasikan angka dari 0 ke `value` ketika elemen yang dipantau (ref) masuk
 * viewport. Dipakai untuk animasi statistik (CountUp) di section Statistik.
 */
export function useCountUp(value, { duration = 1400, decimals = 0 } = {}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            const start = performance.now();
            const from = 0;
            const to = Number(value) || 0;
            const factor = 10 ** decimals;

            function tick(now) {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const raw = from + (to - from) * eased;
              setDisplay(Math.round(raw * factor) / factor);
              if (progress < 1) {
                requestAnimationFrame(tick);
              }
            }
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration, decimals]);

  return [ref, display];
}
