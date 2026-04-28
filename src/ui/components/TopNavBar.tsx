import {Button, Container, Navbar} from "react-bootstrap";
import {Link} from "@tanstack/react-router";

export default function TopNavBar() {
  return (
      <Navbar bg="info" data-bs-theme="info">
        <Container>
          <Link href="/" style={{textDecoration: 'none'}}>
            <Navbar.Brand style={{color: "white"}}>Pokemon Card Shop</Navbar.Brand>
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button variant="light">
                Login
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}