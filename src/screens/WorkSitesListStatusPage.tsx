import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, InputGroup, Button, Form, Dropdown } from 'react-bootstrap';
import { Category, WorkSite, WorkSiteStatus } from '../api/Model';
import TaskComponent from './WorkSiteComponent';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import WorkSiteComponent from './WorkSiteComponent';



const WorkSitesListStatusPage: React.FC = () => {

  const tasks: WorkSite[] = [
    {
      id: "1", title: "Chantier 1", begin:new Date("2024-10-10T17:09:00"),
      end: new Date("2024-10-10T17:12:00"), address: "2 Fox Street, NY", status: WorkSiteStatus.Archive
    },
    {
      id: "2", title: "Chantier 2", begin:new Date("2024-10-10T17:09:00"),
      end: new Date("2024-10-10T17:12:00"), address: "2 Fox Street, NY", status: WorkSiteStatus.Standby
    },
    {
      id: "3", title: "Chantier 2", begin:new Date("2024-10-10T17:09:00"),
      end: new Date("2024-10-10T17:12:00"), address: "2 Fox Street, NY", status: WorkSiteStatus.Done
    },
    {
      id: "4", title: "Chantier 2", begin:new Date("2024-10-10T17:09:00"),
      end: new Date("2024-10-10T17:12:00"),address: "2 Fox Street, NY", status: WorkSiteStatus.Done
    },
    {
      id: "5", title: "Chantier 3", begin:new Date("2024-10-10T17:09:00"),
      end: new Date("2024-10-10T17:12:00"), address: "2 Fox Street, NY", status: WorkSiteStatus.Done
    },
    {
      id: "6", title: "Chantier 3", begin:new Date("2024-10-10T17:09:00"),
      end: new Date("2024-10-10T17:12:00"), address: "2 Fox Street, NY", status: WorkSiteStatus.ToComplete
    },
    {
      id: "7", title: "Chantier Test 1", begin:new Date("2024-10-10T17:09:00"),
      end: new Date("2024-10-10T17:12:00"), address: "2 Fox Street, NY", status: WorkSiteStatus.InProgress
    },
    {
      id: "8", title: "Chantier Test 2", begin:new Date("2024-10-10T17:09:00"),
      end: new Date("2024-10-10T17:12:00"), address: "2 Fox Street, NY", status: WorkSiteStatus.Done
    },
    {
      id: "9", title: "Chantier Test 3", begin:new Date("2024-10-10T17:09:00"),
      end: new Date("2024-10-10T17:12:00"),address: "2 Fox Street, NY", status: WorkSiteStatus.Done
    },
    {
      id: "10", title: "Chantier Test 14", begin:new Date("2024-10-10T17:09:00"),
      end: new Date("2024-10-10T17:12:00"), address: "2 Fox Street, NY", status: WorkSiteStatus.ToComplete
    },
    {
      id: "11", title: "Chantier Test 24", begin:new Date("2024-10-10T17:09:00"),
      end: new Date("2024-10-10T17:12:00"),address: "2 Fox Street, NY", status: WorkSiteStatus.Archive
    },
    {
      id: "12", title: "Chantier Test 35", begin:new Date("2024-10-10T17:09:00"),
      end: new Date("2024-10-10T17:12:00"), address: "2 Fox Street, NY", status: WorkSiteStatus.Archive
    },
  ];

  const [filterValue, setFilterValue] = useState<string>("");
  const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(filterValue.toLowerCase()));

  const allStatus: WorkSiteStatus[] = Object.values(WorkSiteStatus);
  const [selectedStatus, setSelectedStatus] = useState<WorkSiteStatus[]>([]);

  const [checkboxes, setCheckboxes] = useState<{ [key in WorkSiteStatus]?: boolean }>({});

  const handleStatusChange = (status: WorkSiteStatus) => {
    const updatedCheckboxes = { ...checkboxes, [status]: !checkboxes[status] };
    setCheckboxes(updatedCheckboxes);

    setSelectedStatus(Object.keys(updatedCheckboxes).filter(key => updatedCheckboxes[key as WorkSiteStatus]) as WorkSiteStatus[]);
  };

  const [modalShow, setModalShow] = useState(false);

  // Fonction pour gérer le clic sur un élément
  const handleTaskClick = () => {
    //TODO faire appel api get bdd
    //ptet rajouter un booleen pour differencier demande et chantier boolean:Boolean
    setModalShow(true);
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
    name: task.title,
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
        {/* Utiliser ReactSearchAutocomplete */}
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
                  {Object.values(WorkSiteStatus)
                    .filter(status => status !== WorkSiteStatus.ToComplete)
                    .map((status, index) => (
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
              {selectedStatus.includes(WorkSiteStatus.Standby) && <th className="col-lg-2">{WorkSiteStatus.Standby}</th>}
              {selectedStatus.includes(WorkSiteStatus.InProgress) && <th className="col-lg-2">{WorkSiteStatus.InProgress}</th>}
              {selectedStatus.includes(WorkSiteStatus.Done) && <th className="col-lg-2">{WorkSiteStatus.Done}</th>}
              {selectedStatus.includes(WorkSiteStatus.Archive) && <th className="col-lg-2">{WorkSiteStatus.Archive}</th>}
            </tr>
          </thead>
          <tbody>
            <td className={`col-lg-2 ${!selectedStatus.includes(WorkSiteStatus.Standby) && "d-none"}`}>
              <Row>
                {filteredTasks
                  .filter(task => task.status === WorkSiteStatus.Standby)
                  .map(task => (
                    <Col key={task.id} lg={12}>
                      <WorkSiteComponent
                        id={task.id}
                        name={task.title}
                        date={task.begin.toLocaleString()}
                        startHours={task.begin.toLocaleString()}
                        endHour={task.end.toLocaleString()}
                        address={task.address}
                        status={task.status}
                        category={Category.CreaPalette}
                        onClick={() => handleTaskClick()}
                      />
                    </Col>
                  ))}
              </Row>
            </td>
            <td className={`col-lg-2 ${!selectedStatus.includes(WorkSiteStatus.InProgress) && "d-none"}`}>
              <Row>
                {filteredTasks
                  .filter(task => task.status === WorkSiteStatus.InProgress)
                  .map(task => (
                    <Col key={task.id} lg={12}>
                      <WorkSiteComponent
                        id={task.id}
                        name={task.title}
                        date={task.begin.toLocaleString()}
                        startHours={task.begin.toLocaleString()}
                        endHour={task.end.toLocaleString()}
                        address={task.address}
                        status={task.status}
                        category={Category.CreaPalette}
                        onClick={() => handleTaskClick()}
                      />
                    </Col>
                  ))}
              </Row>
            </td>
            <td className={`col-lg-2 ${!selectedStatus.includes(WorkSiteStatus.Done) && "d-none"}`}>
              <Row>
                {filteredTasks
                  .filter(task => task.status === WorkSiteStatus.Done)
                  .map(task => (
                    <Col key={task.id} lg={12}>
                      <WorkSiteComponent
                        id={task.id}
                        name={task.title}
                        date={task.begin.toLocaleString()}
                        startHours={task.begin.toLocaleString()}
                        endHour={task.end.toLocaleString()}
                        address={task.address}
                        status={task.status}
                        category={Category.CreaPalette}
                        onClick={() => handleTaskClick()}
                      />
                    </Col>
                  ))}
              </Row>
            </td>
            <td className={`col-lg-2 ${!selectedStatus.includes(WorkSiteStatus.Archive) && "d-none"}`}>
              <Row>
                {filteredTasks
                  .filter(task => task.status === WorkSiteStatus.Archive)
                  .map(task => (
                    <Col key={task.id} lg={12}>
                      <WorkSiteComponent
                        id={task.id}
                        name={task.title}
                        date={task.begin.toLocaleString()}
                        startHours={task.begin.toLocaleString()}
                        endHour={task.end.toLocaleString()}
                        address={task.address}
                        status={task.status}
                        category={Category.CreaPalette}
                        onClick={() => handleTaskClick()}
                      />
                    </Col>
                  ))}
              </Row>
            </td>
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default WorkSitesListStatusPage;