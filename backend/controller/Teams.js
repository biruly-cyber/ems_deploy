import { Project } from "../model/project.js";
import { Teams } from "../model/team_model.js";



// controller for creating New Team 
export const teamDetail = async (req, res) => {
  try {
    // console.log(req.body);
    const { teamName, teamDescription,selectedMembers, adminProfile, selectedManager, selectedProject } = req.body;

    // console.log("Data aa raha h ",req.body);
    // console.log("admin ki id ", adminProfile);
   
    if (!teamName ) {
      return res.status(404).json({
        success: false,
        message: "Team Name is  mandatory for Creating team ",
      });
    }

   






    const createdTeam = await Teams.create({
      teamName,
      teamDescription,
      adminProfile,
      selectedMembers,
      selectedManager : selectedManager === "" ? null: selectedManager,
      selectedProject : selectedProject === "" ? null: selectedProject
    });

    return res.status(200).json({
      success: true,
      createdTeam,
      message: "team created successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error , Enter into catch block",
    });
  }
};


// get all Teams 
export const allTeams = async (req, res) => {
  try {
   

      // get all team from the collection
      const allTeamsData  = await Teams.find().populate('selectedManager  selectedProject selectedMembers').exec();
      // console.log("data form DB all teams ",allTeamsData);
   

      if (!allTeamsData) {
        return res.status(400).json({
          success: false,
          message: "Team not created yet!",
        });
      }

      return res.status(200).json({
        success: true,
        allTeamsData,
        message: "All Team fetched successfully!",
      });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};


// update the all team in Db 
export const updateTeam = async (req,res) => {
  const {id} = req.params
  // console.log("all data of",req.body);
  const {teamName, teamDescription, selectedManager, selectedProject, selectedMembers} =  req.body
  
  try {
    if(!id) {
      return res.status(404).json({
        success:false,
        message:"Invalid Team id "
      })
    }
    if(!teamName) {
      return res.status(404).json({
        success:false,
        message:"Invalid TeamName "
      })
    }
    
    const updateTeam  = await Teams.findById(id) 
    if (!updateTeam){
      return res.status(404).json({success:false,message:"team not exist in DataBase"})
    }
   
  
    updateTeam.teamName = teamName
    updateTeam.teamDescription = teamDescription
    updateTeam.selectedManager = selectedManager === "" ? null :selectedManager
    updateTeam.selectedMembers = selectedMembers
    updateTeam.selectedProject = selectedProject === "" ? null : selectedProject
    await updateTeam.save()  



    // console.log("working",typeof(id))
    const foundProject = await Project.findOne({ teamId: id });

if (!foundProject) {
   return res.status(400).json({
    success:false,
    message:"managerId not found in Project"
   })
} else {
  // console.log("Found project:", foundProject);

  // Assuming selectedManager is an ObjectId
  foundProject.managerId = selectedManager;

  try {
    const updatedProject = await foundProject.save();
    // console.log("Updated project:", updatedProject);
  } catch (error) {
    console.error("Error saving project:", error);
  }
}


  

return res.status(200).json({
  success:true,
  message:"Team details updated Successfully "
})
  }catch(error){
    return res.status(500).json({
      success: false,
      message: "Internal server error! Updation of team not possible",
    });

  }
}

// delete Team the all team in Db 
export const deleteTeam = async (req,res) => {
  
   const {id} = req.params
  try {
    // const id = req.body;
     

     const deleteTeamData = await Teams.deleteOne({_id :id })
      return res.status(200).json({
        success:true,
        message:"Team delete successful",
        deleteTeamData
      })

  }catch(error){
    return res.status(500).json({
      success: false,
      message: "Internal server error! Updation of team not possible",
    });

  }
}