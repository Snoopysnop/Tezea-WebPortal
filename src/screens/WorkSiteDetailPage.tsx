import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table, Modal, Form } from 'react-bootstrap';
import { WorkSite, User, Role, Tool, WorkSiteStatus, SatisfactionLevel, ToolName } from '../api/Model';
import PopupEmergency from './PopupEmergency';
import { useLocation } from 'react-router-dom';
import MainApi from '../api/MainApi';
import { getRoleWorksite, getStatusWorksite } from '../common/utils/utils';

const WorkSiteDetailPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const worksite = location.state ? (location.state as any).worksiteData as WorkSite : null;

  const [currentworkSiteChief, setWorkSiteChief] = useState<User | undefined>(undefined);
  const [currentusers, setWorkSiteUsers] = useState<User[] | undefined>(undefined);

  useEffect(() => {
    handleListWorksite();
    handleUsers();
  }, []); // Le tableau vide indique que cette fonction doit être appelée une seule fois lors du montage du composant

  const handleListWorksite = async () => {
    if (worksite!.workSiteChief) {
      const worksiteChief = await MainApi.getInstance().getUserbyId(String(worksite!.workSiteChief)) as User;
      const users = await MainApi.getInstance().getUsersByWorksiteId(String(worksite!.id)) as Array<User>;
    };
  }

  const handleUsers = async () => {
    const users = await MainApi.getInstance().getUsersByWorksiteId(String(worksite!.id)) as Array<User>;
    const workSiteChiefFiltered = users.filter(user => getRoleWorksite(user.role) === Role.WorkSiteChief);

    const workSiteUsersFiltered = users.filter(user => getRoleWorksite(user.role) === Role.Employee);

    console.log(workSiteChiefFiltered[0].firstName)
    if (workSiteChiefFiltered.length > 0) {
      setWorkSiteChief(workSiteChiefFiltered[0])
    }
    if (workSiteUsersFiltered.length > 0) {
      setWorkSiteUsers(workSiteUsersFiltered)
    }
  }

  console.log(currentusers);

//TODO
  const tools: Tool[] = [];
  for (const key in worksite?.equipments) {
      if (Object.prototype.hasOwnProperty.call(worksite?.equipments, key)) {
          const tool: Tool = {
              name: ToolName.Axe,
              quantity: worksite ? worksite!.equipments[key as keyof typeof worksite.equipments] as number : 0
          };
          tools.push(tool); 
      }
  }
  console.log("jeveuxpasycroire", tools)




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
                      <Form.Control type="text" value={currentworkSiteChief?.firstName} readOnly />
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
                      <Form.Control type="text" value={new Date(worksite!.begin).toLocaleString()} readOnly />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Date de fin :</Form.Label>
                      <Form.Control type="text" value={new Date(worksite!.end).toLocaleString()} readOnly />
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
                { tools.map((tool : Tool) => (
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
                  {currentusers && currentusers.map((user, index) => (
                    <tr key={index}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{getRoleWorksite(user.role)}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <PopupEmergency showModal={showModal} closeModal={closeModal} worksiteId={worksite!.id}/>
    </Container>
  );
}

export default WorkSiteDetailPage;
