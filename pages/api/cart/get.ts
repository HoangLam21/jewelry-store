// Get all information of a cart
import { NextApiRequest, NextApiResponse } from "next";
import { getCartInformation } from "@/lib/actions/cart.action"; // Đảm bảo đường dẫn chính xác

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const userId = req.query.userId;
            const cartInformation = await getCartInformation(userId as string);
            return res.status(200).json(cartInformation);
        } catch (error) {
            console.error("Error getting cart information: ", error);
            return res
                .status(500)
                .json({ error: "Failed to get cart information" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
