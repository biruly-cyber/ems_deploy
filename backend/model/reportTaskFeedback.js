import mongoose from "mongoose";

const taskFeedbackSchema = new mongoose.Schema(
  {
    managerName: {
      type: String,
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    feedback: {
      type: String,
      trim: true,
    },
    isTaskCompleted: {
      type: Boolean,
    },
    taskReportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "report_task",
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "employee_details"
    },
    employeeName:{
        type: String,
    },
    taskReportTitle:{
        type: String
    },
    taskReportDescription:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);

export const ReportTaskFeedback = mongoose.model("task_report_feedback", taskFeedbackSchema)
