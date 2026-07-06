# Pisang Goreng Premium

Website UMKM untuk jajanan pisang goreng — React (Vite) + Bootstrap 5 + Firebase
Firestore, pemesanan langsung lewat WhatsApp. Dibangun sesuai rancangan di
`rancangan-website-pisang-goreng.md`.

## Daftar Isi

1. [Menjalankan di Lokal](#1-menjalankan-di-lokal)
2. [Setup Firebase](#2-setup-firebase)
3. [Setup Nomor WhatsApp](#3-setup-nomor-whatsapp)
4. [Mengisi Data Menu](#4-mengisi-data-menu)
5. [Moderasi Ulasan](#5-moderasi-ulasan)
6. [Mengganti Gambar](#6-mengganti-gambar)
7. [Deploy ke Vercel](#7-deploy-ke-vercel)
8. [Struktur Proyek](#8-struktur-proyek)
9. [Catatan tentang Statistik](#9-catatan-tentang-statistik)

---

## 1. Menjalankan di Lokal

Butuh [Node.js](https://nodejs.org) versi 18 ke atas.

```bash
npm install
npm run dev
```

Situs akan tampil di `http://localhost:5173`. Di tahap ini, sebelum Firebase
disetel, situs **tetap jalan** — menu memakai data lokal
(`src/data/menuData.js`) dan bagian ulasan menampilkan pesan untuk
menghubungkan Firestore. Tidak ada layar kosong atau error yang bikin bingung.

## 2. Setup Firebase

1. Buka [Firebase Console](https://console.firebase.google.com) → **Add
   project** → ikuti langkahnya (Google Analytics boleh dimatikan, tidak
   dipakai di sini).
2. Di dashboard project → klik ikon **Web (`</>`)** untuk mendaftarkan app
   web baru → salin nilai `firebaseConfig` yang muncul.
3. Copy `.env.example` menjadi `.env`, lalu isi sesuai nilai dari langkah 2:

   ```bash
   cp .env.example .env
   ```

4. Di menu kiri Firebase Console, buka **Build → Firestore Database** →
   **Create database** → pilih mode **production**.
5. Masih di Firestore, buka tab **Rules**, tempel isi file `firestore.rules`
   dari proyek ini, lalu **Publish**. Ini penting supaya orang lain tidak
   bisa menghapus/mengedit ulasan orang lain atau memalsukan data.
6. Restart `npm run dev` supaya env variable baru terbaca.

Setelah langkah ini, form ulasan & masukan akan benar-benar tersimpan ke
Firestore project kamu.

## 3. Setup Nomor WhatsApp

Di file `.env`, isi:

```
VITE_WHATSAPP_NUMBER=628xxxxxxxxxx
```

Format internasional, tanpa tanda `+` dan tanpa spasi. Contoh: nomor
`0812-3456-7890` menjadi `6281234567890`.

## 4. Mengisi Data Menu

Sesuai rancangan, harga & stok **tidak boleh hardcode** supaya bisa diubah
tanpa deploy ulang. Setelah Firestore aktif:

1. Di Firestore Console, buat collection bernama `menu`.
2. Tambah satu dokumen per varian. Contoh field, ikuti persis field di
   `src/data/menuData.js` (file itu juga jadi seed data siap-copy):

   ```
   name: "Pisang Coklat"       (string)
   price: 15000                (number)
   pieces: 5                   (number)
   flavor: "coklat"            (string — dipakai filter rasa)
   description: "..."          (string)
   features: ["...", "..."]    (array of string — poin ✔ di modal detail)
   badge: "promo"              (string, boleh kosongkan / hapus field: "best-seller" | "promo" | null)
   stock: true                 (boolean)
   ```

3. Selama collection `menu` masih kosong atau Firestore belum disetel,
   website otomatis memakai data di `src/data/menuData.js` sebagai fallback
   — jadi situs tidak pernah tampil kosong.

## 5. Moderasi Ulasan

Sesuai rancangan, untuk versi awal moderasi cukup manual lewat Firebase
Console (belum perlu admin panel):

1. Buka Firestore Console → collection `reviews`.
2. Ulasan baru masuk dengan field `isApproved: false` (belum tampil ke
   publik).
3. Baca isinya, kalau layak tayang, ubah field `isApproved` menjadi `true`.
4. Ulasan langsung muncul di section Testimoni saat halaman dimuat ulang.

Collection `suggestions` (Masukan & Saran) sengaja tidak bisa dibaca dari
client sama sekali (lihat `firestore.rules`) — hanya kamu yang bisa
membacanya lewat Firebase Console, supaya masukan pelanggan tetap privat.

## 6. Mengganti Gambar

Semua ilustrasi pisang goreng di situs ini digambar langsung sebagai SVG
(lihat `src/components/BananaArt.jsx`) supaya tidak bergantung pada foto
pihak ketiga yang mungkin berhak cipta. Kamu bebas menggantinya dengan foto
asli kapan saja:

- **Galeri** (`src/components/Gallery.jsx`): taruh file di
  `public/images/gallery/` dengan nama persis `produk-1.jpg`,
  `dapur-1.jpg`, `pelanggan-1.jpg`, `packaging-1.jpg`. Selama file belum
  ada, kotak galeri otomatis menampilkan placeholder rapi (bukan ikon
  gambar rusak).
- **Favicon**: ganti `public/images/favicon.svg`.
- **Open Graph image** (gambar yang muncul saat link dibagikan ke
  WhatsApp/Instagram): tambahkan file `public/images/og-image.jpg`
  (disarankan rasio 1.91:1, misal 1200×630px) — sudah direferensikan di
  `index.html`.
- **Hero & kartu menu**: kalau ingin pakai foto asli produk, ganti
  pemanggilan `<HeroIllustration />` / `<FriedBananaIllustration />` dengan
  `<img src="/images/..." alt="..." />` di komponen terkait.

## 7. Deploy ke Vercel

Sesuai rekomendasi rancangan (lebih gampang untuk env variable & custom
domain dibanding GitHub Pages untuk stack Vite + Firebase ini):

1. Push project ini ke repository GitHub/GitLab.
2. Di [vercel.com](https://vercel.com) → **Add New Project** → import
   repository tadi. Vercel otomatis mengenali framework Vite.
3. Sebelum deploy, buka **Environment Variables** → masukkan semua isi
   `.env` kamu (`VITE_FIREBASE_...` dan `VITE_WHATSAPP_NUMBER`) satu per
   satu.
4. Klik **Deploy**. Selesai — situs online dengan HTTPS otomatis.
5. Custom domain: **Settings → Domains** di project Vercel kamu.

## 8. Struktur Proyek

```
src/
  components/     Semua bagian halaman (Navbar, Hero, MenuSection, dst.)
  context/        CartContext (keranjang mini) & ThemeContext (dark mode)
  firebase/       config.js (init) + menuService.js + reviewService.js
  data/menuData.js  Fallback/seed data menu
  hooks/          useCountUp (animasi statistik), useScrollReveal (fade scroll)
  App.jsx         Menyusun seluruh section jadi satu halaman
  main.jsx        Entry point
firestore.rules  Security rules — tempel ke Firebase Console sebelum go-live
```

## 9. Catatan tentang Statistik

Section Statistik dihitung dari data asli, bukan angka karangan:

- **Ulasan Pelanggan** & **Rating Rata-rata** — dihitung langsung dari
  dokumen `reviews` yang `isApproved: true`.
- **Pesanan Tercatat** — setiap kali pelanggan checkout (baik lewat kartu
  menu, modal detail, maupun keranjang mini), situs mencatat satu dokumen
  ringan (`itemCount`, `total`, waktu — **tanpa** data pribadi apa pun) ke
  collection `orders`, lalu jumlah dokumennya ditampilkan sebagai statistik.
  Pencatatan ini tidak pernah menunda atau menggagalkan pelanggan membuka
  WhatsApp, meskipun Firestore sedang bermasalah.

Kalau Firestore belum disetel, section ini menampilkan pesan yang jujur
("Hubungkan Firestore untuk statistik otomatis") alih-alih angka palsu.
