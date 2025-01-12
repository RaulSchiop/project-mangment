"use client";
import { useState } from "react";
import clases from "../Auth/Auth.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { signup, logIn } from "../../app/actions/auth";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Auth() {
   const [logInState, setLogInState] = useState(false);
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   async function handleLogIn(event) {
      event.preventDefault();
      const formDataLogIn = new FormData(event.target);
      setLoading(true);
      try {
         const logINResult = await logIn(formDataLogIn);
         console.log(logINResult);

         localStorage.setItem("UserLogIn", JSON.stringify(logINResult));

         router.push("/deashboard");

         if (typeof window !== "undefined") {
            const storage = localStorage.getItem("UserLogIn");

            if (storage) {
               try {
                  const parsedStorage = JSON.parse(storage);

                  if (
                     Array.isArray(parsedStorage) &&
                     parsedStorage.length > 0
                  ) {
                     const { id } = parsedStorage[0];

                     if (id === 5) {
                        router.push("/Admin");
                     } else {
                        router.push("/deashboard");
                     }
                  }
               } catch (error) {
                  console.error("Error parsing JSON:", error);
               }
            }
         }

         if (logINResult) {
            setInterval(
               () => {
                  localStorage.removeItem("UserLogIn");
               },
               20072 * 60 * 60 * 10000
            );
         }
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   }

   async function handleSubmitCreate(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      setLoading(true);

      try {
         const result = await signup(formData);
         setLogInState(!logInState);
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   }

   function handleChange() {
      setLogInState(!logInState);
   }

   return (
      <div className={clases.mainD}>
         <div className={clases.layout}>
            <AnimatePresence mode="wait">
               {logInState ? (
                  <motion.div
                     key="login"
                     initial={{ y: 500, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: -500, opacity: 0 }}
                     transition={{ duration: 0.5 }}
                     className={clases.formDiv}
                  >
                     <form onSubmit={handleLogIn} className={clases.form}>
                        <h1>Log in</h1>
                        <div className={clases.inputDiv}>
                           <input
                              type="email"
                              name="Email"
                              required
                              placeholder="Email"
                           />
                           <input
                              type="password"
                              name="Password"
                              required
                              placeholder="Password"
                           />
                        </div>
                        <div className={clases.buttonsDiv}>
                           <button
                              disabled={loading}
                              href="/deashboard"
                              type="submit"
                           >
                              {loading ? "Loading..." : "Log in"}
                           </button>
                        </div>
                     </form>
                  </motion.div>
               ) : (
                  <motion.div
                     key="signin"
                     initial={{ y: 500, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: -500, opacity: 0 }}
                     transition={{ duration: 0.5 }}
                     className={clases.formDiv}
                  >
                     <form
                        className={clases.form}
                        onSubmit={handleSubmitCreate}
                     >
                        <h1>Sign In</h1>
                        <div className={clases.inputDiv}>
                           <input
                              type="email"
                              name="Email"
                              required
                              placeholder="Email"
                           />
                           <input
                              type="text"
                              name="Name"
                              required
                              placeholder="Name"
                           />
                           <input
                              type="password"
                              name="Password"
                              required
                              placeholder="Password"
                           />
                        </div>
                        <div className={clases.buttonsDiv}>
                           <button type="submit" disabled={loading}>
                              {loading ? "Loading..." : "Create Account"}
                           </button>
                        </div>
                     </form>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
         <aside className={clases.asideD}>
            <AnimatePresence mode="wait">
               {logInState ? (
                  <motion.div
                     key="create-account"
                     initial={{ y: -500, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: 500, opacity: 0 }}
                     transition={{ duration: 0.5 }}
                     className={clases.formDiv}
                  >
                     <h1>Create Account</h1>
                     <p>Register with your details to use our site</p>
                     <button onClick={handleChange}>Create Account</button>
                  </motion.div>
               ) : (
                  <motion.div
                     key="log-in"
                     initial={{ y: -500, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: 500, opacity: 0 }}
                     transition={{ duration: 0.5 }}
                     className={clases.formDiv}
                  >
                     <h1>Log in</h1>
                     <p>Log in with your details to use our site</p>
                     <button onClick={handleChange}>Log In</button>
                  </motion.div>
               )}
            </AnimatePresence>
         </aside>
      </div>
   );
}
