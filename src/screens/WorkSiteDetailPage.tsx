import React, { useState } from 'react';
import { Button, Card, Col, Container, Row, Table, Modal, Form } from 'react-bootstrap';
import { WorkSite, User, Role, Tool, WorkSiteStatus, SatisfactionLevel, ToolName } from '../api/Model';
import PopupEmergency from './PopupEmergency';



const WorkSiteDetailPage: React.FC = () => {
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
  const exampleWorkSite: WorkSite = {
    id: "1",
    workSiteChief: {
      id: "chief123",
      firstName: "John",
      lastName: "Doe",
      role: Role.WorkSiteChief,
      email: "john.doe@example.com",
      phoneNumber: "1234567890"
    },
    staff: [
      {
        id: "staff1",
        firstName: "Jane",
        lastName: "Smith",
        role: Role.Employee,
        email: "jane.smith@example.com",
        phoneNumber: "0987654321"
      },
      {
        id: "staff2",
        firstName: "Alex",
        lastName: "Johnson",
        role: Role.Employee,
        email: "alex.johnson@example.com",
        phoneNumber: "9876543210"
      }
    ],
    equipment: [
      {
        name: ToolName.Stapler,
        quantity: 1,
      },
      {
        name: ToolName.Palette,
        quantity: 2,
      }
    ], begin:new Date("2024-10-10T17:09:00"),
    end: new Date("2024-10-10T17:12:00"),
    status: WorkSiteStatus.InProgress,
    satisfaction: SatisfactionLevel.High,
    request: undefined,
    signature: undefined,
    title: "",
    address: ""
  };

  return (
    <Container className='container-xxl'>
      <Row className='mt-4'>
        <Col lg={6}>
          <Card bg="white" text="dark" className="h-100">
          <Card.Body>
  <Card.Title><h2>Détails du chantier</h2></Card.Title>
  <Card.Text>
    <Row className="mb-3">
      <Col>
        <Form.Group>
          <Form.Label>Chef de chantier :</Form.Label>
          <Form.Control type="text" value={`${exampleWorkSite.workSiteChief?.firstName} ${exampleWorkSite.workSiteChief?.lastName}`} readOnly />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group>
          <Form.Label>Statut:</Form.Label>
          <Form.Control type="text" value={exampleWorkSite.status} readOnly />
        </Form.Group>
      </Col>
    </Row>
    <Row className="mb-3">
      <Col>
        <Form.Group>
          <Form.Label>Date de début :</Form.Label>
          <Form.Control type="text" value={exampleWorkSite.begin.toLocaleString()} readOnly />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group>
          <Form.Label>Date de fin :</Form.Label>
          <Form.Control type="text" value={exampleWorkSite.end.toLocaleString()} readOnly />
        </Form.Group>
      </Col>
    </Row>
  </Card.Text>
  <Button variant="primary" onClick={openModal}>Déclarer un incident</Button>{' '}
  <Button variant="secondary">Voir la demande de chantiers</Button>
</Card.Body>

          </Card>
        </Col>
        <Col lg={6}>
          <Card bg="white" text="dark" className="h-100">
            <Card.Body>
              <Card.Title><h2>Signature</h2></Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className='mt-4'>
        <Col lg={6}>
          <Card bg="white" text="dark">
            <Card.Body>
              <Card.Title><h2>Outils</h2></Card.Title>
              <Table>
                <thead>
                  <tr>
                    <th>Type d'outil</th>
                    <th>Quantité</th>
                  </tr>
                </thead>
                <tbody>
                {exampleWorkSite.equipment && exampleWorkSite.equipment.length > 0 ? (
  exampleWorkSite.equipment.map((tool: Tool) => (
    <tr key={tool.name}>
      <td>{tool.name}</td>
      <td>{tool.quantity}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={2}>Aucun équipement disponible</td>
  </tr>
)}

                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card bg="white" text="dark">
            <Card.Body>
              <Card.Title><h2>Equipe</h2></Card.Title>
              <Table className="table">
                <thead>
                  <tr>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                  </tr>
                </thead>
                <tbody>
                {exampleWorkSite.staff && exampleWorkSite.staff.length > 0 ? (
  exampleWorkSite.staff.map((staffMember: User) => (
    <tr key={staffMember.id}>
      <td>{staffMember.firstName}</td>
      <td>{staffMember.lastName}</td>
      <td>{staffMember.role}</td>
      <td>{staffMember.email}</td>
      <td>{staffMember.phoneNumber}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={5}>Aucun membre du personnel disponible</td>
  </tr>
)}

                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
<PopupEmergency showModal={showModal} closeModal={closeModal} />
    </Container>
  );
}

export default WorkSiteDetailPage;
