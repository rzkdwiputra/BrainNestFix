"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsMoonStars,BsSun  } from "react-icons/bs";

export const ThemeSwitcher = () => {
    const [mounted,setMounted] = useState(false);
    const {theme,setTheme} = useTheme(); 

    useEffect(()=> setMounted(true),[]);

    if(!mounted){return null}

    return (
       <div className="flex items-center justify-center mx-4 ">
        {
            theme == "light"?(
                <BsMoonStars
                className="cursor-pointer"
                fill="black"
                size={25}
                onClick={()=>setTheme("dark")}
                />
            ): (
                <BsSun
                size={25}
                className="cursor-pointer"
                onClick={()=> setTheme("light")}
                />
            )
        }
       </div>
    )
}