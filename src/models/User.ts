import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  image: { type: String }, // URL or base64
  password: { type: String, required: true }, // hashed later
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
