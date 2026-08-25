import { Link } from "react-router-dom";

// A summary card. The title and the "See details" link both route to the
// listing's own page, where the full details live.
function FoodListingCard({ listing }) {
  const isUrgent = listing.priority === "Urgent";

  return (
    <article className="listing-card">
      <div className="listing-body">
        <h2 className="listing-title">
          <Link to={`/listings/${listing.id}`} className="listing-title-link">
            {listing.title}
          </Link>
        </h2>
        <p className="listing-provider">{listing.provider}</p>

        <div className="badge-row">
          <span className="badge badge--category">{listing.category}</span>
          <span className={isUrgent ? "badge badge--urgent" : "badge"}>{listing.priority}</span>
        </div>

        <div className="listing-meta">
          <span className="listing-meta-item">
            <span aria-hidden="true">🍽️</span>
            {listing.portions} portions
          </span>
        </div>

        <Link to={`/listings/${listing.id}`} className="details-button">
          See details →
        </Link>
      </div>
    </article>
  );
}

export default FoodListingCard;
