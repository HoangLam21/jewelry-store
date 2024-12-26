import { Schema, model, models, Document } from "mongoose";
import { ObjectId } from "mongodb";
import { AuditSchema, IAudit } from "./audit.model";
import { IUser } from "./user.model";

export interface IStaff extends IUser, IAudit {
  enrolledDate: Date;
  salary: string;
  position: string;
}

const StaffSchema = new Schema<IStaff>({
  enrolledDate: { type: Date, required: true },
  salary: { type: String, required: true },
  position: { type: String, required: true },
});

StaffSchema.add(AuditSchema);

const Staff = models.Staff || model("Staff", StaffSchema);

export default Staff;
