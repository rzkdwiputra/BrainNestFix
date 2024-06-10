"use client"
import React from "react";
import Heading from "../utils/Heading";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/Admin/DashboardHero";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";

type Props = {};
const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading title="BrainNest - Admin" description="BrainNest is a platform for people to learn and get course about Programing" keywords="Programing,MERN,Redux,Mechine learning" />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar/>
          </div>
          <div className="w-[85%]">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
