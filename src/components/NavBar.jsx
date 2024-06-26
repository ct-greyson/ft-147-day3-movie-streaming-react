import React, { useContext } from "react";
import { Navbar, Button, Nav, Container, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StarFill, AlarmFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import UserContext from "../context/UserContext";

const NavBar = () => {
  const { user } = useContext(UserContext);
  // we need the totalItems property from our wishList state
  // state.wishList.totalItems (we're destructure the totalItems property)
  const { totalItems } = useSelector((state) => state.wishList);
  const totalItemsWatch = useSelector((state) => state.watchList.totalItems);
  const navigate = useNavigate();

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary d-flex flex-row align-items-center justify-content-between px-3"
    >
      <Navbar.Brand href="/">Navbar</Navbar.Brand>
      <Nav className="d-flex flex-row align-items-center justify-content-between">
        <Container onClick={() => navigate("/watch-list")}>
          <AlarmFill color="blue" />
          <Badge bg="secondary">{totalItemsWatch}</Badge>
        </Container>
        <Container onClick={() => navigate("/wish-list")}>
          <StarFill color="gold" />
          <Badge bg="secondary">{totalItems}</Badge>
        </Container>
        <h6 className="mx-3 mt-2">User: {user.name}</h6>
        <Button variant="outline-success" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
