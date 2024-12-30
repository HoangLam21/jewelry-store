// Delete order
import { NextApiRequest, NextApiResponse } from "next";
import { deleteOrder } from "@/lib/actions/order.action"; // Đảm bảo đường dẫn chính xác

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "DELETE") {
        try {
            const orderId = req.query.orderId;
            const result = await deleteOrder(orderId as string);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error deleting order: ", error);
            return res.status(500).json({ error: "Failed to delete order" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
