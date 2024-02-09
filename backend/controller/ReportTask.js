import { ReportTask } from "../model/reportTask.js";
import { Task } from "../model/task.js";

//new report //tested
export const reportTask = async (req, res) => {
  //fetch task id from
  const { id } = req.params;

  //fetch from req body
  const { reportTitle, reportDescription, isTaskCompleted, isRequested, gitLink } = req.body;

  console.log(req.body)

  

  try {
    //validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is invalid or null",
      });
    }

    // validation
    if (!reportTitle || !reportDescription) {
      return res.status(400).json({
        success: false,
        message: "All field are required!",
      });
    }

   

    //   check task exist or not
    const isTaskExist = await Task.findById(id);

    if (!isTaskExist) {
      return res.status(400).json({
        success: false,
        message: "Task not found!",
      });
    }

    
    // if task is completed then  update the status
    if(isRequested ===  true){
      isTaskExist.gitLink = gitLink
      isTaskExist.isRequested = isRequested
      const updateTask = await isTaskExist.save()
      console.log(updateTask)
    }
    
   


    

    //create entry on db
    const reportTask = await ReportTask.create({
      reportTitle,
      reportDescription,
      isTaskCompleted,
      isRequested: isTaskExist.isRequested,
      gitLink: isTaskExist.gitLink,
      projectName: isTaskExist.projectName, 
      employeeName: isTaskExist.employeeName,
      taskTitle: isTaskExist.taskTitle,
      managerName: isTaskExist.managerName,
      projectId: isTaskExist.taskOf,
      employeeId: isTaskExist.assignTo,
      managerId: isTaskExist.managerId,
      taskId: id,
    });

    //return
    return res.status(200).json({
      success: true,
      reportTask,
      message: `Report succeefully send to concern manager ${reportTask.managerName}!`,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Please check the above code!",
    });
  }
};

// get all prevois report   //tested  
export const allReport = async (req, res) => {
  // fetch employeeId
  const { id } = req.params;
  
  console.log(id)

  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is invalid or null",
      }); 
    }

    const allReport = await ReportTask.find({ employeeId: id })
    if (!allReport) {
      return res.status(400).json({
        success: false,
        message: "No report found!",
      });
    }

    return res.status(200).json({
      success: true,
      allReport,
      message: "All report fetched successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Please check the above code!",
    });
  }
};

// get all task report on specific project  //tested  
export const allTaskReport = async (req, res) => {
  // fetch employeeId
  const { id } = req.params;
  
  console.log(id)

  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is invalid or null",
      }); 
    }

    const allTaskReport = await ReportTask.find({ projectId: id })
    if (!allTaskReport) {
      return res.status(400).json({
        success: false,
        message: "No report found!",
      });
    }

    return res.status(200).json({
      success: true,
      allTaskReport,
      message: "All report fetched successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Please check the above code!",
    });
  }
};

//update report details   //tested
export const updateReport = async (req, res) => {
  // fetch report id
  const { id } = req.params;

  //fetch details from req.body
  const { reportTitle, reportDescription } = req.body;

  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id invalid or null",
      });
    }

    // check report
    const isReportExist = await ReportTask.findById(id);
    if (!isReportExist) {
      return res.status(400).json({
        success: false,
        message: "Report not found",
      });
    }

    // save the new value
    isReportExist.reportTitle = reportTitle;
    isReportExist.reportDescription = reportDescription;

    const updateReport = await isReportExist.save();
    return res.status(200).json({
      success: false,
      updateReport,
      message: "Report updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please check the above code!",
    });
  }
};

//delete report details   //tested
export const deleteReport = async (req, res) => {
  // fetch report id
  const { id } = req.params;

  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id invalid or null",
      });
    }

    const deleteReport = await ReportTask.deleteOne({ _id: id });

    return res.status(200).json({
      success: true,
      deleteReport,
      message: "Report deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please check the above code!",
    });
  }
};
