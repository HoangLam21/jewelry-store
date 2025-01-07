export async function addToCart(
  userId: string,
  productId: string,
  quantity: number,
  selectedMaterial: string,
  selectedSize: string
) {
  try {
    const response = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId,
        quantity,
        selectedMaterial,
        selectedSize,
      }),
    });

    // Check for response status
    if (!response.ok) {
      throw new Error("Failed to add product to cart");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to add product to cart", err);
  }
}

export async function getCartByUserId(userId: string) {
  try {
    const response = await fetch(`/api/cart/get?userId=${userId}`);

    // Check for response status
    if (!response.ok) {
      throw new Error("Failed to add product to cart");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to add product to cart", err);
  }
}
