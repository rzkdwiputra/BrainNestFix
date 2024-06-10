import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import React, { FC, useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'

type Props = {}

const EditHero:FC<Props> = (props: Props) => {
    const [image,setImage] = useState ("")
    const [title,setTitle] = useState ("")
    const [subTitle, setSubTitle] = useState ("")
    const {data} = useGetHeroDataQuery("Banner",{
       refetchOnMountOrArgChange: true, 
    })

    useEffect(() => {
      if(data){
        setTitle(data?.layout?.banner.title)
        setSubTitle(data?.layout?.banner.subTitle)
        setImage(data?.layout?.banner.image?.url)
      }
    }, [data]);

    const handleUpdate = (e:any) =>{

    }
    

  return (
    <>
        <div className="w-full 1000px:flex items-center ">
            <div className='absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px] 1100px:w-[500px] h-[50vh] w-[50vh] hero_animation rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem] ' >
            <div className='1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10  ' >
                <div className='relative flex items-center justify-end ' >
                    <img
                    src={image}
                    alt=''
                    className='object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10] '
                    />
                    <input
                    type='file'
                    name=''
                    id='banner'
                    accept='image/*'
                    onChange={handleUpdate}
                    className='hidden'
                    />
                    <label htmlFor="banner" className='absolute bottom-0 right-0 z-20 ' >
                        <AiOutlineCamera className='dark:text-white text-black text-[18px] cursor-pointer ' />
                    </label>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default EditHero