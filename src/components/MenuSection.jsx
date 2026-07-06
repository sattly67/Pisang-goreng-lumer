import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { fetchMenu } from "../firebase/menuService";
import { useScrollReveal } from "../hooks/useScrollReveal";

const FLAVOR_FILTERS = [
  { id: "semua", label: "Semua" },
  { id: "original", label: "Original" },
  { id: "coklat", label: "Coklat" },
  { id: "keju", label: "Keju" },
  { id: "matcha", label: "Matcha" },
];

export default function MenuSection({ showToast }) {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeFlavor, setActiveFlavor] = useState("semua");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const revealRef = useScrollReveal();

  useEffect(() => {
    let mounted = true;
    fetchMenu().then(({ items }) => {
      if (mounted) {
        setMenu(items);
        setIsLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return menu.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
      const matchesFlavor = activeFlavor === "semua" || item.flavor === activeFlavor;
      return matchesQuery && matchesFlavor;
    });
  }, [menu, query, activeFlavor]);

  return (
    <section id="menu" className="pg-section">
      <div className="pg-container">
        <div className="pg-head-row pg-reveal" ref={revealRef}>
          <div>
            <span className="pg-eyebrow">Menu</span>
            <h2 className="pg-heading">Pilih varian favoritmu</h2>
          </div>
        </div>

        <div className="pg-menu__tools">
          <div className="pg-search">
            <i className="bi bi-search" />
            <input
              type="text"
              placeholder="Cari menu, misal: coklat"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Cari menu"
            />
          </div>
          <div className="pg-filter-chips">
            {FLAVOR_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`pg-chip ${activeFlavor === f.id ? "is-active" : ""}`}
                onClick={() => setActiveFlavor(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="pg-menu-grid">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="pg-skeleton" style={{ height: 280 }} />
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="pg-empty-state">
            <i className="bi bi-emoji-frown" style={{ fontSize: "2rem" }} />
            <p>Menu tidak ditemukan. Coba kata kunci atau filter lain, ya.</p>
          </div>
        )}

        {!isLoading && filtered.length > 0 && (
          <div className="pg-menu-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onOpenDetail={setSelectedProduct} />
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdded={showToast}
        />
      )}
    </section>
  );
}
