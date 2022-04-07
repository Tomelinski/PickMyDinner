import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mainNav.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { AuthContext } from "../../context/authContext";

const MainNav = ({ token }) => {
  const auth = useContext(AuthContext);

  return (
    <Navbar
      collapseOnSelect
      sticky="top"
      className="stick-top navigation"
      expand="sm"
    >
      <Navbar.Brand className="m-0 p-0" href="/">
        <img
          alt="Pick My Dinner Logo"
          src="/logo.png"
          width="35"
          height="35"
          className="d-inline-block align-top"
        />
        <div id="logoText" className="d-inline-block josefinMain ml-1 p-0">
          Pick My Dinner
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          {auth.isLoggedIn && (
            <>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link onClick={auth.logout}>Logout</Nav.Link>
            </>
          )}
          {!auth.isLoggedIn && <Nav.Link href="/login">Login</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNav;
