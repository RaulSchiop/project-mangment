'use client'
import classes from './NotificationShort.module.css'
import { motion } from "framer-motion";

export default function NotificationClient(){
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
        },
      };


    return (

<div variants={item} initial="hidden" animate="visible" className={classes.notifContiner}>

<motion.div variants={item} initial="hidden" animate="visible" className={classes.shortNotif} >
<h3>
Notification
</h3> 
<button className={classes.buttonShortNotif}> <p> View all </p> </button> 
</motion.div>

<motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className={classes.lastNotificatio}>
    <h3>last notification</h3>
    <p className={classes.pColor}>date of notification</p>
</motion.div>

</div>
    )
}