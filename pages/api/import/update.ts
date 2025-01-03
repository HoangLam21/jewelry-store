// editImport API
import { NextApiRequest, NextApiResponse } from "next";
import { editImport } from "@/lib/actions/import.action";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT") {
        try {
            const id = req.query.id;
            const data = req.body;
            const updatedImport = await editImport(id as string, data);
            return res.status(200).json(updatedImport);
        } catch (error) {
            console.error("Error editing import: ", error);
            return res.status(500).json({ error: "Failed to edit import" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
