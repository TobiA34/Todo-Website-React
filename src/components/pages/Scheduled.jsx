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

function Scheduled() {
    const [scheduleTodos, setScheduleTodos] = useState([]);
  const currentDate = new Date();
  const newD = currentDate.toISOString().substring(0, 10);

    const getScheduledTodo = async () => {
      const todosRef = collection(db, "todos");

      const q = query(todosRef, where("date", ">=", newD));

      const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        // // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        // });
      const scheduleTodos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setScheduleTodos(scheduleTodos);
    };

    useEffect(() => {
      getScheduledTodo();
    });
  return (
    <section className="todo-container bg-grey">
      <div className="todo">
        <h1>Number of Scheduled Todos: {scheduleTodos.length} </h1>

        <div className="todo-content ">
          {scheduleTodos.map((todo, i) => (
            <Card
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
                  <div></div>
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
        {scheduleTodos.length === 0 && <h1>No Schedule Tasks 😭</h1>}
      </div>
    </section>
  );
}

export default Scheduled
