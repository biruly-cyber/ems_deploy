import mongoose from "mongoose";

const leaveDetailSchema = new mongoose.Schema(
  {
    leaveType: { type: String, required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    reason: { type: String, required: true },
    remarks: { type: String },
    name: { type: String },
    isAccepted: { type: Boolean, default: false },
    isRejected: { type: Boolean, default: false },
    totalDaysofLeave: { type: Number },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

export const LeaveDetailSchema = mongoose.model(
  "leaveDetails",
  leaveDetailSchema
);
