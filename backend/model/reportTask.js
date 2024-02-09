import mongoose from "mongoose";

const reportTaskSchema = new mongoose.Schema(
  {
    reportTitle: {
      type: String,
      required: true,
    },
    reportDescription: {
      type: String,
      required: true,
      trim: true,
    },
    isTaskCompleted: {
      type: Boolean,
      default: false,
    },
    //isRequested for the report request for completion to the manager
    isRequested:{
      type: Boolean,
      default: false
    },
    //git link for references
    gitLink:{ 
      type: String,
      required: true
    },
    projetName:{
      type:String,
    },
    employeeName:{
      type:String,
    },
    taskTitle:{
      type:String,
    },
    managerName:{
      type:String 
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee_details",
      required: true
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee_details",
      required: true
    },
    taskId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
      required: true
    }
  },
  {
    timestamps: true,
  }
);


export const ReportTask = mongoose.model("report_task", reportTaskSchema)
