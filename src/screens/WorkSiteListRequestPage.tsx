import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, InputGroup, Button, Form, Dropdown } from 'react-bootstrap';
import { Category, Task, TaskRequest, WorkSiteRequestStatusListPage } from '../api/Model';
import TaskComponent from './TaskComponent';
import '../App.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const WorkSiteListRequestPage: React.FC = () => {

  const tasks: TaskRequest[] = [
    { id: 1, name: "Chantier 1", date: "10/10/2024", startHours: "5PM", endHour: "9PM", address: "2 Fox Street, NY", status: WorkSiteRequestStatusListPage.Standby },
    { id: 2, name: "Chantier 2", date: "10/10/2024", startHours: "5PM", endHour: "9PM", address: "2 Fox Street, NY", status: WorkSiteRequestStatusListPage.Standby },
    { id: 3, name: "Chantier 2", date: "10/10/2024", startHours: "5PM", endHour: "9PM", address: "2 Fox Street, NY", status: WorkSiteRequestStatusListPage.Done },

    { id: 4, name: "Chantier 2", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteRequestStatusListPage.Done },
    { id: 5, name: "Chantier 3", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteRequestStatusListPage.Done },
    { id: 6, name: "Chantier 3", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteRequestStatusListPage.ToComplete },

    { id: 7, name: "Chantier Test 1", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteRequestStatusListPage.Done },
    { id: 8, name: "Chantier Test 2", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteRequestStatusListPage.Done },
    { id: 9, name: "Chantier Test 3", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteRequestStatusListPage.Done },
    { id: 10, name: "Chantier Test 14", date: "10/11/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteRequestStatusListPage.ToComplete },
    { id: 11, name: "Chantier Test 24", date: "10/11/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteRequestStatusListPage.Archive },
    { id: 12, name: "Chantier Test 35", date: "10/11/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: WorkSiteRequestStatusListPage.Archive },
  ];

  const [filterValue, setFilterValue] = useState<string>("");
  const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(filterValue.toLowerCase()));

  const mapDateTasks = new Map<string, TaskRequest[]>();
  filteredTasks.forEach(task => {
    const taskList = mapDateTasks.get(task.date) || [];
    taskList.push(task);
    mapDateTasks.set(task.date, taskList);
  });

  const allStatus: WorkSiteRequestStatusListPage[] = Object.values(WorkSiteRequestStatusListPage);
  const [selectedStatus, setSelectedStatus] = useState<WorkSiteRequestStatusListPage[]>([]);

  const [checkboxes, setCheckboxes] = useState<{ [key in WorkSiteRequestStatusListPage]?: boolean }>({});

  const handleStatusChange = (status: WorkSiteRequestStatusListPage) => {
    const updatedCheckboxes = { ...checkboxes, [status]: !checkboxes[status] };
    setCheckboxes(updatedCheckboxes);

    setSelectedStatus(Object.keys(updatedCheckboxes).filter(key => updatedCheckboxes[key as WorkSiteRequestStatusListPage]) as WorkSiteRequestStatusListPage[]);
  };

  //Use effect pour refresh les checkbox en temps réel
  useEffect(() => {
    const updatedCheckboxes: { [key in WorkSiteRequestStatusListPage]?: boolean } = {};
    selectedStatus.forEach(status => {
      updatedCheckboxes[status] = true;
    });
    setCheckboxes(updatedCheckboxes);
  }, [selectedStatus]);

  //Use effect pour initialiser les checkbox a true
  useEffect(() => {
    const initialCheckboxes: { [key in WorkSiteRequestStatusListPage]?: boolean } = {};
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
                  {Object.values(WorkSiteRequestStatusListPage).map((status, index) => (
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
              {selectedStatus.length > 0 && <th className="col-lg-1">Date</th>}
              {selectedStatus.includes(WorkSiteRequestStatusListPage.ToComplete) && <th className="col-lg-2">{WorkSiteRequestStatusListPage.ToComplete}</th>}
              {selectedStatus.includes(WorkSiteRequestStatusListPage.Standby) && <th className="col-lg-2">{WorkSiteRequestStatusListPage.Standby}</th>}
              {selectedStatus.includes(WorkSiteRequestStatusListPage.Done) && <th className="col-lg-2">{WorkSiteRequestStatusListPage.Done}</th>}
              {selectedStatus.includes(WorkSiteRequestStatusListPage.Archive) && <th className="col-lg-2">{WorkSiteRequestStatusListPage.Archive}</th>}
            </tr>
          </thead>
          <tbody>
            {Array.from(mapDateTasks.entries()).map(([date, filteredTasks]) => (
              filteredTasks.some(task => selectedStatus.includes(task.status)) && // Vérifie s'il y a des tâches à afficher
              <tr key={date}>
                {selectedStatus.length > 0 && <td>{date}</td>}
                {selectedStatus.includes(WorkSiteRequestStatusListPage.ToComplete) && (
                  <td>
                    <Row>
                      {filteredTasks
                        .filter(task => task.status === WorkSiteRequestStatusListPage.ToComplete)
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
                {selectedStatus.includes(WorkSiteRequestStatusListPage.Standby) && (
                  <td>
                    <Row>
                      {filteredTasks
                        .filter(task => task.status === WorkSiteRequestStatusListPage.Standby)
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
                {selectedStatus.includes(WorkSiteRequestStatusListPage.Done) && (
                  <td>
                    <Row>
                      {filteredTasks
                        .filter(task => task.status === WorkSiteRequestStatusListPage.Done)
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
                {selectedStatus.includes(WorkSiteRequestStatusListPage.Archive) && (
                  <td>
                    <Row>
                      {filteredTasks
                        .filter(task => task.status === WorkSiteRequestStatusListPage.Archive)
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

