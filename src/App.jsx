import { useCallback, useRef, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import CaraPemesanan from "./components/CaraPemesanan";
import About from "./components/About";
import Stats from "./components/Stats";
import Gallery from "./components/Gallery";
import Testimoni from "./components/Testimoni";
import SuggestionForm from "./components/SuggestionForm";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import CartMini from "./components/CartMini";
import BackToTop from "./components/BackToTop";
import Toast from "./components/Toast";
import SectionDivider from "./components/SectionDivider";

export default function App() {
  const [toastMessage, setToastMessage] = useState("");
  const toastTimer = useRef(null);

  // showToast dipakai oleh MenuSection, ProductModal (lewat MenuSection),
  // Testimoni, SuggestionForm, dan CartMini untuk notifikasi ringan
  // ("Pesanan berhasil dibuat", "Ulasan terkirim", dst).
  const showToast = useCallback((message) => {
    setToastMessage(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(""), 3200);
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <Navbar />

        <main>
          <Hero />
          <SectionDivider />

          <MenuSection showToast={showToast} />
          <SectionDivider alt />

          <CaraPemesanan />
          <SectionDivider />

          <About />

          <Stats />

          <Gallery />
          <SectionDivider />

          <Testimoni showToast={showToast} />
          <SectionDivider alt />

          <SuggestionForm showToast={showToast} />
          <SectionDivider />

          <FAQ />
        </main>

        <Footer />

        <CartMini onOrderSent={showToast} />
        <BackToTop />
        <Toast message={toastMessage} />
      </CartProvider>
    </ThemeProvider>
  );
}
