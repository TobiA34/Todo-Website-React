import React from 'react'
import { collection, getDocs,doc,deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

function DeleteTodo({todo}) {

          const removeFromFirestore = async (id) => {
            try {
              const docRef = doc(db, "todos", id);
              await deleteDoc(docRef);
              window.location.reload();
              console.log(docRef);
            } catch (error) {
              console.log(error);
            }
          };

  return (
    <div>
      <button onClick={() => removeFromFirestore(todo.id)}>Delete</button>
    </div>
  );
}

export default DeleteTodo
