import { FriedBananaIllustration } from "./BananaArt";
import { formatRupiah, buildWhatsAppOrderUrl } from "../utils";
import { useCart } from "../context/CartContext";
import { recordOrder } from "../firebase/reviewService";
import menuData from "../data/menuData";

function flavorOf(id) {
  return menuData.find((m) => m.id === id)?.flavor || "original";
}

export default function CartMini({ onOrderSent }) {
  const { items, isOpen, setIsOpen, updateQty, removeItem, totalItems, totalPrice, clearCart } =
    useCart();

  function handleCheckoutClick() {
    // Fire-and-forget: mencatat statistik tidak boleh pernah menunda atau
    // menggagalkan pembukaan WhatsApp (lihat komentar di recordOrder()).
    // Navigasi ke wa.me terjadi lewat href asli <a> di bawah, bukan
    // window.open() setelah await, supaya tidak berisiko diblokir sebagai
    // popup oleh browser (Safari dkk.) saat koneksi Firestore lambat.
    recordOrder({ itemCount: totalItems, total: totalPrice });
    onOrderSent?.("Pesanan disusun! Lanjutkan di WhatsApp ya.");
    clearCart();
    setIsOpen(false);
  }

  return (
    <>
      {totalItems > 0 && !isOpen && (
        <button type="button" className="pg-cart-fab" onClick={() => setIsOpen(true)}>
          <i className="bi bi-bag-check" />
          Keranjang
          <span className="pg-cart-fab__count">{totalItems}</span>
        </button>
      )}

      <div className={`pg-backdrop ${isOpen ? "is-open" : ""}`} onClick={() => setIsOpen(false)} />

      <aside className={`pg-cart-panel ${isOpen ? "is-open" : ""}`} aria-label="Keranjang mini">
        <div className="pg-cart-panel__header">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
            Keranjang Kamu
          </h3>
          <button
            type="button"
            className="pg-icon-btn"
            aria-label="Tutup keranjang"
            onClick={() => setIsOpen(false)}
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="pg-cart-panel__body">
          {items.length === 0 && (
            <div className="pg-empty-state">
              <i className="bi bi-bag" style={{ fontSize: "2rem" }} />
              <p>Keranjang masih kosong. Yuk pilih menu favoritmu dulu!</p>
            </div>
          )}

          {items.map((item) => (
            <div className="pg-cart-item" key={item.id}>
              <div className="pg-cart-item__media">
                <FriedBananaIllustration variant={flavorOf(item.id)} />
              </div>
              <div className="pg-cart-item__info">
                <div className="pg-cart-item__name">{item.name}</div>
                <div className="pg-cart-item__price">{formatRupiah(item.price)}</div>
                <div className="pg-qty mt-1">
                  <button type="button" onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Kurangi">
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Tambah">
                    +
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="pg-icon-btn"
                aria-label={`Hapus ${item.name}`}
                onClick={() => removeItem(item.id)}
                style={{ width: 32, height: 32, flexShrink: 0 }}
              >
                <i className="bi bi-trash3" style={{ fontSize: "0.9rem" }} />
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="pg-cart-panel__footer">
            <div className="pg-cart-total">
              <span>Total</span>
              <span>{formatRupiah(totalPrice)}</span>
            </div>
            <a
              className="pg-btn pg-btn--whatsapp pg-btn--block"
              href={buildWhatsAppOrderUrl(items, totalPrice)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCheckoutClick}
            >
              <i className="bi bi-whatsapp" />
              Pesan via WhatsApp
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
