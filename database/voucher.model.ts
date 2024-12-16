import { Schema, models, model, Document } from "mongoose";
import { AuditSchema, IAudit } from "./audit.model";
export interface IVoucher extends Document, IAudit {
  name: string;
  discount: Number;
}

const VoucherSchema = new Schema<IVoucher>({
  name: { type: String, require: true },
  discount: { type: Number, require: true },
});

VoucherSchema.add(AuditSchema);

const Voucher = models.Voucher || model("Voucher", VoucherSchema);

export default Voucher;
