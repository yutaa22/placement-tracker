import mongoose from "mongoose";

const placementSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: {
    type: String,
    enum: ["applied", "interview", "selected", "rejected"],
    default: "applied",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
}, { timestamps: true });

const Placement = mongoose.model("Placement", placementSchema);
export default Placement;
