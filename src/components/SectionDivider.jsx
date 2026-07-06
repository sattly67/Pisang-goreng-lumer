// Elemen signature: garis pembatas bergelombang bertekstur "kerupuk pisang",
// dipakai berulang sebagai pemisah antar section supaya terasa jadi satu
// identitas visual yang konsisten (bukan garis lurus generik).
export default function SectionDivider({ variant = "default" }) {
  return (
    <svg
      className={`pg-divider ${variant !== "default" ? `pg-divider--${variant}` : ""}`}
      viewBox="0 0 1200 46"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 24 C150 4 300 44 450 24 C600 4 750 44 900 24 C1000 10 1100 10 1200 24 L1200 46 L0 46 Z" />
    </svg>
  );
}
