"use client";
import Modal from "../task/modal";
import { useEffect, useState, useMemo } from "react";
import HeaderPage from "../HeaderPage";
import { useRouter } from "next/navigation";
import classes from "./AdminPage.module.css";

export default function AdminPage() {
   const [authenticated, setAuthenticated] = useState(false);
   const router = useRouter();

   const [users, setUsers] = useState([]);
   const [projects, setProjects] = useState([]);

   const [modalOpen, setModalIsOpen] = useState(false);

   const [modalOpen2, setModalIsOpen2] = useState(false);
   const [modalOpen3, setModalIsOpen3] = useState(false);

   const [tasks, setTasks] = useState([]);

   async function createTask(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formDataObject = Object.fromEntries(formData.entries());
      console.log(formDataObject);
      try {
         const response = await fetch(
            `/api/addTasks?title=${formDataObject.title}&due_date=${formDataObject.due_date}&assigned_to=${formDataObject.assigned_to}&description=${formDataObject.description}&projectName=${formDataObject.projectName}&status=${formDataObject.status}`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }
         const data = await response.json();
         setModalIsOpen3(false);
         window.location.reload();
         return data;
      } catch (error) {
         console.log(error);
      }
   }

   async function createNewProject(event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const name = formData.get("Name");
      const description = formData.get("Description");
      const owner = formData.get("owner");

      console.log(name);
      console.log(description);
      console.log(owner);

      try {
         const response = await fetch(
            `/api/createNewProject?Name=${name}&Description=${description}&owner=${owner}`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }
         const data = await response.json();
         setModalIsOpen2(false);
         window.location.reload();
         return data;
      } catch (error) {
         console.log(error);
      }
   }

   async function deleteUser(id) {
      try {
         const response = await fetch(`/api/deleteUser?userID=${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
         });
         const data = await response.json();
         setUsers((prevUser) => prevUser.filter((items) => items.id !== id));
         return data;
      } catch (error) {
         console.log(error);
      }
   }

   async function handleDelete(id) {
      try {
         const response = await fetch(`/api/deleteProject?projectId=${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
         });

         const data = await response.json();
         setProjects((prevProj) => prevProj.filter((items) => items.id !== id));
      } catch (error) {
         console.log(error);
      }
   }

   function handleCloseModal3() {
      setModalIsOpen3(false);
   }
   function openModal3() {
      setModalIsOpen3(true);
   }

   function handleCloseModal2() {
      setModalIsOpen2(false);
   }
   function openModal2() {
      setModalIsOpen2(true);
   }

   async function fetchTasks(id) {
      try {
         const res = await fetch("/api/tasks-user", {
            method: "GET",
            headers: {
               "user-id": id.toString(),
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

   function handleClose() {
      setModalIsOpen(false);
   }

   function getUserId(id) {
      fetchTasks(id);
      setModalIsOpen(true);
   }

   function deleteUsers(id) {
      deleteUser(id);
   }

   useEffect(() => {
      async function fetchUsers() {
         try {
            const res = await fetch("/api/usersFatch");

            if (!res.ok) {
               throw new Error(
                  `Network response was not ok: ${res.statusText}`
               );
            }
            const data = await res.json();

            if (Array.isArray(data)) {
               setUsers(data);
            } else {
               console.error("Expected array but got:", data);
               setUsers([]);
            }
         } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]);
         }
      }

      async function fetchProjects() {
         try {
            const response = await fetch("/api/getProjects");
            if (!response.ok) {
               throw new Error("could not fetch");
            }
            const dataProjcts = await response.json();
            if (Array.isArray(dataProjcts)) {
               setProjects(dataProjcts);
            } else {
               setProjects([]);
            }
         } catch (error) {
            console.log(error);
            setProjects([]);
         }
      }
      fetchProjects();
      fetchUsers();
   }, []);

   useEffect(() => {
      if (typeof window !== "undefined") {
         const storage = localStorage.getItem("UserLogIn");
         if (storage) {
            try {
               const parsedStorage = JSON.parse(storage);
               if (Array.isArray(parsedStorage) && parsedStorage.length > 0) {
                  const { id } = parsedStorage[0];
                  if (id === 5) {
                     setAuthenticated(true);
                  } else {
                     router.push("/deashboard");
                  }
               }
            } catch (error) {
               console.error("Error parsing JSON:", error);
            }
         } else {
            router.push("/");
         }
      }
   }, [router]);

   const filteredUsers = useMemo(() => {
      if (authenticated) {
         return users.filter((user) => user.name === "admin");
      }
      return [];
   }, [authenticated, users]);

   if (!authenticated) {
      return null;
   }

   const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
   };

   return (
      <div className={classes.wrapper}>
         <HeaderPage />

         <ul>
            <h2>Users</h2>
            {users.map((user) => (
               <div className={classes.liDiv}>
                  <li key={user.id}>
                     <p>{user.name}</p>
                  </li>

                  <div className={classes.buttonsDiv}>
                     <button
                        onClick={() => getUserId(user.id)}
                        className={classes.button}
                     >
                        See Tasks
                     </button>
                     <button
                        onClick={() => deleteUsers(user.id)}
                        className={classes.button}
                     >
                        Delete User
                     </button>
                  </div>
               </div>
            ))}
            <Modal show={modalOpen} onClose={handleClose}>
               <ul>
                  <button onClick={openModal3}>+</button>

                  <Modal show={modalOpen3} onClose={handleCloseModal3}>
                     <h2>Add New Tasks</h2>
                     <form onSubmit={createTask}>
                        <input type="text" placeholder="Title" name="title" />
                        <input
                           type="date"
                           placeholder="Due date"
                           name="due_date"
                        />
                        <input
                           type="text"
                           placeholder="Assign to"
                           name="assigned_to"
                        />
                        <input
                           type="text"
                           placeholder="description"
                           name="description"
                        />
                        <input
                           type="text"
                           placeholder="Project name"
                           name="projectName"
                        />
                        <input type="text" placeholder="Status" name="status" />
                        <button type="submit">Create Tasks</button>
                     </form>
                  </Modal>
                  {tasks.length < 1 ? (
                     <p>No tasks</p>
                  ) : (
                     tasks.map((items) => (
                        <li key={items.id} className={classes.listModalDiv}>
                           <p style={{ color: "red" }}>{items.status}</p>
                           <h4>{items.title}</h4>
                           <p style={{ color: "#007bff" }}>
                              {formatDate(items.due_date)}
                           </p>
                        </li>
                     ))
                  )}
               </ul>
            </Modal>
         </ul>
         <div className={classes.wrapper}>
            <ul>
               <div className={classes.buttonsDiv}>
                  <h2>Projects</h2>
                  <button className={classes.button} onClick={openModal2}>
                     +
                  </button>
               </div>
               {projects.map((proj) => (
                  <div className={classes.liDiv}>
                     <li key={proj.id}>
                        <p>{proj.name}</p>
                     </li>
                     <div className={classes.buttonsDiv}>
                        <button
                           className={classes.button}
                           onClick={() => handleDelete(proj.id)}
                        >
                           Delete Project
                        </button>
                     </div>
                  </div>
               ))}
               <Modal show={modalOpen2} onClose={handleCloseModal2}>
                  <h2>Add New Project</h2>
                  <form onSubmit={createNewProject}>
                     <input
                        type="text"
                        placeholder="Project Name"
                        name="Name"
                     />
                     <input
                        type="text"
                        placeholder="Project Description"
                        name="Description"
                     />
                     <input type="text" placeholder="Owner" name="owner" />
                     <button type="submit">Create Project</button>
                  </form>
               </Modal>
            </ul>
         </div>
      </div>
   );
}
