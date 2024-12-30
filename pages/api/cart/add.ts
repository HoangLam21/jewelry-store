// Add a product to a cart
import { NextApiRequest, NextApiResponse } from "next";
import { addProductToCart } from "@/lib/actions/cart.action"; // Đảm bảo đường dẫn chính xác

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const userId = req.body.userId;
            const productId = req.body.productId;
            const quantity = req.body.quantity;
            const cart = await addProductToCart(userId, productId, quantity);
            return res.status(201).json(cart);
        } catch (error) {
            console.error("Error adding product to cart: ", error);
            return res
                .status(500)
                .json({ error: "Failed to add product to cart" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
