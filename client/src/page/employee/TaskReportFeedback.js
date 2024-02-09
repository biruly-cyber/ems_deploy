import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../App";

const TaskReportFeedback = () => {
  const [allFeedback, setAllFeedback] = useState([]);

  //retrieve taskId from local storage
  const taskId = localStorage.getItem("taskId");

  //get all the feedback
  useEffect(() => {
    try {
      const fetchAllFeedback = async () => {
        const response = await axios.get(`${server}/taskReportFeedback/all`, {
          withCredentials: true,
        });

        const { success, allFeedback } = response.data;

        if (success) {
          setAllFeedback(allFeedback);
        }
      };
      //invoke
      fetchAllFeedback();
    } catch (error) {
      alert(error.response.data.message);
    }
  }, []);


  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Feedback</th>
              <th className="py-2 px-4 border-b">Status</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {allFeedback
              .filter((feedback) => feedback.taskId === taskId)
              .map((filteredFeedback , index) => (
                <tr key={filteredFeedback._id}>
                  <td className="py-2 px-4 border-b">
                    {index +1}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {filteredFeedback.feedback}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {filteredFeedback.isTaskCompleted ? <span className="text-green-600 font-bold">Apporved</span> : <span className="text-red-700 font-bold">Declined</span>}
                  </td>
                  {/* Add more table cells based on your data structure */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskReportFeedback;
