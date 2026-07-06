import { useState } from "react";
import { submitReview } from "../firebase/reviewService";

export default function ReviewForm({ onSubmitted }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — orang tidak akan mengisi ini
  const [status, setStatus] = useState(null); // { type: 'ok' | 'err', message }
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0) {
      setStatus({ type: "err", message: "Yuk beri rating bintang dulu." });
      return;
    }
    setIsSubmitting(true);
    setStatus(null);

    const result = await submitReview({ name, rating, text, honeypot: website });
    setIsSubmitting(false);

    if (result.ok) {
      setStatus({
        type: "ok",
        message: "Terima kasih! Ulasan kamu akan tayang setelah disetujui.",
      });
      setName("");
      setRating(0);
      setText("");
      onSubmitted?.("Ulasan terkirim, terima kasih!");
    } else if (result.reason === "not-configured") {
      setStatus({
        type: "err",
        message: "Firestore belum terhubung — lihat README untuk setup.",
      });
    } else {
      setStatus({ type: "err", message: "Gagal mengirim ulasan. Coba lagi ya." });
    }
  }

  return (
    <form className="pg-form-card" onSubmit={handleSubmit}>
      <h3 style={{ fontFamily: "var(--font-display)", marginBottom: 18 }}>Beri Ulasan</h3>

      <div className="pg-form-group">
        <label htmlFor="review-name">Nama</label>
        <input
          id="review-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama kamu"
          required
          maxLength={80}
        />
      </div>

      <div className="pg-form-group">
        <label>Rating</label>
        <div className="pg-star-input" role="radiogroup" aria-label="Rating bintang">
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`bi ${(hoverRating || rating) >= star ? "bi-star-fill is-filled" : "bi-star"}`}
              role="radio"
              aria-checked={rating === star}
              tabIndex={0}
              onClick={() => setRating(star)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setRating(star);
              }}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
      </div>

      <div className="pg-form-group">
        <label htmlFor="review-text">Ulasan</label>
        <textarea
          id="review-text"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ceritakan pengalamanmu..."
          required
          maxLength={600}
        />
      </div>

      {/* Honeypot anti-spam: disembunyikan lewat CSS, bukan lewat type="hidden",
          supaya bot yang mengisi semua field tetap kena jebak. */}
      <div className="pg-hp-field" aria-hidden="true">
        <label htmlFor="review-website">Website</label>
        <input
          id="review-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button type="submit" className="pg-btn pg-btn--primary pg-btn--block" disabled={isSubmitting}>
        {isSubmitting && <span className="pg-spinner pg-spinner--sm" aria-hidden="true" />}
        {isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
      </button>

      {status && (
        <p className={`pg-form-msg ${status.type === "ok" ? "pg-form-msg--ok" : "pg-form-msg--err"}`}>
          {status.message}
        </p>
      )}
    </form>
  );
}
