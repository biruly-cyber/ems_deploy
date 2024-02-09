import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../../App";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);

  

  const [allTeam, setAllTeam] = useState([])
 


  const [formData, setFormData] = useState({
    projectName: "",
    projectStartDate: "",
    projectEndDate: "",
    priority: "",
    description: "",
    websiteUrl: "",
    teamId : "",
    isCompleted: false,
    isScrap: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log("Form submitted:", formData);
    const {
      projectName,
      projectStartDate,
      projectEndDate,
      priority,
      teamId,
      description,
      websiteUrl,
    } = formData;

    //request to the server
    if(!teamId) {
      alert("team not created pls first create team")
      navigate("../newTeam")
      return
    }
    const response = await axios.post(
      `${server}/project/new`,
      {
        projectName,
        projectStartDate,
        projectEndDate,
        priority,
        description,
        teamId,
        websiteUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(response);
    const { success, message } = response.data;
    if (success) {
      alert(message);
      navigate("../allProject");
    }
  };
  // all the teams data 
  useEffect(() => {
    const TeamData = async () => {
      try {
        const allTeamsData = await axios.get(`${server}/team/allTeams`, {
          withCredentials: true,
        });
        
        // console.log("all teams data is here",allTeamsData.data.allTeamsData);
        setAllTeam(allTeamsData.data.allTeamsData.filter((team) =>  team.selectedProject === null));

       
      
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    
    TeamData();
  }, [handleSubmit]);
  
 
  //fetch all the details of employee
  useEffect(() => {
    const data = async () => {
      try {
        const allEmployee = await axios.get(`${server}/employee/all`, {
          withCredentials: true,
        });
        // Handle the data from the API response
        setEmployeeData(allEmployee.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle the error
      }
    };

    //invocke
    data();
  }, []);



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


 
  // console.log(filterTeam);

  //set item name handle
 
  const handleOnTeamId = (e) => {
    
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    // console.log(formData.teamId)
  }

  return (
    <>
      {/* form for new project  */}
      <div className="container  w-[75rem] mx-auto flex flex-col ">
        <form
          onSubmit={handleSubmit}
          className=" mx-auto w-full bg-white p-4 rounded shadow-md"
        >
          <h2 className="text-2xl flex justify-center font-bold">
            Project Information
          </h2>

          {/* Add more input fields as needed */}

          {/* project information */}
          <div className="mb-4 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectName"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="border border-black rounded-lg  p-2 w-full"
              required
            />
          </div>

          {/* stating and submition date */}
          <div className=" flex flex-row flex-wrap gap-5 justify-between">
            <div className="mb-4">
              <label
                className=" text-gray-700 text-sm font-bold mb-2"
                htmlFor="projectStartDate"
              >
                Start Date
              </label>
              <input
                type="date"
                id="projectStartDate"
                name="projectStartDate"
                value={formData.projectStartDate}
                onChange={handleChange}
                className="border border-black rounded-lg p-2 w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="  text-gray-700 text-sm font-bold mb-2"
                htmlFor="projectStartDate"
              >
                Submission Date
              </label>
              <input
                type="date"
                id="projectEndDate"
                name="projectEndDate"
                value={formData.projectEndDate}
                onChange={handleChange}
                className="border border-black rounded-lg p-2 w-full"
                required
              />
            </div>
          </div>

          {/* priority and manager name  */}
          <div className=" flex flex-row flex-wrap gap-5 justify-between">
            <div className="mb-4">
              <label
                className=" text-gray-700 text-sm font-bold mb-2"
                htmlFor="priority"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="border border-black rounded-lg p-2 w-full"
                required
              >
                <option value="" disabled>
                  Select Priority
                </option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="mb-4 flex flex-col ">
              <label
                className=" text-gray-700 text-sm font-bold mb-1"
              
              >
                Team Name
              </label>

              <select
              id="teamId"
              name="teamId"
              value={formData.teamId}
               onChange={handleOnTeamId}
               
                className="p-2 w-[12rem]  border border-black rounded-md"
              >
                <option className=" w-[15rem]  " value=""> Select Team
              
                </option>
                {allTeam.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.teamName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectStartDate"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-black rounded-lg p-2 w-full"
              required
            />
          </div>

          {/* website Urls */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectStartDate"
            >
              Website URL(Optional)
            </label>
            <input
              type="text"
              id="websiteUrl"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              className="border border-black rounded-lg p-2 w-full"
              // required
            />
          </div>

          {/* Add more input fields for other project information */}

          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="isCompleted"
            >
              Is Completed
            </label>
            <input
              type="checkbox"
              id="isCompleted"
              name="isCompleted"
              checked={formData.isCompleted}
              onChange={handleChange}
              className="mr-2"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="isScrap"
            >
              Is Scrap
            </label>
            <input
              type="checkbox"
              id="isScrap"
              name="isScrap"
              checked={formData.isScrap}
              onChange={handleChange}
              className="mr-2"
            />
          </div> */}

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewProject;
