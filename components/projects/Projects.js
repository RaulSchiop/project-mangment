"use client";
import { useEffect, useState } from "react";
import classes from "./Projects.module.css";
import { motion } from "framer-motion";
import Modal from "../task/modal";
import { redirect, useRouter } from "next/navigation";

export default function Projects() {
   const [projects, setProjects] = useState([]);
   const [modalOpen, setModalIsOpen] = useState(false);
   const [tasks, setTasks] = useState([]);
   const [selectedProjectId, setSelectedProjectId] = useState(null);
   const [userId, setUserId] = useState("");
   const [authenticated, setAuthenticated] = useState(false);

   const router = useRouter();

   function handleClose() {
      setModalIsOpen(false);
   }

   async function fetchProjects() {
      try {
         const response = await fetch("/api/getProjects");
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }
         const data = await response.json();
         if (Array.isArray(data)) {
            setProjects(data);
         } else {
            console.error("Expected array but got:", data);
            setProjects([]);
         }
      } catch (error) {
         console.error("Error fetching projects:", error);
         setProjects([]);
      }
   }

   async function fetchTasks(projectId, userId) {
      try {
         const response = await fetch(
            `/api/tasksFromProject?projectId=${projectId}&userId=${userId}`
         );
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }
         const data = await response.json();
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

   useEffect(() => {
      function checkAuth() {
         if (typeof window !== "undefined") {
            const storageVerify = localStorage.getItem("UserLogIn");
            if (storageVerify) {
               setAuthenticated(true);
            } else {
               router.push("/");
            }
         }
      }
      checkAuth();

      fetchProjects();

      const storage = localStorage.getItem("UserLogIn");
      if (storage) {
         try {
            const parsedStorage = JSON.parse(storage);
            if (Array.isArray(parsedStorage) && parsedStorage.length > 0) {
               const { id } = parsedStorage[0];
               setUserId(id);
            }
         } catch (error) {
            console.error("Error parsing localStorage item:", error);
         }
      }
   }, [router]);

   const handleId = (idOpen) => {
      setSelectedProjectId(idOpen);
      if (userId) {
         fetchTasks(idOpen, userId);
         setModalIsOpen(true);
      }
   };

   const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
   };

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

   return (
      <>
         <motion.ul
            initial="hidden"
            animate="visible"
            variants={container}
            className={classes.ulClass}
         >
            {projects.map((project) => (
               <motion.li layout variants={itemsss} key={project.id}>
                  <div>
                     <h3>{project.name}</h3>
                     <p>{project.description}</p>
                     <motion.button
                        onClick={() => handleId(project.id)}
                        whileHover={{ scale: 1.1 }}
                        transition={{
                           type: "spring",
                           stiffness: 400,
                           damping: 10,
                        }}
                     >
                        See Tasks
                     </motion.button>
                  </div>
               </motion.li>
            ))}
         </motion.ul>

         <Modal show={modalOpen} onClose={handleClose}>
            <motion.ul
               initial="hidden"
               animate="visible"
               variants={container}
               className={classes.ulWraper}
            >
               {tasks.length < 1 ? (
                  <p className={classes.notasks}>No tasks</p>
               ) : (
                  tasks.map((task) => (
                     <motion.li
                        layout
                        variants={itemsss}
                        className={classes.ulClassModal}
                        key={task.id}
                     >
                        <p style={{ color: "red" }}>{task.status}</p>
                        <h4>{task.title}</h4>
                        <p style={{ color: "#007bff" }}>
                           {formatDate(task.due_date)}
                        </p>
                     </motion.li>
                  ))
               )}
            </motion.ul>
         </Modal>
      </>
   );
}
