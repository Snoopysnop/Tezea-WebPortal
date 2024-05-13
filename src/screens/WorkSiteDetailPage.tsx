import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table, Modal, Form } from 'react-bootstrap';
import { WorkSite, User, Role, Tool, WorkSiteStatus, SatisfactionLevel, ToolName, WorkSiteRequest, Customer } from '../api/Model';
import PopupEmergency from './PopupEmergency';
import { useLocation } from 'react-router-dom';
import MainApi from '../api/MainApi';
import { formatPhoneNumber, getCategorie, getCivility, getCustomerStatus, getEmergency, getRole, getServiceType, getStatusName, getStatusWorksite, getStatusWorksiteRequest, getToolName } from '../common/utils/utils';
import WorkSiteRequestPopUp from '../components/WorkSiteRequestPopUp';
import { CustomerJson, WorkSiteJson, WorkSiteRequestJson } from '../api/ModelJson';

const WorkSiteDetailPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const worksite = location.state ? (location.state as any).worksiteData as WorkSiteJson : null;
  const [currentworkSiteChief, setWorkSiteChief] = useState<User | undefined>(undefined);
  const [currentusers, setWorkSiteUsers] = useState<User[] | undefined>(undefined);
  const [currentstate, setWorksiteRequest] = useState<WorkSiteRequest | undefined>(undefined);


  useEffect(() => {
    handleUsers();
    handleUsersAndWorksiteChief();
  }, []); // Le tableau vide indique que cette fonction doit être appelée une seule fois lors du montage du composant

  const handleUsers = async () => {
    const users = await MainApi.getInstance().getUsersByWorksiteId(String(worksite!.id)) as Array<User>;

    const workSiteRequestId: number | undefined = worksite ? worksite.workSiteRequest : undefined;

    const workSiteRequest = await MainApi.getInstance().getWorksiteRequestbyId(workSiteRequestId!) as WorkSiteRequestJson;

    let customer: Customer | undefined = undefined;

    if (workSiteRequest.customer) {
      const customerjson = await MainApi.getInstance().getCustomerbyId(String(workSiteRequest.customer)) as CustomerJson;
      customer = {
        id: customerjson.id,
        firstName: customerjson.firstName,
        lastName: customerjson.lastName,
        civility: customerjson.civility ? getCivility(customerjson.civility) : undefined,
        email: customerjson.email,
        phoneNumber: customerjson.phoneNumber,
        address: customerjson.address,
        city: customerjson.city,
        postalCode: customerjson.postalCode,
        status: customerjson.status ? getCustomerStatus(customerjson.status) : undefined,
        company: customerjson.company
      };
    }

    const worksiterequestsend: WorkSiteRequest = {
      id: workSiteRequest.id,
      concierge: undefined,
      siteChief: undefined,
      customer: customer,
      city: workSiteRequest.city,
      serviceType: workSiteRequest.serviceType ? getServiceType(workSiteRequest.serviceType) : undefined,
      description: workSiteRequest.description,
      emergency: workSiteRequest.emergency ? getEmergency(workSiteRequest.emergency) : undefined,
      title: workSiteRequest.title,
      category: workSiteRequest.category ? getCategorie(workSiteRequest.category) : undefined,
      removal: workSiteRequest.removal,
      delivery: workSiteRequest.delivery,
      removalRecycling: workSiteRequest.removalRecycling,
      chronoQuote: workSiteRequest.chronoQuote,
      estimatedDate: workSiteRequest.estimatedDate ? new Date(workSiteRequest.estimatedDate) : undefined,
      requestStatus: workSiteRequest.status ? getStatusWorksiteRequest(workSiteRequest.status) : undefined,
      weightEstimate: workSiteRequest.weightEstimate,
      volumeEstimate: workSiteRequest.volumeEstimate,
      provider: workSiteRequest.provider,
      tezeaAffectation: workSiteRequest.tezeaAffectation
    };

    setWorksiteRequest(worksiterequestsend);
  }

  const handleUsersAndWorksiteChief = async () => {
    const users = await MainApi.getInstance().getUsersByWorksiteId(String(worksite!.id)) as Array<User>;
    const workSiteChiefFiltered = users.filter(user => getRole(user.role) === Role.WorkSiteChief);
    const workSiteUsersFiltered = users.filter(user => getRole(user.role) === Role.Employee);
    if (workSiteChiefFiltered.length > 0) {
      setWorkSiteChief(workSiteChiefFiltered[0])
    }
    if (workSiteUsersFiltered.length > 0) {
      setWorkSiteUsers(workSiteUsersFiltered)
    }
  }


  const tools: Tool[] = [];
  for (const key in worksite!.equipments) {
    if (Object.prototype.hasOwnProperty.call(worksite?.equipments, key)) {
      const toolName: string = key; // Récupère le nom de l'outil à partir de la clé
      const tool: Tool = {
        name: getToolName(toolName)!,
        quantity: worksite ? worksite!.equipments[key as keyof typeof worksite.equipments] as number : 0
      };
      tools.push(tool);
    }
  }

  // Fonction pour ouvrir la modale
  const openModal = () => {
    setShowModal(true);
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    setShowModal(false);
  };

  const DisplaySignature = () => {
    if (worksite!.signature !== null) {
      return (
        <img
          src={`data:image/jpeg;charset=utf-8;base64,${worksite!.signature}`}
          width={400}
          height={250}
        />
      );
    } 
    return null;
  }
  
  const [modalShow, setModalShow] = useState(false);
  { console.log(`data:image/png;base64, ${worksite!.signature}`) }
  return (
    <Container>
      <Row className='mt-4'></Row>
      <Col lg className='d-flex align-items-center' style={{fontSize: '2rem'}}>
              Détails du chantier : {worksite!.title}
            </Col>
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
                      <Form.Control
                        type="text"
                        value={(currentworkSiteChief ? currentworkSiteChief.firstName + " " + currentworkSiteChief.lastName : "")}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Statut:</Form.Label>
                      <Form.Control type="text" value={getStatusName(worksite!.status!)} readOnly />
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
              <Button variant="danger" onClick={() => setShowModal(true)}>Déclarer un incident</Button>{' '}
              <Button variant="primary" onClick={() => setModalShow(true)} className="float-end">Voir la demande de chantier</Button>{' '}
            </Card.Body>


          </Card>
        </Col>
        <Col lg={6}>
          <Card bg="white" text="dark" className="h-100">
            <Card.Body>
              <Card.Title><h2>Signature</h2></Card.Title>
              {DisplaySignature()}
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
                  {tools.map((tool: Tool) => (
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
                      <td>{getRole(user.role)}</td>
                      <td>{user.email}</td>
                      <td>{formatPhoneNumber(user.phoneNumber)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <PopupEmergency showModal={showModal} closeModal={closeModal} worksiteId={worksite!.id!} />
      <WorkSiteRequestPopUp
        show={modalShow}
        onHide={() => setModalShow(false)}
        worksiteRequest={currentstate!}
        showButtonEditValidate={false}
        showButtonCreate={false}
      />
    </Container>
  );
}

export default WorkSiteDetailPage;
