"use client";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../components/styles/style";
import Coursecard from "../components/Route/Courses/Coursecard";
import Footer from "../components/Footer";

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useGetAllCoursesQuery(undefined, {}) as any;
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (data) {
      setCourses(data?.courses);
    }
  }, [data]);

  const categories = categoriesData?.layout.categories;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={1} />
          <div className={`w-[90%] 800px:w-[80%] m-auto`}>
            <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
              Expand Your Knowladge <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-Josefin"> Opportunity</span>
              <br />
              Opportunity With Our Courses
            </h1>
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses && courses.map((item: any, index: number) => <Coursecard item={item} key={index} />)}
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Page;
