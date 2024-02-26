import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
 import { Card, CardBody, Stack } from "react-bootstrap";

function Today() {
const [todayTasks, setTodayTask] = useState([]);
    const currentDate = new Date();
    const newD = currentDate.toISOString().substring(0, 10);
const getTodayTodo = async () => {
  const todosRef = collection(db, "todos");

  const q = query(todosRef, where("date", "==", newD ));

  const querySnapshot = await getDocs(q);

  const todayTasks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  setTodayTask(todayTasks);
};

useEffect(() => {
  getTodayTodo();
});
return (
  <section className="todo-container bg-grey">
    <div className="todo">
      <h1>Number of todos today: {todayTasks.length} </h1>

      <div className="todo-content ">
        {todayTasks.map((todo, i) => (
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
      {todayTasks.length === 0 && <h1>No Tasks Today😭</h1>}
    </div>
  </section>
);
}

export default Today
