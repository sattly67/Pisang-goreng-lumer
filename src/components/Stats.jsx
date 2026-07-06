import { useEffect, useState } from "react";
import { useCountUp } from "../hooks/useCountUp";
import { fetchStats } from "../firebase/reviewService";
import { isFirebaseConfigured } from "../firebase/config";

function StatBlock({ value, label, decimals = 0, suffix = "" }) {
  const [ref, display] = useCountUp(value, { decimals });
  return (
    <div ref={ref}>
      <div className="pg-stat__value">
        {display}
        {suffix}
      </div>
      <div className="pg-stat__label">{label}</div>
    </div>
  );
}

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetchStats().then((result) => {
      setStats(result);
      setChecked(true);
    });
  }, []);

  return (
    <section className="pg-stats pg-section--tight">
      <div className="pg-container">
        {!checked && (
          <div className="pg-stats-grid">
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <div className="pg-stat__value">&nbsp;</div>
                <div className="pg-stat__label">Memuat...</div>
              </div>
            ))}
          </div>
        )}

        {checked && stats && (
          <div className="pg-stats-grid">
            <StatBlock value={stats.orderCount} label="Pesanan Tercatat" suffix="+" />
            <StatBlock value={stats.reviewCount} label="Ulasan Pelanggan" suffix="+" />
            <StatBlock value={stats.avgRating} label="Rating Rata-rata" decimals={1} />
          </div>
        )}

        {checked && !stats && (
          <div className="pg-stats-grid">
            <div>
              <div className="pg-stat__value">—</div>
              <div className="pg-stat__label">
                {isFirebaseConfigured
                  ? "Belum ada data"
                  : "Hubungkan Firestore untuk statistik otomatis"}
              </div>
            </div>
            <div>
              <div className="pg-stat__value">—</div>
              <div className="pg-stat__label">Jadilah yang pertama beri ulasan!</div>
            </div>
            <div>
              <div className="pg-stat__value">—</div>
              <div className="pg-stat__label">Rating akan tampil di sini</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
