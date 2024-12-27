import { Schema, model, models, Document } from "mongoose";
import { ObjectId } from "mongodb";
import { AuditSchema, IAudit } from "./audit.model";

export interface IVariant {
  size: string;
  color: string;
  price: number;
  sales: number;
  stock: number;
}

export interface IProduct extends Document, IAudit {
  name: string;
  cost: number;
  images: Schema.Types.ObjectId[];
  description: string;
  vouchers: Schema.Types.ObjectId[];
  provider: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
  variants: IVariant[];
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  images: { type: [Schema.Types.ObjectId], ref: "Image", required: true },
  description: { type: String, required: true },
  vouchers: { type: [Schema.Types.ObjectId], ref: "Voucher", required: false },
  provider: { type: Schema.Types.ObjectId, ref: "Provider", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  variants: [
    {
      size: { type: String, required: true },
      color: { type: String, required: true },
      price: { type: Number, required: true },
      sales: { type: Number, required: true },
      stock: { type: Number, required: true },
    },
  ],
});

ProductSchema.add(AuditSchema);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
