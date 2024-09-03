"use client"
import { motion } from "framer-motion";
import Image from "next/image"
import LogoImg from "../public/logo.png"
import Projects from "../public/cube.svg"
import HomeIcon from "../public/home.svg"
import Chat from "../public/chat.svg"
import Calendar from "../public/calendar.svg"
import Settings from "../public/settings.svg"
import classes from "./aside.module.css"
import Link from "next/link";


export default function AsideClient(){

     


      
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 0.2,
            staggerChildren: 0.1,
          },
        },
      };
    
      const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
        },
      };


      
    return (
<aside className={classes.aside}>



<motion.ul  initial="hidden" animate="visible" variants={container}>
<motion.li className={classes.list} variants={item}     whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}>
<Image src={LogoImg} width={150} height={150} variants={item} alt="logo"></Image >
</motion.li>

<motion.li className={classes.list} variants={item}     whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}>
<button className={classes.iconsDiv}>

<Image src={HomeIcon} width={25} height={25} alt="home icon"></Image>
<Link href="/deashboard" className={classes.link}><p>Home</p></Link>
</button>
</motion.li>


<motion.li className={classes.list} variants={item}     whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}>
<button  className={classes.iconsDiv}>
<Image src={Projects} width={20} height={20} alt="project icon"></Image>
<Link href="/Projects" className={classes.link}><p>Projects</p></Link>
</button>
</motion.li>

<motion.li className={classes.list} variants={item}     whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}>

<button  className={classes.iconsDiv}>
<Image src={Calendar} width={20} height={20} alt="calendar icon"></Image>
<Link href="/Calendar" className={classes.link}><p>Calendar</p></Link> 
</button>
</motion.li>

<motion.li className={classes.list} variants={item}     whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}>
<button  className={classes.iconsDiv}>
<Image src={Chat} width={20} height={20} alt="team chat icon"></Image>
<Link href="/Team" className={classes.link}><p>Team</p></Link>
</button>
</motion.li>

<motion.li className={classes.list}     whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }} variants={item}>
<button  className={classes.iconsDiv}>
<Image src={Settings} width={20} height={20} alt="settings icon"></Image>
<Link href="/Settings" className={classes.link}><p>Setings</p></Link>
</button>
</motion.li>

</motion.ul >










</aside>

    )

}