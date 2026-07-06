import { useScrollReveal } from "../hooks/useScrollReveal";

const STEPS = [
  {
    number: "1",
    title: "Pilih Menu",
    desc: "Cari varian favoritmu dan atur jumlahnya.",
  },
  {
    number: "2",
    title: "Klik Pesan",
    desc: "Tambah ke keranjang atau pesan langsung satu varian.",
  },
  {
    number: "3",
    title: "Otomatis Masuk WhatsApp",
    desc: "Pesanan tersusun rapi, tinggal kirim ke kami.",
  },
];

export default function CaraPemesanan() {
  const revealRef = useScrollReveal();

  return (
    <section className="pg-section pg-section--alt">
      <div className="pg-container">
        <div className="pg-head-row pg-reveal" ref={revealRef}>
          <div>
            <span className="pg-eyebrow">Cara Pemesanan</span>
            <h2 className="pg-heading">Tiga langkah, langsung ke dapur</h2>
          </div>
        </div>

        <div className="pg-steps">
          {STEPS.map((step) => (
            <div className="pg-step" key={step.title}>
              <div className="pg-step__num">{step.number}</div>
              <div className="pg-step__line" />
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
