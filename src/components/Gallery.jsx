import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Ganti file di /public/images/gallery/ sesuai nama berikut untuk menampilkan
// foto asli. Selama file belum ada, kotak akan menampilkan placeholder rapi
// (bukan ikon gambar rusak) supaya galeri tetap terlihat matang saat dev.
const GALLERY_ITEMS = [
  { file: "produk-1.jpg", label: "Foto Produk", icon: "bi-camera" },
  { file: "dapur-1.jpg", label: "Foto Dapur", icon: "bi-fire" },
  { file: "pelanggan-1.jpg", label: "Foto Pelanggan", icon: "bi-people" },
  { file: "packaging-1.jpg", label: "Foto Packaging", icon: "bi-box-seam" },
];

function GalleryItem({ item }) {
  const [broken, setBroken] = useState(false);

  return (
    <div className="pg-gallery-item">
      {!broken ? (
        <img
          src={`/images/gallery/${item.file}`}
          alt={item.label}
          loading="lazy"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="pg-gallery-item__placeholder">
          <i className={`bi ${item.icon}`} />
          <span>
            {item.label}
            <br />
            taruh di /public/images/gallery/{item.file}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Gallery() {
  const revealRef = useScrollReveal();

  return (
    <section className="pg-section pg-section--alt">
      <div className="pg-container">
        <div className="pg-head-row pg-reveal" ref={revealRef}>
          <div>
            <span className="pg-eyebrow">Galeri</span>
            <h2 className="pg-heading">Sekilas dapur &amp; cerita kami</h2>
          </div>
        </div>

        <div className="pg-gallery-grid">
          {GALLERY_ITEMS.map((item) => (
            <GalleryItem item={item} key={item.file} />
          ))}
        </div>
      </div>
    </section>
  );
}
