import { Schema, model, models, Document } from "mongoose";
import { ObjectId } from "mongodb";
import { AuditSchema, IAudit } from "./audit.model";

export interface Import extends Document, IAudit {
    staff: ObjectId;
    totalCost: number;
    details: [{id:Schema.Types.ObjectId,material:string, size:string,unitPrice:number, quantity:number, discount:string }];
    status: boolean;
}

const ImportSchema = new Schema<Import>({
    staff: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
    totalCost: { type: Number, required: true },
    details: {type:[{id:{type:Schema.Types.ObjectId},material:{type:String},size:{type:String}, quantity:{type:Number}, discount:{type:Number}}], required:true},
    status:{type:Boolean, default:false},
});

ImportSchema.add(AuditSchema);

const Import = models.Order || model("Import", ImportSchema);

export default Import;
