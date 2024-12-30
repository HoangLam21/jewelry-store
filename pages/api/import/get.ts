// Get import by ID
import { NextApiRequest, NextApiResponse } from "next";
import { getImportById } from "@/lib/actions/import.action"; // Đảm bảo đường dẫn chính xác

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const importId = req.query.importId;
            const importData = await getImportById(importId as string);
            return res.status(200).json(importData);
        } catch (error) {
            console.error("Error fetching import: ", error);
            return res.status(500).json({ error: "Failed to fetch import" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
