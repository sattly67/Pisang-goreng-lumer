// Inisialisasi Firebase.
//
// Semua nilai diambil dari environment variable (lihat .env.example).
// PENTING: file ini sengaja tidak melempar error kalau env belum diisi,
// supaya npm run dev tetap jalan sebelum kamu setup Firebase project.
// Saat belum dikonfigurasi, `isFirebaseConfigured` bernilai false dan
// seluruh service (menuService, reviewService) otomatis jatuh ke data lokal.

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let app = null;
let db = null;

if (isFirebaseConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  db = getFirestore(app);
} else {
  // eslint-disable-next-line no-console
  console.warn(
    "[Firebase] Belum dikonfigurasi. Situs berjalan dengan data lokal " +
      "(src/data/menuData.js) sampai kamu mengisi file .env — lihat .env.example."
  );
}

export { app, db };
