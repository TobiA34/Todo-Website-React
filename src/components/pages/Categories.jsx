
import React, { useEffect, useState } from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import { collection, doc, getDocs, updateDoc,query, where } from "firebase/firestore";
import { db } from "../../firebase";

function Categories() {

      const [todos, setTodos] = useState([]);
      const [completedTasks, setCompletedTask] = useState([]);
    const [scheduleTodos, setScheduleTodos] = useState([]);
    const [todayTasks, setTodayTask] = useState([]);
    const [customLists, setCustomLists] = useState([])
    const currentDate = new Date(); 
    const newD = currentDate.toISOString().substring(0, 10);

      const fetchPost = async () => {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const todos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todos);
      };

      const getCompeletedTodo = async () => {
        const citiesRef = collection(db, "todos");

        const q = query(citiesRef, where("completed", "==", true));

        const querySnapshot = await getDocs(q);

        const completedTasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCompletedTask(completedTasks);
      };

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

        const getTodayTodo = async () => {
        const todosRef = collection(db, "todos");

        const q = query(todosRef, where("date", "==", newD));

        const querySnapshot = await getDocs(q);

        const todayTasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTodayTask(todayTasks);
      };

      useEffect(() =>{
        fetchPost()
        getCompeletedTodo()
        getScheduledTodo()
      },[])



  return (
    <Container>
      <h1 className="my-4 text-center">Categories</h1>
      <Row className="my-2 ms-4">
        <Link to={`/todos`} style={{ textDecoration: "none", color: "#000" }}>
          <Col
            xs={11}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            className="  ms-1 my-4 rounded p-3 border border-dark"
          >
            <div className="d-flex justify-content-between align-items-center my-3">
              <i class="fa-solid fa-calendar-days fa-2x rounded-border p-2 bg-grey"></i>
              <h1>{todos.length}</h1>
            </div>
            <h1 className="my-3">All</h1>
          </Col>
        </Link>

        <Link
          to={`/completed`}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <Col
            xs={11}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            className="border border-dark ms-1 my-4 rounded p-3"
          >
            <div className="d-flex justify-content-between align-items-center my-3">
              <i class="fa-regular fa-circle-check  fa-2x rounded-border p-2 bg-blue"></i>
              <h1>{completedTasks.length}</h1>
            </div>
            <h1 className="my-3">Completed</h1>
          </Col>
        </Link>
        <Link
          to={`/scheduled`}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <Col
            xs={11}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            className="border border-dark  ms-1 my-4 rounded p-3"
          >
            <div className="d-flex justify-content-between align-items-center my-3">
              <i class="fa-regular fa-calendar  fa-2x rounded-border p-2 bg-orange"></i>
              <h1>{scheduleTodos.length}</h1>
            </div>
            <h1 className="my-3">Scheduled</h1>
          </Col>
        </Link>
        <Link to={`/today`} style={{ textDecoration: "none", color: "#000" }}>
          <Col
            xs={11}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            className="border border-dark  ms-1 my-4 rounded p-3"
          >
            <div className="d-flex justify-content-between align-items-center my-3">
              <i class="fa-solid fa-calendar-week  fa-2x rounded-border p-2 bg-yellow bg-grey"></i>
              <h1>{todayTasks.length}</h1>
            </div>
            <h1 className="my-3">Today</h1>
          </Col>
        </Link>
      </Row>
      <Row>
        <Col>
          <hr />
          <h1 className="ms-4">Custom List</h1>
        </Col>
      </Row>
      {/* <Row>
        <Col sm>sm=true</Col>
        <Col sm>sm=true</Col>
        <Col sm>sm=true</Col>
      </Row> */}
    </Container>
  );
}

export default Categories
