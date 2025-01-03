// Update order status
import { NextApiRequest, NextApiResponse } from "next";
import { updateOrderStatus } from "@/lib/actions/order.action"; // Đảm bảo đường dẫn chính xác

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PATCH") {
        try {
            const orderId = req.query.orderId;
            const status = req.query.status;
            const result = await updateOrderStatus(
                orderId as string,
                status as string
            );
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error updating order: ", error);
            return res.status(500).json({ error: "Failed to update order" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
