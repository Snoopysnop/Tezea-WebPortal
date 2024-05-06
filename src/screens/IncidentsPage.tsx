import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, InputGroup, Button, Form, Dropdown } from 'react-bootstrap';
import { Category, Emergency, EmergencyDetails, WorkSiteStatus } from '../api/Model';
import '../App.css'
import EmergencyComponent from './EmergencyComponent';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { EmergencyDetailsJson } from '../api/ModelJson';
import MainApi from '../api/MainApi';
import { getEmergency } from '../common/utils/utils';

const IncidentsPage: React.FC = () => {

  const [filterValue, setFilterValue] = useState<string>("");
  const allStatus: Emergency[] = Object.values(Emergency);
  const [selectedStatus, setSelectedStatus] = useState<Emergency[]>([]);

  const [checkboxes, setCheckboxes] = useState<{ [key in Emergency]?: boolean }>({});

  const [filteredTasks, setFilteredTasks] = useState<EmergencyDetails[]>([]);

  const [dataFetched, setDataFetched] = useState<EmergencyDetails[] | undefined>(undefined);

  const handleListEmergency = async () => {
    const responseEmergency = await MainApi.getInstance().getEmergencies() as EmergencyDetailsJson[];
    console.log("Reponse", responseEmergency);

    const emergencyMapper: EmergencyDetails[] = responseEmergency.map(emergencyDetailsJson => ({
      description: emergencyDetailsJson.description,
      title: emergencyDetailsJson.title,
      id: emergencyDetailsJson.id ? emergencyDetailsJson.id : "",
      level: emergencyDetailsJson ? getEmergency(emergencyDetailsJson.level) : Emergency.Minor,
      worksite: undefined
    }));

    setDataFetched(emergencyMapper);


  }

  useEffect(() => {
    handleListEmergency()
  }, [])

  useEffect(() => {
    if (dataFetched) {
      console.log(dataFetched)
      setFilteredTasks(dataFetched.filter(task => task.title.toLowerCase().includes(filterValue.toLowerCase())))
    }
  }, [dataFetched,filterValue])

  

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


  const handleOnSearch = (string: any, results: any) => {
    setFilterValue(string);
    console.log(string, results);
  };

  const handleOnSelect = (item: any) => {
    console.log(item);
    setFilterValue(item.name);
  };

  return (
    <>
      {dataFetched &&
        <Container className='container-xxl'>
          <Row className='mt-4'>
            <Col lg={6}>
              <Row>
                <Col>
                  <ReactSearchAutocomplete
                    styling={{ borderRadius: "10px" }}
                    items={dataFetched.map(data => {
                      return {id:data.id, name:data.title}
                    })}
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
                        <Dropdown.Item key={index} onClick={() => handleStatusChange(status)}>
                          <Form.Check
                            type="checkbox"
                            label={status}
                            checked={!!checkboxes[status]}
                            onChange={() => {}}
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
          <Col lg={12}> 
          <Table>
              <thead>
                <tr>
                  <th className={`col-lg-3 ${!selectedStatus.includes(Emergency.Minor) && "d-none"}`}>{Emergency.Minor}</th>
                  <th className={`col-lg-3 ${!selectedStatus.includes(Emergency.Medium) && "d-none"}`}>{Emergency.Medium}</th>
                  <th className={`col-lg-3 ${!selectedStatus.includes(Emergency.Severe) && "d-none"}`}>{Emergency.Severe}</th>
                  <th className={`col-lg-3 ${!selectedStatus.includes(Emergency.Blocking) && "d-none"}`}>{Emergency.Blocking}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`col-lg-2 ${!selectedStatus.includes(Emergency.Minor) && "d-none"}`}>
                    <Row>
                      {filteredTasks
                        .filter(task => task.level === Emergency.Minor)
                        .map(task => (
                          <Col key={task.id} lg={12}>
                            <EmergencyComponent
                              id={task.id} 
                              description={task.description}
                              emergency={Emergency.Minor}
                              category={Category.CreaPalette}
                              title={task.title}
                            />
                          </Col>
                        ))}
                    </Row>
                  </td>
                  <td className={`col-lg-2 ${!selectedStatus.includes(Emergency.Medium) && "d-none"}`}>
                    <Row>
                      {filteredTasks
                        .filter(task => task.level === Emergency.Medium)
                        .map(task => (
                          <Col key={task.id} lg={12}>
                            <EmergencyComponent
                              id={task.id}
                              description={task.description}
                              emergency={Emergency.Medium}
                              category={Category.CreaPalette}
                              title={task.title}
                            />
                          </Col>
                        ))}
                    </Row>
                  </td>
                  <td className={`col-lg-2 ${!selectedStatus.includes(Emergency.Severe) && "d-none"}`}>
                    <Row>
                      {filteredTasks
                        .filter(task => task.level === Emergency.Severe)
                        .map(task => (
                          <Col key={task.id} lg={12}>
                            <EmergencyComponent
                              id={task.id}
                              description={task.description}
                              emergency={Emergency.Severe}
                              category={Category.CreaPalette}
                              title={task.title}
                            />
                          </Col>
                        ))}
                    </Row>
                  </td>
                  <td className={`col-lg-2 ${!selectedStatus.includes(Emergency.Blocking) && "d-none"}`}>
                    <Row>
                      {filteredTasks
                        .filter(task => task.level === Emergency.Blocking)
                        .map(task => (
                          <Col key={task.id} lg={12}>
                            <EmergencyComponent
                              id={task.id}
                              description={task.description}
                              emergency={Emergency.Blocking}
                              category={Category.CreaPalette}
                              title={task.title}
                            />
                          </Col>
                        ))}
                    </Row>
                  </td>
                </tr>
              </tbody>
            </Table>
            </Col>
          </Container>
        </Container>
      }
    </>
  );
};

export default IncidentsPage;
