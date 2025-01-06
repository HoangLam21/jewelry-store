export async function getReviewById(id: string) {
  try {
    const response = await fetch(`/api/rating/product?productId=${id}`);
    if (!response.ok) {
      throw new Error("Error fetching products");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}
