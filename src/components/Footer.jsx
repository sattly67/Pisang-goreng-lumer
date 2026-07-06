import { BrandMark } from "./BananaArt";
import { buildWhatsAppContactUrl, formatWhatsAppDisplay } from "../utils";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="hubungi" className="pg-footer">
      <div className="pg-container">
        <div className="pg-footer-grid">
          <div>
            <a href="#beranda" className="pg-brand" style={{ color: "var(--cream)", marginBottom: 14, display: "inline-flex" }}>
              <BrandMark className="pg-brand__mark" />
              Pisang Goreng Premium
            </a>
            <p>
              Jajanan rumahan renyah di luar, lumer di dalam — digoreng saat
              kamu pesan, tanpa bahan pengawet.
            </p>
            <div className="pg-footer-socials">
              <a href={buildWhatsAppContactUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="bi bi-whatsapp" />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram" />
              </a>
            </div>
          </div>

          <div>
            <h5>Kontak</h5>
            <ul>
              <li>
                <i className="bi bi-geo-alt" /> Isi alamat tokomu di sini
              </li>
              <li>
                <i className="bi bi-whatsapp" /> {formatWhatsAppDisplay()}
              </li>
              <li>
                <i className="bi bi-instagram" /> @pisanggorengpremium
              </li>
            </ul>
          </div>

          <div>
            <h5>Jam Operasional</h5>
            <ul>
              <li>Senin – Jumat: 10.00 – 20.00</li>
              <li>Sabtu – Minggu: 10.00 – 21.00</li>
            </ul>
          </div>
        </div>

        <div className="pg-footer-bottom">© {year} Pisang Goreng Premium. Dibuat dengan 🍌.</div>
      </div>
    </footer>
  );
}
