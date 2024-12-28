import { NextApiRequest, NextApiResponse } from "next/types";
import { createCustomer } from "@/lib/actions/customer.action";

export const config = {
  api: {
    bodyParser: true, 
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      if (req.method === "POST") {
        const { fullName, phoneNumber, email, address } = req.body;

        if (!fullName || !phoneNumber || !email || !address) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        try {
          const newCustomer = await createCustomer({ fullName, phoneNumber, email, address });
          return res.status(201).json(newCustomer);
        } catch (error) {
          console.error("Error creating customer:", error);
          return res.status(500).json({ error: "Failed to create customer" });
        }
      } else {
        return res.status(405).json({ error: "Method not allowed" });
      }
}
