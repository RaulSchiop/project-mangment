'use client';
import { motion } from 'framer-motion';
import classes from '../task/Tasks.module.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CalendarPageFull( ) {

  const [tasks, setTasks] = useState([]);
const [userId,setUserId]=useState('')
const [view, setView] = useState('year');
const [authenticated,setAuthenticated]=useState(false)
  useEffect(()=>{
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

    checkAuth()

    const storage=localStorage.getItem('UserLogIn')
    if (storage) {
      try{
    const parsedStorage=JSON.parse(storage)
    
    if(Array.isArray(parsedStorage) && parsedStorage.length > 0){
      const {id}=parsedStorage[0]
      setUserId(id)
    }
    
    }catch(error){
      console.log(error)
    }
    }
    },[])

  

  useEffect(() => {



    async function fetchTasks() {
      try {
        const res = await fetch('/api/tasks-user', {
          headers: { 'user-id': userId },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error('Unexpected data format:', data);
          setTasks([]);
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        setTasks([]);
      }
    }
    if(authenticated){
      fetchTasks();
    }

  }, [userId]);


 

  const taskDueDates = tasks.map(task => new Date(task.due_date).toDateString());

  const tileClassName = ({ date, view }) => {
    if (view === 'month' || view === 'year') {
      const dateString = date.toDateString();
      return taskDueDates.includes(dateString) ? classes.highlightedTile : null;
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'year') {
      const dateString = date.toDateString();
      const task = tasks.find(task => new Date(task.due_date).toDateString() === dateString);
      if (task) {
        return <div className={classes.tileContent}>{task.title}</div>;
      }
    }
  };

  const calendarVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      layout
      variants={calendarVariants}
      initial="hidden"
      animate="visible"
      className="calendar-container"
    >
      <Calendar
      view={view}
      onViewChange={({ activeStartDate, view }) => setView(view)}
        tileClassName={tileClassName}
        tileContent={tileContent}
      />

    </motion.div>
  );
}
