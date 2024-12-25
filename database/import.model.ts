import { Schema, model, models, Document } from "mongoose";
import { ObjectId } from "mongodb";
import { AuditSchema, IAudit } from "./audit.model";

export interface Import extends Document, IAudit {
  staff: ObjectId;
  totalCost: number;
  details: Map<ObjectId, number>;
}

const ImportSchema = new Schema<Import>({
  staff: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
  totalCost: { type: Number, required: true },
  details: { type: Map, of: Number, required: true },
});

ImportSchema.add(AuditSchema);

const Import = models.Order || model("Import", ImportSchema);

export default Import;
