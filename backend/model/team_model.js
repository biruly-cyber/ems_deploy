import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  teamDescription: {
    type: String,
  },
  adminProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  selectedMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee_details",
    },
  ],
  selectedManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee_details",
  },
  selectedProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
});

export const Teams = mongoose.model("Teams_Detail", teamSchema);
