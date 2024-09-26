import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Nav, Navbar, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Adminperformance = () => {
  const [technicians, setTechnicians] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const [personalDetails, setPersonalDetails] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    adhar: '',
    pan: '',
    photo: ''
  });

  // Fetch Technicians from Backend
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const token = localStorage.getItem('tech_token'); // Make sure you're storing the correct token in localStorage
        if (!token) {
          throw new Error('No token found. Please log in.');
        }
  
        // Include the token in the Authorization header
        const response = await axios.get('http://localhost:5000/api/auth/technicians', {
          headers: { 
            Authorization: `Bearer ${token}` // Correctly include the token
          }
        });
  
        setTechnicians(response.data.technicians); // Assuming 'technicians' is the correct field in the response
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
    };
  
    fetchTechnicians();
  }, []);
  

  const handleProfileClick = (tech) => {
    setPersonalDetails({
      id: tech.id,
      name: tech.name,
      email: tech.email,
      phone: tech.phone,
      adhar: tech.adhar,
      pan: tech.pan,
      photo: tech.photo || ''
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
  };

  const handleEdit = () => setEditMode(true);
  const handleSave = () => {
    setEditMode(false);
    setShowModal(false);
    console.log('Personal Details Saved:', personalDetails);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({
      ...personalDetails,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonalDetails({
          ...personalDetails,
          photo: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="shadow-sm reduced-navbar">
        <Container>
          <Navbar.Brand href="admin-dashboard">Performance</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <span className="navbar-text">Good Morning, Mr. Admin</span>
            </Nav>
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Link href="#notifications">Send Notifications</Nav.Link>
              <Nav.Link href="#profile" className="d-flex align-items-center">
                <Button variant="link" onClick={() => handleProfileClick(technicians[0])}>
                  <FontAwesomeIcon icon={faUserCircle} size="2x" />
                </Button>
                <span className="ms-2">S.Admin</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sidebar and Table */}
      <Container fluid className="mt-3">
        <Row>
          <Col md={2} className="sidebar bg-primary text-white">
            <Nav defaultActiveKey="/admin-dashboard" className="flex-column">
              <Nav.Link as={Link} to="/admin-dashboard" className="text-white">
                <i className="bi bi-house-door-fill"></i> Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/admin-calender" className="text-white">
                <i className="bi bi-calendar2-event-fill"></i> Calendar
              </Nav.Link>
              <Nav.Link as={Link} to="/admin-chat" className="text-white">
                <i className="bi bi-chat-dots-fill"></i> Chat
              </Nav.Link>
              <Nav.Link as={Link} to="/admin-performance" className="text-white">
                <i className="bi bi-bar-chart-fill"></i> Performance
              </Nav.Link>
              <Nav.Link as={Link} to="/admin-settings" className="text-white">
                <i className="bi bi-gear-fill"></i> Settings
              </Nav.Link>
              <Nav.Link as={Link} to="/" className="text-white">
                <i className="bi bi-box-arrow-right"></i> Logout
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={10}>
            <Container fluid>
              <Row>
                <Col>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>TechnicianID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>ADHAR</th>
                        <th>PAN CARD</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {technicians.map((tech) => (
                        <tr key={tech.id}>
                          <td>{tech.id}</td>
                          <td>{tech.name}</td>
                          <td>{tech.email}</td>
                          <td>{tech.phone}</td>
                          <td>{tech.adhar}</td>
                          <td>{tech.pan}</td>
                          <td>
                            <Button variant="primary" onClick={() => handleProfileClick(tech)}>View Profile</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

      {/* Modal for Profile */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Profile' : 'Technician Profile'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={personalDetails.name}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={personalDetails.email}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={personalDetails.phone}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Form.Group>
            <Form.Group controlId="formBasicAdhar">
              <Form.Label>ADHAR</Form.Label>
              <Form.Control
                type="text"
                name="adhar"
                value={personalDetails.adhar}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPan">
              <Form.Label>PAN</Form.Label>
              <Form.Control
                type="text"
                name="pan"
                value={personalDetails.pan}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Form.Group>
            {editMode && (
              <Form.Group controlId="formBasicPhoto">
                <Form.Label>Photo</Form.Label>
                <Form.Control type="file" onChange={handlePhotoChange} />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {editMode ? (
            <>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={handleEdit}>
              Edit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Adminperformance;
