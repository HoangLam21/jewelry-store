// Delete an import
import { NextApiRequest, NextApiResponse } from "next";
import { deleteImport } from "@/lib/actions/import.action"; // Đảm bảo đường dẫn chính xác

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "DELETE") {
        try {
            const importId = req.query.importId;
            const result = await deleteImport(importId as string);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Error deleting import: ", error);
            return res.status(500).json({ error: "Failed to delete import" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
