'use client'
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

type Props = {};

const page: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const {user} = useSelector ((state:any)=> state.auth)

  return (
    <div  >
      <Protected>
        <Heading title={`${user?.name} profile`}  description="BrainNest is a platform for everyone who wants to learn the world of programming" keywords="Programing,MERN,Redux,Mechine Learning, AI, Deep Learning, Data Analyst, Database" />
        <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
        <Profile user={user} />
      </Protected>
      <div className="mt-[55px]">
      <Footer/>
      </div>
      
    </div>
  );
};

export default page;
