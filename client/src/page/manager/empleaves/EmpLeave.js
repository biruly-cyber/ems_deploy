import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../App";

// filterData[0]._id === leave._id

const EmpLeave = () => {
  const [leaveViewModal, setLeaveViewModal] = useState(false);
  const [leaveRemark, setLeaveRemark] = useState(" ");
  const [applicationId, setApplicationId] = useState(" ");

 

  // const [leaveAccepted, setleaveAccepted] = useState(false);
  // const [leaveRejected, setLeaveRejected] = useState(false);

  const [leaveDetailsData, setLeaveDetailsData] = useState([]);

  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    const response = async () => {
      try {
        const res = await axios.get(`${server}/leave/all`, {
          withCredentials: true,
        });
        setLeaveDetailsData(res.data.LeaveapplyData);
      } catch (error) {}
    };
    response();
  }, []);
  // console.log(leaveDetailsData);

  const viewLeaveDetail = (id) => {

    // alert(id);
    setLeaveViewModal(true);
    setApplicationId(id)
    setFilterData(leaveDetailsData.filter((user) => user._id === id));
  };
  const handleCloseModal = () => {
    setLeaveViewModal(false);
  };
  // leave accepeted or rejected function

  const leaveAcceptedhandler =  async (e) => {
    
    // can be chack aplication is already accepted 
    if(filterData.isAccepted === true ){
      return
    }
    console.log(leaveRemark);
    console.log(applicationId)
    let isAccepted = true
    let isRejected = false  
//  console.log(filterData.isAccepted)

 

     const res = await axios.put(`${server}/leave/accepted/${applicationId}`, {leaveRemark, isAccepted , isRejected}, {
     withCredentials:true
     })


     console.log(res)
    
    // setleaveAccepted(true);
    setLeaveViewModal(false);
  };

  

  // Leave rejected handler
  const leaveRejectedHandler =  async (e) => {
    // setLeaveRejected(false);
    // setleaveAccepted(false);
   try{ 
    let isRejected = true
    let isAccepted = false
    const res = await axios.put(`${server}/leave/rejected/${applicationId}`, {leaveRemark,isRejected, isAccepted}, {
      withCredentials:true
    })
    console.log(res)
    setLeaveViewModal(false);
    
    }catch(error){
      alert(error.response.data.message)
    }

  };

  return (
    <div>
      {leaveDetailsData.length > 0 ? (
        <div className="overflow-x-auto  z-0 ">
          <table className="min-w-full table-auto">
            <thead className="bg-slate-400">
              <tr>
                <th className="border px-4 py-2">S.No</th>
                <th className="border px-4 py-2">Employee Name</th>
                <th className="border px-4 py-2">Leave type</th>
                <th className="border px-4 py-2">From Date</th>
                <th className="border px-4 py-2">To Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Reason</th>
                <th className="border px-4 py-2">Details</th>

                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {leaveDetailsData.map((leave, index) => (
                <tr
                  key={leave._id}
                  className={`text-center ${
                    leave.isSeen ? "bg-green-500" : " bg-sky-100"
                  }`}
                >
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{leave.name}</td>
                  <td className="border px-4 py-2">{leave.leaveType}</td>
                  <td className="border px-4 py-2">{leave.fromDate}</td>
                  <td className="border px-4 py-2">{leave.toDate}</td>
                  {/* <td className="border px-4 py-2">{leave.totalDaysofLeave}</td> */}


                  <td className="border px-4 py-2">



                    {/* Status */}
                    {leave.isAccepted && !leave.isRejected ? (
                      "Leave Accepted"
                      ) :
                      ( !leave.isAccepted && leave.isRejected ? (
                         "Leave Rejected"
                       ) : "pending ")

                  }
                 
         
                 
                  </td>
                  <td className="border px-4 py-2">{leave.reason}</td>
                  <td className="border px-4 py-2 hover:font-bold hover:bg-slate-400">
                    {" "}
                    <button className="" onClick={() => viewLeaveDetail(leave._id)}>
                      View
                    </button>
                  </td>

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

      {/* show model for rersponde of leave    */}
      {leaveViewModal && (
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
                    Leaves Details
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

              <div className="max-w-md  mt-8 p-4 bg-white rounded shadow-md">
                {/* staring date div */}
                <div className=" flex flex-row items-start gap-40">
                  <div className="text-xl  font-bold"> Starting Date </div>
                  <div className="font-bold ">{filterData[0]?.fromDate}</div>

                
                </div>

                {/* To date div  */}
                <div className=" flex flex-row items-start gap-[13.5rem]">
                  <div className="text-xl  font-bold"> to Date </div>
                  <div className="  font-bold ">{filterData[0]?.toDate}</div>
                </div>


                {/* To type of leave div  */}
                <div className=" flex flex-row items-start gap-[13.5rem]">
                  <div className="text-xl font-bold"> leave Type </div>
                  <div className="  font-bold ">{filterData[0]?.leaveType}</div>
                </div>
                <div className="flex  flex-row items-start gap-[9rem]">
                  <div className="text-xl font-bold"> Reason For Leave </div>
                  <div className="  font-bold ">{filterData[0]?.reason}</div>
                </div>
                <div>
                  <span className="text-black text-xl mt-2"> Remark</span>{" "}
                  <span>(Optional)</span>
                  <textarea
                    onChange={(e)=>setLeaveRemark(e.target.value)}
                    className="w-[25rem] h-[8rem] flex mx-auto mt-2 border-2 border-black"
                    type="text"
                    name="remark"
                    value={leaveRemark}
                  />
                </div>

                <div className="flex flex-row justify-evenly mt-4">
                  <button
                    onClick={leaveAcceptedhandler}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                  >
                    Accept
                  </button>
                  <button
                    onClick={leaveRejectedHandler}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                  >
                    Reject
                  </button>
                </div>
              </div>

       
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpLeave;
