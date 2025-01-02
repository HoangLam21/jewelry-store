import { Schema, model, models, Document } from "mongoose";
import { AuditSchema, IAudit } from "./audit.model";
export interface IProduct extends Document, IAudit {
    name: string;
    cost: number;
    files: Schema.Types.ObjectId[];
    description: string;
    vouchers: Schema.Types.ObjectId[];
    provider: Schema.Types.ObjectId;
    category: Schema.Types.ObjectId;
    collections: string;
    variants: {
        material: string;
        sizes: { size: string; stock: number }[];
        addOn: number;
    }[];
    sales: number;
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    files: { type: [Schema.Types.ObjectId], ref: "File", required: true },
    description: { type: String, required: true },
    vouchers: {
        type: [Schema.Types.ObjectId],
        ref: "Voucher",
        required: false,
    },
    provider: {
        type: Schema.Types.ObjectId,
        ref: "ProductProvider",
        required: true,
    },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    collections: { type: String },
    variants: {
        type: [
            {
                material: { type: String },
                sizes: {
                    type: [{ size: { type: String }, stock: { type: Number } }],
                },
                addOn: Number,
            },
        ],
    },
    sales: { type: Number, default: 0 },
});

ProductSchema.add(AuditSchema);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
