import { Schema, model, models, Document } from "mongoose";
import { ObjectId } from "mongodb";
import { AuditSchema, IAudit } from "./audit.model";
import { IUser } from "./user.model"; // Import the User model if necessary

export interface ICustomer extends IUser, IAudit {
  point: number;
  orders: Schema.Types.ObjectId[];
}

const CustomerSchema = new Schema<ICustomer>({
  point: { type: Number, required: true, default: 0 },
  orders: { type: [Schema.Types.ObjectId], ref: "Order", required: false },
});

CustomerSchema.add(AuditSchema);

const Customer = models.Customer || model("Customer", CustomerSchema);

export default Customer;
