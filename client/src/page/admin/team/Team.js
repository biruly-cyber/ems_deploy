import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../App";
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Team = () => {
  const [projects, setProjects] = useState([]);
  const [activeTeamTab, setActiveTeamTab] = useState("Our Teams");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [allMembers, setAllMember] = useState([]);
  const [allManager, setAllManager] = useState([]);

  const [teamDescription, setTeamDescription] = useState();
  let [teamName, setTeamName] = useState();
  const [adminProfile, setAdminProfile] = useState("");

  const [allTeam, setAllTeam] = useState([]);

  const [filteredTeam, setFilteredTeam] = useState([]);
  const [flterDeleteTeam, setFilterDeleteTeam] = useState([]);

  // const [selectedUpdatedMembers, setSelectedUpdatedMembers] = useState();

  // Update team Model open and close useState
  const [showUpdateTeamModel, setShowUpdateTeamModel] = useState(false);

  // sure delete team f
  const [showSureDeleteModel, setShowSureDeleteModel] = useState(false);

  // geting all Teams Data useEffect
  useEffect(() => {
    const TData = async () => {
      try {
        const allTeamsData = await axios.get(`${server}/team/allTeams`, {
          withCredentials: true,
        });

        // console.log("all teams data is here",allTeamsData.data.allTeamsData);
        setAllTeam(allTeamsData.data.allTeamsData);
        setTeamName(filteredTeam[0].teamName);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    TData();
  }, [loading, loadingTwo]);
  // console.log("all team data",allTeam);

  // update btn click handler
  const handleUpdatebtn = (id) => {
    setShowUpdateTeamModel(true);
    setFilteredTeam(allTeam.filter((team) => team._id === id));
  };

  const handleDeletebtn = (id) => {
    setShowSureDeleteModel(true);

    setFilterDeleteTeam(allTeam.filter((team) => team._id === id));
  };

  // deleting the team by admin
  const handleDeleteTeam = async (id) => {
    // toast(id)

    try {
      const response = await axios.delete(`${server}/team/deleteTeam/${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success === true) {
        toast.success("delete successful");
        setLoading(true);
      }
      setShowSureDeleteModel(false);
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  // handle closing updateModel
  const handleCloseModal = () => {
    setShowUpdateTeamModel(false);
    setShowSureDeleteModel(false);
  };

  // handle memeber change
  const handleMembersChange = (selectedOptions) => {
    setSelectedMembers(selectedOptions);
  };

  //get profile of admin
  useEffect(() => {
    const myProfile = async () => {
      const response = await axios.get(`${server}/users/me`, {
        withCredentials: true,
      });

      setAdminProfile(response.data.user._id);
    };

    //invoke
    myProfile();
  }, []);

  // all new create team post req
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!teamName) {
      alert("Team name is Required");
    }

    if (selectedManager === "") {
      alert("Please select Manager")
      return
    }

    if (selectedProject === undefined) {
      selectedProject = null;
    }

    console.log(
      teamName,
      teamDescription,
      adminProfile,
      selectedManager,
      selectedProject,
      selectedMembers
    );

    try {
      // Send the form data to the backend API

      const response = await axios.post(
        `${server}/team/CreateNewTeam`,
        {
          teamName,
          teamDescription,
          adminProfile,
          selectedManager,
          selectedProject,
          selectedMembers,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // Handle the response as needed
      console.log("Server response:", response.data);

      const { success } = response.data;

      if (success) {
        // alert(message)
        toast.success("Team Create Successfully");
        setTeamName("");
        setTeamDescription("");
        setSelectedManager("");
        setSelectedMembers([]);
        setSelectedProject("");
        setLoadingTwo(true);
      }

      // Clear the form after successful submission
    } catch (error) {
      console.error("Error sending form data:", error);
      // Handle error if necessary
    }
  };

  // all Update team put req
  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();

    if (teamName === undefined || teamName === null) {
      teamName = filteredTeam[0].teamName;
    }

    try {
      // Send the form data to the backend API

      const response = await axios.put(
        `${server}/team/updateTeam/${id}`,
        {
          teamName,
          teamDescription,
          adminProfile,
          selectedManager,
          selectedProject,
          selectedMembers,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // Handle the response as needed
      console.log("Server response:", response.data);

      const { success, message } = response.data;

      if (success) {
        alert(message);
        setLoadingTwo(true);
      }

      // Clear the form after successful submission
    } catch (error) {
      console.error("Error sending form data:", error);
      // Handle error if necessary
    }
    setShowUpdateTeamModel(false);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "2px solid #333",
      borderRadius: "8px",
    }),
    menu: (provided) => ({
      ...provided,
      overflowY: "auto",
      // width: 'full',
      maxHeight: "10rem", // Set the width of the menu
    }),
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      padding: "8px",
      overflow: "hidden",
      // width: '12rem',
      whiteSpace: "nowrap", // Prevent option text from wrapping

      textOverflow: "ellipsis", // Display ellipsis (...) for overflowed text
    }),
  };
  // all prject Get rq
  useEffect(() => {
    const data = async () => {
      try {
        const data = await axios.get(`${server}/project/all`, {
          withCredentials: true,
        });
        // Handle the data from the API response
        // console.log("all project", data.data.allProject);

        setProjects(data.data.allProject);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle the error
      }
    };

    //invocke
    data();
  }, []);
  // all emp get Req
  useEffect(() => {
    let datae = [];
    const data = async () => {
      try {
        const allEmployee = await axios.get(`${server}/employee/all`, {
          withCredentials: true,
        });

        // Handle the data from the API response
        // console.log("all emp data", allEmployee.data.data);

        datae = allEmployee.data.data; // Declare datae using 'const' or 'let'

        setAllMember(
          datae.filter((user) => user.designationType === "employee")
        );
        setAllManager(datae.filter((m) => m.designationType === "manager"));
        // console.log("manager bhi filter hoke aa rahe h ", allManager);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle the error
      }
    };

    //invocke
    data();
  }, []);

  // handling the Tab
  const handleTabClick = (tab) => {
    setActiveTeamTab(tab);
  };

  // selected members handle
  const handleUpdatedMembersChange = (selectedUpdatedMember) => {
    console.log(selectedUpdatedMember);

    // console.log(allMembers);

    setSelectedMembers(selectedUpdatedMember);
  };

  // console.log("all team data with selected members ", allTeam);
  // console.log("filter datav", filteredTeam[0].selectedMembers)
  // console.log("he kuchh ki nii ",dataofmember);
  return (
    <div>
      <div className=" flex flex-row shadow-lg">
        <div
          className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
            activeTeamTab === "Our Teams"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("Our Teams")}
        >
          Our Team
        </div>

        <div
          className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
            activeTeamTab === "Create Team"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("Create Team")}
        >
          Create Team
        </div>

        {/* <div
          className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
            activeTeamTab === "Update Team"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("Update Team")}
        >
          Update Team
        </div> */}
      </div>
      {/* All teams  */}
      {activeTeamTab === "Our Teams" && (
        <div className="mt-4">
          {activeTeamTab === "Our Teams" && (
            <div>
              <h2 className="text-lg font-bold mb-2">All Teams</h2>
              <div className="container mx-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">S.No</th>
                      <th className="py-2 px-4 border-b">Team Name</th>
                      <th className="py-2 px-4 border-b">Team Manager</th>
                      <th className="py-2 px-4 border-b">Project</th>
                      <th className="py-2 px-4 border-b">Members</th>
                      <th className="py-2 px-4 border-b">Update Team</th>
                      <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTeam.map((emp, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2  border-r-2 text-center font-bold">
                          {index + 1}
                        </td>
                        <td className=" border-r-2 text-center">
                          {emp?.teamName}
                        </td>
                        <td className="py-2  border-r-2 text-center">
                          {emp.selectedManager?.employeeName === ""
                            ? "empty"
                            : emp.selectedManager?.employeeName}
                        </td>

                        <td className="py-2 border-r-2 text-center">
                          {emp.selectedProject?.projectName}
                        </td>
                        <td className="py-2 mx-auto flex justify-center">
                          {emp.selectedMembers.map((member, memberIndex) => (
                            <td className="justify-center" key={memberIndex}>
                              <div className="px-3 rounded-sm mr-2 font-semibold border-black">
                                {member.employeeName}
                              </div>
                            </td>
                          ))}
                        </td>
                        <td
                          className=" cursor-pointer py-2 text-center hover:font-extrabold bg-slate-500 hover:bg-sky-800 text-xl "
                          onClick={() => handleUpdatebtn(emp._id)}
                        >
                          Click
                        </td>

                        <td
                          className=" cursor-pointer py-2 text-center hover:font-extrabold bg-red-600 hover:bg-red-800 text-xl "
                          onClick={() => handleDeletebtn(emp._id)}
                        >
                          Delete
                        </td>
                      </tr>
                    ))}
                    <ToastContainer />
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Create team */}
      {activeTeamTab === "Create Team" && (
        <div className="mt-4">
          {activeTeamTab === "Create Team" && (
            <div>
              <div className="container mx-auto w-[70%] h-[100vh]">
                <div>
                  <div>
                    <div>
                      <input
                        className=" mt-2 w-full border-solid border-blue-500
                            border-opacity-100 border-2
                            rounded-md p-2"
                        type="text"
                        value={teamName}
                        required
                        name="teamName"
                        placeholder=" Enter team Name"
                        onChange={(e) => setTeamName(e.target.value)}
                      />
                    </div>

                    <div>
                      <textarea
                        className=" resize-none mt-2 w-full h-[5rem] border-solid border-blue-500
                            border-opacity-100 border-2
                            rounded-md p-2"
                        type="text"
                        value={teamDescription}
                        name="teamDescription"
                        placeholder=" Enter team Description"
                        onChange={(e) => setTeamDescription(e.target.value)}
                      />
                    </div>

                    <div className=" flex flex-row justify-between ">
                      <select
                        value={selectedManager}
                        onChange={(e) => setSelectedManager(e.target.value)}
                        className="p-4  font-semibold border-2 border-blue-500 rounded-md "
                      >
                        <option className="font-semibold w-[15rem]" value="">
                          Select Manager
                        </option>
                        {allManager.map((manager) => (
                          <option key={manager._id} value={manager._id}>
                            {manager.employeeName}
                          </option>
                        ))}
                      </select>
                      {/* <div className="bg-slate-900 py-4 px-2 text-white rounded-md">
                          Assign Project to team
                        </div> */}

                      <select
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        className="p-4  font-semibold border-2 border-blue-500 rounded-md"
                      >
                        <option className="font-semibold w-[15rem]  " value="">
                          Select a project
                        </option>
                        {projects.map((project) => (
                          <option key={project.id} value={project._id}>
                            {project.projectName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <div>
                        <div>
                          <div className=" w-[15rem]  bg-slate-900 mt-2 p-2 text-white rounded-md">
                            Add Team Member <span>(optional)</span>
                          </div>

                          <div className="mt-4  flex flex-row justify-between">
                            <div className="w-full mx-auto">
                              <Select
                                // value={selectedMembers}
                                onChange={handleMembersChange}
                                isMulti
                                options={allMembers}
                                getOptionLabel={(option) => option.employeeName}
                                getOptionValue={(option) => option._id}
                                styles={customStyles}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-500 font-semibold text-xl py-2 mt-[12rem] rounded-lg justify-center mx-auto w-[12rem] flex flex-row">
                    <button onClick={(e) => handleFormSubmit(e)}>
                      Create Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <ToastContainer />
        </div>
      )}

      {/* Showing update team Model  */}
      {showUpdateTeamModel && (
        <div className="z-10 inset-0 fixed   overflow-y-auto">
          <div className="flex items-center justify-center  min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="relative bg-white rounded-lg p-2 w-[800px]  mx-auto">
              <div className="flex  justify-between">
                <div>
                  <h1 className="ml-40 uppercase font-bold text-xl">
                    update {"   "} {filteredTeam[0].teamName}
                  </h1>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCloseModal}
                >
                  X
                </button>
              </div>
              <div>
                <div>
                  {/* team Name  */}
                  <div className="m-8">
                    <span className="font-bold text-xl ">Team Name : </span>
                    <input
                      className="bg-sky-100 w-full h-[2.5rem] p-2 rounded-md font-semibold bottom-2 "
                      type="text"
                      placeholder="Enter New Name"
                      defaultValue={filteredTeam[0].teamName}
                      value={
                        teamName === " " ? filteredTeam[0].teamName : teamName
                      }
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  {/* team Description */}
                  <div className="mr-8 ml-8">
                    <span className="font-bold text-xl ">
                      Team Description :{" "}
                    </span>
                    <input
                      className="bg-sky-100 w-full h-[2.5rem] p-2 rounded-md font-semibold bottom-2 "
                      type="text"
                      placeholder="Enter New Description"
                      defaultValue={filteredTeam[0].teamDescription}
                      value={
                        teamDescription === ""
                          ? filteredTeam[0].teamDescription
                          : teamDescription
                      }
                      onChange={(e) => setTeamDescription(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-row ml-9 mr-9 justify-between">
                  {/* current team Manager */}
                  <div className="flex flex-col">
                    <div className="font-bold text-xl">
                      {" "}
                      <span> Curret Team Manager : </span>
                      {filteredTeam[0].selectedManager?.employeeName === ""
                        ? "Empty"
                        : filteredTeam[0].selectedManager?.employeeName}
                    </div>

                    <select
                      value={selectedManager}
                      onChange={(e) => setSelectedManager(e.target.value)}
                      className="p-4  font-semibold border-2 border-blue-500 rounded-md "
                    >
                      <option className="font-semibold w-[15rem]   " value="">
                        Change Manager
                      </option>
                      {allManager.map((manager) => (
                        <option key={manager._id} value={manager._id}>
                          {manager.employeeName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Current project */}
                  <div className="flex flex-col ">
                    {" "}
                    <div className="font-bold text-xl">
                      <span> Curret Project : </span>
                      {filteredTeam[0].selectedProject?.projectName === ""
                        ? "No Selected Project"
                        : filteredTeam[0].selectedProject?.projectName}
                    </div>
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="p-4  font-semibold border-2 border-blue-500 rounded-md"
                    >
                      <option className="font-semibold w-[15rem]  " value="">
                        Change Project
                      </option>
                      {projects.map((project) => (
                        <option key={project.id} value={project._id}>
                          {project.projectName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Team Members */}
                <div className="flex flex-col m-9">
                  <div>
                    <div>
                      <div className=" w-[15rem]  bg-slate-900  p-2 text-white rounded-md">
                        Add Team Member <span>(optional)</span>
                      </div>

                      <div className="mt-4  flex flex-row justify-between">
                        <div className="w-full mx-auto">
                          <Select
                            value={selectedMembers}
                            defaultValue={filteredTeam[0].selectedMembers}
                            onChange={handleUpdatedMembersChange}
                            isMulti
                            options={allMembers}
                            getOptionLabel={(option) => option.employeeName}
                            getOptionValue={(option) => option._id}
                            styles={customStyles}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-blue-500 font-semibold text-xl py-2 mt-[12rem] rounded-lg justify-center mx-auto w-[12rem] flex flex-row">
                    <button
                      onClick={(e) =>
                        handleUpdateSubmit(e, filteredTeam[0]._id)
                      }
                    >
                      Update Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Showing Sure  team Model  */}
      {showSureDeleteModel && (
        <div className="z-10 inset-0 fixed   overflow-y-auto">
          <div className="flex items-center justify-center  min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="relative bg-white rounded-lg p-2 w-[20rem] h-[20rem]  mx-auto">
              <div className="flex flex-col p-10  text-center justify-between">
                <div className=" mt-4 text-2xl font-extrabold">
                  {" "}
                  Are your sure want to delete team ?{" "}
                  {flterDeleteTeam[0].teamName}
                </div>
                <div className=" mt-4  flex flex-row mx-auto  gap-12 justify-between">
                  <button
                    className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={(e) => handleDeleteTeam(flterDeleteTeam[0]._id)}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleCloseModal}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
