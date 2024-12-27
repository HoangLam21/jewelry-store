import { Document, Schema, model, models} from "mongoose";
import { IUser, UserSchema } from "./user.model";

export interface IStaff extends IUser, Document{
  enrolledDate: Date;
  salary: string;
  position: string;
}

const StaffSchema = new Schema<IStaff>({
  enrolledDate: { type: Date, required: true },
  salary: { type: String, required: true },
  position: { type: String, required: true },
});

StaffSchema.add(UserSchema);

const Staff = models.Staff || model("Staff", StaffSchema);

export default Staff;
