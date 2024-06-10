import Image from 'next/image'
import React from 'react'
import { styles } from '../styles/style'
import ReviewCard from "../Review/ReviewCard"

type Props = {}

export const reviews = [
    {
        name:"Gene Bates",
        avatar : "https://randomuser.me/api/portraits/men/1.jpg",
        profession : "Student | Cambridge university",
        comment:
        "Love this plugin! Does exactly what it is supposed to do and so far without any real issues. (You might want to review some Dummy Text generation which contains words and even sentences with a meaning and that should not suppose to happen)"
    },
    {
        name:"Verna Santos",
        avatar : "https://randomuser.me/api/portraits/women/1.jpg",
        profession : "Full stack developer | Quarter ltd.",
        comment:
        "Now that I can get to rate, I'd give it five.. My co-workers love the  dummy text the documents!! Works like a charm, as you might be able to figure out ;)"
    },
    {
        name:"Jay Gibbs",
        avatar : "https://randomuser.me/api/portraits/men/2.jpg",
        profession : "computer systems engineering student | Zimbabwwe",
        comment:
        "Well, seems like a nice plugin and all, but it doesn't work on mac.. Or atleast, I can't get it to work :( Tried to open the  by shortcut and by right-click - no such luck.. I won't be rating this plugin, since it  work on Mac, so no worries -- won't destroy the ratings.. Atleast not untill I try the plugin lol "
    },
    {
        name:"Mina Davidson",
        avatar : "https://randomuser.me/api/portraits/women/2.jpg",
        profession : "Junior Web Developer | Indonesia",
        comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing"
    },
    {
        name:"Rosemary Smith",
        avatar : "https://randomuser.me/api/portraits/women/3.jpg",
        profession : "Full stack web developer | Algeria",
        comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing"
    },
    {
        name:"Laura Lopez",
        avatar : "https://randomuser.me/api/portraits/women/4.jpg",
        profession : "Full stack web developer | Canada",
        comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing"
    },
]

const Reviews = (props: Props) => {
  return (
    <div className='w-[90%] 800px:w-[85%] m-auto ' >
        <div className='w-full 800px:flex items-center ' >
            <div className='800px:w-[50%] w-full' >
                <Image
                src={require("../../../public/assets/educatuion.png")}
                alt='education'
                width={700}
                height={700}
                />
            </div>
            <div className='800px:w-[50%] w-full'>
                <h3 className={`${styles.title} 800px:!text-[40px]`} >
                    Our Students Are <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500' >Our Strength</span>{" "}
                    <br />
                    See What They Say About Us
                </h3>
                <br />
                <p className={styles.label} >
                    Lorem ipsum dolor sit amet, consectetur adipis Lorem ipsum dolor sit amet, consectetur adipis adad askjhasdjkw  asdklhasjkdhasjk
                </p>
            </div>
            <br />
            <br />
        </div>
        <div className='grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6):!mt-[-40px]] ' >
            {reviews &&
                reviews.map((i, index)=> <ReviewCard item={i} key={index} /> )
            }
            </div>
    </div>
  )
}

export default Reviews