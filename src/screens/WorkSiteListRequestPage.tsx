import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, InputGroup, Button, Form, Dropdown } from 'react-bootstrap';
import { Category, Task, WorkSiteStatus } from '../api/Model';
import TaskComponent from './TaskComponent';
import '../App.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const WorkSiteListRequestPage: React.FC = () => {

  const tasks: Task[] = [
    { id: 1, name: "Chantier 1", date: "10/10/2024", startHours: "5PM", endHour: "9PM", address: "2 Fox Street, NY", status: WorkSiteStatus.Standby },
    { id: 2, name: "Chantier 2", date: "10/10/2024", startHours: "5PM", endHour: "9PM", address: "2 Fox Street, NY", status: WorkSiteStatus.Standby },
    { id: 3, name: "Chantier 2", date: "10/10/2024", startHours: "5PM", endHour: "9PM", address: "2 Fox Street, NY", status: WorkSiteStatus.InProgress },

    { id: 4, name: "Chantier 2", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteStatus.InProgress },
    { id: 5, name: "Chantier 3", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteStatus.Canceled },
    { id: 6, name: "Chantier 3", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteStatus.Canceled },

    { id: 7, name: "Chantier Test 1", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteStatus.Done },
    { id: 8, name: "Chantier Test 2", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteStatus.Done },
    { id: 9, name: "Chantier Test 3", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteStatus.Done },
    { id: 10, name: "Chantier Test 14", date: "10/11/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteStatus.Canceled },
    { id: 11, name: "Chantier Test 24", date: "10/11/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteStatus.Canceled },
    { id: 12, name: "Chantier Test 35", date: "10/11/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteStatus.Canceled },
  ];

  const [filterValue, setFilterValue] = useState<string>("");
  const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(filterValue.toLowerCase()));

  const mapDateTasks = new Map<string, Task[]>();
  filteredTasks.forEach(task => {
    const taskList = mapDateTasks.get(task.date) || [];
    taskList.push(task);
    mapDateTasks.set(task.date, taskList);
  });

  const allStatus: WorkSiteStatus[] = Object.values(WorkSiteStatus);
  const [selectedStatus, setSelectedStatus] = useState<WorkSiteStatus[]>([]);

  const [checkboxes, setCheckboxes] = useState<{ [key in WorkSiteStatus]?: boolean }>({});

  const handleStatusChange = (status: WorkSiteStatus) => {
    const updatedCheckboxes = { ...checkboxes, [status]: !checkboxes[status] };
    setCheckboxes(updatedCheckboxes);

    setSelectedStatus(Object.keys(updatedCheckboxes).filter(key => updatedCheckboxes[key as WorkSiteStatus]) as WorkSiteStatus[]);
  };

  //Use effect pour refresh les checkbox en temps réel
  useEffect(() => {
    const updatedCheckboxes: { [key in WorkSiteStatus]?: boolean } = {};
    selectedStatus.forEach(status => {
      updatedCheckboxes[status] = true;
    });
    setCheckboxes(updatedCheckboxes);
  }, [selectedStatus]);

  //Use effect pour initialiser les checkbox a true
  useEffect(() => {
    const initialCheckboxes: { [key in WorkSiteStatus]?: boolean } = {};
    allStatus.forEach(status => {
      initialCheckboxes[status] = true;
    });
    setSelectedStatus(allStatus);
    setCheckboxes(initialCheckboxes);
  }, []);

  const items = tasks.map(task => ({
    id: task.id,
    name: task.name,
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
    <Container>
      <Row >
        {/* Utiliser ReactSearchAutocomplete */}
        <Col className="col-6">
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            placeholder="Filtrer par nom de chantier..."
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Filtrer
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Object.values(WorkSiteStatus).map((status, index) => (
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

      <Container className="mt-4">
        <Table>
          <thead>
            <tr>
              {selectedStatus.length > 0 && <th>Date</th>}
              {selectedStatus.includes(WorkSiteStatus.Standby) && <th>A compléter</th>}
              {selectedStatus.includes(WorkSiteStatus.InProgress) && <th>En cours</th>}
              {selectedStatus.includes(WorkSiteStatus.Done) && <th>Terminé</th>}
              {selectedStatus.includes(WorkSiteStatus.Canceled) && <th>Archivé</th>}
            </tr>
          </thead>
          <tbody>
            {Array.from(mapDateTasks.entries()).map(([date, filteredTasks]) => (
              filteredTasks.some(task => selectedStatus.includes(task.status)) && // Vérifie s'il y a des tâches à afficher
              <tr key={date}>
                {selectedStatus.length > 0 && <td>{date}</td>}
                {selectedStatus.includes(WorkSiteStatus.Standby) && (
                  <td>
                    <Row>
                      {filteredTasks
                        .filter(task => task.status === WorkSiteStatus.Standby)
                        .map(task => (
                          <Col key={task.id} lg={6}>
                            <TaskComponent
                              id={task.id}
                              name={task.name}
                              date={task.date}
                              startHours={task.startHours}
                              endHour={task.endHour}
                              address={task.address}
                              status={task.status}
                              category={Category.CreaPalette}
                            />
                          </Col>
                        ))}
                    </Row>
                  </td>
                )}
                {selectedStatus.includes(WorkSiteStatus.InProgress) && (
                  <td>
                    <Row>
                      {filteredTasks
                        .filter(task => task.status === WorkSiteStatus.InProgress)
                        .map(task => (
                          <Col key={task.id} lg={6}>
                            <TaskComponent
                              id={task.id}
                              name={task.name}
                              date={task.date}
                              startHours={task.startHours}
                              endHour={task.endHour}
                              address={task.address}
                              status={task.status}
                              category={Category.CreaPalette}
                            />
                          </Col>
                        ))}
                    </Row>
                  </td>
                )}
                {selectedStatus.includes(WorkSiteStatus.Done) && (
                  <td>
                    <Row>
                      {filteredTasks
                        .filter(task => task.status === WorkSiteStatus.Done)
                        .map(task => (
                          <Col key={task.id} lg={6}>
                            <TaskComponent
                              id={task.id}
                              name={task.name}
                              date={task.date}
                              startHours={task.startHours}
                              endHour={task.endHour}
                              address={task.address}
                              status={task.status}
                              category={Category.CreaPalette}
                            />
                          </Col>
                        ))}
                    </Row>
                  </td>
                )}
                {selectedStatus.includes(WorkSiteStatus.Canceled) && (
                  <td>
                    <Row>
                      {filteredTasks
                        .filter(task => task.status === WorkSiteStatus.Canceled)
                        .map(task => (
                          <Col key={task.id} lg={6}>
                            <TaskComponent
                              id={task.id}
                              name={task.name}
                              date={task.date}
                              startHours={task.startHours}
                              endHour={task.endHour}
                              address={task.address}
                              status={task.status}
                              category={Category.CreaPalette}
                            />
                          </Col>
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

export default WorkSiteListRequestPage;

