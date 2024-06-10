import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { styles } from "../styles/style";
import CourseContentList from "../Course/CourseContentList";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  data: any;
};

const CourseDetails = ({ data }: Props) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const user = userData?.user;
  const discountPercentenge = ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  const discountPercentengePrice = discountPercentenge.toFixed(0);

  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5 ">
        <div className="w-full flex flex-col-reverse 800px:flex-row ">
          <div className="w-full 800px:w-[65%] 800px:pr-5 ">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">{data.name}</h1>
            <div className="flex items-center justify-between pt-3 "></div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">What you will leanr from this course?</h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div className="w-full flex 800px:items-center py-2" key={index}>
                  <div className="w-[15px] mr-1 ">
                    <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white " />
                  </div>
                  <p className="pl-2 text-black dark:text-white "> {item.title} </p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">What are the prerequisites fot starting this course</h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2 " key={index}>
                <div className="w-[15px] mr-1 ">
                  <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white" />
                </div>
                <p className="pl-2 text-black dark:text-white "> {item.title} </p>
              </div>
            ))}
            <br />
            <br />
            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">Course Overriew</h1>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>
            <br />
            <br />
            {/* course description */}
            <div className="w-full">
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white ">Course Details</h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white ">{data.description}</p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex items-center "></div>
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative ">
            <div className="sticky top-[100px] left-0 z-50 w-full ">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center "></div>
              <div className="flex items-center "></div>
              <br />
              <p className="pb-1 text-black dark:text-white ">~ Source code included</p>
              <p className="pb-1 text-black dark:text-white ">~ Full lifetime access</p>
              <p className="pb-3 800px:pb-1 text-black dark:text-white ">~ Premium Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;