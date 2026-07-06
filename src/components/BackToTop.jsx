import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      className={`pg-back-to-top ${visible ? "is-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
    >
      <i className="bi bi-arrow-up" />
    </button>
  );
}
