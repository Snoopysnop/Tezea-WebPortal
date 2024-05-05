import React, { useState } from 'react';
import { Button, Card, Col, Container, Row, Table, Modal, Form } from 'react-bootstrap';
import { WorkSite, User, Role, Tool, WorkSiteStatus, SatisfactionLevel, ToolName } from '../api/Model';
import PopupEmergency from './PopupEmergency';



const SettingsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  // Fonction pour ouvrir la modale
  const openModal = () => {
    setShowModal(true);
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    setShowModal(false);
  };
  // Création d'un exemple d'objet WorkSite
  const exampleWorkSite: User = {
    id: "staff2",
    firstName: "Alex",
    lastName: "Johnson",
    role: Role.Employee,
    email: "alex.johnson@example.com",
    phoneNumber: "9876543210"
  }


  return (
    <Container className='container-xxl'>
      <Row className='mt-4'>
        <Col lg={6}>
          <Card bg="white" text="dark" className="h-100">
          <Card.Body>
  <Card.Title><h2>Informations utilisateur</h2></Card.Title>
  <Card.Text>
    <Form.Group className="mb-3">
      <Form.Label>Prénom:</Form.Label>
      <Form.Control type="text" value={exampleWorkSite.firstName} readOnly />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Nom:</Form.Label>
      <Form.Control type="text" value={exampleWorkSite.lastName} readOnly />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Rôle:</Form.Label>
      <Form.Control type="text" value={exampleWorkSite.role} readOnly />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Email:</Form.Label>
      <Form.Control type="email" value={exampleWorkSite.email} readOnly />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Téléphone:</Form.Label>
      <Form.Control type="tel" value={exampleWorkSite.phoneNumber} readOnly />
    </Form.Group>
  </Card.Text>
</Card.Body>

            </Card>
</Col>
</Row>
          </Container>
          );
}

          export default SettingsPage;
