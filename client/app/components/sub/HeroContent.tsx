import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/app/utils/motion";
import { SparklesIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";


const HeroContent = () => {
  const handleClick = () => {
    router.push("/courses");
  };

  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
   <>
    <motion.div initial="hidden" animate="visible" className="absolute top-0 left-0 flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]">
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start ">
        <motion.div variants={slideInFromTop} className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] ">
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5  " />
          <h1 className="Welcome-text text-[13px] ">E Learning Website Platfrom</h1>
        </motion.div>

        <motion.div variants={slideInFromLeft(0.5)} className="flex flex-col gap-6 mt-6 text-6xl font-bold dark:text-white text-[crimson] font-Josefin max-w-[600px] w-auto h-auto ">
          <span>
            Providing
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 font-Josefin"> The Best </span>
            Learning Experience
          </span>
        </motion.div>

        <motion.p variants={slideInFromLeft(0.8)} className="text-lg dark:text-white text-gray-400 my-5 max-w-[600px] font-Josefin">
          BrainNest Is a Platform For Getting To Know The World Of Programming. Find Fun Experiences In Studying Various Fields Of Informatics
        </motion.p>
        <motion.a variants={slideInFromLeft(1)} onClick={handleClick} className="py-2 button-primary text-center dark:text-white text-[crimson] cursor-pointer rounded-lg max-w-[200px]">
          Learn More !
        </motion.a>
        
      </div>

      <motion.div variants={slideInFromRight(0.5)} className="w-full h-full flex justify-center items-center left">
        <Image src="/assets/mainIconsdark.svg" alt="work icons" height={650} width={650} />
      </motion.div>
    </motion.div>
   </>
  );
};

export default HeroContent;
