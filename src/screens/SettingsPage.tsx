import React, { useState } from 'react';
import { Card, Col, Container, Row, Form } from 'react-bootstrap';
import { User, Role } from '../api/Model';
import { useLocation } from 'react-router-dom';
import { getRoleName } from '../common/utils/utils';

const SettingsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();

  const user = location.state ? (location.state as any).responseUserInfo as User : null;

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
      <Form.Control type="text" value={user!.firstName} readOnly />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Nom:</Form.Label>
      <Form.Control type="text" value={user!.lastName} readOnly />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Rôle:</Form.Label>
      <Form.Control type="text" value={getRoleName(user!.role)} readOnly />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Email:</Form.Label>
      <Form.Control type="email" value={user!.email} readOnly />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Téléphone:</Form.Label>
      <Form.Control type="tel" value={user!.phoneNumber} readOnly />
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
