import { useState } from "react";
import { submitSuggestion } from "../firebase/reviewService";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function SuggestionForm({ showToast }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const revealRef = useScrollReveal();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const result = await submitSuggestion({ name, message, honeypot: website });
    setIsSubmitting(false);

    if (result.ok) {
      setStatus({ type: "ok", message: "Masukan kamu sudah kami terima. Terima kasih!" });
      setName("");
      setMessage("");
      showToast?.("Masukan terkirim, terima kasih!");
    } else if (result.reason === "not-configured") {
      setStatus({ type: "err", message: "Firestore belum terhubung — lihat README untuk setup." });
    } else {
      setStatus({ type: "err", message: "Gagal mengirim masukan. Coba lagi ya." });
    }
  }

  return (
    <section className="pg-section pg-section--alt">
      <div className="pg-container" style={{ maxWidth: 640 }}>
        <div className="pg-head-row pg-reveal" ref={revealRef}>
          <div>
            <span className="pg-eyebrow">Masukan &amp; Saran</span>
            <h2 className="pg-heading">Bantu kami jadi lebih baik</h2>
          </div>
        </div>

        <form className="pg-form-card" onSubmit={handleSubmit}>
          <div className="pg-form-group">
            <label htmlFor="suggestion-name">Nama</label>
            <input
              id="suggestion-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama kamu"
              required
              maxLength={80}
            />
          </div>

          <div className="pg-form-group">
            <label htmlFor="suggestion-message">Masukan</label>
            <textarea
              id="suggestion-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Saran, kritik, atau ide untuk kami..."
              required
              maxLength={800}
            />
          </div>

          <div className="pg-hp-field" aria-hidden="true">
            <label htmlFor="suggestion-website">Website</label>
            <input
              id="suggestion-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <button type="submit" className="pg-btn pg-btn--primary pg-btn--block" disabled={isSubmitting}>
            {isSubmitting && <span className="pg-spinner pg-spinner--sm" aria-hidden="true" />}
            {isSubmitting ? "Mengirim..." : "Kirim Masukan"}
          </button>

          {status && (
            <p className={`pg-form-msg ${status.type === "ok" ? "pg-form-msg--ok" : "pg-form-msg--err"}`}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
