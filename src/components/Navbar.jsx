import { useEffect, useState } from "react";
import { BrandMark } from "./BananaArt";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#menu", label: "Menu" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#tentang", label: "Tentang" },
  { href: "#hubungi", label: "Hubungi" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`pg-navbar ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="pg-navbar__inner">
        <a href="#beranda" className="pg-brand">
          <BrandMark className="pg-brand__mark" />
          Pisang Goreng Premium
        </a>

        <ul className={`pg-navbar__links ${isMobileOpen ? "is-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setIsMobileOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="pg-navbar__actions">
          <button
            type="button"
            className="pg-icon-btn"
            aria-label="Buka keranjang"
            onClick={() => setIsOpen(true)}
          >
            <i className="bi bi-bag" />
            {totalItems > 0 && <span className="pg-cart-badge">{totalItems}</span>}
          </button>

          <button
            type="button"
            className="pg-icon-btn"
            aria-label={theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
            onClick={toggleTheme}
          >
            <i className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon-stars"}`} />
          </button>

          <button
            type="button"
            className="pg-navbar__toggle"
            aria-label="Buka menu navigasi"
            onClick={() => setIsMobileOpen((v) => !v)}
          >
            <i className={`bi ${isMobileOpen ? "bi-x-lg" : "bi-list"}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
