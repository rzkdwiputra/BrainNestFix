'use client'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'
import EditFaq from "../../components/Admin/Customization/EditFaq"

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading title="BrainNest - Admin" description="BrainNest is a platform for people to learn and get course about Programing" keywords="Programing,MERN,Redux,Mechine learning" />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar/>
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <EditFaq/>
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default page