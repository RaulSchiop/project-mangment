import { Inter } from "next/font/google";
import "../globals.css";
import classes from "../../components/layout.module.css"

import AsidePagesLayout from "../../components/AsidePages/AsidePagesLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Calendar",
  description: "Calendar",
};

export default function RootLayout({ children }) {
 
 
  return (
    <div className={classes.divClass}>
      <div  className={classes.divClass}>
        <div className="asideContent">
         <AsidePagesLayout></AsidePagesLayout>
          <main className="mainPart">
          
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
