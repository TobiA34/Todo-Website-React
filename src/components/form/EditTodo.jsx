import React, { useState } from "react";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
 import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
 function EditTodo({todo}) {
   const [show, setShow] = useState(false);
   const [date, setDate] = useState("");
   const [task, setTodo] = useState("");

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const handleUpdate = async () => {
     //   e.preventDefault()
      try {
        const myDocumentData = {
         todo: task,
         date: date
        };

        console.log(myDocumentData.todo);
        console.log(myDocumentData.date);

       // Define the document reference
       const myDocRef = doc(db, "all",todo.id);

       // Add or update the document
       await setDoc(myDocRef, myDocumentData);
      window.location.reload(true);
       // Log a success message
       console.log("Document added or updated successfully!");
      } catch (err) {
       alert(err);
     }
   };

   return (
     <>
       <i
         className="fa fa-pencil fa-1x rounded-circle border  border-primary p-2"
         aria-hidden="true"
         onClick={handleShow}
       ></i>

       <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>
             Todo Name: {todo.todo}, id: {todo.id}
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Form.Label>Todo</Form.Label>
           {/* <Form.Control
             required
             type="text"
             className="input"
             placeholder={todo.id}
           /> */}
           <Form.Control
             required
             type="text"
             className="input"
             defaultValue={todo.todo}
             onChange={(e) => setTodo(e.target.value)}
           />
           <Form.Control
             required
             type="date"
             className="input my-2"
             defaultValue={todo.date}
             onChange={(e) => setDate(e.target.value)}
           />
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={handleClose}>
             Close
           </Button>
           <Button variant="primary" onClick={handleUpdate}>
             Save Changes
           </Button>
         </Modal.Footer>
       </Modal>
     </>
   );
 }

export default EditTodo;
