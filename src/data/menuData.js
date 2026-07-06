// Data menu default (fallback).
//
// Rancangan meminta agar data menu TIDAK di-hardcode di komponen JSX.
// File ini berfungsi sebagai:
//   1. Seed data - contoh dokumen yang bisa kamu salin ke Firestore collection "menu".
//   2. Fallback - dipakai otomatis kalau Firestore belum dikonfigurasi atau
//      sedang tidak bisa diakses, supaya situs tetap tampil (bukan layar kosong).
//
// Struktur field harus sama persis dengan dokumen di Firestore, lihat
// src/firebase/menuService.js untuk detail cara sinkronisasinya.

const menuData = [
  {
    id: "pisang-original",
    name: "Pisang Original",
    price: 12000,
    pieces: 5,
    flavor: "original",
    description: "Klasik, manis alami pisang, renyah tipis di luar.",
    features: [
      "Pisang kepok pilihan matang pas",
      "Digoreng saat dipesan",
      "Tanpa bahan pengawet",
    ],
    badge: "best-seller",
    stock: true,
    prepMinutes: 8,
  },
  {
    id: "pisang-coklat",
    name: "Pisang Coklat",
    price: 15000,
    pieces: 5,
    flavor: "coklat",
    description: "Lumeran coklat premium di setiap gigitan hangat.",
    features: [
      "Coklat leleh premium",
      "Digoreng saat dipesan",
      "Porsi pas untuk teman santai",
    ],
    badge: null,
    stock: true,
    prepMinutes: 10,
  },
  {
    id: "pisang-keju",
    name: "Pisang Keju",
    price: 15000,
    pieces: 5,
    flavor: "keju",
    description: "Taburan keju gurih yang meleleh di atas pisang hangat.",
    features: [
      "Keju parut asli",
      "Gurih manis seimbang",
      "Favorit anak-anak",
    ],
    badge: null,
    stock: true,
    prepMinutes: 10,
  },
  {
    id: "pisang-coklat-keju",
    name: "Pisang Coklat Keju",
    price: 18000,
    pieces: 5,
    flavor: "coklat",
    description: "Perpaduan manis coklat dan gurih keju dalam satu porsi.",
    features: [
      "Kombinasi coklat & keju premium",
      "Best seller pelanggan setia",
      "Digoreng saat dipesan",
    ],
    badge: "promo",
    stock: true,
    prepMinutes: 12,
  },
  {
    id: "pisang-matcha",
    name: "Pisang Matcha",
    price: 17000,
    pieces: 5,
    flavor: "matcha",
    description: "Sentuhan matcha lembut untuk yang suka rasa unik.",
    features: [
      "Bubuk matcha kualitas premium",
      "Tidak terlalu manis",
      "Varian favorit baru",
    ],
    badge: null,
    stock: true,
    prepMinutes: 10,
  },
];

export default menuData;
