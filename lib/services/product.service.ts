export async function fetchProducts() {
  try {
    const response = await fetch(`/api/product/all`);
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
