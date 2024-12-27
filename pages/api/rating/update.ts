import { NextApiRequest, NextApiResponse } from "next";
import { updateRating } from "@/lib/actions/rating.action"; // Adjust path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { point, content } = req.body;

  if (req.method === "PUT") {
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid Rating ID" });
    }

    try {
      const updatedRating = await updateRating(id, { point, content });
      return res.status(200).json(updatedRating);
    } catch (error) {
      console.error("Error updating rating: ", error);
      return res.status(500).json({ error: "Failed to update rating" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
