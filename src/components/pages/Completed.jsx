 import React, { useState, useEffect } from "react";
  import { db } from "../../firebase";
 import { Card, CardBody, Stack } from "react-bootstrap";
import {
  doc,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
function Completed() {

const [completedTasks, setCompletedTask] = useState([])

const getCompeletedTodo = async () => {

    const todosRef = collection(db, "todos");

    const q = query(todosRef, where("completed", "==", true));

    const querySnapshot = await getDocs(q);

    const completedTasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCompletedTask(completedTasks);
}

useEffect(()=> {
    getCompeletedTodo()
})
  return (
    <section className="todo-container bg-grey">
      <div className="todo">
        <h1>Number of completed Todos: {completedTasks.length} </h1>
 
        <div className="todo-content ">
          {completedTasks.map((todo, i) => (
              <Card
                className={todo.completed ? "underline" : null}
                style={{ backgroundColor: `${todo.color}`, margin: "30px 0" }}
              >
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
                    <div>
                    </div>
                    <div>
                      <p key={i} className="w-80 align-self-center">
                        {todo.todo}
                      </p>
                    </div>
                    <div>
                      <p className="no-wrap ">{todo.date}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
        </div>
        {completedTasks.length === 0 && <h1>No Completed Tasks 😭</h1>}
      </div>
    </section>
  );
}

export default Completed
