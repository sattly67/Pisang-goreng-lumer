// Service untuk ulasan, masukan, statistik, dan pencatatan pesanan.
//
// Skema Firestore yang dipakai:
//   reviews/{id}      { name, rating, text, isApproved, createdAt }
//   suggestions/{id}  { name, message, createdAt }
//   orders/{id}       { itemCount, total, createdAt }  -- dicatat ringan saat checkout WhatsApp
//
// Terapkan Firestore Security Rules dari file `firestore.rules` di root project
// sebelum go-live, supaya orang lain tidak bisa mengubah/menghapus data orang lain.

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  limit,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./config";

/**
 * Ambil ulasan yang sudah disetujui (isApproved == true), terbaru dulu.
 * Mengembalikan array kosong (bukan data palsu) kalau Firestore belum
 * disiapkan atau query gagal — testimoni sebaiknya selalu data asli.
 */
export async function fetchApprovedReviews() {
  if (!isFirebaseConfigured) {
    return { items: [], ready: false };
  }
  try {
    const q = query(
      collection(db, "reviews"),
      where("isApproved", "==", true),
      orderBy("createdAt", "desc"),
      limit(30)
    );
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { items, ready: true };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("[reviewService] Gagal ambil ulasan.", error);
    return { items: [], ready: false, error: true };
  }
}

/**
 * Kirim ulasan baru. Selalu masuk dengan isApproved: false (moderasi ringan
 * lewat Firebase Console sebelum tayang ke publik, sesuai rancangan).
 *
 * Honeypot: field `website` yang disembunyikan lewat CSS di form. Manusia
 * tidak akan mengisinya; kalau field ini terisi kita anggap bot dan diamkan
 * saja (resolve seolah sukses) supaya bot tidak tahu telah terdeteksi.
 */
export async function submitReview({ name, rating, text, honeypot }) {
  if (honeypot) {
    return { ok: true, skipped: true };
  }
  if (!isFirebaseConfigured) {
    return { ok: false, reason: "not-configured" };
  }
  if (!name?.trim() || !rating || !text?.trim()) {
    return { ok: false, reason: "invalid" };
  }
  try {
    await addDoc(collection(db, "reviews"), {
      name: name.trim().slice(0, 80),
      rating: Number(rating),
      text: text.trim().slice(0, 600),
      isApproved: false,
      createdAt: serverTimestamp(),
    });
    return { ok: true };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("[reviewService] Gagal kirim ulasan.", error);
    return { ok: false, reason: "error" };
  }
}

/** Kirim masukan/saran. Honeypot sama seperti form ulasan. */
export async function submitSuggestion({ name, message, honeypot }) {
  if (honeypot) {
    return { ok: true, skipped: true };
  }
  if (!isFirebaseConfigured) {
    return { ok: false, reason: "not-configured" };
  }
  if (!name?.trim() || !message?.trim()) {
    return { ok: false, reason: "invalid" };
  }
  try {
    await addDoc(collection(db, "suggestions"), {
      name: name.trim().slice(0, 80),
      message: message.trim().slice(0, 800),
      createdAt: serverTimestamp(),
    });
    return { ok: true };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("[reviewService] Gagal kirim masukan.", error);
    return { ok: false, reason: "error" };
  }
}

/**
 * Catat satu transaksi checkout WhatsApp untuk statistik "Pesanan".
 * Sengaja tidak melempar error ke pemanggil — mencatat statistik tidak boleh
 * pernah menghalangi customer lanjut memesan.
 */
export async function recordOrder({ itemCount, total }) {
  if (!isFirebaseConfigured) return;
  try {
    await addDoc(collection(db, "orders"), {
      itemCount,
      total,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("[reviewService] Gagal mencatat pesanan (non-fatal).", error);
  }
}

/**
 * Hitung statistik asli dari Firestore: jumlah ulasan disetujui, rata-rata
 * rating, dan jumlah pesanan tercatat. Mengembalikan null kalau Firestore
 * belum dikonfigurasi supaya UI bisa menampilkan pesan yang jujur, bukan
 * angka karangan.
 */
export async function fetchStats() {
  if (!isFirebaseConfigured) {
    return null;
  }
  try {
    const reviewsQ = query(collection(db, "reviews"), where("isApproved", "==", true));
    const [reviewsSnap, ordersSnap] = await Promise.all([
      getDocs(reviewsQ),
      getDocs(collection(db, "orders")),
    ]);

    const ratings = reviewsSnap.docs.map((d) => Number(d.data().rating) || 0);
    const avgRating = ratings.length
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
      : 0;

    return {
      reviewCount: reviewsSnap.size,
      avgRating,
      orderCount: ordersSnap.size,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("[reviewService] Gagal hitung statistik.", error);
    return null;
  }
}
