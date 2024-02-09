import { ReportTaskFeedback } from "../model/reportTaskFeedback.js";
import { Task } from "../model/task.js";
import { ReportTask } from "../model/reportTask.js";

//for new feedback
export const taskReportFeedback = async (req, res) => {
  //  extract data from req body /
  try {
    const {
      isTaskCompleted,
      feedback,
      employeeId,
      taskId,
      taskReportId,
      employeeName,
      taskTitle,
      taskReportDesc,
      reportTitle,
    } = req.body.data;

    console.log(taskReportId)
    
    const foundTask = await Task.findById(taskId);
    
    const foundReportTask = await ReportTask.findById(taskReportId)
    
    // console.log(foundTask)
    if (isTaskCompleted) {
      foundTask.isTaskCompleted = isTaskCompleted;
      foundReportTask.isTaskCompleted = isTaskCompleted
      const update = await foundReportTask.save()
      const updateTaskReport = await foundTask.save();
      console.log(update)
    }

    // console.log(foundReportTask)
    // update reportTask 
    
    

    // create entry on db
    const taskReportFeedback = await ReportTaskFeedback.create({
      feedback,
      isTaskCompleted,
      employeeId,
      taskId,
      taskReportId,
      employeeName,
      taskTitle,
      taskReportDesc,
      reportTitle,
      managerName: req.user.name,
      managerId: req.user.employeeId,
    });

    return res.status(200).json({
      success: true,
      taskReportFeedback,
      message: "feedback added successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//for get all feedback
export const allFeedback =async(req, res)=>{
    try {
        
        //get all data from db
        const allFeedback = await ReportTaskFeedback.find({})

        if(!allFeedback){
            return res.status(404).json({
                success: false,
                message: 'Data not found!'
            })
        }

        return res.status(200).json({
            success: true,
            allFeedback,
            message: "Data fetched successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Details not fetched! Please check!"
        })
    }
}
