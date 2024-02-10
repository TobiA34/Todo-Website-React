import React from 'react'
import { collection, getDocs,doc,deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
  import {toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

function DeleteTodo({todo}) {

          const removeFromFirestore = async (id) => {
            try {
              const docRef = doc(db, "todos", id);
              await deleteDoc(docRef);
              window.location.reload();
              toast.success("Deleted data");

              //Add toast
              console.log(docRef);
            } catch (error) {
              console.log(error);
            }
          };

  return (
    <>
      <i
        onClick={() => removeFromFirestore(todo.id)}
        className="fa fa-trash fa-1x  rounded-circle border border-primary p-2"
        aria-hidden="true"
      ></i>
    </>
  );
}

export default DeleteTodo
