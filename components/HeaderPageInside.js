"use client"
import { motion } from "framer-motion";
import Image from "next/image"
import Bell from "../public/bell.svg"
import classes from './HeaderPage.module.css'
import Greeting from "./Greating";
import { useEffect,useState } from "react";

import { useRouter } from 'next/navigation';

export default function HeaderPageClient(){
    const [userId,setUserId]=useState('');
    const router=useRouter()
    const [loading,setLoading]=useState(false);
    const [localStoragee,setLocalStorage]=useState('')

    useEffect(() => {
        const storage = localStorage.getItem("UserLogIn");
        setLocalStorage(storage)
        if (storage) {
            try {
              
                const parsedStorage = JSON.parse(storage);

               
                if (Array.isArray(parsedStorage) && parsedStorage.length > 0) {
                   
                    const { id } = parsedStorage[0];
                    setUserId(id);
                }
            } catch (error) {
                console.error('Error parsing localStorage item:', error);
            }
        }
    }, [localStoragee]);
    

console.log(userId)


function logOut(){
   localStorage.removeItem('UserLogIn')
   router.push('/')
   setLoading(true)

}

return (

    <header className={classes.header}>

<motion.div initial={{opacity:0,x:500}} animate={{opacity:1,x:0}} className={classes.walcomeDiv}>
<Greeting userGreat={userId} />
</motion.div>


<motion.div onClick={logOut} initial={{opacity:0,x:-500}} animate={{opacity:1,x:0}}     whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }} className={classes.userDiv}>
<p >{loading?"loading...":"Log Out" }</p> 
<Image src={Bell} height={30} width={30}></Image>  

</motion.div>

    </header>
)

}