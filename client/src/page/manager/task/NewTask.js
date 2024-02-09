import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../App";
import { useLocation } from "react-router-dom";

const NewTask = () => {
  const [formData, setFormData] = useState({
    taskTitle: "",
    taskDescription: "",
    assignTo: "",
    taskOf: "",
    taskAssignDate: "",
    taskEndDate: "",
    isTaskCompleted: false,
  });

  const [employeeData, setEmployeeData] = useState([]);
  const [allProject, setAllProject] = useState([]);


  // recieve data from url 
  const location = useLocation();
  const searchData = new URLSearchParams(location.search).get('data');
  const project = searchData ? JSON.parse(decodeURIComponent(searchData)) : null;

  console.log(project)

  //employee
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEmployee = await axios.get(`${server}/employee/all`, {
          withCredentials: true,
        });
        setEmployeeData(allEmployee.data.data);
      } catch (error) {
        console.error("Error fetching employee data:", error.message);
      }
    };

    fetchData();
  }, [setEmployeeData]);

  // project
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await axios.get(`${server}/project/all`, {
          withCredentials: true,
        });
        setAllProject(projectData.data.allProject);
        // console.log(projectData)
      } catch (error) {
        console.error("Error fetching project data:", error.message);
        alert(error.message);
      }
    };

    fetchData();
  }, [setAllProject]);

  //handle for change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //handle for submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here, for example, send the formData to the server
    console.log("Form data submitted:", formData);
    const { taskTitle, taskDescription, taskAssignDate, taskEndDate, taskOf, assignTo} =
      formData;

    const response = await axios.post(
      `${server}/task/new`,
      { taskTitle, taskDescription, taskAssignDate, taskEndDate, taskOf, assignTo},
      {
        headers:{
            "Content-Type": "application/json"
        },
        withCredentials: true
      }
    );

    const {success, message} = response.data
    if(success){
        alert(message)
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md"
    >
      <label className="block mb-2">
        <span className="text-gray-700">Task Title:</span>
        <input
          type="text"
          name="taskTitle"
          value={formData.taskTitle}
          onChange={handleChange}
          className="form-input mt-1 block w-full border"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Task Of:</span>
        <select
          name="taskOf"
          value={formData.taskOf}
          onChange={handleChange}
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
          value={formData.taskDescription}
          onChange={handleChange}
          className="form-input mt-1 block w-full border"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Assign To:</span>
        <select
          name="assignTo"
          value={formData.assignTo}
          onChange={handleChange}
          className="form-select mt-1 block w-full border"
        >
          <option value="" disabled>
            Select an employee
          </option>
          {employeeData
            .filter((employee) => employee.designationType === "employee")
            .map((employee) => (
              <option key={employee.employeeId} value={employee.employeeName}>
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
          value={formData.taskAssignDate}
          onChange={handleChange}
          className="form-input mt-1 block w-full border"
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Submission Date:</span>
        <input
          type="date"
          name="taskEndDate"
          value={formData.taskEndDate}
          onChange={handleChange}
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
  );
};

export default NewTask;
