import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, InputGroup, Button, Form, Dropdown } from 'react-bootstrap';
import { Category, Emergency, EmergencyDetails, Task, WorkSiteStatus } from '../api/Model';
import '../App.css'
import EmergencyComponent from './EmergencyComponent';

const IncidentsPage: React.FC = () => {

  const tasks: EmergencyDetails[] = [
    {
      description: "blab laedhgd zgvez dghvezfh vg",
      chantier: "",
      id: 1,
      emergency: Emergency.Low,
      task: { id: 1, name: "Chantier 1", date: "10/10/2024", startHours: "5PM", endHour: "9PM", address: "2 Fox Street, NY", status: WorkSiteStatus.Standby },
    },
    {
      description: "blabla",
      chantier: "",
      id: 1,
      emergency: Emergency.Medium,
      task: { id: 1, name: "Chantier 1", date: "11/10/2024", startHours: "5PM", endHour: "9PM", address: "2 Fox Street, NY", status: WorkSiteStatus.Standby },
    },
    {
      description: "blabla",
      chantier: "",
      id: 1,
      emergency: Emergency.Medium,
      task: { id: 1, name: "Chantier 1", date: "11/10/2024", startHours: "5PM", endHour: "9PM", address: "2 Fox Street, NY", status: WorkSiteStatus.Standby },
    },
    {
      description: "blabla",
      chantier: "",
      id: 1,
      emergency: Emergency.High,
      task: { id: 1, name: "Chantier 1", date: "10/10/2024", startHours: "5PM", endHour: "9PM", address: "2 Fox Street, NY", status: WorkSiteStatus.Standby },
    },
  ];

  const [filterValue, setFilterValue] = useState<string>("");

  const mapDateTasks = new Map<string, EmergencyDetails[]>();
  tasks.forEach(task => {
    const taskList = mapDateTasks.get(task.task.date) || [];
    taskList.push(task);
    mapDateTasks.set(task.task.date, taskList);
  });

  const allStatus: Emergency[] = Object.values(Emergency);
  const [selectedStatus, setSelectedStatus] = useState<Emergency[]>([]);

  const [checkboxes, setCheckboxes] = useState<{ [key in Emergency]?: boolean }>({});

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


  return (
    <Container>
      <Row>
        <Col className="col-6 d-flex">
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

      <Container className="container-xxl mt-4">
        <Table responsive>
          <thead>
            <tr>
              {selectedStatus.length > 0 && <th className="col-lg-1">Date</th>}
              {selectedStatus.includes(Emergency.Low) && <th className="col-lg-3">{Emergency.Low}</th>}
              {selectedStatus.includes(Emergency.Medium) && <th className="col-lg-3">{Emergency.Medium}</th>}
              {selectedStatus.includes(Emergency.High) && <th className="col-lg-3">{Emergency.High}</th>}
            </tr>
          </thead>
          <tbody>
            {Array.from(mapDateTasks.entries()).map(([date, filteredTasks]) => (
              filteredTasks.some(task => selectedStatus.includes(task.emergency)) && // Vérifie s'il y a des tâches à afficher
              <tr key={date}>
                {selectedStatus.length > 0 && <td>{date}</td>}
                {selectedStatus.includes(Emergency.Low) && (
                  <td>
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
                              task={task.task}
                            />
                          </Col>
                        ))}
                    </Row>
                  </td>
                )}
                {selectedStatus.includes(Emergency.Medium) && (
                  <td>
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
                              task={task.task}
                            />
                          </Col>
                        ))}
                    </Row>
                  </td>
                )}
                {selectedStatus.includes(Emergency.High) && (
                  <td>
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
                              task={task.task}
                            />                          </Col>
                        ))}
                    </Row>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default IncidentsPage;
