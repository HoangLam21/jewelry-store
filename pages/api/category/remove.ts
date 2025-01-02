// Remove a product from a category
import { NextApiRequest, NextApiResponse } from "next";
import { removeProductFromCategory } from "@/lib/actions/category.action"; // Đảm bảo đường dẫn chính xác

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "DELETE") {
        try {
            const categoryId = req.query.categoryId;
            const productId = req.query.productId;
            const result = await removeProductFromCategory(
                categoryId as string,
                productId as string
            );
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error removing product from category: ", error);
            return res
                .status(500)
                .json({ error: "Failed to remove product from category" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
