import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../App";

const ManagerReport = () => {
  const initialFormData = {
    reportTitle: "",
    reportDescription: "",
    isProjectCompleted: false,
    projectId: "",
    managerId: "",
    adminId: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [allProjectReport, setAllProjectReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  // get manager id from local storage
  const managerId = localStorage.getItem("managerId");
  // load all the reports to the admin
  useEffect(() => {
    const reportData = async () => {
      try {
        const data = await axios.get(`${server}/reportProject/${managerId}`, {
          withCredentials: true,
        });

        const { success, allReportOfProject } = data.data;

        if (success) {
          setAllProjectReport(allReportOfProject);
        } else {
          // Handle unsuccessful response, e.g., show an error message
          console.error("Error fetching data:", data.data.message);
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error("Error fetching data:", error.message);
      }
    };

    // Invoke
    reportData();
  }, [managerId, loading]);

  const onDeleteClick = async (id) => {
    console.log(id);
    const response = await axios.delete(`${server}/reportProject/${id}`, {
      withCredentials: true,
    });
    const { success, message } = response.data;
    if (success) {
      setLoading(true);
      alert(message);
    }
  };


// manager can update the report 
  const onUpdateClick = async (project) => {
    setIsOpenModal(true);

    setSelectedProject(project);

    setFormData((prev) => ({
      ...prev,
      reportTitle: project.reportTitle,
      reportDescription: project.reportDescription,
      isProjectCompleted: project.isProjectCompleted,
    }));
  };

  // control for show the modal
  const handleCloseModal = () => {
    setIsOpenModal(false);
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
    const { reportTitle, reportDescription, isProjectCompleted } = formData;

    try {
      const response = await axios.put(
        `${server}/reportProject/${selectedProject._id}`,
        {
          reportTitle,
          reportDescription,
          isProjectCompleted,
        },
        {
          withCredentials: true,
        }
      );

      //when success
      const { success, message } = response.data;
      setIsOpenModal(false);
      if (success) {
        setLoading(true);
        setFormData(initialFormData);
        alert(message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border bg-gray-200 p-2">S.No</th>
            <th className="border bg-gray-200 p-2">Report Title</th>
            <th className="border bg-gray-200 p-2">Report Description</th>
            <th className="border bg-gray-200 p-2">Status</th>
            <th className="border bg-gray-200 p-2">Submision Date</th>
            <th className="border bg-gray-200 p-2">Project Name</th>
            <th className="border bg-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allProjectReport.map((project, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{project.reportTitle}</td>
              <td className="border p-2">{project.reportDescription}</td>
              <td className="border p-2">
                {project.isProjectCompleted ? "Completed" : "In Progress"}
              </td>
              <td className="border p-2">{project.createdAt}</td>
              <td className="border p-2">{project.projectName}</td>
              <td className="border p-2">
                {project.isProjectCompleted ? (
                  <button
                    onClick={() => onUpdateClick(project)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Update
                  </button>
                ) : (
                  <div>
                    {" "}
                    <button
                      onClick={() => onUpdateClick(project)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => onDeleteClick(project._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* show modal for report the project  */}

      {isOpenModal && (
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
                    Update Report
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
                    Update Report
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

export default ManagerReport;
