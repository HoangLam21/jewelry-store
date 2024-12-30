// Remove a product from a cart
import { NextApiRequest, NextApiResponse } from "next";
import { removeProductFromCart } from "@/lib/actions/cart.action"; // Đảm bảo đường dẫn chính xác

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "DELETE") {
        try {
            const userId = req.query.userId;
            const productId = req.query.productId;
            const cart = await removeProductFromCart(
                userId as string,
                productId as string
            );
            return res.status(200).json(cart);
        } catch (error) {
            console.error("Error removing product from cart: ", error);
            return res
                .status(500)
                .json({ error: "Failed to remove product from cart" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
