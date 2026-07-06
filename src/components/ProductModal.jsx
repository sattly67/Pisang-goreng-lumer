import { useEffect, useState } from "react";
import { FriedBananaIllustration } from "./BananaArt";
import { formatRupiah, buildWhatsAppQtyOrderUrl } from "../utils";
import { useCart } from "../context/CartContext";
import { recordOrder } from "../firebase/reviewService";

export default function ProductModal({ product, onClose, onAdded }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    setQty(1);
  }, [product]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!product) return null;

  function handleAddToCart() {
    addItem(product, qty);
    onAdded?.(`${product.name} ditambahkan ke keranjang`);
    onClose();
  }

  function handleOrderNowClick() {
    // Fire-and-forget, sama seperti CartMini & ProductCard: navigasi WhatsApp
    // lewat href asli <a>, pencatatan statistik berjalan di belakang layar
    // tanpa pernah menunda pembukaan wa.me.
    recordOrder({ itemCount: qty, total: product.price * qty });
    onClose();
  }

  return (
    <>
      <div className="pg-backdrop is-open" onClick={onClose} />
      <div
        className="pg-modal-wrap"
        role="dialog"
        aria-modal="true"
        aria-label={`Detail ${product.name}`}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1070,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <div className="pg-modal-content" style={{ width: "min(440px, 100%)", padding: 28 }}>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className="pg-eyebrow" style={{ marginBottom: 0 }}>
              isi {product.pieces} pcs
              {product.prepMinutes ? ` · ~${product.prepMinutes} menit` : ""}
            </span>
            <button
              type="button"
              className="pg-icon-btn"
              aria-label="Tutup"
              onClick={onClose}
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>

          <div className="pg-modal-media">
            <FriedBananaIllustration variant={product.flavor} />
          </div>

          <h3 className="mt-3" style={{ fontFamily: "var(--font-display)" }}>
            {product.name}
          </h3>
          <p className="pg-subtext" style={{ margin: "6px 0 0" }}>
            {product.description}
          </p>

          <ul className="pg-feature-list">
            {product.features?.map((f) => (
              <li key={f}>
                <i className="bi bi-check-circle-fill" /> {f}
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="pg-card__price" style={{ fontSize: "1.3rem" }}>
              {formatRupiah(product.price * qty)}
            </div>
            <div className="pg-qty">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Kurangi jumlah">
                −
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Tambah jumlah">
                +
              </button>
            </div>
          </div>

          <div className="d-flex flex-column gap-2">
            <button type="button" className="pg-btn pg-btn--ghost pg-btn--block" onClick={handleAddToCart}>
              <i className="bi bi-bag-plus" /> Tambah ke Keranjang
            </button>
            <a
              className="pg-btn pg-btn--whatsapp pg-btn--block"
              href={buildWhatsAppQtyOrderUrl(product, qty)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleOrderNowClick}
            >
              <i className="bi bi-whatsapp" /> Pesan Sekarang
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
