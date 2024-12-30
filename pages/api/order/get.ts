// Get order by ID
import { NextApiRequest, NextApiResponse } from "next";
import { getOrderById } from "@/lib/actions/order.action"; // Đảm bảo đường dẫn chính xác

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const orderId = req.query.orderId;
            const order = await getOrderById(orderId as string);
            return res.status(200).json(order);
        } catch (error) {
            console.error("Error fetching order: ", error);
            return res.status(500).json({ error: "Failed to fetch order" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
