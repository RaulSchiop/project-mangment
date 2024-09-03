'use client';

import { useEffect, useState } from "react";
import CalendarComponent from "../components/calendar/Calendar";
import NotifShort from "../components/chatComponents/NotificationShort";
import People from "../components/chatComponents/people";
import MiniChat from "../components/chatComponents/teamMini";
import Tasks from "../components/task/TasksWiget";
import { redirect } from "next/navigation";

export default function HomeInside() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem('UserLogIn');
      if (storage) {
        setAuthenticated(true);
      } else {
        redirect("/");
      }
    }
  }, []);

  if (!authenticated) {
    return null; 
  }

  return (
    <div className="grid-container">
      <div className="item item1">
        <CalendarComponent />
      </div>

      <div className="item item2">
        <NotifShort />
      </div>

      <div className="item item3">
        <MiniChat />
      </div>

      <div className="item item4">
        <People />
      </div>

      <div className="item item5">
        <Tasks />
      </div>
    </div>
  );
}
