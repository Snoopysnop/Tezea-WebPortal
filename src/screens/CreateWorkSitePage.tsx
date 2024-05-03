import axios from 'axios';
import React, { useState } from 'react';
import { Form, Col, Row, Button, Container, Tab, Tabs, Card } from 'react-bootstrap';
<<<<<<< HEAD
import Slider from 'react-input-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { User, Tool, ToolName, Role, WorkSite, WorkSiteStatus, WorkSiteRequest, SatisfactionLevel } from '../api/Model';
import { Envelope, Telephone, Search, Plus, Dash } from 'react-bootstrap-icons';
import SearchAutocomplete from 'react-search-autocomplete';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Height, Padding } from '@mui/icons-material';

=======
import 'bootstrap/dist/css/bootstrap.min.css';
import { User, Tool, ToolName, Role } from '../api/Model';
>>>>>>> 8b5cafb62a1db4cf31a9347d79a552c95bc87cde

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
<<<<<<< HEAD
  { id: '3', firstName: 'Alice', lastName: 'Smith', role: Role.WorkSiteChief, email: 'jaufret.dufeil@soprasteria.com', phoneNumber: '111111111' },
=======
  { id: '3', firstName: 'Alice', lastName: 'Smith', role: Role.WorkSiteChief, email: 'alice@example.com', phoneNumber: '111111111' },
>>>>>>> 8b5cafb62a1db4cf31a9347d79a552c95bc87cde
  { id: '4', firstName: 'Bob', lastName: 'Johnson', role: Role.WorkSiteChief, email: 'bob@example.com', phoneNumber: '222222222' },
];

const mockTools: Tool[] = [
  { name: ToolName.Stapler, quantity: 5, schedules: [] },
  { name: ToolName.CementMixer, quantity: 2, schedules: [] },
<<<<<<< HEAD
  { name: ToolName.Shear, quantity: 3, schedules: [] },
  { name: ToolName.Wrench, quantity: 4, schedules: [] },
  { name: ToolName.Ladder, quantity: 6, schedules: [] },
  { name: ToolName.Axe, quantity: 2, schedules: [] },
  { name: ToolName.Palette, quantity: 8, schedules: [] },
  { name: ToolName.Rake, quantity: 3, schedules: [] },
  { name: ToolName.Saw, quantity: 5, schedules: [] },
  { name: ToolName.Drill, quantity: 4, schedules: [] },
  { name: ToolName.Shovel, quantity: 16, schedules: [] },
];

=======
];
>>>>>>> 8b5cafb62a1db4cf31a9347d79a552c95bc87cde

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

<<<<<<< HEAD
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const items = mockTools.map(tool => ({ id: tool.name, name: tool.name }));
  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: string]: number }>({});


=======
>>>>>>> 8b5cafb62a1db4cf31a9347d79a552c95bc87cde
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    //todo faire le branchement
=======

>>>>>>> 8b5cafb62a1db4cf31a9347d79a552c95bc87cde
    try {
      setAvailableStaff(mockStaff);
      setAvailableWorksiteChief(mockWorksiteChief);
      setTools(mockTools);
      setIsInitialSelection(false);
    } catch (error) {
      console.error('Erreur lors de la requête au backend :', error);
    }
  };

