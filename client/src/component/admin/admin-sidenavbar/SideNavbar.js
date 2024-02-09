import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { server } from "../../../App";

const SideNavbar = () => {
  const [profile, setProfile] = useState({});
  const location = useLocation();
  const [path, setPath] = useState(location?.pathname);

  useEffect(() => {
    setPath(location?.pathname?.split("/")[2]);
  }, [location.pathname]);

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

  // handle for logout

  // const handleOnLogout = async () => {
  //   const response = await axios.get(`${server}/users/logout`, {
  //     withCredentials: true,
  //   });

  //   const { success, message } = response.data;

  //   if (success) {
  //     alert(message);
  //     navigate("../login");
  //   }
  // };
  return (
    <aside className="bg-slate-800 text-white h-[630px]  flex flex-col">
      <nav className="flex-1">
        <div className="flex h-full w-64 mt-3 ">
          <ul className="flex-row justify-center w-full ">
            {/* admin dashboard  */}
            {profile.designationType === "admin" && (
              <li
                className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer 
            
              `}
              >
                {/* Dashboard button  */}
                <Link to={"./home"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "home"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Dashboard
                  </button>
                </Link>
              </li>
            )}

            {/* manager dashboard */}
            {profile.designationType === "manager" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees */}
                <Link
                  to={"./managerdashboard"}
                  className="uppercase  font-bold"
                >
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "managerdashboard"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Dashboard
                  </button>
                </Link>
              </li>
            )}

            {/* HR dashboard */}
            {profile.designationType === "human resources" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees */}
                <Link to={"./hrdashboard"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "hrdashboard"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Dashboard
                  </button>
                </Link>
              </li>
            )}

            {/* // employee section visible for admin and human resources and manager  */}
            {profile.designationType === "admin" ||
            profile.designationType === "human resources" ||
            profile.designationType === "manager" ? (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
            
              `}
              >
                {/* New Employees */}
                <Link to={"./employee"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "employee"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Employees 
                  </button>
                </Link>
              </li>
            ) : null}

            {/* // it visible when user type is admin  */}
            {/* {profile.designationType === "admin" && (
              <li
                className={`flex items-center text-start text-black mb-2 cursor-pointer
                
                  `}
              >
           
                <Link to={"./newProject"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5 z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "newProject"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    New Project
                  </button>
                </Link>
              </li>
            )} */}

            {/* // it visible when user type is admin  */}
            {profile.designationType === "admin" ? (
              <li
                className={`flex items-center text-start text-black mb-2 cursor-pointer
              
                `}
              >
                {/* All Project */}
                <Link to={"./allProject"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5 z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "allProject"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                  Project 
                  </button>
                </Link>
              </li>
            ) : null}

            {/* //new employee for humanresources */}
            {/* {profile.designationType === "human resources" ||
            profile.designationType === "admin" ? (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
               
                <Link to={"./newEmployee"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "newEmployee"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    New Employee
                  </button>
                </Link>
              </li>
            ) : null} */}

            {/* teams for admin       profile.designationType === "manager" || */}

            {profile.designationType === "admin" ? (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees */}
                <Link to={"./newTeam"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "newTeam"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Team
                  </button>
                </Link>
              </li>
            ) : null}

            {/* Admin Report */}
            {profile.designationType === "admin" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees */}
                <Link to={"./adminreport"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "adminreport"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Report
                  </button>
                </Link>
              </li>
            )}
            {/* Admin Report */}
            {profile.designationType === "admin" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees */}
                <Link to={"./AppVersion"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "AppVersion"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                  Software Info
                  </button>
                </Link>
              </li>
            )}

            {/* manager  */}
            {profile.designationType === "manager" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees */}
                <Link to={"./managerproject"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "managerproject"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Project
                  </button>
                </Link>
              </li>
            )}

            {/* {profile.designationType === "manager" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees 
                <Link to={"./task"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "task"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    New Task
                  </button>
                </Link>
              </li>
            {/* )} */}

            {/* {profile.designationType === "manager" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees 
                <Link to={"./alltask"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "alltask"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                     Task 
                  </button>
                </Link>
              </li>
            )} */}
            {profile.designationType === "manager" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees */}
                <Link to={"./managerreport"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "managerreport"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Project Report
                  </button>
                </Link>
              </li>
            )}

            {/* manager end  */}

            {/* employee  */}
            {profile.designationType === "employee" && (
              <li
                className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800
              
                `}
              >
                <Link
                  to={"./employeedashboard"}
                  className="uppercase  font-bold"
                >
                  <button
                    className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "employeedashboard"
                        ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Dashboard
                  </button>
                </Link>
              </li>
            )}

            {profile.designationType === "employee" && (
              <li
                className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800
              
                `}
              >
                <Link to={"./reporthistory"} className="uppercase  font-bold">
                  <button
                    className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "reporthistory"
                        ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Report History
                  </button>
                </Link>
              </li>
            )}

            {/* Employees Leave Details */}
            {profile.designationType === "manager" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees */}
                <Link to={"./empleave"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "empleave"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Leave
                  </button>
                </Link>
              </li>
            )}

            {/* Team Details */}
            {/* {profile.designationType === "manager" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
             
                <Link
                  to={"./empleave"}
                  className="uppercase  font-bold"
                >
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "empleave"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Team
                  </button>
                </Link>
              </li>
            )} */}
          </ul>
        </div>
      </nav>
      {/* <div className="p-4">
        <button
          className="bg-white text-gray-800 px-4 py-2 rounded-md w-full"
          onClick={handleOnLogout}
        >
          Logout
        </button>
      </div> */}
    </aside>
  );
};

export default SideNavbar;
