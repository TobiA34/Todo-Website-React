import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
 
function AddTodo({ setTodo, todo}) {
    const [validated, setValidated] = useState(false);
    const [date, setDate] = useState("")
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

      const addTodo = async (e) => {
        e.preventDefault();

        const newTodo = {
          todo: todo || null,
          date: date || null,
        };

        try {
          const docRef = await addDoc(collection(db, "todos"), {
             ...newTodo
          });
          console.log("Document written with ID: ", docRef.id);
        //   console.log(Date)
          window.location.reload();
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Container className="center bg-info p-5">
        <Row className="mb-3 mx-auto">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Todo</Form.Label>
            <Form.Control
              required
              type="text"
              className="input"
              placeholder="What do you have to do today?"
              onChange={(e) => setTodo(e.target.value)}
            />
            <Form.Control
              required
              type="date"
              className="input my-2"
              placeholder="What do you have to do today?"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Button type="submit" onClick={addTodo}>
          Submit form
        </Button>
      </Container>
    </Form>
  );
}

export default AddTodo;
