import { NextApiRequest, NextApiResponse } from "next/types";
import { updateProvider } from "@/lib/actions/provider.action";

export const config = {
  api: {
    bodyParser: true, 
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    if (!id) {
      return res.status(400).json({ error: "Provider ID is required" });
    }

    const { name, address, contact } = req.body;
    
    if (!name && !address && !contact) {
      return res.status(400).json({ error: "No update fields provided" });
    }

    try {
      const updatedProvider = await updateProvider(id as string, { name, address, contact });
      return res.status(200).json(updatedProvider);
    } catch (error) {
      console.error("Error updating provider:", error);
      return res.status(500).json({ error: "Failed to update provider" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
