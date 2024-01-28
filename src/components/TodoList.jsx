import React, { useState,useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Card, CardBody, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddTodo from "./form/AddTodo";
import DeleteTodo from "./form/DeleteTodo";

 const TodoList = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);


 
    const fetchPost = async () => {

    const querySnapshot = await getDocs(collection(db,'todos'));
    const todos = querySnapshot.docs.map(doc =>({id:doc.id, ...doc.data()}))
    setTodos(todos);
    }
   
    useEffect(()=>{
        fetchPost();
    }, [])
 
 
    return (
      <section className="todo-container">
        <div className="todo">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="header">Todo-App</h1>
            <Button
              variant="primary"
              className="h-50 align-items-center"
              onClick={handleShow}
            >
              Add new Todo
            </Button>
            <Modal show={show} onHide={handleClose}>
              <AddTodo setTodo={setTodo} todo={todo} />
            </Modal>
          </div>
          <div className="todo-content">
            {todos?.map((todo, i) => (
              <Card className="m-2">
                <CardBody>
                  <Stack
                    direction="vertical"
                    gap={3}
                    className="align-items-center"
                  >
                    <p key={i}>{todo.todo}</p>
                    <p>{todo.date}</p>
                    <DeleteTodo todo={todo}/>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
}
 

export default TodoList;
