import { LeaveDetailSchema } from "../model/leaveDetails.js";

// /employess apply for leave first time
export const applyLeave = async (req, res) => {
  try {
    const { LeaveType, ToDate, FromDate, Reason, totalDaysofLeave } = req.body;
    console.log(req.body);
    // data validation
    if (!LeaveType || !ToDate || !FromDate || !Reason || !totalDaysofLeave) {
      return res.status(404).json({
        success: false,
        message: "All field are requried ",
      });
    }

    const { name, employeeId } = req.user;

    if (!name || !employeeId) {
      return res.status(402).json({
        success: false,
        message: "user not found",
      });
    }

    console.log(name, employeeId);

    // use fonded , create entry on DB for leave
    const leaveApply = await LeaveDetailSchema.create({
      leaveType: LeaveType,
      toDate: ToDate,
      fromDate: FromDate,
      reason: Reason,
      name,
      employeeId,
      isAccepted: false,
      totalDaysofLeave:totalDaysofLeave,
    });
    return res.status(200).json({
      success: true,
      leaveApply,
      message: "Leave application send successfuly to manager",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

// sending req to the manager //get all application
export const leaveApplicstionRequest = async (req, res) => {
  try {
    const LeaveapplyData = await LeaveDetailSchema.find({});

    return res.status(200).json({
      success: true,
      LeaveapplyData,
      message: "data get Successfully from DB",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "data not comming from DB",
    });
  }
};

//accepted or rejected application controller
export const accepetedLeaveApplication = async (req, res) => {
  const { id } = req.params;
  // /authentication of code
  try {
    const { leaveRemark, isAccepted, isRejected } = req.body;
    console.log(req.body);

    // if(isAccepted == true ) {
    //   return res.status(404).json({
    //     success:true,
    //     message:"Application already Accepted"
    //   })
    // }
    // if(isRejected == true){
    //   return res.status(404).json({

    //   })
    // }

    // if (isAccepted == false && isRejected == false ) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Application Pending",
    //   });
    // }

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "application Id will not be null ",
      });
    }

    console.log(id);
    const foundApplication = await LeaveDetailSchema.findById(id);
    if (!foundApplication) {
      return res.status(404).json({
        success: false,
        message: "Application  not found in our database",
      });
    }
    console.log("working");

    // for update db
    foundApplication.isAccepted = isAccepted;
    foundApplication.remarks = leaveRemark;
    // foundApplication.isRejected = isRejected

    const update = await foundApplication.save();

    return res.status(200).json({
      success: true,
      update,
      message: "Application accepted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// reject Application

export const rejectedLeaveApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { isRejected, isAccepted, leaveRemark } = req.body;

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Application Id cannot be null",
      });
    }

    if (isAccepted == false && isRejected == true) {
      return res.status(404).json({
        success: true,
        message: "Application already Rejected",
      });
    }
    if (leaveRemark !== null ) {
      return res.status(404).json({
        success: false,
        message: "Depict the Reason",
      });
    }

    if (isAccepted == true) {
      return res.status(404).json({
        
        success: true,
        message: "Application already Accepted",
        
      });
    }

      const leaveFounded = await LeaveDetailSchema.findById(id);
      
      if (!leaveFounded) {
        return res.status(404).json({
          success: false,
          message: "Application not found in our database",
        });
      }
      console.log("inside reject leave ");

    leaveFounded.isRejected = isRejected;


    // leaveFounded.isAccepted = isAccepted;
    leaveFounded.remarks = leaveRemark;

    const saved = await leaveFounded.save();

    return res.status(200).json({
      success: true,
      saved,
      message: "Application Rejected",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
