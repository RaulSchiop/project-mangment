"use client";

import { useState, useEffect } from "react";
import classes from "./Tasks.module.css";

import { AnimatePresence, motion } from "framer-motion";

export default function TaskWigetClient() {
   const [userId, setUserId] = useState("");

   const [tasks, setTasks] = useState([]);

   useEffect(() => {
      const storage = localStorage.getItem("UserLogIn");
      if (storage) {
         try {
            const parsedStorage = JSON.parse(storage);

            if (Array.isArray(parsedStorage) && parsedStorage.length > 0) {
               const { id } = parsedStorage[0];
               setUserId(id);
            }
         } catch (error) {
            console.log(error);
         }
      }
   }, []);

   const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
   };

   useEffect(() => {
      async function fetchTasks() {
         try {
            const res = await fetch("/api/tasks-user", {
               method: "GET",
               headers: {
                  "user-id": userId.toString(),
               },
            });

            if (!res.ok) {
               throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();

            if (Array.isArray(data)) {
               setTasks(data);
            } else {
               console.error("Unexpected data format:", data);
               setTasks([]);
            }
         } catch (error) {
            console.error("Failed to fetch tasks:", error);
            setTasks([]);
         }
      }

      fetchTasks();
   }, [userId]);

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

   const itemsss = {
      hidden: { y: 20, opacity: 0 },
      visible: {
         y: 0,
         opacity: 1,
      },
      exit: { y: 20, opacity: 0 },
   };

   async function fetchDelete(id) {
      try {
         const result = await fetch(`/api/deleteTasks?taskId=${id}`, {
            method: "DELETE",
         });

         if (result.ok) {
            console.log("Task deleted successfully");
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
         } else {
            const error = await response.json();
            console.error("Failed to delete task:", error);
         }
      } catch (error) {
         console.error("Error deleting task:", error);
      }
   }

   function handleDelete(id) {
      fetchDelete(id);
   }

   return (
      <div>
         <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className={classes.wiget}
         >
            <h3>Tasks</h3>
         </motion.div>
         <div className={classes.listDiv}>
            <motion.ul initial="hidden" animate="visible" variants={container}>
               <AnimatePresence>
                  {tasks.length === 0 ? (
                     <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                     >
                        No tasks available
                     </motion.p>
                  ) : (
                     tasks.map((task) => (
                        <motion.li
                           layout
                           variants={itemsss}
                           className={classes.list}
                           key={task.id}
                        >
                           <p style={{ color: "red" }}>{task.status}</p>
                           <h4>{task.title}</h4>
                           <p style={{ color: "#007bff" }}>
                              {formatDate(task.due_date)}
                           </p>
                           <motion.button
                              whileHover={{ scale: 1.1 }}
                              transition={{
                                 type: "spring",
                                 stiffness: 400,
                                 damping: 10,
                              }}
                              className={classes.button}
                              onClick={() => handleDelete(task.id)}
                           >
                              Delete
                           </motion.button>
                        </motion.li>
                     ))
                  )}
               </AnimatePresence>
            </motion.ul>
         </div>
      </div>
   );
}
