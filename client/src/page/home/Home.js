import React from "react";

import Header from "../../component/utilities-components/Header";
import SideNavbar from "../../component/admin/admin-sidenavbar/SideNavbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  // console.log(completedProjects.length)

  return (
    <>
      {/* header  */}
      <div className="fixed w-full">
        <Header />
      </div>
      {/* header end  */}

      {/* main content  */}
      <div className="grid grid-cols-12 overflow-x-hidden">
        {/* SideNavbar  */}
        <div className="col-span-2 bg-slate-800 fixed mt-16">
          <SideNavbar />
        </div>
        {/* SideNavbar end */}

        {/* outlet  */}
        <div className="col-span-10 bg-slate-50 w-full  p-4 ml-64 mt-20 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
