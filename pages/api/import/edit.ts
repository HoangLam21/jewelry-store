// Update an import
import { NextApiRequest, NextApiResponse } from "next";
import { editImport } from "@/lib/actions/import.action"; // Đảm bảo đường dẫn chính xác

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PATCH") {
        try {
            const importId = req.query.importId;
            const data = req.body;
            const updatedImport = await editImport(importId as string, data);
            return res.status(200).json(updatedImport);
        } catch (error) {
            console.error("Error updating import: ", error);
            return res.status(500).json({ error: "Failed to update import" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
