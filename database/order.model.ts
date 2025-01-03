import { Schema, model, models, Document } from "mongoose";
import { ObjectId } from "mongodb";
import { AuditSchema, IAudit } from "./audit.model";

export interface IOrder extends Document, IAudit {
    cost: number;
    discount: number;
    details: [
        {
            id: Schema.Types.ObjectId;
            material: string;
            size: string;
            unitPrice: number;
            quantity: number;
            discount: string;
        }
    ];
    status: string;
    shippingMethod: string;
    ETD: Date;
    customer?: Schema.Types.ObjectId;
    phoneNumber?:Schema.Types.ObjectId;
    note?:string;
    staff: Schema.Types.ObjectId;
}

const OrderSchema = new Schema<IOrder>({
    cost: { type: Number, required: true },
    discount: { type: Number, required: true },
    details: {
        type: [
            {
                id: { type: Schema.Types.ObjectId },
                material: { type: String },
                size: { type: String },
                quantity: { type: Number },
                discount: { type: Number },
            },
        ],
        required: true,
    },
    status: { type: String, required: true },
    shippingMethod: { type: String, required: true },
    ETD: { type: Date, required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    phoneNumber:{type:String},
    note:{type:String},
    staff: { type: Schema.Types.ObjectId, required: true, ref: "Staff" },
});

OrderSchema.add(AuditSchema);

const Order = models.Order || model("Order", OrderSchema);
// added new value for order
export default Order;
