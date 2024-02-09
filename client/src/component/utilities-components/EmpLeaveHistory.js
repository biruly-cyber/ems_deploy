import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../App";


const EmpLeaveHistory = () => {
  const [leaveHistoryData, setLeaveHistoryData] = useState([]);
  
//   const [filteredEmpHistoryData, setFilteredEmpHistoryData] = useState([]);

  const empid = localStorage.getItem("id")
  
  // console.log( "id aa raagbasd s,gmvx",Empid);

  //all leave history data
  useEffect(() => {
   
    const myHistoryData = async () => {
    //   const Empid = localStorage.getItem("id");
      try {
        const response = await axios.get(`${server}/leave/all`, {
          withCredentials: true,
        });

        // console.log( "data aa raha h",response)

        setLeaveHistoryData(response.data.LeaveapplyData);

        // console.log("single data bhi aaa raha h ", leaveHistoryData)

          

        // console.log("single and  filter data", filteredEmpHistoryData)
        // console.log("same id data",filteredEmpHistoryData )
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    myHistoryData();
  }, []);

        const data = leaveHistoryData.filter( (user) => user.employeeId === empid)
        console.log(data)
       

  return (
    <div>
      <div>
        <div>
          <h2 className="text-lg font-bold mb-2">Leaves History </h2>
          <table className="min-w-full table-auto overflow-y-scroll">
            <thead className="bg-slate-400">
              <tr>
                <th className="border px-4 py-2">S.No</th>
                <th className="border px-4 py-2">Total Days</th>
                <th className="border px-4 py-2">Leave type</th>
                <th className="border px-4 py-2">From Date</th>
                <th className="border px-4 py-2">To Date</th>
                <th className="border px-4 py-2">Total Days</th>
                
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Application Remark</th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {data.map((singleLeaveRow, index) => {
                return (
                  <tr key={singleLeaveRow._id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{singleLeaveRow.name}</td>
                    <td className="border px-4 py-2">
                      {singleLeaveRow.leaveType}
                    </td>
                    <td className="border px-4 py-2">
                      {singleLeaveRow.fromDate}
                    </td>
                    <td className="border px-4 py-2">
                      {singleLeaveRow.toDate}
                    </td>

                    <td className="border px-4 py-2">
                      {singleLeaveRow.totalDaysofLeave}
                    </td>

                    <td className="border px-4 py-2">
                      {/* Status */}
                      {singleLeaveRow.isAccepted && !singleLeaveRow.isRejected
                        ? "Leave Accepted"
                        : !singleLeaveRow.isAccepted &&
                          singleLeaveRow.isRejected
                        ? "Leave Rejected"
                        : "pending "}
                    </td>
                    <td className="border px-4 py-2">
                      {singleLeaveRow.reason}
                    </td>

                    {/* Add more cells as needed */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpLeaveHistory;
