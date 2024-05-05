import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table, Modal, Form } from 'react-bootstrap';
import { WorkSite, User, Role, Tool, WorkSiteStatus, SatisfactionLevel, ToolName } from '../api/Model';
import PopupEmergency from './PopupEmergency';
import { useLocation } from 'react-router-dom';
import MainApi from '../api/MainApi';
import { getStatusWorksite } from '../common/utils/utils';

const WorkSiteDetailPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const worksite = location.state ? (location.state as any).worksiteData as WorkSite : null;
  console.log(worksite)

  useEffect(() => {
    handleListWorksite();
  }, []); // Le tableau vide indique que cette fonction doit être appelée une seule fois lors du montage du composant


  const handleListWorksite = async () => {
    if (worksite!.workSiteChief) {
      console.log("chef !!!");
      console.log(worksite!.workSiteChief)
      const worksiteChief = await MainApi.getInstance().getUserbyId(String(worksite!.workSiteChief)) as User;
      console.log("test");
      console.log(worksiteChief);
      console.log("test");

      // Utilisez worksiteChief ici
    } else {
      console.log("erreur");

      // Gérer le cas où workSiteChief est undefined
    }
  };

  // Fonction pour ouvrir la modale
  const openModal = () => {
    setShowModal(true);
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    setShowModal(false);
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
                      <Form.Control type="text" value={''} readOnly />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Statut:</Form.Label>
                      <Form.Control type="text" value={getStatusWorksite(worksite!.status)} readOnly />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Date de début :</Form.Label>
                      <Form.Control type="text" value={worksite!.begin.toLocaleString()} readOnly />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Date de fin :</Form.Label>
                      <Form.Control type="text" value={worksite!.end.toLocaleString()} readOnly />
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
                  {worksite && worksite.equipments && Object.keys(worksite.equipments).map((toolName: string, qty: number) => (
                    <tr key={toolName}>
                      <td>{toolName}</td>
                      <td>{qty}</td>
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
