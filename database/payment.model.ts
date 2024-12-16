import { Schema, Document, model, models } from "mongoose";
import { AuditSchema, IAudit } from "./audit.model";

export interface IPayment extends Document, IAudit {
  userId: Schema.Types.ObjectId;
  totalPay: Number;
  status: boolean;
}

const PaymentSchema = new Schema<IPayment>({
  userId: { type: Schema.Types.ObjectId, required: true },
  totalPay: { type: Number, required: true, default: 0 },
  status: { type: Boolean, require: true, default: false },
});

PaymentSchema.add(AuditSchema);

const Payment = models.Payment || model("Payment", PaymentSchema);

export default Payment;
