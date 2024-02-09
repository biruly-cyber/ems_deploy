import { Project } from "../model/project.js";
import { User } from "../model/user.js";
import { ReportProject } from "../model/reportProject.js";

// new report
export const reportProject = async (req, res) => {
  // fetch id from params
  //   const { id } = req.params;

  // fetch details from req  body
  const {
    reportTitle,
    reportDescription,
    isProjectCompleted,
    projectId,
    managerId,
    adminId,
  } = req.body;

  try {
    // validation
    // if (!id) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "ID is invalid or null",
    //     });
    // }

    if (
      !reportTitle ||
      !reportDescription ||
      !projectId ||
      !managerId ||
      !adminId
    ) {
      return res.status(400).json({
        success: false,
        message: "All field are required!",
      });
    }

    //chekc project availbale or not
    const foundProject = await Project.findById(projectId);
    if (!foundProject) {
      return res.status(400).json({
        success: false,
        message: "project not found",
      });
    }

    // check check admin id
    const foundAdmin = await User.findById(adminId);
    if (!foundAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin not found!",
      });
    }

    //  if enverthis is correct then create the report entry for project on db

    const reportProject = await ReportProject.create({
      reportTitle,
      reportDescription,
      isProjectCompleted,
      managerName: req.user.name,
      projectName: foundProject.projectName,
      managerId,
      adminId,
      projectId,
    });

    //check if project is completed
    // update the project
    if (isProjectCompleted) {
      foundProject.isCompleted = isProjectCompleted;
      await foundProject.save();
    }

    return res.status(200).json({
      success: true,
      reportProject,
      message: `report send successfully to the ${req.user.name}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "check above the code!",
    });
  }
};

//get all the report of specific project

export const allReportOfSpecificProject = async (req, res) => {
  //fetch id from params
  const { id } = req.params;

  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: " Id is invalid or null!",
      });
    }

    //fetch previous and latest project report

    const allReportOfProject = await ReportProject.find({ managerId: id }).sort(
      { createdAt: 1 }
    );

    return res.status(200).json({
      success: true,
      allReportOfProject,
      message: "all report fetched successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//modify own reports
export const updateProjectReport = async (req, res) => {
  //fetch report id
  const { id } = req.params;

  // fetch all the detail for modification
  const { reportTitle, reportDescription, isProjectCompleted } = req.body;

  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: " Id is invalid or null!",
      });
    }

    // update the details
    const fetchedReport = await ReportProject.findById(id);

    console.log(fetchedReport);

    fetchedReport.reportTitle = reportTitle;
    fetchedReport.reportDescription = reportDescription;
    fetchedReport.isProjectCompleted = isProjectCompleted;

    const modifiedDetails = await fetchedReport.save();

    return res.status(200).json({
      success: true,
      modifiedDetails,
      message: "Report details update successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please check the above of your code!",
    });
  }
};

//delete the project report
export const deleteReport = async (req, res) => {
  //fetch id from params
  const { id } = req.params;

  try {
    //validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is invalid or null",
      });
    }

    //delete report
    const deleteReport = await ReportProject.deleteOne({ _id: id });

    return res.status(200).json({
      success: true,
      deleteReport,
      message: " Report deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

// //get all project report for admin

export const allReport = async (req, res) => {
  try {
    // validation
    //fetch previous and latest project report

    const allReportOfProject = await ReportProject.find({}).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      allReportOfProject,
      message: "all report fetched successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
