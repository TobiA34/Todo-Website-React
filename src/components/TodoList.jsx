import React, { useState,useEffect } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Card, CardBody, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddTodo from "./form/AddTodo";
import DeleteTodo from "./form/DeleteTodo";
import EditTodo from "./form/EditTodo";
import SearchBar from "./SearchBar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

 const TodoList = () => {
   const [title, setTodo] = useState("");
   const [todos, setTodos] = useState([]);
   const [show, setShow] = useState(false);
   const [query, setQuery] = useState("");
   const [order, setOrder] = useState("ASC");
    const [isCompleted, setIsCompleted] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

  const toggleComplete = async (todo) => {
       await updateDoc(doc(db,'todos',todo.id),{
          completed: !todo.completed
       })
       window.location.reload();
  };

 
    const fetchPost = async () => {

    const querySnapshot = await getDocs(collection(db,'todos'));
    const todos = querySnapshot.docs.map(doc =>({
      id:doc.id,
       ...doc.data()}
       ))
    setTodos(todos);
    }
 

     
   
    useEffect(()=>{
        fetchPost();
     }, [])


const sortASC = () => {
  if (order === "ASC") {
    const sorted = [...todos].sort((a, b) =>
      a["todo"].toLowerCase() > b["todo"].toLowerCase() ? 1 : -1
    );
    setTodos(sorted);
    setOrder("DSC");
  }
};

const sortDSC = () => {
  if (order === "DSC") {
    const sorted = [...todos].sort((a, b) =>
      a["todo"].toLowerCase() < b["todo"].toLowerCase() ? 1 : -1
    );
    setTodos(sorted);
    setOrder("ASC");
  }
};
 
    return (
      <section className="todo-container bg-grey">
        <div className="todo">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="header">Todo-App</h1>
            <i
              onClick={handleShow}
              className="fa fa-plus-square fa-3x align-items-center"
              aria-hidden="true"
            ></i>
            <Modal show={show} onHide={handleClose}>
              <AddTodo setTodo={setTodo} todo={title} />
            </Modal>
          </div>
          <DropdownButton
            className="m-5"
            id="dropdown-basic-button"
            title="sort items"
          >
            <Dropdown.Item onClick={() => sortASC()}>ASC</Dropdown.Item>
            <Dropdown.Item onClick={() => sortDSC()}>DSC</Dropdown.Item>
          </DropdownButton>
          <h1>You have {todos.length} todo</h1>
          <SearchBar placeholder={"Search Todo"} setQuery={setQuery} />

          <div className="todo-content ">
            {todos
              ?.filter((item) => {
                if (query === "") {
                  return item;
                } else if (
                  item.todo.toLowerCase().includes(query.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((todo, i) => (
                <Card className="my-3">
                  <CardBody>
                    <div
                      className="d-flex justify-content-between align-items-center"
                      direction="vertical"
                      gap={3}
                    >
                      <div className="circle">
                  
                        <i className="fas fa-ticket"></i>
                      </div>
                      <div className="d-flex gap-2">
                        <DeleteTodo todo={todo} />
                        <EditTodo todo={todo} setTodo={setTodo} />
                      </div>
                    </div>
                  </CardBody>
                  <CardBody>
                    <div className="d-flex  justify-content-between gap-3 bg">
                      <div>
                        <input
                          onChange={() => toggleComplete(todo)}
                          type="checkbox"
                          checked={todo.completed ? "checked" : ""}
                        />
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
          {todos.length === 0 && <h1>No Todos 😭</h1>}
        </div>
      </section>
    );
}
 

export default TodoList;
