import { Schema, model, models} from "mongoose";
import { IUser } from "./user.model";

export interface IStaff extends IUser{
  enrolledDate: Date;
  salary: string;
  position: string;
}

const StaffSchema = new Schema<IStaff>({
  enrolledDate: { type: Date, required: true },
  salary: { type: String, required: true },
  position: { type: String, required: true },
});


const Staff = models.Staff || model("Staff", StaffSchema);

export default Staff;
