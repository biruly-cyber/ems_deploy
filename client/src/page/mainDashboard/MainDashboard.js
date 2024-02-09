import React, { useEffect, useState } from 'react'
import AdminDashboard from '../admin/dashboard/AdminDashboard'
import axios from 'axios';
import { server } from '../../App';
import ManagerDashboard from '../manager/dashboard/ManagerDashboard';
import HrDashaboard from '../HR/new/HrDashaboard';
import EmployeeDashboard from '../employee/EmployeeDashboard';

const MainDashboard = () => {
  const [profile, setProfile] = useState({})

   //get profile
   useEffect(() => {
    const myProfile = async () => {
      const response = await axios.get(`${server}/users/me`, {
        withCredentials: true,
      });

      setProfile(response.data.user);
    };

    //invoke
    myProfile();
  }, []);
  return (
    <div>
         {/* admin dash board  */}
         {
          profile.designationType === "admin" && (<AdminDashboard/>)
         }

         {/* //manager dashboard  */}
         {
          profile.designationType === "manager" && (<ManagerDashboard/>)
         }

         {/* hr dashboard  */}
         {
          profile.designationType === "human resources" && (<HrDashaboard/>)
         }

         {/* //employee dashboard  */}
         {
          profile.designationType === "employee" && (<EmployeeDashboard/>)
         }
        
    </div>
  )
}

export default MainDashboard