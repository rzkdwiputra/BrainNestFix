'use client'
import React from 'react'
import CourseContent from "../../components/Course/CourseContent"

type Props = {
    params:any
}

const page = ({params}: Props) => {
    const id = params.id
    

  return (
   <div>
    <CourseContent id={id} />
   </div>
  )
}

export default page