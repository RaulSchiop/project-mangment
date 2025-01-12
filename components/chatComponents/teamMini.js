"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import InviteP from "../../public/peopleInvite.svg";
import classes from "./teamMini.module.css";
import Link from "next/link";

export default function MiniChat() {
   return (
      <>
         <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className={classes.wrapper}
         >
            <motion.h3
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.15 }}
            >
               Members
            </motion.h3>
            <div>
               <Link className={classes.Link} href="/Team">
                  <motion.button
                     whileHover={{ scale: 1.1 }}
                     transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                     }}
                     className={classes.buttonInvite}
                  >
                     <Image src={InviteP} width={20} height={20} alt=""></Image>
                     See all People
                  </motion.button>
               </Link>
            </div>
         </motion.div>
      </>
   );
}
