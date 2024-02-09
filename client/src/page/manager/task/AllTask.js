import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '../../../App';
import Titlebar from '../../../component/utilities-components/Titlebar';

const AllTask = () => {
    const [allTask, setAllTask] = useState([])
    const [allTaskForSearch, setAllTaskForSearch] = useState([])
  
    //fetch all the details of employee
    useEffect(() => {
      const data = async () => {
        try {
          const data = await axios.get(`${server}/task/all`, {
            withCredentials: true,
          });
          // Handle the data from the API response
          setAllTask(data.data.allTask);
  
          setAllTaskForSearch(data.data.allTask);
        } catch (error) {
          console.error("Error fetching data:", error.message);
          // Handle the error
        }
      };
  
      //invocke
      data();
    }, []);
  
    // handle search
    const handleSearch = (e) => {
      const searchTerm = e.target.value.trim().toLowerCase(); // Get the trimmed lowercase search term
  
      if (searchTerm === " ") {
        setAllTask(allTask); // If the search term is empty, show the entire original array
      } else {
        // Filter the array based on the search term
        const tempVar = allTaskForSearch?.filter((item) =>
          item.employeeName?.trim().toLowerCase().includes(searchTerm)
        );
        setAllTask(tempVar); // Update the array state with the filtered results
      }
    };
  return (
    <>
       <div className="flex justify-between">
        <div>
          <Titlebar title={"Task Details"} />
        </div>
        <div>
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
      </div>
      {allTask.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full table-auto">
            <thead className="bg-slate-400">
              <tr>
                <th className="border px-4 py-2">S.No</th>
                <th className="border px-4 py-2">Task Title</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">Submission Date</th>
                <th className="border px-4 py-2">Status</th>
                {/* Add more columns as needed */}
                <th className="border px-4 py-2">Assign To</th>
              </tr>
            </thead>
            <tbody>
              {allTask.map((task, index) => (
                <tr key={task._id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{task.taskTitle}</td>
                  <td className="border px-4 py-2">{task.taskAssignDate}</td>
                  <td className="border px-4 py-2">{task.taskEndDate}</td>
                  <td className="border px-4 py-2">{task.isTaskCompleted ? (<span className='text-green-800'>Completed</span>) : (<span className='text-red-800'>Not Completed</span>)}</td>
                  <td className="border px-4 py-2">{task.employeeName}</td>
                  
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
    </>
  )
}

export default AllTask