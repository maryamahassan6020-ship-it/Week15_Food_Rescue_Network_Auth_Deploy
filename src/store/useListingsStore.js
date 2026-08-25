import { create } from "zustand";

// ONE store holds the listings and the request status. Any component reads it
// directly with a selector — no provider, no props.
export const useListingsStore = create((set) => ({
  // ---- state ----
  listings: [],
  status: "loading", // "loading" | "success" | "error"

  // ---- action ----
  // Load the listings. The fetch lives right here in the store — there is no
  // separate api/ file this week. It adapts each product into our listing shape.
  loadListings: async () => {
    set({ status: "loading" });
    try {
      const res = await fetch(
        "https://dummyjson.com/products/category/groceries?limit=8&select=title,description,category,stock"
      );
      const data = await res.json();
      const listings = data.products.map((product) => ({
        id: String(product.id),
        title: product.title,
        provider: "Community grocer",
        category: humanize(product.category),
        portions: product.stock,
        description: product.description,
        priority: product.stock < 20 ? "Urgent" : "Standard",
      }));
      set({ listings, status: "success" });
    } catch {
      set({ status: "error" });
    }
  },
}));

// "groceries" -> "Groceries"
function humanize(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
