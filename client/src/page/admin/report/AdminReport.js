import React, { useEffect, useState } from 'react'
import { server } from '../../../App';
import axios from 'axios';

const AdminReport = () => {
    const [allProjectReport, setAllProjectReport] = useState([]);
    const [loading, setLoading] = useState(false)
    const [isScrap, setIsScrap] = useState(false)
  
 
    // load all the reports
    useEffect(() => {
      const reportData = async () => {
        const data = await axios.get(`${server}/reportProject/all`, {
          withCredentials: true,
        });
  
        const {success} = data.data 
        if(success){
          setAllProjectReport(data.data.allReportOfProject)
        }
      };
  
      // invocke
      reportData();
    }, [loading]);
  
    const onDeleteClick = async(id)=>{
    //   console.log(id)
      const response = await axios.delete(`${server}/reportProject/${id}`, {withCredentials:true})
      const {success, message} = response.data
      if(success){
          setLoading(true)
          alert(message)
      }
    }


    //project is scrap or not 
    const handleOncheckBox =(value)=>{
        console.log(value)
        setIsScrap((prev)=> !prev)
    }

  return (
    <>
    <table className="min-w-full border-collapse">
       <thead>
         <tr>
           <th className="border bg-gray-200 p-2">S.No</th>
           <th className="border bg-gray-200 p-2">Project Name</th>
           <th className="border bg-gray-200 p-2">Report Title</th>
           <th className="border bg-gray-200 p-2">Manager Name</th>
           <th className="border bg-gray-200 p-2">Status</th>
           <th className="border bg-gray-200 p-2">Submision Date</th>
           <th className="border bg-gray-200 p-2">Actions</th>
         </tr>
       </thead>
       <tbody>
         {allProjectReport.map((project, index) => (
           <tr key={index}>
             <td className="border p-2">{index+1}</td>
             <td className="border p-2">{project.projectName}</td>
             <td className="border p-2">{project.reportTitle}</td>
             <td className="border p-2">{project.managerName}</td>
             <td className="border p-2">{project.isProjectCompleted ? "Completed": "Not completed"}</td>
             <td className="border p-2">{project.createdAt}</td>
             <td className="border p-2">
               {/* <button
                 // onClick={() => onUpdateClick(project)}
                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
               >
                 Update
               </button> */}
               <button
                 onClick={() => onDeleteClick(project._id)}
                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
               >
                 Delete
               </button>
             </td>
             {/* <td className='border p-2'>
                <input type='checkbox' value={isScrap} onClick={(e)=>handleOncheckBox(e.target.value)}  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" />
             </td> */}
           </tr>
         ))}
       </tbody>
     </table>
   </>
  )
}

export default AdminReport