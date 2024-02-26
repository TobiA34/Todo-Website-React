import "../../App.css";

import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { ChromePicker } from "react-color";

function AddTodo({ setTodo, todo }) {
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [color, setColor] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const currentDate = new Date();
  const newD = currentDate.toISOString().substring(0, 10);

  function titleHandler(e) {
    let item = e.target.value;
    if (item.length < 4) {
      setTitleErr(true);
    } else {
      setTitleErr(false);
    }
    setTodo(item);
  }

  function dateHandler(e) {
    let inputDate = e.target.value;
    if (inputDate < newD) {
      setDateErr(true);
    } else {
      setDateErr(false);
    }

    setDate(inputDate);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todo.length < 4) {
      alert("invalid todo length");
    } else if (date < newD) {
      alert("Date is in the past, choose a future date");
      console.log(newD);
    } else {
      const newTodo = {
        todo: todo || null,
        date: date || null,
        desc: newD || null,
        color: color || null,
      };

      try {
        const docRef = await addDoc(collection(db, "todos"), {
          ...newTodo,
        });

        console.log(newD, "+", date);
        window.location.reload();

        console.log(docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Container className="center p-5">
        <Row className="mb-3 mx-auto">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Todo</Form.Label>
            <Form.Control
              required
              type="text"
              className="input"
              placeholder="What do you have to do today?"
              onChange={titleHandler}
            />
            <span>
              {titleErr ? (
                <p className="error">
                  Title needs to be more than 4 characters
                </p>
              ) : null}
            </span>
            <button
            className="my-4"
              onClick={() =>
                setShowColorPicker((showColorPicker) => !showColorPicker)
              }
            >
              {showColorPicker ? "Close color picker" : "Open Color picker"}
            </button>
            {showColorPicker && (
              <ChromePicker
                color={color}
                onChange={(updatedColor) => setColor(updatedColor.hex)}
              />
            )}
             <br/> <Form.Label>Enter Date</Form.Label>
            <Form.Control
              required
              type="date"
              className="input my-2"
              placeholder="What do you have to do today?"
              value={date}
              onChange={dateHandler}
            />

            <span>
              {dateErr ? (
                <p className="error">Date needs to be in the future</p>
              ) : null}
            </span>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
          </Form.Group>
        </Row>
        <Button type="submit">Submit form</Button>
      </Container>
    </Form>
  );
}

export default AddTodo;
