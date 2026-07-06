// Ilustrasi digambar langsung sebagai SVG (bukan foto/stok), supaya:
//   1. Tidak bergantung pada aset foto pihak ketiga yang mungkin berhak cipta.
//   2. Ringan & konsisten dengan palet warna rancangan di semua ukuran layar.
//   3. Kamu tetap bebas mengganti dengan foto asli produk kapan saja —
//      tinggal taruh file di /public/images dan ganti <img src="/images/...">
//      di tempat komponen ini dipakai (lihat README bagian "Mengganti Gambar").

export function BrandMark({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="#E9B97A" />
      <path
        d="M11 24c2-8 8-13 16-13.5-1 1.6-1.6 3-1.9 4.6C23.6 20 19 24.3 12.6 25.3c-.7.1-1.8-.4-1.6-1.3Z"
        fill="#5C4033"
      />
      <path
        d="M12.4 24.6c5.8-1 10-4.8 11.4-9.6"
        stroke="#FFF8EE"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Ilustrasi utama pisang goreng. `variant` menentukan warna topping supaya
 * tiap varian menu punya sentuhan visual berbeda tanpa perlu SVG terpisah.
 */
export function FriedBananaIllustration({ variant = "original", className }) {
  const toppings = {
    original: null,
    coklat: (
      <g>
        <path
          d="M14 20c4 3 8 4.5 13 4.2 4-2.6 8.4-3 12.4-1"
          stroke="#5C4033"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <circle cx="18" cy="18" r="1.3" fill="#5C4033" />
        <circle cx="24" cy="24" r="1.1" fill="#5C4033" />
        <circle cx="31" cy="21" r="1.3" fill="#5C4033" />
      </g>
    ),
    keju: (
      <g stroke="#F3D46B" strokeWidth="1.6" strokeLinecap="round" opacity="0.9">
        <path d="M15 19l4 5" />
        <path d="M20 17l3 6" />
        <path d="M26 19l3 6" />
        <path d="M31 18l3 5" />
        <path d="M36 20l2 4" />
      </g>
    ),
    matcha: (
      <g fill="#9CAF88" opacity="0.9">
        <circle cx="17" cy="19" r="1.1" />
        <circle cx="21" cy="23" r="1" />
        <circle cx="26" cy="18" r="1.2" />
        <circle cx="30" cy="22" r="1" />
        <circle cx="34" cy="19" r="1.1" />
        <circle cx="23" cy="20" r="0.8" />
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 52 44" className={className} aria-hidden="true">
      {/* Uap */}
      <path
        d="M20 6c-1.5 2 1.5 3-.2 5.2M27 4c-1.5 2 1.5 3-.2 5.2"
        stroke="#A87B55"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      {/* Piring */}
      <ellipse cx="26" cy="34" rx="23" ry="6.4" fill="#F7ECD9" />
      <ellipse cx="26" cy="33.2" rx="23" ry="5.6" fill="#FFFFFF" />
      {/* Potongan pisang goreng, ditumpuk & dimiringkan */}
      <g transform="rotate(-8 26 24)">
        <ellipse cx="16" cy="27" rx="11" ry="7" fill="#C98A44" />
        <ellipse cx="16" cy="25.6" rx="11" ry="6.6" fill="#E9B97A" />
      </g>
      <g transform="rotate(6 26 24)">
        <ellipse cx="30" cy="26" rx="12" ry="7.6" fill="#C1813D" />
        <ellipse cx="30" cy="24.5" rx="12" ry="7.1" fill="#EFC489" />
      </g>
      <g transform="rotate(-4 26 24)">
        <ellipse cx="23" cy="21" rx="10.5" ry="6.8" fill="#CB8E48" />
        <ellipse cx="23" cy="19.6" rx="10.5" ry="6.3" fill="#F0C88E" />
      </g>
      {toppings[variant]}
    </svg>
  );
}

export function HeroIllustration({ className }) {
  return (
    <svg viewBox="0 0 420 380" className={className} aria-hidden="true">
      <ellipse cx="210" cy="330" rx="150" ry="24" fill="#5C4033" opacity="0.08" />
      {/* Piring besar khusus hero, memakai posisi & ukuran custom */}
      <g transform="translate(20 60) scale(3.6)">
        <path
          d="M20 6c-1.5 2 1.5 3-.2 5.2M27 4c-1.5 2 1.5 3-.2 5.2"
          stroke="#A87B55"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <ellipse cx="26" cy="34" rx="23" ry="6.4" fill="#F7ECD9" />
        <ellipse cx="26" cy="33.2" rx="23" ry="5.6" fill="#FFFFFF" />
        <g transform="rotate(-8 26 24)">
          <ellipse cx="16" cy="27" rx="11" ry="7" fill="#C98A44" />
          <ellipse cx="16" cy="25.6" rx="11" ry="6.6" fill="#E9B97A" />
        </g>
        <g transform="rotate(6 26 24)">
          <ellipse cx="30" cy="26" rx="12" ry="7.6" fill="#C1813D" />
          <ellipse cx="30" cy="24.5" rx="12" ry="7.1" fill="#EFC489" />
        </g>
        <g transform="rotate(-4 26 24)">
          <ellipse cx="23" cy="21" rx="10.5" ry="6.8" fill="#CB8E48" />
          <ellipse cx="23" cy="19.6" rx="10.5" ry="6.3" fill="#F0C88E" />
        </g>
        <path
          d="M14 20c4 3 8 4.5 13 4.2 4-2.6 8.4-3 12.4-1"
          stroke="#5C4033"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <circle cx="18" cy="18" r="0.5" fill="#5C4033" />
        <circle cx="24" cy="24" r="0.45" fill="#5C4033" />
        <circle cx="31" cy="21" r="0.5" fill="#5C4033" />
      </g>
    </svg>
  );
}
