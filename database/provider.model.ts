import { Schema, Document, model, models } from "mongoose";
import { AuditSchema, IAudit } from "./audit.model";

export interface IProductProvider extends Document, IAudit {
  name: string;
  address: string;
  contact: string;
}

const ProductProviderSchema = new Schema<IProductProvider>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
});

ProductProviderSchema.add(AuditSchema);

const ProductProvider = models.ProductProvider || model("ProductProvider", ProductProviderSchema);

export default ProductProvider;
