import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Login from "./page/auth/Login";
import AdminDashboard from "./page/admin/dashboard/AdminDashboard";
import Home from "./page/home/Home";
import Employee from "./page/admin/Total_employees/Employee";
import NewProject from "./page/admin/project/NewProject";
import AllProject from "./page/admin/project/AllProject";
import MainDashboard from "./page/mainDashboard/MainDashboard";
import NewEmployee from "./page/HR/new/NewEmployee";
import HrDashaboard from "./page/HR/new/HrDashaboard";
import ManagerDashboard from "./page/manager/dashboard/ManagerDashboard";
import NewTask from "./page/manager/task/NewTask";
import AllTask from "./page/manager/task/AllTask";
import EmployeeDashboard from "./page/employee/EmployeeDashboard";
import ReportHistory from "./page/employee/ReportHistory";
import ManagerProject from "./page/manager/project/ManagerProject";
import ManagerReport from "./page/manager/report/ManagerReport";
import AdminReport from "./page/admin/report/AdminReport";
import ManagerProjectDetails from "./page/manager/project/ManagerProjectDetails";
import TaskReportFeedback from "./page/employee/TaskReportFeedback";
import EmpLeave from "./page/manager/empleaves/EmpLeave";
import Team from "./page/admin/team/Team";
import AppVersion from "./page/admin/AppVersion/AppVersion";



export const server = "http://localhost:4000/api/v1"

function App() {
  return (
    // <Login/>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        {/* //protected route  */}
        <Route path="/dashboard" element={<Home/>}>
          <Route path="" element={<Navigate to="home" />} />
          <Route path="home" element={<MainDashboard />} />
          <Route path="employee" element={<Employee/>}/>
          <Route path="newProject" element={<NewProject/>}/>
          <Route path="allProject" element={<AllProject/>}/>
          <Route path="adminreport" element={<AdminReport/>}/>
          <Route path="AppVersion" element={<AppVersion/>}/>

        {/* Team for all  */}
          <Route path="newTeam" element={<Team/>}/>

          {/* //common  */}
          <Route path="newEmployee" element={<NewEmployee/>}/>

          {/* hr  */}
          <Route path="hrdashboard" element={<HrDashaboard/>}/>

          {/* manager  */}
          <Route path="managerdashboard" element={<ManagerDashboard/>}/>
          <Route path="task" element={<NewTask/>}/>
          <Route path="alltask" element={<AllTask/>}/>
          <Route path="managerproject" element={<ManagerProject/>}/>
          <Route path="managerreport" element={<ManagerReport/>}/>
          <Route path="projectdetails" element={<ManagerProjectDetails/>}/>
          <Route path="empleave" element={<EmpLeave/>}/>




          {/* employee  */}
          <Route path="employeedashboard" element={<EmployeeDashboard/>}/>
          <Route path="reporthistory" element={<ReportHistory/>}/>
          <Route path="taskreportfeedback" element={<TaskReportFeedback/>}/>



        </Route>
      </Routes>
    </Router>
  );
}

export default App;
