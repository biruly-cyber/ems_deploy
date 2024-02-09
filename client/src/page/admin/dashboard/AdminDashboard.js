import React, { useEffect, useState } from 'react'
import Header from '../../../component/utilities-components/Header'
import SideNavbar from '../../../component/admin/admin-sidenavbar/SideNavbar'
import {Outlet} from "react-router-dom"
import Card from '../../../component/admin/admin-card/Card'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import axios from 'axios'
import { server } from '../../../App'

const AdminDashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [allProject, setAllProject] = useState([]);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];


  

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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await axios.get(`${server}/project/all`, {
          withCredentials: true,
        });
        setAllProject(projectData.data.allProject);
        console.log(projectData)
      } catch (error) {
        console.error("Error fetching project data:", error.message);
        alert(error.message)
      }
    };
  
    fetchData();
  }, [setAllProject]);
  
  


  

  // filter out iscompleted or not
  const completedProjects = allProject.filter(
    (project) => project.isCompleted === true
  );
  const inCcompletedProjects = allProject.filter(
    (project) => project.isCompleted === false
  );
  return (
    <>
        {/* card  */}
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <Card
            title="Employee"
            imageUrl="https://placekitten.com/100/100" // Replace with your actual image URL
            number={employeeData.length}
            bgColor={`bg-red-200`}
          />
        </div>
        <div className="col-span-3">
          <Card
            title="Project"
            imageUrl="https://placekitten.com/100/100" // Replace with your actual image URL
            number={allProject.length}
            bgColor={`bg-green-200`}
          />
        </div>
        <div className="col-span-3">
          <Card
            title="Ongoing "
            imageUrl="https://placekitten.com/100/100" // Replace with your actual image URL
            number={inCcompletedProjects.length}
            bgColor={`bg-yellow-200`}
          />
        </div>
        <div className="col-span-3">
          <Card
            title="Completed "
            imageUrl="https://placekitten.com/100/100" // Replace with your actual image URL
            number={completedProjects.length}
            bgColor={`bg-blue-200`}
          />
        </div>
      </div>
      {/* card end  */}

      <div className="w-full mt-5">
         <div className="mb-5"><span className="ml-10 text-md  font-bold">Project Status</span></div>
          <LineChart
            width={1250}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis/>
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
       
      </div>
    </>
  )
}

export default AdminDashboard