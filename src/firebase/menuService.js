// Service untuk data menu.
//
// Kenapa begini: rancangan minta harga/stok bisa diubah tanpa deploy ulang,
// jadi sumber utamanya Firestore collection "menu". Kalau Firestore belum
// dikonfigurasi ATAU permintaan gagal (offline, rules salah, dst), kita
// otomatis pakai data lokal supaya menu tetap tampil.

import { collection, getDocs } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./config";
import localMenuData from "../data/menuData";

export async function fetchMenu() {
  if (!isFirebaseConfigured) {
    return { items: localMenuData, source: "local" };
  }

  try {
    const snapshot = await getDocs(collection(db, "menu"));
    if (snapshot.empty) {
      return { items: localMenuData, source: "local" };
    }
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { items, source: "firestore" };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("[menuService] Gagal ambil data dari Firestore, pakai data lokal.", error);
    return { items: localMenuData, source: "local" };
  }
}