<<<<<<< HEAD
  const handleCreateWorkSite = async () => {
    // Vérifiez d'abord si toutes les sélections nécessaires ont été effectuées
    if (!startTime || !endTime || !selectedStaff.length || !selectedTools.length) {
      console.error('Veuillez remplir toutes les informations nécessaires.');
      return;
    }

    // Créez l'objet WorkSite avec les valeurs sélectionnées
    const workSite: WorkSite = {
      id: '', // Générez un identifiant unique, ou laissez-le vide s'il est généré côté serveur
      workSiteChief: selectedWorksiteChief ? selectedWorksiteChief : undefined,
      staff: selectedStaff,
      equipment: selectedTools.map(toolName => ({
        id: '', // Générez un identifiant unique, ou laissez-le vide s'il est généré côté serveur
        tool: mockTools.find(tool => tool.name === toolName)!, // Utilisez le nom de l'outil pour obtenir l'objet complet de l'outil
        workSite: null!, // Remplissez-le après l'insertion du chantier de travail
        quantity: selectedQuantities[toolName] || 1, // Utilisez la quantité sélectionnée pour l'outil
      })),
      begin: new Date(startTime),
      end: new Date(endTime),
      status: WorkSiteStatus.InProgress,
      request: undefined,
      satisfaction: SatisfactionLevel.Perfect,
      signature: new ArrayBuffer(0),
    };

    try {
      console.log('WorkSite créé avec succès :', workSite);
    } catch (error) {
      console.error('Erreur lors de la création du WorkSite :', error);
    }
  };

=======
>>>>>>> 8b5cafb62a1db4cf31a9347d79a552c95bc87cde
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

<<<<<<< HEAD
  const handleRandomStaffSelection = () => {
    //TODO rendre la selection aléatoire ?
    const selectedStaff = mockStaff.slice(0, numRandomStaff);
    setSelectedStaff(selectedStaff);
    setAvailableStaff(mockStaff);
    setAvailableStaff(prevStaff => prevStaff.filter(
      (staff) => !selectedStaff.some((user) => user.id === staff.id)
    ));
  };

=======
>>>>>>> 8b5cafb62a1db4cf31a9347d79a552c95bc87cde
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

<<<<<<< HEAD
  const handleOnSearch = (string: any, results: any) => {
    setFilterValue(string);
    console.log(string, results);
  };

  const handleOnSelect = (item: any) => {
    if (!selectedTools.includes(item.name)) {
      setSelectedTools([...selectedTools, item.name]);
      setSelectedQuantities({ ...selectedQuantities, [item.name]: 1 });
    }
  };


  const handleRemoveSelectedTool = (toolNameToRemove: string) => {
    setSelectedTools(prevSelectedTools => prevSelectedTools.filter(toolName => toolName !== toolNameToRemove));
  };

  const handleQuantityChange = (toolName: string, value: number) => {
    setSelectedQuantities({ ...selectedQuantities, [toolName]: value });
  };


  const handleDecreaseQuantity = (toolName: string) => {
    const currentQuantity = selectedQuantities[toolName] || 1;
    if (currentQuantity > 1) {
      setSelectedQuantities({ ...selectedQuantities, [toolName]: currentQuantity - 1 });
    }
  };

  const handleIncreaseQuantity = (toolName: string, quantity: number) => {
    const currentQuantity = selectedQuantities[toolName] || 1;
    if (currentQuantity < quantity) {
      setSelectedQuantities({ ...selectedQuantities, [toolName]: currentQuantity + 1 });
    }
  };


=======
  const handleRandomStaffSelection = () => {
    //TODO rendre la selection aléatoire ?
    const selectedStaff = mockStaff.slice(0, numRandomStaff);
    setSelectedStaff(selectedStaff);
    setAvailableStaff(mockStaff);
    setAvailableStaff(prevStaff => prevStaff.filter(
      (staff) => !selectedStaff.some((user) => user.id === staff.id)
    ));
  };

