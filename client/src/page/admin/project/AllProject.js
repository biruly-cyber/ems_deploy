import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../../App";
import NewProject from "./NewProject";

const AllProject = () => {
  const [allProject, setAllProject] = useState([]);
  const [allProjectForSearch, setAllProjectForSearch] = useState([]);
  const [profile, setProfile] = useState({});
  const [activeTab, setActiveTabTab] = useState("All Project");
  const [teamInfoData, setTeamInfoData] = useState([]);

  //get profile
  useEffect(() => {
    const myProfile = async () => {
      const response = await axios.get(`${server}/users/me`, {
        withCredentials: true,
      });

      setProfile(response.data.user);
      // console.log(response);
    };

    //invoke
    myProfile();
  }, []);

  //fetch all the details of employee
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

  // fetch all the details of Teams
  useEffect(() => {
    const teamData = async () => {
      try {
        const team = await axios.get(`${server}/team/allTeams`, {
          withCredentials: true,
        });
        console.log("team ka data aa raha h kya",team.data.allTeamsData);
        setTeamInfoData(team.data.allTeamsData);
      } catch (error) {
        console.log("error on geting team data form dataBase");
      }
    };

    // funnction call
    teamData();
  },[]);

  const handleTabClick = (tab) => {
    setActiveTabTab(tab);
  };

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
  console.log(allProject);
  return (
    <>
    {/* Admon panel Design  */}
      {profile.designationType === "admin" ? (
        <div>
          {/* Project Tabs */}
          <div className=" flex flex-row shadow-lg">
            <div
              className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
                activeTab === "All Project"
                  ? "border-b-4 border-blue-500 text-blue-500 font-bold"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("All Project")}
            >
              All Project
            </div>
            <div
              className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
                activeTab === "New Project"
                  ? "border-b-4 border-blue-500 text-blue-500 font-bold"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("New Project")}
            >
              New Project
            </div>
          </div>
          {/* All Employees Details Table   */}
          {activeTab === "All Project" && (
            <div className="mt-4">
              {activeTab === "All Project" && (
                <div className="mt-5">
                  <div className="mb-2">
                    {/* handle search  */}
                    <div className="w-96 flex items-center border border-green-300 rounded-md p-1 mx-1">
                      <span className="text-xl mx-1">&#128269;</span>
                      <input
                        type="text"
                        onChange={(e) => handleSearch(e)}
                        placeholder="Search project name..."
                        className="w-96 p-2 rounded-lg outline-none"
                      />
                    </div>
                    {/* end handle search  */}
                  </div>

                  {allProject.length > 0 ? (
                    <div className="overflow-x-auto mt-5">
                      <table className="min-w-full table-auto">
                        <thead className="bg-slate-400">
                          <tr>
                            <th className="border px-4 py-2">S.No</th>
                            <th className="border px-4 py-2">Project Name</th>
                            <th className="border px-4 py-2">
                              Team Name
                            </th>

                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Start Date</th>
                            <th className="border px-4 py-2">
                              Submission Date
                            </th>
                            <th className="border px-4 py-2">Status</th>
                            {/* Add more columns as needed */}
                          </tr>
                        </thead>
                        <tbody>
                          {allProject.map((project, index) => (
                            <tr key={project._id} className="text-center">
                              <td className="border px-4 py-2">{index + 1}</td>
                              <td className="border px-4 py-2">
                                {project.projectName}
                              </td>
                              <td className="border px-4 py-2">
                                {teamInfoData
                                  .filter((team) => team._id === project.teamId)
                                  .map((filteredTeam) => (
                                    <div key={filteredTeam._id}>
                                      {/* Display relevant information from filteredTeam */}
                                      {filteredTeam.teamName}
                                    </div>
                                  ))}
                              </td>
                              <td className="border px-4 py-2">
                                {project.description}
                              </td>
                              <td className="border px-4 py-2">
                                {project.projectStartDate}
                              </td>
                              <td className="border px-4 py-2">
                                {project.projectEndDate}
                              </td>

                              <td className="border px-4 py-2">
                                {project.isCompleted ? (
                                  <span className="text-green-800">
                                    Completed
                                  </span>
                                ) : (
                                  <span className="text-red-800">
                                    Not Completed
                                  </span>
                                )}
                              </td>

                              {/* Add more cells as needed */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center mt-5 p-4 bg-slate-200">
                      <h1 className="uppercase font-bold">
                        Sorry! Data not available!
                      </h1>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {/* Create new Employees Details  */}
          {activeTab === "New Project" && (
            <div className="mt-4">
              {activeTab === "New Project" && <div className="mt-5"></div>}

              <NewProject />
            </div>
          )}
        </div>
      ) : (
        // other users design 
        <div>
          {/* Project Tabs */}
          <div className=" flex flex-row shadow-lg">
            <div
              className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
                activeTab === "All Project"
                  ? "border-b-4 border-blue-500 text-blue-500 font-bold"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("All Project")}
            >
              All Project
            </div>
          </div>
          {/* All Employees Details Table   */}
          {activeTab === "All Project" && (
            <div className="mt-4">
              {activeTab === "All Project" && (
                <div className="mt-5">
                  <div className="mb-2">
                    {/* handle search  */}
                    <div className="w-96 flex items-center border border-green-300 rounded-md p-1 mx-1">
                      <span className="text-xl mx-1">&#128269;</span>
                      <input
                        type="text"
                        onChange={(e) => handleSearch(e)}
                        placeholder="Search project name..."
                        className="w-96 p-2 rounded-lg outline-none"
                      />
                    </div>
                    {/* end handle search  */}
                  </div>

                  {allProject.length > 0 ? (
                    <div className="overflow-x-auto mt-5">
                      <table className="min-w-full table-auto">
                        <thead className="bg-slate-400">
                          <tr>
                            <th className="border px-4 py-2">S.No</th>
                            <th className="border px-4 py-2">Project Name</th>
                            <th className="border px-4 py-2">
                              Team Name
                            </th>

                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Start Date</th>
                            <th className="border px-4 py-2">
                              Submission Date
                            </th>
                            <th className="border px-4 py-2">Status</th>
                            {/* Add more columns as needed */}
                          </tr>
                        </thead>
                        <tbody>
                          {allProject.map((project, index) => (
                            <tr key={project._id} className="text-center">
                              <td className="border px-4 py-2">{index + 1}</td>
                              <td className="border px-4 py-2">
                                {project.projectName}
                              </td>

                              <td className="border px-4 py-2">
                                {teamInfoData
                                  .filter((team) => team._id === project.teamId)
                                  .map((filteredTeam) => (
                                    <div key={filteredTeam._id}>
                                      {/* Display relevant information from filteredTeam */}
                                      {filteredTeam.teamName}
                                    </div>
                                  ))}
                              </td>
                              <td className="border px-4 py-2">
                                {project.description}
                              </td>
                              <td className="border px-4 py-2">
                                {project.projectStartDate}
                              </td>
                              <td className="border px-4 py-2">
                                {project.projectEndDate}
                              </td>

                              <td className="border px-4 py-2">
                                {project.isCompleted ? (
                                  <span className="text-green-800">
                                    Completed
                                  </span>
                                ) : (
                                  <span className="text-red-800">
                                    Not Completed
                                  </span>
                                )}
                              </td>

                              {/* Add more cells as needed */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center mt-5 p-4 bg-slate-200">
                      <h1 className="uppercase font-bold">
                        Sorry! Data not available!
                      </h1>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllProject;
