import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { collection, getDocs, addDoc, query, where, doc } from "firebase/firestore";
import { db } from "../../firebase";

function Categories() {
  const [todos, setTodos] = useState([]);
  const [completedTasks, setCompletedTask] = useState([]);
  const [scheduleTodos, setScheduleTodos] = useState([]);
  const [todayTasks, setTodayTask] = useState([]);
  const [customCategory, setCustomCategory] = useState("");
    const [customCategories, setCustomCategories] = useState([]);
 
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

 
    const createCustomCategory = async (e) => {
      e.preventDefault();

      const customCategories = {
        title: customCategory || null,
      };

      try {
        const docRef = await addDoc(collection(db, "customCategories"), {
          ...customCategories,
        });

        window.location.reload();

        console.log(docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

      const getCustomCategory = async () => {
        const querySnapshot = await getDocs(collection(db, "customCategories"));
        const customCategories = querySnapshot.docs.map((doc) => (
           {
          id: doc.id,
          ...doc.data(),
        }));
        customCategories.map((item) =>{
         console.log(item.id)
         
        })
 
        setCustomCategories(customCategories);
      };

  useEffect(() => {
    fetchPost();
    getCompeletedTodo();
    getScheduledTodo();
    getTodayTodo();
    getCustomCategory();
   }, []);

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
          <form  onSubmit={createCustomCategory} className="d-flex align-items-center justify-content-between gap-5">
            <input
            placeholder="Create a category"
              defaultValue={customCategory}
              onChange={(e) => {
                setCustomCategory(e.target.value);
              }}
            />

            <button class="btn btn-primary" >Add</button>
          </form>
        </Col>
      </Row>
      {customCategories.map((customCategory) => {
        return (
          <div>
            <Link className="remove-link-style" to={`/category/:${customCategory.id}`}>
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
                  <h1>{todayTasks.length}</h1>
                </div>
                <h1 className="my-3">{customCategory.title}</h1>
              </Col>
            </Link>
          </div>
        );
      })}

      {/* <Row>
        <Col sm>sm=true</Col>
        <Col sm>sm=true</Col>
        <Col sm>sm=true</Col>
      </Row> */}
    </Container>
  );
}

export default Categories;
