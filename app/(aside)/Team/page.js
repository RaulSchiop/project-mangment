'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import classes from "../../../components/Team.module.css"
import { useRouter } from "next/navigation";

export default function Team() {
  const [authenticated, setAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    function checkAuth() {
      if (typeof window !== 'undefined') {
        const storageVerify = localStorage.getItem('UserLogIn');
        if (storageVerify) {
          setAuthenticated(true);
        } else {
          router.push("/");
        }
      }
    }

    async function fetchUsers() {
      try {
        const res = await fetch("/api/users-with-roles");

        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
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

    checkAuth();
    if (authenticated) {
      fetchUsers();
    }
  }, [authenticated, router]);

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
    exit: { y: 20, opacity: 0 },
  };

  if (!authenticated) {
    return null; // or a loading spinner
  }

  return (
    <div className={classes.divPrin}>
      <motion.p initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        All people in this team
      </motion.p>
      <motion.ul
        className={classes.ulClass}
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {users.length > 0 ? (
          users.map((user) => {
            let contentStyle;
            if (user.role === 'owner') {
              contentStyle = { color: 'red' };
            } else if (user.role === 'admin') {
              contentStyle = { color: 'blue' };
            } else {
              contentStyle = { color: 'green' };
            }

            return (
              <motion.li key={user.id} variants={item} className={classes.liWrapper}>
                <h3>{user.name}</h3>
                <h4 style={contentStyle}>{user.role}</h4>
              </motion.li>
            );
          })
        ) : (
          <></>
        )}
      </motion.ul>
    </div>
  );
}
