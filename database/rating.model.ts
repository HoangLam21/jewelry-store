import { Schema, Document, model, models } from "mongoose";
import { AuditSchema, IAudit } from "./audit.model";

export interface IRating extends Document, IAudit {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  point: number;
  content:string;
}

const RatingSchema = new Schema<IRating>({
  userId: { type: Schema.Types.ObjectId, required: true },
  productId: { type: Schema.Types.ObjectId, required: true },
  point: { type: Number, required: true, default: 5 },
  content:{type:String}
});

RatingSchema.add(AuditSchema);

const Rating = models.Rating || model("Rating", RatingSchema);

export default Rating;
