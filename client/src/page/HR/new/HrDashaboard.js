import React, { useEffect, useState } from "react";
import Titlebar from "../../../component/utilities-components/Titlebar";
import Card from "../../../component/admin/admin-card/Card";
import EmployeeTable from "../../../component/utilities-components/EmployeeTable";
import axios from "axios";
import { server } from "../../../App";

const HrDashaboard = () => {
  const [employeeData, setEmployeeData] = useState([]);
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

  return (
    <div>
      <div>
        <Titlebar title={"Dashboard"} />
      </div>
      <div className="flex justify-normal gap-20">
        <div className="flex justify-normal gap-10">
          <Card
            title="Employee"
            bgColor="bg-green-300"
            number={employeeData.length}
          />
          <Card title="Leave" bgColor="bg-red-300" number={20} />
        </div>
        <div>
          <div>
            <h1 className="text-xl uppercase p-2 font-semibold">
              Employee on leave
            </h1>
          </div>
          <div className="h-64 overflow-y-scroll">
            <EmployeeTable employeeData={employeeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashaboard;
