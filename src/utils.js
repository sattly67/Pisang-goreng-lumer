export function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value || 0);
}

export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "628xxxxxxxxxx";

/** Link WhatsApp polos (tanpa pesan otomatis) untuk footer/kontak. */
export function buildWhatsAppContactUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}`;
}

/** Format nomor untuk ditampilkan sebagai teks, mis. di footer. */
export function formatWhatsAppDisplay() {
  return WHATSAPP_NUMBER.startsWith("62")
    ? `+${WHATSAPP_NUMBER}`
    : WHATSAPP_NUMBER;
}

/**
 * Susun pesan WhatsApp otomatis dari isi keranjang dan arahkan ke wa.me.
 * items: [{ name, price, qty }]
 */
export function buildWhatsAppOrderUrl(items, total) {
  const lines = [
    "Halo, saya mau pesan:",
    "",
    ...items.map((i) => `- ${i.name} x${i.qty} (${formatRupiah(i.price * i.qty)})`),
    "",
    `Total: ${formatRupiah(total)}`,
    "",
    "Mohon info langkah selanjutnya, terima kasih!",
  ];
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function buildWhatsAppSingleProductUrl(product) {
  const text = encodeURIComponent(
    `Halo, saya mau pesan ${product.name} (${formatRupiah(product.price)}). Mohon info langkah selanjutnya, terima kasih!`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function buildWhatsAppQtyOrderUrl(product, qty) {
  const total = product.price * qty;
  const text = encodeURIComponent(
    `Halo, saya mau pesan ${product.name} x${qty} (${formatRupiah(total)}). Mohon info langkah selanjutnya, terima kasih!`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
