import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, InputGroup, Button, Form, Dropdown } from 'react-bootstrap';
import { Category, WorkSite, WorkSiteStatus } from '../api/Model';
import TaskComponent from './WorkSiteComponent';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import WorkSiteComponent from './WorkSiteComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import MainApi from '../api/MainApi';
import { getStatusWorksite } from '../common/utils/utils';
import { WorkSiteJson } from '../api/ModelJson';




const WorkSitesListStatusPage: React.FC = () => {
  const navigate = useNavigate();

  const [filterValue, setFilterValue] = useState<string>("");

  const allStatus: WorkSiteStatus[] = Object.values(WorkSiteStatus);
  const [selectedStatus, setSelectedStatus] = useState<WorkSiteStatus[]>([]);

  const [checkboxes, setCheckboxes] = useState<{ [key in WorkSiteStatus]?: boolean }>({});

  const handleStatusChange = (status: WorkSiteStatus) => {
    const updatedCheckboxes = { ...checkboxes, [status]: !checkboxes[status] };
    setCheckboxes(updatedCheckboxes);

    setSelectedStatus(Object.keys(updatedCheckboxes).filter(key => updatedCheckboxes[key as WorkSiteStatus]) as WorkSiteStatus[]);
  };

  const [modalShow, setModalShow] = useState(false);



  const [filteredTasks, setFilteredTasks] = useState<WorkSite[]>([]);

  const [dataFetched, setDataFetched] = useState<WorkSite[]>([]);


  const handleListWorksite = async () => {
    const responseWorksite = await MainApi.getInstance().getWorkSites() as WorkSiteJson[];

    const worksiteMapper: WorkSite[] = responseWorksite.map(worksiteJson => ({
      id: worksiteJson.id!,
      workSiteChief: undefined,
      staff: undefined,
      equipment: undefined,
      begin: worksiteJson.begin ? new Date(worksiteJson.begin) : new Date(),
      end: worksiteJson.end ? new Date(worksiteJson.end) : new Date(),
      status: worksiteJson.status ? getStatusWorksite(worksiteJson.status) : WorkSiteStatus.Standby,
      request: undefined,
      satisfaction: worksiteJson.satisfaction,
      signature: worksiteJson.signature,
      title: worksiteJson.title ? worksiteJson.title : '',
      address: worksiteJson.address ? worksiteJson.address : ''
    }));
    setDataFetched(worksiteMapper);
  }

  useEffect(() => {
    handleListWorksite()
  }, [])

  useEffect(() => {
    if (dataFetched) {
      setFilteredTasks(dataFetched.filter(task => task.title.toLowerCase().includes(filterValue.toLowerCase())))
    }
  }, [dataFetched, filterValue])



  // Fonction pour gérer le clic sur un élément
  const handleTaskClick = async (task: any) => {

    const worksiteData = await MainApi.getInstance().getWorksitebyId(task.id) as WorkSiteJson;
    navigate("/worksiteDetails", { state: { worksiteData } })


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


  const handleOnSearch = (string: any, results: any) => {
    setFilterValue(string);
  };

  const handleOnSelect = (item: any) => {
    setFilterValue(item.name);
  };

  return (
    <Container>
      <Row className='mt-4'>
        <Col lg={6}>
          <Row>
            <Col>
              <ReactSearchAutocomplete
                styling={{ borderRadius: "10px" }}
                items={dataFetched.map(data => {
                  return { id: data.id, name: data.title }
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
                  {Object.values(WorkSiteStatus)
                    .map((status, index) => (
                      <Dropdown.Item key={index} onClick={() => handleStatusChange(status)}>
                        <Form.Check
                          type="checkbox"
                          label={status}
                          checked={!!checkboxes[status]}
                          onChange={() => { }}
                        />
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
      <Container className="bg-white mt-4" style={{ borderRadius: "20px" }}>
        <Table>
          <thead>
            <tr>
              {selectedStatus.includes(WorkSiteStatus.Standby) && <th className="col-lg-3">{WorkSiteStatus.Standby}</th>}
              {selectedStatus.includes(WorkSiteStatus.InProgress) && <th className="col-lg-3">{WorkSiteStatus.InProgress}</th>}
              {selectedStatus.includes(WorkSiteStatus.Done) && <th className="col-lg-3">{WorkSiteStatus.Done}</th>}
              {selectedStatus.includes(WorkSiteStatus.Archive) && <th className="col-lg-3">{WorkSiteStatus.Archive}</th>}
            </tr>
          </thead>
          <tbody>
            {selectedStatus.includes(WorkSiteStatus.Standby) &&
              <td >
                {filteredTasks
                  .filter(task => task.status === WorkSiteStatus.Standby)
                  .map(task => (
                    <WorkSiteComponent
                      id={task.id}
                      name={task.title}
                      date={task.begin.toLocaleString()}
                      startHours={task.begin.toLocaleString()}
                      endHour={task.end.toLocaleString()}
                      status={task.status}
                      category={Category.CreaPalette}
                      onClick={() => handleTaskClick(task)}
                    />
                  ))}
              </td>
            }
            {selectedStatus.includes(WorkSiteStatus.InProgress) &&
              <td >
                {filteredTasks
                  .filter(task => task.status === WorkSiteStatus.InProgress)
                  .map(task => (
                    <WorkSiteComponent
                      id={task.id}
                      name={task.title}
                      date={task.begin.toLocaleString()}
                      startHours={task.begin.toLocaleString()}
                      endHour={task.end.toLocaleString()}
                      status={task.status}
                      category={Category.CreaPalette}
                      onClick={() => handleTaskClick(task)}
                    />
                  ))}
              </td>
            }
            {selectedStatus.includes(WorkSiteStatus.Done) &&
              <td>
                {filteredTasks
                  .filter(task => task.status === WorkSiteStatus.Done)
                  .map(task => (
                    <WorkSiteComponent
                      id={task.id}
                      name={task.title}
                      date={task.begin.toLocaleString()}
                      startHours={task.begin.toLocaleString()}
                      endHour={task.end.toLocaleString()}
                      status={task.status}
                      category={Category.CreaPalette}
                      onClick={() => handleTaskClick(task)}
                    />
                  ))}
              </td>
            }
            {selectedStatus.includes(WorkSiteStatus.Archive) &&
              <td>
                {filteredTasks
                  .filter(task => task.status === WorkSiteStatus.Archive)
                  .map(task => (
                    <WorkSiteComponent
                      id={task.id}
                      name={task.title}
                      date={task.begin.toLocaleString()}
                      startHours={task.begin.toLocaleString()}
                      endHour={task.end.toLocaleString()}
                      status={task.status}
                      category={Category.CreaPalette}
                      onClick={() => handleTaskClick(task)}
                    />
                  ))}
              </td>
            }
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default WorkSitesListStatusPage;