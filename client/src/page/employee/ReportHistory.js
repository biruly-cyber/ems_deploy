import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../../App'

const ReportHistory = () => {

  const [reportHistory, setReportHistory] = useState([]);

  const id = localStorage.getItem("id")


  console.log(id)
  //load history
  useEffect(() => {

    if(!id){
      alert("id is null or invalid")
      return
    }
    // validation 
    try {
      const taskReportHistory = async () => {
        const response = await axios.get(`${server}/taskreport/${id}`);
        // const response = await axios.get("http://localhost:4000/api/v1/reportTask/all");
       
        setReportHistory(response.data.allReport)
      };

      //invoke
      taskReportHistory();
    } catch (error) {
      alert(error.response.data.message);
    }
  }, [id]);

    
  return (
    <>
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Report Title</th>
          <th className="py-2 px-4 border-b">Report Description </th>
          <th className="py-2 px-4 border-b">Concern Manager </th>
          <th className="py-2 px-4 border-b">Request Status</th>
        </tr>
      </thead>
      <tbody>
        {reportHistory.map((report) => (
          <tr key={report._id}>
            <td className="py-2 px-4 border-b text-center">{report.reportTitle}</td>
            <td className="py-2 px-4 border-b text-center">{report.reportDescription}</td>
            <td className="py-2 px-4 border-b text-center capitalize">{report.managerName}</td>
            <td className="py-2 px-4 border-b text-center">{report.isTaskCompleted ? (<span className='font-bold text-green-600'>Completed</span>) : (<span className='font-bold text-red-600'>Pending</span>)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default ReportHistory