// Toast notifikasi ringan ("Pesanan berhasil dibuat", dst). Selalu dirender
// (bahkan saat kosong) supaya transisi opacity/translateY di CSS jalan mulus,
// alih-alih muncul/hilang secara tiba-tiba lewat mount-unmount.
export default function Toast({ message }) {
  return (
    <div className={`pg-toast ${message ? "is-visible" : ""}`} role="status" aria-live="polite">
      <i className="bi bi-check-circle-fill" />
      <span>{message || ""}</span>
    </div>
  );
}
