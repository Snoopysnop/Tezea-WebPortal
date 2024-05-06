import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button, Container, Tab, Tabs, Card, Alert } from 'react-bootstrap';
import Slider from 'react-input-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { User, Tool, WorkSiteStatus, SatisfactionLevel, TimeLine, WorkSiteRequest } from '../api/Model';
import { Envelope, Telephone, Search } from 'react-bootstrap-icons';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import MainApi from '../api/MainApi';
import { getToolName } from '../common/utils/utils';
import WorkSiteRequestPopUp from '../components/WorkSiteRequestPopUp';
import { useLocation, useNavigate } from 'react-router-dom';
import { WorkSiteJson } from '../api/ModelJson';

const CreateWorkSitePage: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const worksiteRequestData = location.state ? (location.state as any).worksiteRequest as WorkSiteRequest : null;

  const [modalShow, setModalShow] = useState(false);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isInitialSelection, setIsInitialSelection] = useState(true);
  const [activeTab, setActiveTab] = useState('date');

  const [availableStaff, setAvailableStaff] = useState<User[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<User[]>([]);
  const [numRandomStaff, setNumRandomStaff] = useState<number>(1);

  const [availableWorksiteChief, setAvailableWorksiteChief] = useState<User[]>([]);
  const [selectedWorksiteChief, setSelectedWorksiteChief] = useState<User>();

  const [availableTools, setAvailableTools] = useState<Tool[]>([]);


  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string>('');
  const [errorCreation, setErrorCreation] = useState<string>('');

  const [title, setTitle] = useState('');



  const handleCreateWorkSite = async () => {
    if (!startTime || !endTime || !selectedWorksiteChief || !selectedStaff.length || !selectedTools.length || !title) {
      console.error('Veuillez remplir toutes les informations nécessaires.');
      setErrorCreation('Veuillez remplir toutes les informations nécessaires avant de créer le chantier.')
      return;
    }

    const workSite: WorkSiteJson = {
      workSiteChief: selectedWorksiteChief ? selectedWorksiteChief.id : undefined,
      staff: selectedStaff.map((user) => user.id!),
      equipment: selectedTools.map(toolName => {
        return {
        name: toolName,
        quantity: selectedQuantities[toolName] || 1
        } as Tool
      }),
      begin: startTime,
      end: endTime,
      status: WorkSiteStatus.InProgress,
      workSiteRequest: worksiteRequestData?.id,
      satisfaction: SatisfactionLevel.Perfect,
      signature: "",
      title: ''
    };

    console.log(workSite)

    await MainApi.getInstance().createWorkSite(workSite)
    //todo brancher le POST
    navigate("/listeStatus")

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

  const handleRandomStaffSelection = () => {
    //TODO rendre la selection aléatoire ?
    const selectedStaff = availableStaff.slice(0, numRandomStaff);
    setSelectedStaff(selectedStaff);
    setAvailableStaff(availableStaff);
    setAvailableStaff(prevStaff => prevStaff.filter(
      (staff) => !selectedStaff.some((user) => user.id === staff.id)
    ));
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

  const handlePopUp = () => {
    setModalShow(true);
  }


  const handleSearchDispo = async () => {

    if (new Date(startTime) > new Date(endTime)) {
      setError('La date de début doit être antérieure à la date de fin.');
      setIsInitialSelection(true);
      return;
    }
    if (startTime === '' || endTime === '') {
      setError('Selectionnez une date de début et une date de fin de chantier');
      setIsInitialSelection(true);
      return;
    }
    setError('')

    setSelectedStaff([]);
    setSelectedWorksiteChief(undefined);
    setSelectedTools([]);
    setSelectedQuantities({});

    const timeLine: TimeLine = {
      begin: new Date(startTime),
      end: new Date(endTime)
    };

    const responseWorksiteChief = await MainApi.getInstance().getWorksiteChiefAvaibilities(timeLine) as User[]
    const responseStaff = await MainApi.getInstance().getStaffAvaibilities(timeLine) as User[]
    const responseTool = await MainApi.getInstance().getToolAvaibilities(timeLine)

    const tools: Tool[] = [];

    for (const key in responseTool) {
      if (Object.prototype.hasOwnProperty.call(responseTool, key)) {
        const tool: Tool = {
          name: getToolName(key),
          quantity: responseTool[key],
        };
        tools.push(tool);
      }
    }


    console.log("azfzafzfsqwfdsg", tools)


    console.log("responseStaff", responseStaff)
    console.log("responseWorksiteChief", responseWorksiteChief)
    console.log("responseTool", responseTool)

    setAvailableStaff(responseStaff);
    setAvailableWorksiteChief(responseWorksiteChief);
    setAvailableTools(tools);



    setIsInitialSelection(false);
  }

  useEffect(() => {
    console.log("responseStaff", availableStaff)
    console.log("responseWorksiteChief", availableWorksiteChief)
    console.log("responseTool", availableTools)
  }, [availableStaff, availableWorksiteChief, availableTools])

  return (

    <Container>
      <Row className="mb-5"></Row>
      <Row>
        <Col xs={11}>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || 'date')}
            id="controlled-tab-example"
            className="mb-3 flex-grow-1"
            style={{ width: '100%' }}
          >

            <Tab eventKey="date" title="Sélectionner une période" >
              <Row className="mb-3"></Row>
              <Row className="mb-5">
                <h2>Selectionner une période pour le chantier :</h2>
              </Row>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Container>
                    <Row>
                      <Col>
                        <Form.Group controlId="startTime">
                          <Form.Label>Début du chantier</Form.Label>
                          <Form.Control
                            type="datetime-local"
                            value={startTime}
                            onChange={e => setStartTime(e.target.value)}
                            style={{ height: '50px', width: '500px', fontSize: '20px', cursor: 'pointer' }}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="endTime">
                          <Form.Label>Fin du chantier</Form.Label>
                          <Form.Control
                            type="datetime-local"
                            value={endTime}
                            onChange={e => setEndTime(e.target.value)}
                            style={{ height: '50px', width: '500px', fontSize: '20px', cursor: 'pointer' }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-5"></Row>
                    <Row className="mb-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Button onClick={async () => await handleSearchDispo()} variant="primary" style={{ height: '50px', width: '300px', fontSize: '20px' }}>
                        {isInitialSelection ? 'Sélectionner' : 'Modifier'}
                      </Button>
                    </Row>
                    <Row className="text-center">
                      {error && <Alert variant="danger">{error}</Alert>}
                    </Row>
                  </Container>
                </Col>
              </Row>

              <Row className="mb-5">
                <h2>Donner un titre pour le chantier :</h2>
              </Row>
              <Form.Group as={Col} controlId="formTitreChantier">
                <Form.Control
                  style={{ width: "35%" }}
                  type="text"
                  placeholder="Entrez un titre"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </Form.Group>
              <Row className="mb-5"></Row>
            </Tab>

            {!isInitialSelection && (

              <Tab eventKey="personnel" title={'Sélectionner le personnel'} style={{ width: '100%' }}>
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
                              <Button variant="danger" style={{ height: '40px', width: '80' }} onClick={() => handleRemoveSelectedWorksiteChief(selectedWorksiteChief.id!)}>
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
                                    <Button variant="danger" style={{ height: '40px', width: '80' }} onClick={() => handleRemoveSelectedStaff(user.id!)}>
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
            )}
            {!isInitialSelection && (
              <Tab eventKey="outilage" title={'Sélectionner l\'outillage'} style={{ width: '100%' }}>
                <Row className="mb-3"></Row>
                <Row className="mb-5">
                  <h2>Selectionner les outils nécessaires au chantier :</h2>
                </Row>
                <ReactSearchAutocomplete
                  items={availableTools ? availableTools.map(tool => ({ id: tool.name, name: tool.name })) : []}
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
                        const selectedTool = availableTools.find(tool => tool.name === toolName);
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
                                    <Row className="align-items-center" >

                                      <Col style={{ width: "10%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button variant="secondary" onClick={() => handleDecreaseQuantity(toolName)} style={{ width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 9 }}>-</Button>
                                      </Col>
                                      <Col style={{ display: 'flex', alignItems: 'center', width: "80%" }}>

                                        <Slider
                                          axis="x"
                                          x={selectedQuantities[toolName] || 1} // Utiliser la quantité sélectionnée pour l'outil spécifique
                                          xmin={1}
                                          xmax={selectedTool.quantity}
                                          onChange={(pos) => handleQuantityChange(toolName, pos.x)} // Passer le nom de l'outil pour identifier quelle quantité changer
                                        />

                                      </Col>
                                      <Col style={{ width: "10%", display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center', textAlign: "center" }}>
                                        <Button variant="secondary" onClick={() => handleIncreaseQuantity(toolName, selectedTool.quantity)} style={{ width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 9 }}>+</Button>
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
              </Tab>
            )}
            {!isInitialSelection && (
              <Tab eventKey="creation" title="Récapitulatif" style={{ width: '100%' }}>
                <Container className="MainContainer">

                  <Container className="TitlePartContainer">
                    <Row className="mb-3"></Row>
                    <Row className="mb-5">
                      <h2>Récapitulatif de la création de chantier</h2>
                    </Row>
                  </Container>

                  <Container className="BodyPartContainer" style={{ display: "flex", flexDirection: "row" }}>
                    <Row style={{ display: "flex", width: "20%" }}>
                      <Row className="mb-5" style={{ fontSize: '20px' }}>
                        Titre : {title ? `${title}` : 'Aucun'}
                      </Row>
                      <Row className="mb-5" style={{ fontSize: '20px' }}>
                        Chef de chantier  : {selectedWorksiteChief ? `${selectedWorksiteChief.firstName} ${selectedWorksiteChief.lastName}` : 'Aucun'}
                      </Row>
                    </Row>
                    <div style={{ display: "flex", width: "20%" }}></div>
                    <div style={{ display: "flex", flexDirection: "row", width: "60%" }}>

                      <div className="border border-dark border-3 container_Employees" style={{ display: "flex", flexDirection: "column", width: "45%" }}>

                        <div style={{ alignItems: "center", justifyContent: "center" }}>
                          <div style={{ fontSize: 15, fontWeight: "bold" }}>Employés sélectionnés :</div>
                        </div>
                        <div>
                          <div>
                            {selectedStaff.map(user => (
                              <li key={user.id}>{user.firstName} {user.lastName}</li>
                            ))}
                          </div>
                        </div>

                      </div>

                      <div className="blankDiv" style={{ display: "flex", width: "10%" }}></div>

                      <div className="border border-dark border-3" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "45%" }}>
                        <div className="mb-3">Outils sélectionnés :</div>
                        <div>
                          {selectedTools.map(toolName => (
                            <li key={toolName}>{toolName} - Quantité : {selectedQuantities[toolName]}</li>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Container>

                  <Container className="FooterPartContainer">
                    <Row className="mb-5"></Row>
                    <Row className="mb-5"></Row>
                    <Row>
                      <Col className="text-center mt-3">
                        <Button variant="success" onClick={handleCreateWorkSite} style={{ fontSize: '20px' }}>
                          Créer le chantier
                        </Button>
                        <Row className="mb-3"></Row>
                        {errorCreation && <Alert variant="danger">{errorCreation}</Alert>}
                      </Col>
                    </Row>
                  </Container>
                </Container>
              </Tab>

            )}
          </Tabs>
        </Col>
        <Col xs={1}>
          <Button onClick={handlePopUp} style={{ fontSize: '20px' }}>
            Consulter Demande de chantier
          </Button>
        </Col>
      </Row>

      <WorkSiteRequestPopUp
        show={modalShow}
        onHide={() => setModalShow(false)}
        worksiteRequest={worksiteRequestData!}//todo checker le !
        showButtons={false}
      />
    </Container>

  );
};

export default CreateWorkSitePage;
