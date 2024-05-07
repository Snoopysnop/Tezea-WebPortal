import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, InputGroup, Button, Form, Dropdown } from 'react-bootstrap';
import { Category, IncidentLevel, EmergencyDetails, WorkSiteStatus } from '../api/Model';
import '../App.css'
import EmergencyComponent from './EmergencyComponent';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { EmergencyDetailsJson } from '../api/ModelJson';
import MainApi from '../api/MainApi';
import { getIncidentLevel } from '../common/utils/utils';

const IncidentsPage: React.FC = () => {

  const [filterValue, setFilterValue] = useState<string>("");
  const allStatus: IncidentLevel[] = Object.values(IncidentLevel);
  const [selectedStatus, setSelectedStatus] = useState<IncidentLevel[]>([]);

  const [checkboxes, setCheckboxes] = useState<{ [key in IncidentLevel]?: boolean }>({});

  const [filteredTasks, setFilteredTasks] = useState<EmergencyDetails[]>([]);

  const [dataFetched, setDataFetched] = useState<EmergencyDetails[] | undefined>(undefined);

  const handleListEmergency = async () => {
    const responseEmergency = await MainApi.getInstance().getEmergencies() as EmergencyDetailsJson[];

    const emergencyMapper: EmergencyDetails[] = responseEmergency.map(emergencyDetailsJson => ({
      description: emergencyDetailsJson.description,
      title: emergencyDetailsJson.title,
      id: emergencyDetailsJson.id ? emergencyDetailsJson.id : '',
      level: emergencyDetailsJson ? getIncidentLevel(emergencyDetailsJson.level) : IncidentLevel.Minor,
      worksite: undefined
    }));

    setDataFetched(emergencyMapper);


  }

  useEffect(() => {
    handleListEmergency()
  }, [])

  useEffect(() => {
    if (dataFetched) {
      setFilteredTasks(dataFetched.filter(task => task.title.toLowerCase().includes(filterValue.toLowerCase())))
    }
  }, [dataFetched,filterValue])

  

  const handleStatusChange = (status: IncidentLevel) => {
    const updatedCheckboxes = { ...checkboxes, [status]: !checkboxes[status] };
    setCheckboxes(updatedCheckboxes);

    setSelectedStatus(Object.keys(updatedCheckboxes).filter(key => updatedCheckboxes[key as IncidentLevel]) as IncidentLevel[]);
  };

  //Use effect pour refresh les checkbox en temps réel
  useEffect(() => {
    const updatedCheckboxes: { [key in IncidentLevel]?: boolean } = {};
    selectedStatus.forEach(status => {
      updatedCheckboxes[status] = true;
    });
    setCheckboxes(updatedCheckboxes);
  }, [selectedStatus]);

  //Use effect pour initialiser les checkbox a true
  useEffect(() => {
    const initialCheckboxes: { [key in IncidentLevel]?: boolean } = {};
    allStatus.forEach(status => {
      initialCheckboxes[status] = true;
    });
    setSelectedStatus(allStatus);
    setCheckboxes(initialCheckboxes);
  }, []);


  const handleOnSearch = (string: any, results: any) => {
    setFilterValue(string);
  };

  const handleOnSelect = (item: any) => {
    setFilterValue(item.name);
  };

  return (
    <>
      {dataFetched &&
        <Container>
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
                      {Object.values(IncidentLevel).map((status, index) => (
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

          <Container className="container-xxl bg-white mt-4" style={{borderRadius: "20px"}}>
          <Table>
              <thead>
                <tr>
                  <th className={`col-lg-3`}>{IncidentLevel.Minor}</th>
                  <th className={`col-lg-3`}>{IncidentLevel.Medium}</th>
                  <th className={`col-lg-3`}>{IncidentLevel.Severe}</th>
                  <th className={`col-lg-3`}>{IncidentLevel.Blocking}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                      {filteredTasks
                        .filter(task => task.level === IncidentLevel.Minor)
                        .map(task => (
                            <EmergencyComponent
                              id={task.id} 
                              description={task.description}
                              emergency={IncidentLevel.Minor}
                              category={Category.CreaPalette}
                              title={task.title}
                            />
                        ))}
                  </td>
                  <td>
                      {filteredTasks
                        .filter(task => task.level === IncidentLevel.Medium)
                        .map(task => (
                            <EmergencyComponent
                              id={task.id}
                              description={task.description}
                              emergency={IncidentLevel.Medium}
                              category={Category.CreaPalette}
                              title={task.title}
                            />
                        ))}
                  </td>
                  <td>
                      {filteredTasks
                        .filter(task => task.level === IncidentLevel.Severe)
                        .map(task => (
                            <EmergencyComponent
                              id={task.id}
                              description={task.description}
                              emergency={IncidentLevel.Severe}
                              category={Category.CreaPalette}
                              title={task.title}
                            />
                        ))}
                  </td>
                  <td>
                      {filteredTasks
                        .filter(task => task.level === IncidentLevel.Blocking)
                        .map(task => (
                            <EmergencyComponent
                              id={task.id}
                              description={task.description}
                              emergency={IncidentLevel.Blocking}
                              category={Category.CreaPalette}
                              title={task.title}
                            />
                        ))}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </Container>
      }
    </>
  );
};

export default IncidentsPage;
