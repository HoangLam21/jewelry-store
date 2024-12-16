import { Schema, Document, model, models } from "mongoose";
import { AuditSchema, IAudit } from "./audit.model";

export interface IProvider extends Document, IAudit {
  name: string;
  address: string;
  contact: string;
}

const ProviderSchema = new Schema<IProvider>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
});

ProviderSchema.add(AuditSchema);

const Provider = models.Provider || model("Provider", ProviderSchema);

export default Provider;
