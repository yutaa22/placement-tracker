import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  course: { type: String, required: true }
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);
export default Student;
