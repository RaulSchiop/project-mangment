"use client";
import { motion } from "framer-motion";
import classes from "./people.module.css";
import React, { useState, useEffect } from "react";

export default function PeopleClient(){

    const [users, setUsers] = useState([]);

    useEffect(() => {
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
  
      fetchUsers();
    }, []);
  
    const container = {
      hidden: { opacity: 0, scale: 0 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          delayChildren: 0.2,
          staggerChildren: 0.1,
          delay:0.3,
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
    <div className={classes.divLayout}>
      <motion.p initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{delay:0.2}}>
        Some people
      </motion.p>
      <motion.ul
        className={classes.layout}
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
              <motion.li key={user.id} variants={item}>
                <h3>{user.name}</h3>
                <h4 style={contentStyle}>{user.role}</h4>
              </motion.li>
            );
          })
        ) : (
          <motion.li
            initial="hidden"
            animate="visible"
            variants={item}
          >
            No users available
          </motion.li>
        )}
      </motion.ul>
    </div>
  );
}