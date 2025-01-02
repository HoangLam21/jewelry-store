// getAllImportsOfStaff API
import { NextApiRequest, NextApiResponse } from "next";
import { getAllImportsOfStaff } from "@/lib/actions/import.action";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const staffId = req.query.staffId;
            const imports = await getAllImportsOfStaff(staffId as string);
            return res.status(200).json(imports);
        } catch (error) {
            console.error("Error fetching imports of staff: ", error);
            return res
                .status(500)
                .json({ error: "Failed to fetch imports of staff" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
