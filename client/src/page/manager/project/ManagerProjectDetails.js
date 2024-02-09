import React from "react";
import ProjectDetails from "../../../component/project/ProjectDetails";


const ManagerProjectDetails = () => {

  //recieve projectId from localStorage
  const projectId = localStorage.getItem("projectId");

  

  return (
    <div>
      <ProjectDetails projectId={projectId} />
    </div>
  );
};

export default ManagerProjectDetails;
