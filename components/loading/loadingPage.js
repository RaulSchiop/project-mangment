import Image from "next/image";
import loading from "../../public/loading.svg";
import classes from "./loading.module.css";
export default function LoadingPage() {
   return (
      <div className={classes.divLoading}>
         <Image src={loading} width={200} height={200} alt="loading..."></Image>
      </div>
   );
}
