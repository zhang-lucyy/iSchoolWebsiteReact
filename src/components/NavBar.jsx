import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

{/* Navigation Bar built with react bootstrap! */}
function NavigationBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Welcome to the iSchool Website!</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#about" className="me-3">About</Nav.Link>
            <Nav.Link href="#degrees" className="me-3">Degrees</Nav.Link>
            <Nav.Link href="#minors" className="me-3">Minors</Nav.Link>
            <Nav.Link href="#employment" className="me-3">Employment</Nav.Link>
            <Nav.Link href="#people" className="me-3">People</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;