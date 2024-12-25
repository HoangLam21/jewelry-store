import { Schema, model, models, Document } from "mongoose";
import { ObjectId } from "mongodb";
import { AuditSchema, IAudit } from "./audit.model";

export interface IOrder extends Document, IAudit {
  cost: number;
  discount: number;
  details: Map<ObjectId, number>;
}

const OrderSchema = new Schema<IOrder>({
  cost: { type: Number, required: true },
  discount: { type: Number, required: true },
  details: { type: Map, of: Number, required: true },
});

OrderSchema.add(AuditSchema);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
