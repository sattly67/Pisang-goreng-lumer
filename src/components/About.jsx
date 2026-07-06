import { useScrollReveal } from "../hooks/useScrollReveal";

const POINTS = [
  { icon: "bi-flower2", title: "Pisang Segar", desc: "Dipilih matang pas setiap hari." },
  { icon: "bi-shield-check", title: "Tanpa Pengawet", desc: "Aman untuk keluarga di rumah." },
  { icon: "bi-fire", title: "Digoreng Saat Dipesan", desc: "Selalu hangat & renyah saat sampai." },
  { icon: "bi-droplet", title: "Minyak Selalu Baru", desc: "Rasa bersih, tidak tengik." },
];

export default function About() {
  const revealRef = useScrollReveal();

  return (
    <section id="tentang" className="pg-section">
      <div className="pg-container">
        <div className="pg-head-row pg-reveal" ref={revealRef}>
          <div>
            <span className="pg-eyebrow">Tentang Kami</span>
            <h2 className="pg-heading">Dibuat dengan bahan &amp; niat yang jujur</h2>
          </div>
        </div>

        <div className="pg-about-grid">
          {POINTS.map((point) => (
            <div className="pg-about-card" key={point.title}>
              <i className={`bi ${point.icon}`} />
              <h4>{point.title}</h4>
              <p>{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
