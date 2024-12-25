import { Schema, Document, model, models } from "mongoose";
import { AuditSchema, IAudit } from "./audit.model";

export interface IImage extends Document, IAudit {
  fileName: string;
  url: string;
  publicId: string;
  bytes: string;
  width: string;
  height: string;
  format: string;
  type: string;
}

const ImageSchema = new Schema<IImage>({
  fileName: { type: String, required: true },
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  bytes: { type: String, required: true },
  width: { type: String, required: false },
  height: { type: String, required: false },
  format: { type: String, required: false },
  type: { type: String, required: true },
});

ImageSchema.add(AuditSchema);

const Image = models.Image || model("Image", ImageSchema);

export default Image;
