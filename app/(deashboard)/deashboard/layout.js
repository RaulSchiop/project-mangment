import { Inter } from "next/font/google";
import "../../globals.css";
import Aside from '../../../components/Aside';
import HeaderPage from "../../../components/HeaderPage";
import classes from "../../../components/layout.module.css"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DeashBoard",
  description: "DeashBoard",
};

export default function RootLayout({ children }) {
 
 
  return (
    <div className={classes.divClass}>
      <div className={classes.divClass}>
        <div className="asideContent">
          <Aside />
          <main className="mainPart">
            <HeaderPage/>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
