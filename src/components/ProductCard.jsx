import { FriedBananaIllustration } from "./BananaArt";
import { formatRupiah, buildWhatsAppSingleProductUrl } from "../utils";
import { recordOrder } from "../firebase/reviewService";

export default function ProductCard({ product, onOpenDetail }) {
  const { name, price, pieces, description, badge, flavor, prepMinutes } = product;

  return (
    <div className="pg-card">
      {badge && (
        <div className="pg-card__badges">
          {badge === "best-seller" && (
            <span className="pg-badge pg-badge--best">Best Seller</span>
          )}
          {badge === "promo" && <span className="pg-badge pg-badge--promo">Promo</span>}
        </div>
      )}

      <div className="pg-card__media">
        <FriedBananaIllustration variant={flavor} />
      </div>

      <h3 className="pg-card__name">{name}</h3>
      <p className="pg-card__desc">{description}</p>

      {prepMinutes && (
        <div
          style={{
            fontSize: "0.78rem",
            color: "var(--text-secondary)",
            marginTop: -8,
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <i className="bi bi-clock" /> Siap dalam ~{prepMinutes} menit
        </div>
      )}

      <div className="pg-card__footer">
        <div className="pg-card__price">
          {formatRupiah(price)}
          <small>isi {pieces} pcs</small>
        </div>
      </div>

      <div className="pg-card__actions">
        <button
          type="button"
          className="pg-btn pg-btn--ghost pg-btn--sm"
          onClick={() => onOpenDetail(product)}
        >
          Lihat Detail
        </button>
        <a
          className="pg-btn pg-btn--whatsapp pg-btn--sm"
          href={buildWhatsAppSingleProductUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => recordOrder({ itemCount: 1, total: price })}
        >
          <i className="bi bi-whatsapp" /> Pesan
        </a>
      </div>
    </div>
  );
}
