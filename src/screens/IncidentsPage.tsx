import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, InputGroup, Button, Form, Dropdown } from 'react-bootstrap';
import { Category, Emergency, EmergencyDetails, WorkSiteStatus } from '../api/Model';
import '../App.css'
import EmergencyComponent from './EmergencyComponent';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const IncidentsPage: React.FC = () => {

  const tasks: EmergencyDetails[] = [
    {
      description: "blab laedhgd zgvez dghvezfh vg",
      chantier: "",
      id: 1,
      emergency: Emergency.Low,
      worksite: {
        id: "1", title: "Chantier 1", begin:"2024-10-10 09:00"
        , end: "2024-10-10 12:00", address: "2 Fox Street, NY", status: WorkSiteStatus.Archive
      }, },
    {
      description: "blabla",
      chantier: "",
      id: 1,
      emergency: Emergency.Medium,
      worksite: {
        id: "1", title: "Chantier 1",begin:"2024-10-10 09:00"
        , end: "2024-10-10 12:00", address: "2 Fox Street, NY", status: WorkSiteStatus.Archive
      },   },
    {
      description: "blabla",
      chantier: "",
      id: 1,
      emergency: Emergency.Medium,
      worksite: {
        id: "1", title: "Chantier 1", begin:"2024-10-10 09:00"
        , end: "2024-10-10 12:00", address: "2 Fox Street, NY", status: WorkSiteStatus.Archive
      },     },
    {
      description: "blabla",
      chantier: "",
      id: 1,
      emergency: Emergency.High,
      worksite: {
        id: "1", title: "Chantier 1", begin:"2024-10-10 09:00"
        , end: "2024-10-10 12:00", address: "2 Fox Street, NY", status: WorkSiteStatus.Archive
      },     },
    {
      description: "blabla",
      chantier: "",
      id: 1,
      emergency: Emergency.Critical,
      worksite: {
        id: "1", title: "Chantier 1", begin:"2024-10-10 09:00"
        , end: "2024-10-10 12:00", address: "2 Fox Street, NY", status: WorkSiteStatus.Archive
      },     },
  ];



  const [filterValue, setFilterValue] = useState<string>("");
  const allStatus: Emergency[] = Object.values(Emergency);
  const [selectedStatus, setSelectedStatus] = useState<Emergency[]>([]);

  const [checkboxes, setCheckboxes] = useState<{ [key in Emergency]?: boolean }>({});
  const filteredTasks = tasks.filter(task => task.worksite.title.toLowerCase().includes(filterValue.toLowerCase()));

  const handleStatusChange = (status: Emergency) => {
    const updatedCheckboxes = { ...checkboxes, [status]: !checkboxes[status] };
    setCheckboxes(updatedCheckboxes);

    setSelectedStatus(Object.keys(updatedCheckboxes).filter(key => updatedCheckboxes[key as Emergency]) as Emergency[]);
  };

  //Use effect pour refresh les checkbox en temps réel
  useEffect(() => {
    const updatedCheckboxes: { [key in Emergency]?: boolean } = {};
    selectedStatus.forEach(status => {
      updatedCheckboxes[status] = true;
    });
    setCheckboxes(updatedCheckboxes);
  }, [selectedStatus]);

  //Use effect pour initialiser les checkbox a true
  useEffect(() => {
    const initialCheckboxes: { [key in Emergency]?: boolean } = {};
    allStatus.forEach(status => {
      initialCheckboxes[status] = true;
    });
    setSelectedStatus(allStatus);
    setCheckboxes(initialCheckboxes);
  }, []);

  const items = tasks.map(task => ({
    id: task.id,
    name: task.worksite.title,
  }));

  const handleOnSearch = (string: any, results: any) => {
    setFilterValue(string);
    console.log(string, results);
  };

  const handleOnSelect = (item: any) => {
    console.log(item);
    setFilterValue(item.name);
  };

  return (
    <Container className='container-xxl'>
      <Row className='mt-4'>
        <Col lg={6}>
          <Row>
            <Col>
              <ReactSearchAutocomplete
                styling={{ borderRadius: "10px" }}
                items={items}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                autoFocus
                placeholder="Filtrer par nom de chantier..."
              />
            </Col>
            <Col lg className='d-flex align-items-center'>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Filtrer
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.values(Emergency).map((status, index) => (
                    <Dropdown.Item key={index}>
                      <Form.Check
                        type="checkbox"
                        label={status}
                        checked={!!checkboxes[status]}
                        onChange={() => handleStatusChange(status)}
                      />
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>

      <Container className="container-xxl mt-4">
  <Table responsive>
    <thead>
      <tr>
        <th className={`col-lg-2 ${!selectedStatus.includes(Emergency.Low) && "d-none"}`}>{Emergency.Low}</th>
        <th className={`col-lg-2 ${!selectedStatus.includes(Emergency.Medium) && "d-none"}`}>{Emergency.Medium}</th>
        <th className={`col-lg-2 ${!selectedStatus.includes(Emergency.High) && "d-none"}`}>{Emergency.High}</th>
        <th className={`col-lg-2 ${!selectedStatus.includes(Emergency.Critical) && "d-none"}`}>{Emergency.Critical}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className={`col-lg-2 ${!selectedStatus.includes(Emergency.Low) && "d-none"}`}>
          <Row>
            {filteredTasks
              .filter(task => task.emergency === Emergency.Low)
              .map(task => (
                <Col key={task.id} lg={12}>
                  <EmergencyComponent
                    id={task.id}
                    description={task.description}
                    emergency={Emergency.Low}
                    category={Category.CreaPalette}
                    worksite={task.worksite}
                  />
                </Col>
              ))}
          </Row>
        </td>
        <td className={`col-lg-2 ${!selectedStatus.includes(Emergency.Medium) && "d-none"}`}>
          <Row>
            {filteredTasks
              .filter(task => task.emergency === Emergency.Medium)
              .map(task => (
                <Col key={task.id} lg={12}>
                  <EmergencyComponent
                    id={task.id}
                    description={task.description}
                    emergency={Emergency.Medium}
                    category={Category.CreaPalette}
                    worksite={task.worksite}
                  />
                </Col>
              ))}
          </Row>
        </td>
        <td className={`col-lg-2 ${!selectedStatus.includes(Emergency.High) && "d-none"}`}>
          <Row>
            {filteredTasks
              .filter(task => task.emergency === Emergency.High)
              .map(task => (
                <Col key={task.id} lg={12}>
                  <EmergencyComponent
                    id={task.id}
                    description={task.description}
                    emergency={Emergency.High}
                    category={Category.CreaPalette}
                    worksite={task.worksite}
                  />
                </Col>
              ))}
          </Row>
        </td>
        <td className={`col-lg-2 ${!selectedStatus.includes(Emergency.Critical) && "d-none"}`}>
          <Row>
            {filteredTasks
              .filter(task => task.emergency === Emergency.Critical)
              .map(task => (
                <Col key={task.id} lg={12}>
                  <EmergencyComponent
                    id={task.id}
                    description={task.description}
                    emergency={Emergency.Critical}
                    category={Category.CreaPalette}
                    worksite={task.worksite}
                  />
                </Col>
              ))}
          </Row>
        </td>
      </tr>
    </tbody>
  </Table>
</Container>

    </Container>
  );
};

export default IncidentsPage;
