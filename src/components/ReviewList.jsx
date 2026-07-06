import { useEffect, useState } from "react";
import { fetchApprovedReviews } from "../firebase/reviewService";

function Stars({ rating }) {
  return (
    <span className="pg-review-card__stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className={`bi ${i < rating ? "bi-star-fill" : "bi-star"}`} />
      ))}
    </span>
  );
}

export default function ReviewList({ refreshKey }) {
  const [state, setState] = useState({ items: [], ready: false, loading: true, error: false });

  useEffect(() => {
    let mounted = true;
    setState((s) => ({ ...s, loading: true }));
    fetchApprovedReviews().then((result) => {
      if (mounted) setState({ ...result, loading: false });
    });
    return () => {
      mounted = false;
    };
  }, [refreshKey]);

  if (state.loading) {
    return (
      <div className="pg-review-list">
        {[0, 1, 2].map((i) => (
          <div key={i} className="pg-skeleton" style={{ height: 92 }} />
        ))}
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="pg-empty-state">
        <i className="bi bi-wifi-off" style={{ fontSize: "1.6rem" }} />
        <p>Ulasan sedang tidak bisa dimuat. Coba muat ulang halaman ya.</p>
      </div>
    );
  }

  if (!state.ready) {
    return (
      <div className="pg-empty-state">
        <i className="bi bi-chat-heart" style={{ fontSize: "1.6rem" }} />
        <p>Hubungkan Firestore (lihat README) supaya ulasan pelanggan tampil di sini.</p>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="pg-empty-state">
        <i className="bi bi-chat-heart" style={{ fontSize: "1.6rem" }} />
        <p>Belum ada ulasan yang tayang. Jadilah yang pertama memberi ulasan!</p>
      </div>
    );
  }

  return (
    <div className="pg-review-list">
      {state.items.map((review) => (
        <div className="pg-review-card" key={review.id}>
          <div className="pg-review-card__top">
            <span className="pg-review-card__name">{review.name}</span>
            <Stars rating={review.rating} />
          </div>
          <p className="pg-review-card__text">{review.text}</p>
        </div>
      ))}
    </div>
  );
}
