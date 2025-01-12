import React from "react";
import classes from "./Modal.module.css";

const Modal = ({ show, onClose, children }) => {
   if (!show) {
      return null;
   }

   return (
      <div className={classes.modalOverlay}>
         <div className={classes.modal}>
            <button className={classes.closeButton} onClick={onClose}>
               &times;
            </button>
            <div className={classes.modalContent}>{children}</div>
         </div>
      </div>
   );
};

export default Modal;