>>>>>>> 8b5cafb62a1db4cf31a9347d79a552c95bc87cde
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
<<<<<<< HEAD
              <Row className="mb-3"></Row>
              <Row className="mb-5">
                <h2>Selectionner le personnel nécessaire au chantier :</h2>
              </Row>
              <Container style={{ height: '300px' }}>
                <Row className="mt-3">
                  <Col xs={5}>
                    <h4>Liste des chefs de chantier disponibles :</h4>
                    <Form.Select onChange={handleSelectWorksiteChief}>
                      <option value="">Sélectionner un chef de chantier</option>
                      {availableWorksiteChief.map(user => (
                        <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xs={1}></Col>
                  {selectedWorksiteChief && (
                    <Col key={selectedWorksiteChief.id} xs={4} className="mb-3">
                      <Card>
                        <Container style={{ backgroundColor: 'lightgreen' }}>
                          <Card.Body className="text-center">
                            <Card.Title>{selectedWorksiteChief.firstName} {selectedWorksiteChief.lastName}</Card.Title>
                            <Card.Text>
                              {selectedWorksiteChief.role}
                            </Card.Text>
                          </Card.Body>
                        </Container>
                        <hr className="m-0" />
                        <Container style={{ backgroundColor: 'lightgrey' }}>
                          <Card.Body>
                            <Card.Text>
                              <Envelope /> : {selectedWorksiteChief.email}
                              <br />
                              <Telephone /> : {selectedWorksiteChief.phoneNumber}
                            </Card.Text>
                          </Card.Body>
                          <Card.Body className="text-center">
                            <Button variant="danger" style={{ height: '40px', width: '80' }} onClick={() => handleRemoveSelectedWorksiteChief(selectedWorksiteChief.id)}>
                              Retirer
                            </Button>
                          </Card.Body>
                        </Container>
                      </Card>
                    </Col>
                  )}
                </Row>
              </Container>
              <Container style={{ height: '300px' }}>
                <Row className="mt-3">
                  <Col xs={5}>
                    <h4>Liste des employés disponibles :</h4>
                    <Form.Select onChange={handleSelectStaff}>
                      <option value="">Sélectionner un employé</option>
                      {availableStaff.map(user => (
                        <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xs={1}></Col>
                  <Col xs={3} className="d-flex justify-content-between align-items-end">
                    <div>
                      <h4>Sélection aléatoire :</h4>
                      <Form.Group controlId="numRandomStaff" style={{ width: '200px' }}>
                        <Form.Control
                          type="number"
                          min={1}
                          value={numRandomStaff}
                          onChange={(e) => setNumRandomStaff(parseInt(e.target.value))}
                        />
                      </Form.Group>
                    </div>
                    <Button variant="primary" onClick={handleRandomStaffSelection}><Search /></Button>
                  </Col>
                  <Row className="mb-5"></Row>
                  <Row className="mb-5"></Row>

                  {selectedStaff.length > 0 && (
                    <Container>
                      <Row>
                        {selectedStaff.map((user) => (
                          <Col key={user.id} xs={4} className="mb-3">
                            <Card>
                              <Container style={{ backgroundColor: 'lightgreen' }}>
                                <Card.Body className="text-center">
                                  <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                                  <Card.Text>
                                    {user.role}
                                  </Card.Text>
                                </Card.Body>
                              </Container>
                              <hr className="m-0" />
                              <Container style={{ backgroundColor: 'lightgrey' }}>
                                <Card.Body>
                                  <Card.Text>
                                    <Envelope /> : {user.email}
                                    <br />
                                    <Telephone /> : {user.phoneNumber}
                                  </Card.Text>
                                </Card.Body>
                                <Card.Body className="text-center">
                                  <Button variant="danger" style={{ height: '40px', width: '80' }} onClick={() => handleRemoveSelectedStaff(user.id)}>
                                    Retirer
                                  </Button>
                                </Card.Body>
                              </Container>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                  )}
                  <Row className="mb-5"></Row>
                </Row>
              </Container>
            </Tab>
            <Tab eventKey="outilage" title={`Outilage (${selectedTools.length})`} style={{ width: '100%' }}>
              <Row className="mt-3">
                <ReactSearchAutocomplete
                  items={items}
                  onSearch={handleOnSearch}
                  onSelect={handleOnSelect}
                  autoFocus
                  placeholder="Filtrer par nom d'outils"
                />
                <Row className="mb-5"></Row>
                {selectedTools.length > 0 && (
                  <Container>
                    <Row className="mb-3">
                      <h4>Outils sélectionnés :</h4>
                    </Row>
                    <Row>
                      {selectedTools.map((toolName, index) => {
                        const selectedTool = mockTools.find(tool => tool.name === toolName);
                        return (
                          <Col key={index} xs={4} className="mb-3">


                            <Card>
                              <Container style={{ backgroundColor: 'lightgreen' }}>
                                <Card.Body className="text-center">
                                  <Card.Title>{toolName}</Card.Title>
                                  {selectedTool && (
                                    <Card.Text>
                                      Quantité disponible : {selectedTool.quantity}
                                    </Card.Text>
                                  )}
                                </Card.Body>
                              </Container>
                              <Container style={{ backgroundColor: 'lightgrey' }}>
                                <Card.Body className="text-center">
                                  Quantité sélectionnée : {selectedQuantities[toolName]}
                                </Card.Body>
                                <Card.Body>
                                  {selectedTool && (
                                    <Row className="align-items-center">

                                      <Col xs={2}>
                                        <Button variant="secondary" onClick={() => handleDecreaseQuantity(toolName)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30px', height: '30px' }}>-</Button>
                                      </Col>
                                      <Col xs={8}>

                                        <Slider

                                          axis="x"
                                          x={selectedQuantities[toolName] || 1} // Utilisez la quantité sélectionnée pour l'outil spécifique
                                          xmin={1}
                                          xmax={selectedTool.quantity}
                                          onChange={({ x }) => handleQuantityChange(toolName, x)} // Passez le nom de l'outil pour identifier quelle quantité changer
                                        />

                                      </Col>
                                      <Col xs={2}>
                                        <Button variant="secondary" onClick={() => handleIncreaseQuantity(toolName, selectedTool.quantity)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30px', height: '30px' }}>+</Button>
                                      </Col>

                                    </Row>
                                  )}
                                </Card.Body>

                                <Card.Body className="text-center">
                                  <Button variant="danger" style={{ height: '40px', width: '80' }} onClick={() => handleRemoveSelectedTool(toolName)}>
                                    Retirer
                                  </Button>
                                </Card.Body>
                              </Container>
                            </Card>



                          </Col>
                        );
                      })}
                    </Row>
                  </Container>
                )}
              </Row>
            </Tab>
            <Tab eventKey="creation" title="Création" style={{ width: '100%' }}>
              <Container>
                <Row className="mb-5" style={{ color: '#008FE3', fontSize: '32px' }}>
                  Récapitulatif :

                </Row>
                <Row className="mb-5" style={{ fontSize: '20px' }}>
                  Chef de chantier  : {selectedWorksiteChief ? `${selectedWorksiteChief.firstName} ${selectedWorksiteChief.lastName}` : 'Aucun'}
                </Row>
                <Row>
                  <Col>
                    <Row className="mb-3">
                      Employés sélectionnés :
                    </Row>
                    <Row>
                      {selectedStaff.map(user => (
                        <li key={user.id}>{user.firstName} {user.lastName}</li>
                      ))}
                    </Row>
                  </Col>
                  <Col>
                    <Row className="mb-3">
                      Outils sélectionnés :
                    </Row>
                    <Row>
                      {selectedTools.map(toolName => (
                        <li key={toolName}>{toolName} - Quantité : {selectedQuantities[toolName]}</li>
                      ))}
                    </Row>
                  </Col>
                </Row>
                <Row className="mb-5"></Row>
                <Row className="mb-5"></Row>
                <Row>
                  <Col className="text-center mt-3">
                    <Button variant="success" onClick={handleCreateWorkSite} style={{ fontSize: '20px' }}>
                      Créer le chantier
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Tab>
          </Tabs>
        </Container>
      )}
      <Row className="mb-5"></Row>
    </Container>

=======
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
>>>>>>> 8b5cafb62a1db4cf31a9347d79a552c95bc87cde
  );
};

export default CreateWorkSitePage;
