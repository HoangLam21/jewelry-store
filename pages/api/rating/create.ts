import { NextApiRequest, NextApiResponse } from "next";
import { createRating } from "@/lib/actions/rating.action"; // Adjust path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId, productId, point, content } = req.body;

    if (!userId || !productId || !point || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const newRating = await createRating({ userId, productId, point, content });
      return res.status(201).json(newRating);
    } catch (error) {
      console.error("Error creating rating: ", error);
      return res.status(500).json({ error: "Failed to create rating" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
