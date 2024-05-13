import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
 import { db } from "../../firebase";
import { Card, CardBody} from "react-bootstrap";

function CustomCategory() {
      const [customTodo, setCustomTodo] = useState("");
      const [customTodos, setCustomTodos] = useState([]);
 
  const { id } = useParams();

//   const createCustomCategory = async (e) => {
//     e.preventDefault();

//     const customCategories = {
//       title: customCategory || null,
//     };

//     try {
//       const docRef = await addDoc(collection(db, "customCategories"), {
//         ...customCategories,
//       });

//       window.location.reload();

//       console.log(docRef);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   };

  const createCustomTodo = async () => {
 
 //What will be saved in firebase
    const todo = {
      title: customTodo || null,
      todos: customTodos || null
    };
    console.log("add custom todo");


        try {
          const docRef = await setDoc(
            collection(db, "customCategories").where("id", "==", id),
            {
              ...todo,
            }
          );

          window.location.reload();

          console.log(docRef);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        setCustomTodo(todo)

    console.log(id)
   };

  return (
    <div>
      <div className="container">
        <h2>The id is: {id}</h2>
        <div className="d-flex gap-3">
          <input
            className="w-75 align-items-center
            "
            type="text"
            placeholder="Please enter your todo"
          />
          <button className="btn btn-primary" onClick={createCustomTodo}>
            Submit
          </button>
          {customTodos.map((todo, i) => (
            <Card>
              <CardBody>
                <div
                  className="d-flex justify-content-between align-items-center"
                  direction="vertical"
                  gap={3}
                >
                  <div>
                    <i className="fas fa-ticket"></i>
                  </div>
                </div>
              </CardBody>
              <CardBody>
                <div className="d-flex  justify-content-between gap-3 bg">
                  <div></div>
                  <div>
                    <p key={i} className="w-80 align-self-center">
                      <h1>hghghjjghj</h1>
                    </p>
                  </div>
                  <div>
                    <p className="no-wrap ">{todo.todos}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomCategory;
