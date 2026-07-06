import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const FAQ_ITEMS = [
  {
    q: "Metode pembayaran apa saja yang diterima?",
    a: "Kami menerima Transfer Bank, COD (Cash on Delivery), dan QRIS.",
  },
  {
    q: "Area pengantaran sampai mana saja?",
    a: "Untuk saat ini pengantaran mengikuti area terdekat dari dapur kami. Tanyakan alamat lengkapmu lewat WhatsApp untuk konfirmasi jangkauan.",
  },
  {
    q: "Bisa custom pesanan, misalnya tanpa keju atau ekstra coklat?",
    a: "Bisa! Sampaikan permintaan custom-mu saat checkout lewat WhatsApp, kami usahakan sesuai selera.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`pg-faq-item ${isOpen ? "is-open" : ""}`}>
      <button className="pg-faq-item__q" type="button" onClick={onToggle} aria-expanded={isOpen}>
        {item.q}
        <i className="bi bi-chevron-down" />
      </button>
      <div className="pg-faq-item__a" style={{ maxHeight: isOpen ? 200 : 0 }}>
        <p>{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const revealRef = useScrollReveal();

  return (
    <section className="pg-section">
      <div className="pg-container" style={{ maxWidth: 720 }}>
        <div className="pg-head-row pg-reveal" ref={revealRef}>
          <div>
            <span className="pg-eyebrow">FAQ Singkat</span>
            <h2 className="pg-heading">Pertanyaan yang sering ditanyakan</h2>
          </div>
        </div>

        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
