// Create a new import
import { NextApiRequest, NextApiResponse } from "next";
import { createImport } from "@/lib/actions/import.action"; // Đảm bảo đường dẫn chính xác

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const data = req.body;
            const newImport = await createImport(data);
            return res.status(201).json(newImport);
        } catch (error) {
            console.error("Error creating import: ", error);
            return res.status(500).json({ error: "Failed to create import" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}