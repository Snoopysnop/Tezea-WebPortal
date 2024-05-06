import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, InputGroup, Button, Form, Dropdown } from 'react-bootstrap';
import { Category, WorkSite, WorkSiteStatus, WorkSiteRequest, Customer, WorkSiteRequestStatus } from '../api/Model';
import { WorkSiteRequestJson, CustomerJson } from '../api/ModelJson';

import '../App.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import WorkSiteRequestPopUp from '../components/WorkSiteRequestPopUp';
import WorkSiteComponent from './WorkSiteComponent';
import MainApi from "../api/MainApi"
import WorkSiteRequestComponent from './WorkSiteRequestComponent';
import { useLocation } from 'react-router-dom';
import { getStatusWorksiteRequest } from '../common/utils/utils';

const WorkSiteListRequestPage: React.FC = () => {



  const [filterValue, setFilterValue] = useState<string>("");

  const allStatus: WorkSiteRequestStatus[] = Object.values(WorkSiteRequestStatus);
  const [selectedStatus, setSelectedStatus] = useState<WorkSiteRequestStatus[]>([]);

  const [checkboxes, setCheckboxes] = useState<{ [key in WorkSiteRequestStatus]?: boolean }>({});

  const handleStatusChange = (status: WorkSiteRequestStatus) => {
    const updatedCheckboxes = { ...checkboxes, [status]: !checkboxes[status] };
    setCheckboxes(updatedCheckboxes);

    setSelectedStatus(Object.keys(updatedCheckboxes).filter(key => updatedCheckboxes[key as WorkSiteRequestStatus]) as WorkSiteRequestStatus[]);
  };


  const [modalShow, setModalShow] = useState(false);
  const [worksiteRequestData, setWorksiteRequestData] = useState<WorkSiteRequest>();

  const [filteredTasks, setFilteredTasks] = useState<WorkSiteRequest[]>([]);

  const [dataFetched, setDataFetched] = useState<WorkSiteRequest[] | undefined>(undefined);

  const handleListWorksiteRequest = async () => {

    const responseWorksiteRequest = await MainApi.getInstance().getWorkSiteRequests("creationDate") as WorkSiteRequestJson[];

    const worksiteRequestMapper: WorkSiteRequest[] = responseWorksiteRequest.map(worksiteRequestJson => ({
      id: worksiteRequestJson.id,
      concierge: undefined,
      siteChief: undefined,
      customer: undefined,
      city: worksiteRequestJson.city,
      workSites: undefined,
      serviceType: undefined,
      description: worksiteRequestJson.description,
      emergency: worksiteRequestJson.emergency,
      title: worksiteRequestJson.title,
      category: undefined,
      removal: worksiteRequestJson.removal,
      delivery: worksiteRequestJson.delivery,
      removalRecycling: worksiteRequestJson.removalRecycling,
      chronoQuote: worksiteRequestJson.chronoQuote,
      estimatedDate: worksiteRequestJson.estimatedDate ? new Date(worksiteRequestJson.estimatedDate) : new Date(),
      requestStatus: worksiteRequestJson.requestStatus ? getStatusWorksiteRequest(worksiteRequestJson.requestStatus) : WorkSiteRequestStatus.Standby,
      weightEstimate: worksiteRequestJson.weightEstimate,
      volumeEstimate: worksiteRequestJson.volumeEstimate,
      provider: worksiteRequestJson.provider,
      tezeaAffectation: worksiteRequestJson.tezeaAffectation,
    }));
    setDataFetched(worksiteRequestMapper);
  }

  useEffect(() => {
    handleListWorksiteRequest()
  }, [])

  useEffect(() => {
    if (dataFetched) {
      setFilteredTasks(dataFetched.filter(task => (task.title?.toLowerCase() ?? '').includes(filterValue.toLowerCase())))
    }
  }, [dataFetched, filterValue])

  const handleTaskClick = async (id: number) => {
    const responseWorksiteRequest = await MainApi.getInstance().getWorksiteRequestbyId(id) as WorkSiteRequestJson;
    const responseCustomer = await MainApi.getInstance().getCustomerbyId(responseWorksiteRequest.customer!) as CustomerJson;
    const worksiteRequestMapper = responseWorksiteRequest as WorkSiteRequest;
    const customerMapper = responseCustomer as Customer;
    worksiteRequestMapper.customer = customerMapper;

    const dateString = responseWorksiteRequest.estimatedDate!; //todo ! ?????
    const date = new Date(dateString);
    worksiteRequestMapper.estimatedDate = date;

    setWorksiteRequestData(worksiteRequestMapper);

    setModalShow(true);
  };

  useEffect(() => {
    const updatedCheckboxes: { [key in WorkSiteRequestStatus]?: boolean } = {};
    selectedStatus.forEach(status => {
      updatedCheckboxes[status] = true;
    });
    setCheckboxes(updatedCheckboxes);
  }, [selectedStatus]);

  useEffect(() => {
    const initialCheckboxes: { [key in WorkSiteRequestStatus]?: boolean } = {};
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
                      {Object.values(WorkSiteRequestStatus)
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
                  {selectedStatus.includes(WorkSiteRequestStatus.ToComplete) && <th className="col-lg-2">{WorkSiteRequestStatus.ToComplete}</th>}
                  {selectedStatus.includes(WorkSiteRequestStatus.Standby) && <th className="col-lg-2">{WorkSiteRequestStatus.Standby}</th>}
                  {selectedStatus.includes(WorkSiteRequestStatus.Done) && <th className="col-lg-2">{WorkSiteRequestStatus.Done}</th>}
                  {selectedStatus.includes(WorkSiteRequestStatus.Archive) && <th className="col-lg-2">{WorkSiteRequestStatus.Archive}</th>}
                </tr>
              </thead>
              <tbody>
                <td className={`col-lg-2 ${!selectedStatus.includes(WorkSiteRequestStatus.ToComplete) && "d-none"}`}>
                  <Row>
                    {filteredTasks
                      .filter(task => task.requestStatus === WorkSiteRequestStatus.ToComplete)
                      .map(task => (
                        <Col key={task.id} lg={12}>
                          <WorkSiteRequestComponent
                            id={task.id ?? -1}
                            name={task.title ?? ''}
                            date={task.estimatedDate?.toLocaleString() ?? ''}
                            city={task.city ?? ''}
                            status={task.requestStatus ?? WorkSiteRequestStatus.Archive}
                            category={Category.CreaPalette}
                            onClick={() => handleTaskClick(Number(task.id))}
                          />
                        </Col>
                      ))}
                  </Row>
                </td>
                <td className={`col-lg-2 ${!selectedStatus.includes(WorkSiteRequestStatus.Standby) && "d-none"}`}>
                  <Row>
                    {filteredTasks
                      .filter(task => task.requestStatus === WorkSiteRequestStatus.Standby)
                      .map(task => (
                        <Col key={task.id} lg={12}>
                          <WorkSiteRequestComponent
                            id={task.id ?? -1}
                            name={task.title ?? ''}
                            date={task.estimatedDate?.toLocaleString() ?? ''}
                            city={task.city ?? ''}
                            status={task.requestStatus ?? WorkSiteRequestStatus.Archive}
                            category={Category.CreaPalette}
                            onClick={() => handleTaskClick(Number(task.id))}
                          />
                        </Col>
                      ))}
                  </Row>
                </td>
                <td className={`col-lg-2 ${!selectedStatus.includes(WorkSiteRequestStatus.Done) && "d-none"}`}>
                  <Row>
                    {filteredTasks
                      .filter(task => task.requestStatus === WorkSiteRequestStatus.Done)
                      .map(task => (
                        <Col key={task.id} lg={12}>
                          <WorkSiteRequestComponent
                            id={task.id ?? -1}
                            name={task.title ?? ''}
                            date={task.estimatedDate?.toLocaleString() ?? ''}
                            city={task.city ?? ''}
                            status={task.requestStatus ?? WorkSiteRequestStatus.Archive}
                            category={Category.CreaPalette}
                            onClick={() => handleTaskClick(Number(task.id))}
                          />
                        </Col>
                      ))}
                  </Row>
                </td>
                <td className={`col-lg-2 ${!selectedStatus.includes(WorkSiteRequestStatus.Archive) && "d-none"}`}>
                  <Row>
                    {filteredTasks
                      .filter(task => task.requestStatus === WorkSiteRequestStatus.Archive)
                      .map(task => (
                        <Col key={task.id} lg={12}>
                          <WorkSiteRequestComponent
                            id={task.id ?? -1}
                            name={task.title ?? ''}
                            date={task.estimatedDate?.toLocaleString() ?? ''}
                            city={task.city ?? ''}
                            status={task.requestStatus ?? WorkSiteRequestStatus.Archive}
                            category={Category.CreaPalette}
                            onClick={() => handleTaskClick(Number(task.id))}
                          />
                        </Col>
                      ))}
                  </Row>
                </td>
              </tbody>
            </Table>
          </Container>
          <WorkSiteRequestPopUp
            show={modalShow}
            onHide={() => setModalShow(false)}
            worksiteRequest={worksiteRequestData!}//todo checker le !
            showButtons={true}
          />
        </Container>
      }
    </>
  );
};

export default WorkSiteListRequestPage;

