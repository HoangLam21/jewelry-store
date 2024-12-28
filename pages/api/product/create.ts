import { NextApiRequest, NextApiResponse } from "next/types";
import formidable from "formidable";
import { createProduct } from "@/lib/actions/product.action";
import { IVariant } from "@/database/product.model";
import { IncomingForm } from "formidable";

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing FormData:", err);
        return res.status(400).json({ error: "Failed to parse FormData" });
      }

      const { name, cost, description, vouchers, provider, category, variants } = fields;

      const images = files.images ? (Array.isArray(files.images) ? files.images : [files.images]) : [];
      console.log("parsedimge: ",images);

      if (!name || !cost || !description || !provider || !variants ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      try {
  
        const parsedVouchers = Array.isArray(vouchers) ? vouchers : (vouchers ? [vouchers] : []);

        let parsedVariants: IVariant[] = [];
        if (variants && typeof variants === "string") {
          try {
            parsedVariants = JSON.parse(variants);
            if (!Array.isArray(parsedVariants)) {
              throw new Error("Variants is not an array");
            }
          } catch (error) {
            return res.status(400).json({ error: "Invalid JSON format for variants" });
          }
        }

        parsedVariants.forEach((variant: any) => {
          if (
            !variant.size ||
            !variant.color ||
            typeof variant.price !== "number" ||
            typeof variant.sales !== "number" ||
            typeof variant.stock !== "number"
          ) {
            throw new Error("Invalid variant data");
          }
        });

        // if (typeof name !== "string") {
        //   return res.status(400).json({ error: "Invalid name format" });
        // }

        const productData = {
          name: typeof name ==="string"? name: name[0],
          cost: parseFloat(Array.isArray(cost) ? cost[0] : cost as string),
          images: images as formidable.File[], 
          description: Array.isArray(description) ? description[0] : description as string,
          vouchers: parsedVouchers.map((voucher) => String(voucher)),
          provider: String(Array.isArray(provider) ? provider[0] : provider as string), 
          category: category ? String(Array.isArray(category) ? category[0] : category as string) : undefined, 
          variants: parsedVariants, 
        };

        const newProduct = await createProduct(productData);
        return res.status(201).json(newProduct);
      } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ error: "Failed to create product" });
      }
    });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
