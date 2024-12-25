import { Schema, model, models} from "mongoose";
import { IUser } from "./user.model"; 

export interface ICustomer extends IUser {
  point: number;
  orders: Schema.Types.ObjectId[];
}

const CustomerSchema = new Schema<ICustomer>({
  point: { type: Number, required: true, default: 0 },
  orders: { type: [Schema.Types.ObjectId], ref: "Order", required: false },
});

const Customer = models.Customer || model("Customer", CustomerSchema);

export default Customer;
