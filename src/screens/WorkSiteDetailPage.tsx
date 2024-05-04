import React, { useState } from 'react';
import { Button, Card, Col, Container, Row, Table, Modal } from 'react-bootstrap';
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
    ],
    begin: new Date("2024-05-01"),
    end: new Date("2024-05-10"),
    status: WorkSiteStatus.InProgress,
    satisfaction: SatisfactionLevel.High,
    request: undefined,
    signature: undefined
  };

  return (
    <Container className='container-xxl'>
      <Row className='mt-4'>
        <Col lg={6}>
          <Card bg="white" text="dark" className="h-100">
            <Card.Body>
              <Card.Title><h2>Détails du chantier</h2></Card.Title>
              <Card.Text>
                <p><strong>Chef de chantier :</strong> {exampleWorkSite.workSiteChief?.firstName} {exampleWorkSite.workSiteChief?.lastName}</p>
                <p><strong>Statut:</strong> {exampleWorkSite.status}</p>
                <p><strong>Date de début :</strong> {exampleWorkSite.begin.toDateString()}</p>
                <p><strong>Date de fin :</strong> {exampleWorkSite.end.toDateString()}</p>
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
                  {exampleWorkSite.equipment.map((tool: Tool) => (
                    <tr key={tool.name}>
                      <td>{tool.name}</td>
                      <td>{tool.quantity}</td>
                    </tr>
                  ))}
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
                  {exampleWorkSite.staff.map((staffMember: User) => (
                    <tr key={staffMember.id}>
                      <td>{staffMember.firstName}</td>
                      <td>{staffMember.lastName}</td>
                      <td>{staffMember.role}</td>
                      <td>{staffMember.email}</td>
                      <td>{staffMember.phoneNumber}</td>
                    </tr>
                  ))}
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
