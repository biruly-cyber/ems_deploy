import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../App";
import Titlebar from "../../../component/utilities-components/Titlebar";
import { Link, useNavigate } from "react-router-dom";

const ManagerProject = () => {
  const navigate = useNavigate();
  const initialFormData = {
    reportTitle: "",
    reportDescription: "",
    isProjectCompleted: false,
    projectId: "",
    managerId: "",
    adminId: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [formTaskData, setFormTaskData] = useState({
    taskTitle: "",
    taskDescription: "",
    assignTo: "",
    taskOf: "",
    taskAssignDate: "",
    taskEndDate: "",
    isTaskCompleted: false,
  });

  const [employeeData, setEmployeeData] = useState([]);
  // const [allProject, setAllProject] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [profile, setProfile] = useState({});

  const [allProject, setAllProject] = useState([]);
  const [allProjectForSearch, setAllProjectForSearch] = useState([]);
  const [teamInfoData, setTeamInfoData] = useState([]);

  const [selectedProject, setSelectedProject] = useState({});

  // geting all the details of team
  useEffect(() => {
    const teamData = async () => {
      try {
        const team = await axios.get(`${server}/team/allTeams`, {
          withCredentials: true,
        });
        console.log("team ka data aa raha h kya", team.data.allTeamsData);
        setTeamInfoData(team.data.allTeamsData);
      } catch (error) {
        console.log("error to geting all the team data from data");
      }
    };
    teamData();
  }, []);

  //fetch all the details of project
  useEffect(() => {
    const data = async () => {
      try {
        const data = await axios.get(`${server}/project/all`, {
          withCredentials: true,
        });
        // Handle the data from the API response
        setAllProject(data.data.allProject);

        setAllProjectForSearch(data.data.allProject);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle the error
      }
    };

    //invocke
    data();
  }, []);

  
  // console.log(" All project data arha h",  profile.employeeId);


  // handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase(); // Get the trimmed lowercase search term

    if (searchTerm === " ") {
      setAllProject(allProject); // If the search term is empty, show the entire original array
    } else {
      // Filter the array based on the search term
      const tempVar = allProjectForSearch?.filter((item) =>
        item.projectName?.trim().toLowerCase().includes(searchTerm)
      );
      setAllProject(tempVar); // Update the array state with the filtered results
    }
  };

  //profile data
  useEffect(() => {
    const myProfile = async () => {
      try {
        const response = await axios.get(`${server}/users/me`, {
          withCredentials: true,
        });

        setProfile(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    myProfile();
  }, []);
  // console.log(profile.employeeId);

  // handle for report button
  const handleReportClick = (project) => {
    setIsModalOpen(true);

    // set values in a single call
    setFormData({
      ...formData,
      managerId: project.managerId,
      adminId: project.adminId,
      projectId: project._id,
      reportTitle: project.projectName,
    });

    // set project
    setSelectedProject(project);
  };

  // control for show the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsNewTaskModalOpen(false);
  };

  // handle for the change in value
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle for submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., send data to server
    // console.log("Form submitted with data:", formData);
    // You can add additional logic here, such as API calls to submit the data.
    const {
      reportTitle,
      reportDescription,
      isProjectCompleted,
      projectId,
      managerId,
      adminId,
    } = formData;

    try {
      const response = await axios.post(
        `${server}/reportProject/new`,
        {
          reportTitle,
          reportDescription,
          isProjectCompleted,
          projectId,
          managerId,
          adminId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log(response.data.reportProject.managerId)
      //when success
      const { success, message } = response.data;
      // console.log(message)
      localStorage.setItem("id", response.data.reportProject.managerId);
      setIsModalOpen(false);
      if (success) {
        setFormData(initialFormData);
        alert(message);
        navigate("../managerreport");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  //handle for assign task to user
  const handleAssignTask = (project) => {
    setIsNewTaskModalOpen(true);

    setFormTaskData((prevData) => ({
      ...prevData,
      taskOf: project.projectName,
    }));

    // navigate("../task");
  };

  // all employees data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEmployee = await axios.get(`${server}/employee/all`, {
          withCredentials: true,
        });
        setEmployeeData(allEmployee.data.data);

        // console.log( "emp list h ",employeeData)
      } catch (error) {
        console.error("Error fetching employee data:", error.message);
      }
    };

    fetchData();
  }, [setEmployeeData]);

  // project
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const projectData = await axios.get(`${server}/project/all`, {
  //         withCredentials: true,
  //       });
  //       setAllProject(projectData.data.allProject);
  //       // console.log(projectData)
  //     } catch (error) {
  //       console.error("Error fetching project data:", error.message);
  //       alert(error.message);
  //     }
  //   };

  //   fetchData();
  // }, [setAllProject]);

  //handle for change
  const handleOnTaskChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormTaskData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //handle for submit
  const handleOnTaskSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here, for example, send the formData to the server
    const {
      taskTitle,
      taskDescription,
      taskAssignDate,
      taskEndDate,
      taskOf,
      assignTo,
    } = formTaskData;

    try {
      const response = await axios.post(
        `${server}/task/new`,
        {
          taskTitle,
          taskDescription,
          taskAssignDate,
          taskEndDate,
          taskOf,
          assignTo,
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
        setIsNewTaskModalOpen(false);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  //hnadle for show mare
  const handleOnShowMore = (projectId) => {
    localStorage.setItem("projectId", projectId);

    navigate("../projectdetails");
  };

  console.log(allProject);

  const empData = employeeData.filter(
    (singleUser) => singleUser.designationType === "employee"
  );
  // console.log(empData);
  const tempData = [...empData];
  console.log("temp data", tempData);

  return (
    <>
      <div className="flex justify-between">
        <div>
          <Titlebar title={"Project Details"} />
        </div>
        <div>
          {/* handle search  */}
          <div className="w-96 flex items-center border border-green-300 rounded-md p-1 mx-1">
            <span className="text-xl mx-1"></span>
            <input
              type="text"
              onChange={(e) => handleSearch(e)}
              placeholder="Search employee name..."
              className="w-96 p-2 rounded-lg outline-none"
            />
          </div>
          {/* end handle search  */}
        </div>
      </div>
      {allProject.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full table-auto">
            <thead className="bg-slate-400">
              <tr>
                <th className="border px-4 py-2">S.No</th>
                <th className="border px-4 py-2">Project Name</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">Submission Date</th>
                <th className="border px-4 py-2">Team Name</th>

                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Assign Task</th>
                <th className="border px-4 py-2">Action</th>
                <th className="border px-4 py-2">Details</th>
                {/* <th className="border px-4 py-2">Team</th> */}

                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {allProject
                .filter(
                  (assignProject) =>
                    assignProject.managerId === profile.employeeId
                )
                .map((project, index) => (
                  <tr key={project._id} className="text-center">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{project.projectName}</td>
                    <td className="border px-4 py-2">
                      {project.projectStartDate}
                    </td>
                    <td className="border px-4 py-2">
                      {project.projectEndDate}
                    </td>
                    <td className="border px-4 py-2">
                      {teamInfoData
                        .filter((team) => team._id === project.teamId)
                        .map((filteredTeam) => (
                          <div key={filteredTeam._id}>
                            {filteredTeam.teamName}
                          </div>
                        ))}
                    </td>
                    <td className="border px-4 py-2">
                      {project.isCompleted ? (
                        <span className="text-green-800">Completed</span>
                      ) : (
                        <span className="text-red-800">Not Completed</span>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {project.isCompleted ? (
                        <button
                          disabled
                          className="mx-auto bg-red-300 cursor-not-allowed text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleAssignTask(project)}
                        >
                          Assign Task
                        </button>
                      ) : (
                        <button
                          className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleAssignTask(project)}
                        >
                          Assign Task
                        </button>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {project.isCompleted ? (
                        <button
                          disabled
                          className="mx-auto bg-red-300  cursor-not-allowed text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleReportClick(project)}
                        >
                          Report
                        </button>
                      ) : (
                        <button
                          className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleReportClick(project)}
                        >
                          Report
                        </button>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleOnShowMore(project._id)}
                      >
                        View
                      </button>
                    </td>

                    {/* Add more cells as needed */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-5 p-4 bg-slate-200">
          <h1 className="uppercase font-bold">Sorry! Data not available!</h1>
        </div>
      )}

      {/* show modal for report the project  */}

      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="relative bg-white rounded-lg p-6 w-[500px] mx-auto">
              <div className="flex justify-between">
                <div>
                  <h1 className="ml-40 uppercase font-bold text-xl">
                    Report Project
                  </h1>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCloseModal}
                >
                  X
                </button>
              </div>
              {/* Your modal content goes here */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="reportTitle"
                  >
                    Report Title
                  </label>
                  <input
                    type="text"
                    id="reportTitle"
                    name="reportTitle"
                    value={formData.reportTitle}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter report title"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="reportDescription"
                  >
                    Report Description
                  </label>
                  <textarea
                    id="reportDescription"
                    name="reportDescription"
                    value={formData.reportDescription}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter report description"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="isProjectCompleted"
                  >
                    Is Project Completed
                  </label>
                  <input
                    type="checkbox"
                    id="isProjectCompleted"
                    name="isProjectCompleted"
                    checked={formData.isProjectCompleted}
                    onChange={handleChange}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">Check if project is completed</span>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* show model for assign the task  */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="relative bg-white rounded-lg p-6 w-[500px] mx-auto">
              <div className="flex justify-between">
                <div>
                  <h1 className="ml-40 uppercase font-bold text-xl">
                    Assign Task
                  </h1>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCloseModal}
                >
                  X
                </button>
              </div>
              {/* Your modal content goes here */}

              <form
                onSubmit={handleOnTaskSubmit}
                className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md"
              >
                <label className="block mb-2">
                  <span className="text-gray-700">Task Title:</span>
                  <input
                    type="text"
                    name="taskTitle"
                    value={formTaskData.taskTitle}
                    onChange={handleOnTaskChange}
                    className="form-input mt-1 block w-full border"
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-gray-700">Project:</span>
                  <select
                    name="taskOf"
                    value={formTaskData.taskOf}
                    onChange={handleOnTaskChange}
                    className="form-select mt-1 block w-full border"
                  >
                    <option value="" disabled>
                      Select a project
                    </option>
                    {allProject.map((project) => (
                      <option key={project._id} value={project.projectName}>
                        {project.projectName}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block mb-2">
                  <span className="text-gray-700">Task Description:</span>
                  <textarea
                    name="taskDescription"
                    value={formTaskData.taskDescription}
                    onChange={handleOnTaskChange}
                    className="form-input mt-1 block w-full border"
                  />
                </label>

                <label className="block mb-2">
                  <span className="text-gray-700">Assign To:</span>
                  <select
                    name="assignTo"
                    value={formTaskData.assignTo}
                    onChange={handleOnTaskChange}
                    className="form-select mt-1 block w-full border"
                  >
                    <option value="" disabled>
                      Select an employee
                    </option>
                    {employeeData
                      .filter(
                        (employee) => employee.designationType === "employee"
                      )
                      .map((employee) => (
                        <option
                          key={employee.employeeId}
                          value={employee.employeeName}
                        >
                          {employee.employeeName}
                        </option>
                      ))}
                  </select>
                </label>

                <label className="block mb-2">
                  <span className="text-gray-700">Assign Date:</span>
                  <input
                    type="date"
                    name="taskAssignDate"
                    value={formTaskData.taskAssignDate}
                    onChange={handleOnTaskChange}
                    className="form-input mt-1 block w-full border"
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-gray-700">Submission Date:</span>
                  <input
                    type="date"
                    name="taskEndDate"
                    value={formTaskData.taskEndDate}
                    onChange={handleOnTaskChange}
                    className="form-input mt-1 block w-full border"
                  />
                </label>

                <div className="flex items-center justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagerProject;
