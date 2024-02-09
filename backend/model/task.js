import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskTitle: {
      type: String,
      required: true,
      trim: true,
    },
    taskDescription: {
      type: String,
      required: true,
      trim: true,
    },
    employeeName:{
      type:String,
    },
    projectName:{
      type:String
    },
    managerName:{
      type:String,
    },
    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee_details",
      required: true,
    },
    taskOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true,
    },
    managerId:{
      type:mongoose.Schema.Types.ObjectId,
      ref: "employee_details",
      required: true,
    },
    isTaskCompleted: {
      type: Boolean,
      default: false,
    },
    isRequested:{
      type: Boolean,
      default: false
    },
    gitLink:{
      type: String 
    },
    taskAssignDate:{
      type:String,
      required: true
    },
    taskEndDate:{
      type: String,
      required: true
    }

  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("task", taskSchema);
