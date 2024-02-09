import mongoose from "mongoose";

const reportProjectSchema = new mongoose.Schema( {
    reportTitle: {
      type: String,
      required: true,
    },
    reportDescription: {
      type: String,
      required: true,
      trim: true,
    },
    isProjectCompleted: {
      type: Boolean,
      default: false,
    },
    managerName:{
      type:String
    },
    projectName:{
      type: String
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true,
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee_details",
      required: true 
    },
    adminId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"users",
      required: true
    }
  },
  {
    timestamps: true,
  })

export const ReportProject = mongoose.model("report_project", reportProjectSchema)