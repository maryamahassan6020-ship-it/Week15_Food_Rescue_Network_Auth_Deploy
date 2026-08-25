import FoodListingCard from "./FoodListingCard.jsx";

// Map the fetched listings into cards.
function FoodListingList({ listings }) {
  return (
    <div className="board-grid">
      {listings.map((listing) => (
        <FoodListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}

export default FoodListingList;
