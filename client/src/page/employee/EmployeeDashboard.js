import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { server } from "../../App";
import { FaWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { QRCode } from "react-qrcode";
import { FaUserLarge } from "react-icons/fa6";
import EmpLeaveHistory from "../../component/utilities-components/EmpLeaveHistory";
// import LeaveHistroy from "./LeaveHistroy";


const EmployeeDashboard = () => {
  const [leaveViewModal, setLeaveViewModal] = useState(false);
  const [showtrainmodel, setshowtrainmodel] = useState(false);
  const [trainingName, setTrainingName] = useState("");
  const [certificateID, setCertificateID] = useState("");
  const [trainStart, setTrainStart] = useState("");
  const [trainEnd, setTrainEnd] = useState("");
  const [allTrain, setAllTrain] = useState([]);

  


  const trainingcard = () => {
    setshowtrainmodel((prev) => !prev);
  }

  const addbutton = async () => {
    try {
      const response = await axios.post(
        `${server}/training/newTraining`,
        {
          trainingName,
          certificateID,
          trainStart,
          trainEnd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);

      const {message,success} = response.data
      console.log(message);
      console.log(success);

      if(success){
        alert(message);
      }
      
    } catch (e) {
      console.log(e)
    }
  }
  
  // const traincardstyle = () =>{
  
  // }

  const handleCloseModal = () => {
    setLeaveViewModal(false);
  };

  // handleling leave details values
  const [LeaveFormData, setLeaveFormData] = useState({
    ToDate: "",
    FromDate: "",
    LeaveType: "",
    Reason: "",
  });
  // handleformData
  const handleFormData = (e) => {
    setLeaveFormData({ ...LeaveFormData, [e.target.name]: e.target.value });
    console.log(LeaveFormData);
  };

  const handelchangeData = async (e) => {
    e.preventDefault();
    console.log(LeaveFormData);
    const { ToDate, FromDate, Reason, LeaveType } = LeaveFormData;

    const start = new Date(FromDate);
    const end = new Date(ToDate);
    const timeDifference = end.getTime() - start.getTime();
    const totalDaysofLeave = Math.floor(timeDifference / (1000 * 3600 * 24));

    // console.log("total leave day",totalDaysofLeave)

    try {
      const response = await axios.post(
        `${server}/leave/newapply`,
        {
          ToDate,
          FromDate,
          Reason,
          LeaveType,
          totalDaysofLeave,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { success, message } = response.data;

      if (success) {
        alert(message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reportTitle: "",
    gitLink: "",
    reportDescription: "",
    isTaskCompleted: false,
  });

  const [allTask, setAllTask] = useState([]);
  const myInformation = [];
  const [employee, setEmployee] = useState([]);
  const [profile, setProfile] = useState({});
  const [activeTab, setActiveTab] = useState("Task");

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  //all profile
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

  const closeModal = () => {
    setShowModal(false);
  };

  // handle for tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  //all employee
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEmployee = await axios.get(`${server}/employee/all`, {
          withCredentials: true,
        });
        setEmployee(allEmployee.data.data);
      } catch (error) {
        console.error(
          "Error fetching employee data:",
          error.response.data.message
        );
      }
    };

    fetchData();
  }, []);

  //all task
  useEffect(() => {
    const getMyTask = async () => {
      try {
        const response = await axios.get(`${server}/task/all`, {
          withCredentials: true,
        });

        // console.log(response);
        setAllTask(response.data.allTask);
      } catch (error) {
        console.error("Error fetching task:", error.responce.data.message);
      }
    };

    getMyTask();
  }, []);

  // const [profile, setProfile] =  useState({})

  for (let i = 0; i < employee.length; i++) {
    if (employee[i]._id === profile.employeeId) {
      myInformation.push(employee[i]);
    }
  }

  const [myInfo] = myInformation;

  // console.log(myInfo)
  // Set id in local storage
  localStorage.setItem("id", profile.employeeId);

  // handle for report button clicked
  const handleReportClick = (task) => {
    //  alert(id)
    setSelectedTask(task);
    setShowModal(true);

    // Assuming selectedTask and selectedTask.employeeId are defined
    if (selectedTask && selectedTask.assignTo) {
      // Set id in local storage
      localStorage.setItem("id", selectedTask.assignTo);
    } else {
      // Handle the case where selectedTask or selectedTask.employeeId is not defined
      console.error(
        "Unable to set id in local storage. Check selectedTask and selectedTask.employeeId."
      );
    }
  };

  // for update the form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //submit the report for create the entry on db
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optionally, reset the form after submission
    const { reportTitle, reportDescription, gitLink } = formData;

    // console.log(reportTitle, reportDescription, isTaskCompleted);

    try {
      const responce = await axios.post(
        `${server}/taskreport/${selectedTask._id}`,
        {
          reportTitle,
          reportDescription,
          isTaskCompleted: false,
          gitLink,
          isRequested: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = responce.data;

      if (success) {
        alert(message);
      }

      //reset the form
      setFormData({
        reportTitle: "",
        reportDescription: "",
        isTaskCompleted: false,
      });

      setShowModal(false);
      navigate("../reporthistory");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // Response of LeaveApplication revert by the manager
  // fetching data leave status of from db

  //download profile card
  const profileCardRef = useRef(null);

  const downloadProfileCard = () => {
    const profileCard = profileCardRef.current;

    if (profileCard) {
      const htmlContent = profileCard.innerHTML;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "profile_card.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  //handle on feedback
  const handleOnFeedback = (taskId) => {
    localStorage.setItem("taskId", taskId);
    navigate("../taskreportfeedback");
  };

  useEffect (() => {
    const showTrain = async () => {

      try {
        const response = await axios.get(`${server}/training/showtraining`,{
          withCredentials: true,
        })

        const {message, showTrain, success} = response.data;

          setAllTrain(showTrain)

      } catch (e) {
        console.log(e)
      }
    }
    showTrain();
  }, [])

  console.log(allTrain)

  return (
    <div className="w-full mx-auto mt-2 p-4 bg-white rounded shadow-md">
      <div className="flex">
        <div
          className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
            activeTab === "Personal Information"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("Personal Information")}
        >
          Personal Information
        </div>
        <div
          className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
            activeTab === "Task"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("Task")}
        >
          Task
        </div>

        <div
          className={`cursor-pointer uppercase  py-2 px-4  ${
            activeTab === "Attendance"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("Attendance")}
        >
          Attendance
        </div>
        <div
          className={`cursor-pointer uppercase  py-2 px-4  ${

            activeTab === "Training"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("Training")}
        >
          Training
        </div>
      </div>

      {/* Personal Information  */}
      <div className="mt-4">
        {activeTab === "Personal Information" && (
          <div className="mt-4">
            {activeTab === "Personal Information" && (
              <div className="bg-slate-50 flex flex-row rounded shadow-md w-full pb-6 justify-between px-12">
                {/* Left Section */}
                <div className="mt-10">
                  <div className="w-[7rem] h-[7rem] flex items-center justify-center ml-24 rounded-full bg-slate-300 shadow-lg">
                    <FaUserLarge className="text-7xl text-slate-400" />
                  </div>

                  <div className="mt-8">
                    <div className="text-black text-sm uppercase text-center">
                      Location
                    </div>
                    <div className="text-slate-600 text-lg font-semibold text-justify capitalize">
                      {myInfo.address}
                    </div>
                  </div>
                </div>

                {/* Center Section */}
                <div className="flex flex-col">
                  <div className="mt-4">
                    <h2 className="text-black text-sm ">Name</h2>
                    <div className="text-xl text-slate-800  ">
                      {myInfo.employeeName}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-black text-sm  "> Gender</h3>
                    <div className="text-xl text-slate-800 capitalize">
                      {myInfo.gender}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-black text-sm  ">Date of Birth</h3>
                    <div className="text-xl text-slate-800 ">
                      {myInfo.dateOfBirth}
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col">
                  <div className="mt-4">
                    <p className="text-black text-sm uppercase ">Email </p>
                    <div className="text-xl text-slate-800 ">
                      {myInfo.employeeEmail}
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-black text-sm uppercase">Phone</p>
                    <div className="text-xl text-slate-800 ">
                      {myInfo.employeePhoneNumber}
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-black text-sm uppercase ">Address</p>
                    <p className="text-xl text-slate-800 ">{myInfo.address}</p>
                  </div>
                </div>

                {/* QR Code and Button */}
                <div className="flex flex-col">
                  <div className="mt-4">
                    <h3 className="text-black text-sm uppercase text-center">
                      {" "}
                      Designation
                    </h3>
                    <div className="font-bold capitalize text-center">
                      {myInfo.designation}
                    </div>
                  </div>

                  <div className="w-40 mx-auto mt-4">
                    <QRCode value={myInfo._id} />
                  </div>

                  <button
                    disabled
                    onClick={downloadProfileCard}
                    className=" text-white px-4 py-2 mt-4 rounded-md focus:outline-none"
                  >
                    Download Profile Card
                  </button>
                </div>
              </div>
            )}

            {activeTab === "Task" && (
              <div>
                <h2 className="text-lg font-bold mb-2">Task Details</h2>
                <div className="container mx-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">S.No</th>
                        <th className="py-2 px-4 border-b">Task ID</th>
                        <th className="py-2 px-4 border-b">Task Name</th>
                        <th className="py-2 px-4 border-b">Employee Name</th>
                        <th className="py-2 px-4 border-b">Employee Name</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        {/* Add more columns as needed */}
                        <th className="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTask
                        .filter((task) => task.employeeName === profile.name)
                        .map((task, index) => (
                          <tr key={task._id}>
                            <td className="py-2 px-4 border-b text-center">
                              {index + 1}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                              {task._id}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                              {task.taskTitle}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                              {task.managerName}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                              {task.isTaskCompleted
                                ? "Completed"
                                : "In progress"}
                            </td>
                            {/* Add more cells based on your task object */}
                            <td className="py-2 px-4 border-b flex items-center">
                              {task.isTaskCompleted ? (
                                <button
                                  disabled
                                  className="mx-auto bg-blue-500 hover:bg-blue-700 cursor-not-allowed text-white font-bold py-2 px-4 rounded"
                                  onClick={() => handleReportClick(task)}
                                >
                                  Report
                                </button>
                              ) : (
                                <button
                                  className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => handleReportClick(task)}
                                >
                                  Report
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "Attendance" && (
              <div>
                <h2 className="text-lg font-bold mb-2 text-center">
                  This Feature Coming Soon
                </h2>
                <p className="text-center">Not Available</p>
              </div>
            )}

            {/* {activeTab === "Report History" && (
            <div>
              <h2 className="text-lg font-bold mb-2">Content for Tab 2</h2>
              <p>This is the content for Tab 4.</p>
            </div>
          )} */}
          
          </div>
        )}

        

            {activeTab === "Training" && (
              <>
              <div className="h-[80vh] bg-gray-200 w-full flex justify-center items-center ">
                <div className="">
                  <button id="trainbtn" className="w-[10rem] h-[4rem] rounded-lg bg-[#6c7ebd] hover:bg-[#4A63BC] hover:scale-110 transform transition duration-500 z-1" onClick={trainingcard}>
                  + ADD
                  </button>
                </div>
                
              </div>
              <div>
  <table>
    <thead>
      <tr>
        <th>Sr.no</th>
        <th>Training Name</th>
        <th>Certificate ID</th>
        <th>Training Start</th>
        <th>Training End</th>
      </tr>
    </thead>
    <tbody>
      {allTrain.map((Training, index) => (
        <tr key={Training._id}>
          <td>{index + 1}</td>
          <td>{Training.trainingName}</td>
          <td>{Training.certificateID}</td>
          <td>{Training.createdAt}</td>
          <td>{Training.updatedAt}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
            </>
            )}

        {/* task  */}
        {activeTab === "Task" && (
          <div>
            <h2 className="text-lg font-bold mb-2"> Task Details</h2>
            <div className="container mx-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-slate-400">
                  <tr>
                    <th className="py-2 px-4 border-b">S.No</th>
                    <th className="py-2 px-4 border-b">Task Name</th>
                    <th className="py-2 px-4 border-b">Manager Name</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">
                      Request for Completion
                    </th>
                    <th className="py-2 px-4 border-b">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {allTask
                    .filter((task) => task.employeeName === profile.name)
                    .map((task, index) => (
                      <tr key={task._id}>
                        <td className="py-2 px-4 border-b text-center">
                          {index + 1}
                        </td>

                        <td className="py-2 px-4 border-b text-center">
                          {task.taskTitle}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {task.managerName}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {task.isTaskCompleted ? "Completed" : "In Progress"}
                        </td>
                        <td className="py-2 px-4 border-b flex items-center">
                          {task.isTaskCompleted ? (
                            "completed"
                          ) : task.isRequested ? (
                            <button
                              disabled
                              className="mx-auto bg-red-300 cursor-not-allowed text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleReportClick(task)}
                            >
                              Requested
                            </button>
                          ) : (
                            <button
                              className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleReportClick(task)}
                            >
                              Request
                            </button>
                          )}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          <button
                            className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleOnFeedback(task._id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Attendance  */}
        {activeTab === "Attendance" && (
          <div>
            <h2 className="text-lg font-bold mb-2 text-center">
              This Feature Coming Soon
            </h2>
            <p className="text-center">Not Available</p>
          </div>
        )}
        {/* Leave details  */}

        {activeTab === "LeaveDetails" && (
          <div className="flex flex-row justify-evenly ">
            <div className=" ">
              <div>
                <div className="flex flex-col  items-center bg-red-600 w-[10rem] mt-6 text-2xl rounded-lg  shadow-lg shadow-slate-500">
                  <h3 className="flex  font-extrabold text-white ">
                    Sick Leave
                  </h3>
                  <div className="mt-2 py-1 text-white">
                    <span className="font-extrabold text-4xl text-white">
                      15
                    </span>
                    /15
                  </div>
                </div>

                <div className="flex flex-col items-center bg-green-600 w-[10rem] mt-6 font-bold text-white text-2xl rounded-lg  shadow-lg shadow-slate-500">
                  <h3 className="flex">Casual Leave</h3>
                  <div className="mt-2 py-1 text-white">
                    <span className="font-extrabold text-4xl text-white">
                      15
                    </span>
                    /15
                  </div>
                </div>

                <div className="flex flex-col items-center bg-blue-600 w-[10rem] mt-6 font-bold text-white text-2xl rounded-lg  shadow-lg shadow-slate-500">
                  <h3 className="flex">Paid Leave</h3>
                  <div className="mt-2 py-1 text-white">
                    <span className="font-extrabold text-4xl text-white">
                      20
                    </span>
                    /20
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg  text-white">
                  <div className="p-4 mt-2 flex justify-center text-2xl">
                    <button onClick={() => setLeaveViewModal(true)}>
                      Apply Leave
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <EmpLeaveHistory />
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold mb-4">Request</h2>
              {/* Add more content for your report modal */}
              <button
                className="   font-bold text-red-600 text-2xl rounded-xl"
                onClick={closeModal}
              >
                <FaWindowClose />
              </button>
            </div>

            <p>{`Reporting task: ${selectedTask.taskTitle}`}</p>

            {/* // form  */}
            <form
              onSubmit={handleSubmit}
              className="w-96 mx-auto bg-white p-8 rounded shadow-md mt-4"
            >
              {/* report title  */}
              <div className="mb-4">
                <label
                  htmlFor="reportTitle"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Report Title
                </label>
                <input
                  type="text"
                  id="reportTitle"
                  name="reportTitle"
                  value={formData.reportTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* git link  */}
              <div className="mb-4">
                <label
                  htmlFor="reportTitle"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Git Link
                </label>
                <input
                  type="text"
                  id="gitLink"
                  name="gitLink"
                  value={formData.gitLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* report description  */}
              <div className="mb-4">
                <label
                  htmlFor="reportDescription"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Report Description
                </label>
                <textarea
                  id="reportDescription"
                  name="reportDescription"
                  value={formData.reportDescription}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* <div className="mb-4">
                <label htmlFor="isTaskCompleted" className="flex items-center">
                  <input
                    type="checkbox"
                    id="isTaskCompleted"
                    name="isTaskCompleted"
                    checked={formData.isTaskCompleted}
                    onChange={handleChange}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">Is Task Completed?</span>
                </label>
              </div> */}

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {leaveViewModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex justify-center min-h-[90vh]">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="relative bg-white rounded-lg p-6 mx-auto">
              <div className="flex justify-between">
                <div>
                  <h1 className=" font-bold text-xl"> Apply Leave</h1>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCloseModal}
                >
                  X
                </button>
              </div>
              {/* Your modal content goes here */}

              <div className="w-[30rem] ">
                <h2 className=" font-bold mt-4 text-lg w-full bg-slate-900 rounded-lg p-1 flex text-white justify-center">
                  <button onClick={() => setLeaveViewModal(true)}></button>
                  apply Leave
                </h2>
                <div className="items-center  w-full rounded-lg bg-slate-10 mr-12 shadow-2xl shadow-slate-400">
                  <div className="flex flex-row justify-between">
                    <div className="flex-col ml-10">
                      <div className="mt-5">
                        <span className="font-extrabold text-xl">
                          Leave Type
                        </span>
                        <select
                          name="LeaveType"
                          id=""
                          className="text-lg w-[12rem]  "
                          onChange={handleFormData}
                        >
                          <option selected disabled hidden>
                            Choose Here
                          </option>

                          <option value="Sick">Sick Leave</option>
                          <option value="Casual"> Casual Leave</option>
                          <option value="Paid">paid leave</option>
                        </select>
                      </div>

                      <div className="flex-col mr-10 ">
                        {/*starting leave date */}
                        <div className="font-bold w-[15rem] mt-4">
                          From Date
                        </div>
                        <input
                          type="date"
                          name="FromDate"
                          value={LeaveFormData.FromDate}
                          required
                          onChange={handleFormData}
                        />

                        {/*Ending leave date */}
                        <div className="font-bold  mt-4">To Date</div>
                        <input
                          type="date"
                          name="ToDate"
                          value={LeaveFormData.ToDate}
                          required
                          onChange={handleFormData}
                        />
                      </div>

                      <div className="font-bold   text-xl ">Reason</div>
                      <textarea
                        name="Reason"
                        id=""
                        required
                        className="w-[25rem] h-[8rem] flex mx-auto mt-2 border-2 border-black"
                        value={LeaveFormData.Reason}
                        type="text"
                        onChange={handleFormData}
                      />

                      <div className="flex flex-row justify-center  ">
                        <button
                          className=" bg-sky-700 p-2 text-white font-bold text-2xl mt-2 mb-2 rounded-lg"
                          onClick={handelchangeData}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* train model */}
      {showtrainmodel && (
          <div className="w-[569px] h-[538px] z-10 absolute">
            <div className=" w-[569px] h-[538px] bg-[#d9d9d9] rounded-[10px] shadow-[0px_4px_4px_#00000040,0px_4px_4px_#00000040,0px_4px_4px_6px_#00000040]">
                <button className="w-[3rem] h-[3rem] top-[2rem] right-[530px] rounded-[50%] text-red-700 text-2xl" onClick={trainingcard}>X</button>
                <input type="text" className="w-[455px] top-[70px] left-[57px] bg-white absolute h-[40px]" onChange={(e) => setTrainingName(e.target.value)} value={trainingName}/>
                <input type="date" className="w-[188px] top-[205px] left-[317px] bg-white absolute h-[40px]" onChange={(e) => setTrainEnd(e.target.value)} value={trainEnd}/>
                <input type="date" className="w-[189px] top-[205px] left-[57px] bg-white absolute h-[40px]" onChange={(e) => setTrainStart(e.target.value)} value={trainStart}/>
                <input type="text" className="w-[455px] top-[351px] left-[57px] absolute h-[40px]" onChange={(e) => setCertificateID(e.target.value)} value={certificateID} />
                <button className="absolute w-[185px] h-[46px] top-[455px] left-[184px] bg-white rounded-[24px] hover:bg-slate-300 hover:scale-110 transform transition duration-500" onClick={addbutton}>
                  <p className="absolute w-[122px] h-[44px] top-[10px] left-[33px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[24px] text-center tracking-[0] leading-[normal]">
                    ADD
                  </p>
                </button>
                <div className="w-[245px] h-[34px] top-[36px] absolute left-[57px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[24px] tracking-[0] leading-[normal]"> 
                  Training Name:
                </div>
                <div className="absolute w-[245px] h-[34px] top-[317px] left-[57px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[24px] tracking-[0] leading-[normal]">
                  Certificate ID:
                </div>
                <div className="w-[235px] h-[27px] top-[178px] whitespace-nowrap absolute left-[57px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[24px] tracking-[0] leading-[normal]">
                  Training Started:
                </div>
                <div className="absolute w-[235px] h-[27px] top-[178px] left-[316px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[24px] tracking-[0] leading-[normal] whitespace-nowrap">
                  Training Ended:
                </div>
            </div>
        </div>
      )}
    </div>
  );
};/*  */

export default EmployeeDashboard;
