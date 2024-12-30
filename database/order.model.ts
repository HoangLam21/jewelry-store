import { Schema, model, models, Document } from "mongoose";
import { ObjectId } from "mongodb";
import { AuditSchema, IAudit } from "./audit.model";

export interface IOrder extends Document, IAudit {
    cost: number;
    discount: number;
    details: Map<ObjectId, number>;
    status: string;
    shippingMethod: string;
    ETD: Date;
    customer: Schema.Types.ObjectId;
    staff: Schema.Types.ObjectId;
}

const OrderSchema = new Schema<IOrder>({
    cost: { type: Number, required: true },
    discount: { type: Number, required: true },
    details: { type: Map, of: Number, required: true },
    status: { type: String, required: true },
    shippingMethod: { type: String, required: true },
    ETD: { type: Date, required: true },
    customer: { type: Schema.Types.ObjectId, required: true, ref: "Customer" },
    staff: { type: Schema.Types.ObjectId, required: true, ref: "Staff" },
});

OrderSchema.add(AuditSchema);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
