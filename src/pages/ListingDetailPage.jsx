import { useParams, Link } from "react-router-dom";
import { useListingsStore } from "../store/useListingsStore.js";

// No props — the detail page reads the listings from the store. Check "still
// loading?" first, so a fresh /listings/2 tab doesn't flash "not found".
function ListingDetailPage() {
  const listings = useListingsStore((state) => state.listings);
  const status = useListingsStore((state) => state.status);
  const { listingId } = useParams();

  if (status === "loading") {
    return (
      <main className="detail">
        <p className="board-state">Loading…</p>
      </main>
    );
  }

  const listing = listings.find((item) => item.id === listingId);

  if (!listing) {
    return (
      <main className="detail">
        <p className="board-state">
          We couldn't find that listing. <Link to="/" className="nav-link">Back to the board</Link>
        </p>
      </main>
    );
  }

  const isUrgent = listing.priority === "Urgent";

  return (
    <main className="detail">
      <Link to="/" className="nav-link">← Back to the board</Link>

      <article className="detail-card">
        <div className="badge-row">
          <span className="badge badge--category">{listing.category}</span>
          <span className={isUrgent ? "badge badge--urgent" : "badge"}>{listing.priority}</span>
        </div>

        <h1>{listing.title}</h1>
        <p className="detail-provider">Shared by {listing.provider}</p>
        <p className="detail-description">{listing.description}</p>

        <dl className="detail-facts">
          <div><dt>Portions</dt><dd>{listing.portions}</dd></div>
          <div><dt>Category</dt><dd>{listing.category}</dd></div>
          <div><dt>Priority</dt><dd>{listing.priority}</dd></div>
        </dl>
      </article>
    </main>
  );
}

export default ListingDetailPage;
