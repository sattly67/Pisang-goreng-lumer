import { useEffect, useRef } from "react";
import { HeroIllustration } from "./BananaArt";

export default function Hero() {
  const artRef = useRef(null);
  const blobRef = useRef(null);

  // Parallax ringan: ilustrasi & blob bergeser pelan mengikuti scroll, hanya
  // aktif kalau prefers-reduced-motion tidak diaktifkan, dan dibatasi supaya
  // efeknya "ringan" sesuai rancangan (bukan parallax berat/agresif).
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    let ticking = false;
    function update() {
      const y = window.scrollY;
      if (artRef.current) {
        artRef.current.style.transform = `translateY(${Math.min(y * 0.08, 40)}px)`;
      }
      if (blobRef.current) {
        blobRef.current.style.transform = `translateY(${Math.min(y * 0.14, 70)}px)`;
      }
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="beranda" className="pg-hero">
      <div className="pg-hero__blob" ref={blobRef} aria-hidden="true" />
      <div className="pg-container">
        <div className="pg-hero__grid">
          <div>
            <span className="pg-eyebrow">
              <i className="bi bi-egg-fried" /> UMKM Rumahan &middot; Digoreng Saat Dipesan
            </span>
            <h1 className="pg-heading">
              Pisang Goreng <em>Premium</em>
            </h1>
            <p className="pg-subtext">
              Renyah di luar, lumer di dalam. Pisang segar pilihan, tanpa bahan
              pengawet, digoreng saat kamu pesan supaya sampai ke tanganmu
              dalam kondisi terbaik.
            </p>

            <div className="pg-hero__cta">
              <a href="#menu" className="pg-btn pg-btn--primary">
                <i className="bi bi-bag-check" /> Pesan Sekarang
              </a>
              <a href="#menu" className="pg-btn pg-btn--ghost">
                Lihat Menu
              </a>
            </div>

            <div className="pg-hero__rating">
              <i className="bi bi-star-fill" />
              <i className="bi bi-star-fill" />
              <i className="bi bi-star-fill" />
              <i className="bi bi-star-fill" />
              <i className="bi bi-star-half" />
              <span>Dipercaya pelanggan rumahan sekitar kamu</span>
            </div>
          </div>

          <div className="pg-hero__art" ref={artRef}>
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
