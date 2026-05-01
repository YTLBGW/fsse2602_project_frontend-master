import {Button, Container, Navbar, Spinner} from "react-bootstrap";
import {Link} from "@tanstack/react-router";
import {useContext} from "react";
import {LoginUserContext} from "../../context/LoginUserContext.tsx";
import {signOut} from "../../authService/FirebaseAuthService.ts";

export default function TopNavBar() {

  const loginUser = useContext(LoginUserContext);
  const renderLoginContainer = () => {
    if(loginUser) {
      return(
      <>
        <div className="text-white me-2">
          {loginUser.email}
        </div>
        <Button variant="danger" onClick={signOut}>
          Logout
        </Button>
      </>
      )
    }else if(loginUser === null) {
      return(
      <Link to="/login">
        <Button variant="light">
          Login
        </Button>
      </Link>
      )
    }else{
      return(
          <Spinner animation="border" variant="primary" />
      )
    }
  }

  return (
      <Navbar bg="info" data-bs-theme="info">
        <Container>
          <Link href="/" style={{textDecoration: 'none'}}>
            <Navbar.Brand style={{color: "white"}}>Pokemon Card Shop</Navbar.Brand>
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">

            {renderLoginContainer()}

          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}