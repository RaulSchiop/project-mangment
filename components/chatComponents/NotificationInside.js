"use client";
import classes from "./NotificationShort.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Modal from "../task/modal";

export default function NotificationClient() {
   const [task, setTasks] = useState([]);
   const [allTasks, setAllTasks] = useState([]);
   const [date, setDate] = useState("");
   const [userid, setId] = useState("");

   const [modal, setModal] = useState(false);

   const formatDate = (dateInput) => {
      const date = new Date(dateInput);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
   };

   useEffect(() => {
      const currentDate = new Date();
      setDate(formatDate(currentDate));

      const storage = localStorage.getItem("UserLogIn");
      if (storage) {
         try {
            const parsedStorage = JSON.parse(storage);
            if (Array.isArray(parsedStorage) && parsedStorage.length > 0) {
               const { id } = parsedStorage[0];
               setId(id);
            }
         } catch (error) {
            console.log(error);
         }
      }
   }, []);

   useEffect(() => {
      if (userid && date) {
         async function fetchTaskToday(useridd, datee) {
            try {
               const result = await fetch(
                  `/api/todayTasks?userId=${useridd}&date=${datee}`,
                  {
                     headers: {
                        "Content-Type": "application/json",
                     },
                  }
               );

               if (!result.ok) {
                  throw new Error("Could not fetch tasks");
               }

               const data = await result.json();
               setTasks(data);
               console.log(data);
            } catch (error) {
               console.log(error);
            }
         }

         fetchTaskToday(userid, date);
      }
   }, [userid, date]);

   useEffect(() => {
      async function fetchTasks() {
         try {
            const res = await fetch("/api/tasks-user", {
               method: "GET",
               headers: {
                  "user-id": userid.toString(),
               },
            });

            if (!res.ok) {
               throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();

            if (Array.isArray(data)) {
               setAllTasks(data);
            } else {
               console.error("Unexpected data format:", data);
               setAllTasks([]);
            }
         } catch (error) {
            console.error("Failed to fetch tasks:", error);
            setAllTasks([]);
         }
      }

      fetchTasks();
   }, [userid]);

   const item = {
      hidden: { y: 20, opacity: 0 },
      visible: {
         y: 0,
         opacity: 1,
      },
   };

   function openModal() {
      setModal(true);
   }

   function closeModal() {
      setModal(false);
   }

   return (
      <div
         variants={item}
         initial="hidden"
         animate="visible"
         className={classes.notifContiner}
      >
         <motion.div
            variants={item}
            initial="hidden"
            animate="visible"
            className={classes.shortNotif}
         >
            <h3>Today Tasks</h3>
            <button onClick={openModal} className={classes.buttonShortNotif}>
               {" "}
               <p> View all </p>{" "}
            </button>
         </motion.div>

         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={classes.lastNotificatio}
         >
            <ul>
               {task.length > 0 ? (
                  task.map((item) => (
                     <li key={item.id}>
                        <div className={classes.notifTask}>
                           <h3 className={classes.black}>{item.title}</h3>
                           <h3 className={classes.blue}>
                              {formatDate(item.due_date)}
                           </h3>
                        </div>
                     </li>
                  ))
               ) : (
                  <p>No tasks today</p>
               )}
            </ul>
         </motion.div>

         <Modal show={modal} onClose={closeModal}>
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className={classes.notifTaskModal}
            >
               <ul className={classes.modal}>
                  {allTasks.length > 0 ? (
                     allTasks.map((item) => (
                        <li key={item.id}>
                           <div className={classes.notifTask}>
                              <h3 className={classes.black}>{item.title}</h3>
                              <h3 className={classes.blue}>
                                 {formatDate(item.due_date)}
                              </h3>
                           </div>
                        </li>
                     ))
                  ) : (
                     <p>No tasks today</p>
                  )}
               </ul>
            </motion.div>
         </Modal>
      </div>
   );
}
