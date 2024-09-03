"use client";
import { useEffect, useState } from "react";

export default function GreetingClient({ userGreats }) { 
    const userId = userGreats; 
    const [userGreething, setUserGreeting] = useState("Guest");

    useEffect(() => {
        async function fetchName() {
          
            try {
                const res = await fetch("/api/users-name", { headers: { "user-id": userId.toString() } });

                if (!res.ok) {
                    throw new Error('Failed to fetch');
                }

                const data = await res.json();
                
                setUserGreeting(data.greeting || "Loading..."); 
            } catch (error) {
                console.error("Failed to fetch user name:", error);
            }
        }

        fetchName();
    }, [userId]);

    return <p>{userGreething}</p>;
}
