import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  permissions: string[];
}

const RoleSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    permissions: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Role ||
  mongoose.model<IRole>("Role", RoleSchema);
