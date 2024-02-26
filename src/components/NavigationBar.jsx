import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
 import { Link } from 'react-router-dom'

function NavigationBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <div className="d-flex align-items-center justify-content-center">
          <Navbar.Brand href="#home">TaskBuddy</Navbar.Brand>
          <i class="fa-solid fa-table-list"></i>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-links" to={`/categories`}>
              Categories
            </Link>
            <Link className="nav-links" to={`/todos`}>
              Todo
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
