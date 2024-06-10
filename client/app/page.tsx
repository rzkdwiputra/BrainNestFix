"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import { useSelector } from "react-redux";
import Courses from "./components/Route/Courses/Courses";
import Reviews from "./components/Route/Reviews"
import FAQ from "./components/FAQ/FAQ"
import Footer from "./components/Footer"

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <>
      <Heading title={`${user?.name} profile - BrainNest`} description="BrainNest is a platform for everyone who wants to learn the world of programming" keywords="Programing,MERN,Redux,Mechine Learning, AI, Deep Learning, Data Analyst, Database" />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
      <Hero />
      <Courses/>
      <FAQ/>
      <br />
      <Footer/>
    </>
  );
};

export default Page;
