import axios from 'axios';
import React, { useState } from 'react';
import { Form, Col, Row, Button, Container, Tab, Tabs, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { User, Tool, ToolName, Role } from '../api/Model';

const mockStaff: User[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', role: Role.Employee, email: 'john@example.com', phoneNumber: '123456789' },
  { id: '2', firstName: 'Jane', lastName: 'Terre', role: Role.Employee, email: 'jane@example.com', phoneNumber: '987654321' },
  { id: '3', firstName: 'Albert', lastName: 'Vie', role: Role.Employee, email: 'john@example.com', phoneNumber: '123456789' },
  { id: '4', firstName: 'Hugo', lastName: 'Eau', role: Role.Employee, email: 'jane@example.com', phoneNumber: '987654321' },
  { id: '5', firstName: 'Floriant', lastName: 'Savon', role: Role.Employee, email: 'john@example.com', phoneNumber: '123456789' },
  { id: '6', firstName: 'Chris', lastName: 'Douche', role: Role.Employee, email: 'jane@example.com', phoneNumber: '987654321' },
  { id: '7', firstName: 'Gwen', lastName: 'Savon', role: Role.Employee, email: 'john@example.com', phoneNumber: '123456789' },
  { id: '8', firstName: 'Brian', lastName: 'Douche', role: Role.Employee, email: 'jane@example.com', phoneNumber: '987654321' },
  { id: '9', firstName: 'Jaufret', lastName: 'Savon', role: Role.Employee, email: 'john@example.com', phoneNumber: '123456789' },
  { id: '10', firstName: 'Lise', lastName: 'Douche', role: Role.Employee, email: 'jane@example.com', phoneNumber: '987654321' },
];

const mockWorksiteChief: User[] = [
  { id: '3', firstName: 'Alice', lastName: 'Smith', role: Role.WorkSiteChief, email: 'alice@example.com', phoneNumber: '111111111' },
  { id: '4', firstName: 'Bob', lastName: 'Johnson', role: Role.WorkSiteChief, email: 'bob@example.com', phoneNumber: '222222222' },
];

const mockTools: Tool[] = [
  { name: ToolName.Stapler, quantity: 5, schedules: [] },
  { name: ToolName.CementMixer, quantity: 2, schedules: [] },
];

const CreateWorkSitePage: React.FC = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isInitialSelection, setIsInitialSelection] = useState(true);
  const [activeTab, setActiveTab] = useState('personnel');

  const [availableStaff, setAvailableStaff] = useState<User[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<User[]>([]);
  const [numRandomStaff, setNumRandomStaff] = useState<number>(1);

  const [availableWorksiteChief, setAvailableWorksiteChief] = useState<User[]>([]);
  const [selectedWorksiteChief, setSelectedWorksiteChief] = useState<User>();

  const [tools, setTools] = useState<Tool[]>([]);

  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setAvailableStaff(mockStaff);
      setAvailableWorksiteChief(mockWorksiteChief);
      setTools(mockTools);
      setIsInitialSelection(false);
    } catch (error) {
      console.error('Erreur lors de la requête au backend :', error);
    }
  };

  const handleSelectStaff = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = e.target.value;
    const selectedUser = availableStaff.find(user => user.id === selectedUserId);
    if (selectedUser) {
      setSelectedStaff([...selectedStaff, selectedUser]);
      setAvailableStaff(availableStaff.filter(user => user.id !== selectedUserId));
    }
  };

  const handleRemoveSelectedStaff = (userId: string) => {
    const selectedUser = selectedStaff.find(user => user.id === userId);
    if (selectedUser) {
      setAvailableStaff([...availableStaff, selectedUser]);
      setSelectedStaff(selectedStaff.filter(user => user.id !== userId));
    }
  };

  const handleSelectWorksiteChief = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = e.target.value;
    const selectedUser = availableWorksiteChief.find(user => user.id === selectedUserId);
    if (selectedUser) {
      setSelectedWorksiteChief(selectedUser);
    }
  };

  const handleRemoveSelectedWorksiteChief = (userId: string) => {
    const selectedUser = selectedWorksiteChief;
    if (selectedUser) {
      setSelectedWorksiteChief(undefined);
    }
  };

  const handleRandomStaffSelection = () => {
    //TODO rendre la selection aléatoire ?
    const selectedStaff = mockStaff.slice(0, numRandomStaff);
    setSelectedStaff(selectedStaff);
    setAvailableStaff(mockStaff);
    setAvailableStaff(prevStaff => prevStaff.filter(
      (staff) => !selectedStaff.some((user) => user.id === staff.id)
    ));
  };

  return (
    <Container>
      <Row className="mb-5"></Row>
      <Row className="mb-5" style={{ color: '#008FE3', fontSize: '32px' }}>
        Selectionner une période pour le chantier :
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="startTime">
                  <Form.Label>Début du chantier</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    style={{ height: '50px', width: '600px', fontSize: '20px' }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="endTime">
                  <Form.Label>Fin du chantier</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    style={{ height: '50px', width: '600px', fontSize: '20px' }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-5"></Row>
            <Row className="mb-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button variant="primary" type="submit" style={{ height: '50px', width: '300px', fontSize: '20px' }}>
                {isInitialSelection ? 'Sélectionner' : 'Modifier'}
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>

      {!isInitialSelection && (
        <Container>
          <Row className="mb-3"></Row>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || 'personnel')}
            id="controlled-tab-example"
            className="mb-3 flex-grow-1">

            <Tab eventKey="personnel" title={`Personnel (${mockStaff.length})`} style={{ width: '100%' }}>
              <Container style={{ height: '200px' }}>
              <Row className="mt-3">
                <Col xs={12} md={6}>
                  {/* Liste du personnel */}
                  <h4>Liste du personnel :</h4>
                  <Form.Select onChange={handleSelectWorksiteChief}>
                    <option value="">Sélectionner un membre du personnel...</option>
                    {availableWorksiteChief.map(user => (
                      <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs={2}></Col>
                {selectedWorksiteChief && (
                  <Col key={selectedWorksiteChief.id} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title>{selectedWorksiteChief.firstName} {selectedWorksiteChief.lastName}</Card.Title>
                        <Card.Text>
                          {selectedWorksiteChief.role}
                          <br />
                          {selectedWorksiteChief.email}
                          <br />
                          {selectedWorksiteChief.phoneNumber}
                        </Card.Text>
                        <Button variant="danger" size="sm" onClick={() => handleRemoveSelectedWorksiteChief(selectedWorksiteChief.id)}>
                          Retirer
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
              </Row>
              </Container>
              <Row className="mt-3">
                <Col xs={12} md={6}>
                  {/* Liste du personnel */}
                  <h4>Liste du personnel :</h4>
                  <Form.Select onChange={handleSelectStaff}>
                    <option value="">Sélectionner un membre du personnel...</option>
                    {availableStaff.map(user => (
                      <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col xs={12} md={6}>
                  {/* Formulaire pour choisir le nombre de personnes à sélectionner aléatoirement */}
                  <h4>Sélection aléatoire :</h4>
                  <Form.Group controlId="numRandomStaff">
                    <Form.Label>Nombre de personnes</Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      value={numRandomStaff}
                      onChange={(e) => setNumRandomStaff(parseInt(e.target.value))}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleRandomStaffSelection}>Sélectionner aléatoirement</Button>
                </Col>
              </Row>
            </Tab>
            {/* Votre onglet outillage existant */}
            {/* ... */}
          </Tabs>
        </Container>
      )}

      {/* Carte des membres du personnel sélectionnés */}
      {selectedStaff.length > 0 && (
        <Container>
          <Row className="mb-3"></Row>
          <h4>Membres du personnel sélectionnés :</h4>
          <Row>
            {selectedStaff.map((user) => (
              <Col key={user.id} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                    <Card.Text>
                      {user.role}
                      <br />
                      {user.email}
                      <br />
                      {user.phoneNumber}
                    </Card.Text>
                    <Button variant="danger" size="sm" onClick={() => handleRemoveSelectedStaff(user.id)}>
                      Retirer
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}




      {/* Carte de l'outil sélectionné */}
      {selectedTool && (
        <Container>
          <Row className="mb-3"></Row>
          <h4>Outil sélectionné :</h4>
          <Row>
            <Col xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{selectedTool.name}</Card.Title>
                  <Card.Text>
                    Quantité : {selectedTool.quantity}
                  </Card.Text>
                  <Button variant="danger" size="sm" onClick={() => setSelectedTool(null)}>
                    Retirer
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default CreateWorkSitePage;
