import React, { useEffect, useState } from "react";
// import Titlebar from "../../../component/utilities-components/Titlebar";
// import SearchBar from "../../../component/utilities-components/SearchBar";
import axios from "axios";
import { server } from "../../../App";
import EmployeeTable from "../../../component/utilities-components/EmployeeTable";
import NewEmployee from "../../HR/new/NewEmployee";

const Employee = () => {
  const [activeTeamTab, setActiveTeamTab] = useState("Employee Details");
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeDataForSearch, setEmployeeDataForSearch] = useState([]);
  const [profile, setProfile] = useState({});

  //fetch all the details of employee
  useEffect(() => {
    const data = async () => {
      try {
        const allEmployee = await axios.get(`${server}/employee/all`, {
          withCredentials: true,
        });
        // Handle the data from the API response
        setEmployeeData(allEmployee.data.data);

        setEmployeeDataForSearch(allEmployee.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle the error
      }
    };

    //invocke
    data();
  }, [activeTeamTab]);
  //get profile
  useEffect(() => {
    const myProfile = async () => {
      const response = await axios.get(`${server}/users/me`, {
        withCredentials: true,
      });

      setProfile(response.data.user);
    };

    //invoke
    myProfile();
  }, []);

  // handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase(); // Get the trimmed lowercase search term

    if (searchTerm === " ") {
      setEmployeeData(employeeData); // If the search term is empty, show the entire original array
    } else {
      // Filter the array based on the search term
      const tempVar = employeeDataForSearch?.filter((item) =>
        item.employeeName?.trim().toLowerCase().includes(searchTerm)
      );
      setEmployeeData(tempVar); // Update the array state with the filtered results
    }
  };
  // handling the Tab
  const handleTabClick = (tab) => {
    setActiveTeamTab(tab);
  };

  return (
    <>
      {profile.designationType === "admin" ? (
        <div>
          {/* Employees Tabs  */}
          <div className=" flex flex-row shadow-lg">
            <div
              className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
                activeTeamTab === "Employee Details"
                  ? "border-b-4 border-blue-500 text-blue-500 font-bold"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("Employee Details")}
            >
              All Employees
            </div>

            <div
              className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
                activeTeamTab === "Create New Employee"
                  ? "border-b-4 border-blue-500 text-blue-500 font-bold"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("Create New Employee")}
            >
              Create new Employee
            </div>
          </div>
          {/* All Employees Details Table   */}
          {activeTeamTab === "Employee Details" && (
            <div className="mt-4">
              {activeTeamTab === "Employee Details" && (
                <div className="mt-5">
                  <div className="mb-2">
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
                  <EmployeeTable employeeData={employeeData} />
                </div>
              )}
            </div>
          )}
          {/* Create new Employees Details  */}
          {activeTeamTab === "Create New Employee" && (
            <div className="mt-4">
              {activeTeamTab === "Create New Employee" && (
                <div className="mt-5"></div>
              )}
              <div>
                <NewEmployee />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className=" flex flex-row shadow-lg">
            <div
              className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
                activeTeamTab === "Employee Details"
                  ? "border-b-4 border-blue-500 text-blue-500 font-bold"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("Employee Details")}
            >
              All Employees
            </div>
          </div>

          {activeTeamTab === "Employee Details" && (
            <div className="mt-4">
              {activeTeamTab === "Employee Details" && (
                <div className="mt-5">
                  <div className="mb-2">
                    {/* handle search  */}
                    <div className="w-96 flex items-center border border-green-300 rounded-md p-1 mx-1">
                      <span className="text-xl mx-1">&#128269;</span>
                      <input
                        type="text"
                        onChange={(e) => handleSearch(e)}
                        placeholder="Search employee name..."
                        className="w-96 p-2 rounded-lg outline-none"
                      />
                    </div>
                    {/* end handle search  */}
                  </div>
                  <EmployeeTable employeeData={employeeData} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Employee;
