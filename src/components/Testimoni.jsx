import { useState } from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Testimoni({ showToast }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const revealRef = useScrollReveal();

  return (
    <section id="testimoni" className="pg-section">
      <div className="pg-container">
        <div className="pg-head-row pg-reveal" ref={revealRef}>
          <div>
            <span className="pg-eyebrow">Testimoni</span>
            <h2 className="pg-heading">Kata mereka yang sudah coba</h2>
          </div>
        </div>

        <div className="pg-testi-layout">
          <ReviewList refreshKey={refreshKey} />
          <ReviewForm
            onSubmitted={(msg) => {
              showToast?.(msg);
              setRefreshKey((k) => k + 1);
            }}
          />
        </div>
      </div>
    </section>
  );
}
