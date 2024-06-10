import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import HeroContent from "../sub/HeroContent";
type Props = {};

const Hero: FC<Props> = (prop) => {
  
  return (
    <div className=" flex flex-col h-full w-full">
      <video autoPlay muted loop className="rotate-180 abolute top-[150px] left-0  w-full h-full object-cover ">
        <source src="/assets/blackhole.webm" type="video/webm" />
      </video>
      <HeroContent />
    </div>
  );
};
export default Hero;
