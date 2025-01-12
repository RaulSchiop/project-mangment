"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import LogoImg from "../../public/logo.png";
import Projects from "../../public/cube.svg";
import HomeIcon from "../../public/home.svg";
import Chat from "../../public/chat.svg";
import Calendar from "../../public/calendar.svg";
import Settings from "../../public/settings.svg";
import classes from "../aside.module.css";
import Link from "next/link";

export default function AsidePages() {
   return (
      <aside className={classes.aside}>
         <motion.ul>
            <motion.li
               className={classes.list}
               whileHover={{ scale: 1.1 }}
               transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
               <Image src={LogoImg} width={150} height={150} alt="logo"></Image>
            </motion.li>

            <motion.li
               className={classes.list}
               whileHover={{ scale: 1.1 }}
               transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
               <button className={classes.iconsDiv}>
                  <Image
                     src={HomeIcon}
                     width={25}
                     height={25}
                     alt="home icon"
                  ></Image>
                  <Link href="/deashboard" className={classes.link}>
                     <p>Home</p>
                  </Link>
               </button>
            </motion.li>

            <motion.li
               className={classes.list}
               whileHover={{ scale: 1.1 }}
               transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
               <button className={classes.iconsDiv}>
                  <Image
                     src={Projects}
                     width={20}
                     height={20}
                     alt="project icon"
                  ></Image>
                  <Link href="/Projects" className={classes.link}>
                     <p>Projects</p>
                  </Link>
               </button>
            </motion.li>

            <motion.li
               className={classes.list}
               whileHover={{ scale: 1.1 }}
               transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
               <button className={classes.iconsDiv}>
                  <Image
                     src={Calendar}
                     width={20}
                     height={20}
                     alt="calendar icon"
                  ></Image>
                  <Link href="/Calendar" className={classes.link}>
                     <p>Calendar</p>
                  </Link>
               </button>
            </motion.li>

            <motion.li
               className={classes.list}
               whileHover={{ scale: 1.1 }}
               transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
               <button className={classes.iconsDiv}>
                  <Image
                     src={Chat}
                     width={20}
                     height={20}
                     alt="team chat icon"
                  ></Image>
                  <Link href="/Team" className={classes.link}>
                     <p>Team</p>
                  </Link>
               </button>
            </motion.li>
         </motion.ul>
      </aside>
   );
}
