import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, InputGroup, Button, Form } from 'react-bootstrap'; // Import des composants Bootstrap

const Liste: React.FC = () => {

  enum TaskStatus {
    Active = "active",
    NotActive = "notActive"
  }

  interface Task {
    id: number
    name: string
    date: string
    startHours: string
    endHour: string
    address: string
    status: TaskStatus
  }

  const tasks: Task[] = [
    { id: 1, name: "Chantier 1", date: "10/10/2024", startHours: "5PM", endHour: "9PM", address: "2 Fox Street, NY", status: TaskStatus.Active },
    { id: 2, name: "Chantier 2", date: "11/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Active },
    { id: 3, name: "Chantier 3", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.NotActive }
  ]

  const SquareDiv = () => {
    return (
      <div className="square-container">
        <div style={{ width: '200px', height: '50px', backgroundColor: 'red', borderRadius: '10px' }}></div>
      </div>
    )
  }

  return (
    <Container>
      {/* Barre de recherche */}
      <Row className="justify-content-left mt-4">
        <Col className="d-flex align-item-center ">
          <InputGroup className=" w-50">
            <Form.Control
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
            />
            <SquareDiv/>
            <Button variant="outline-secondary" id="button-addon1">
              Button
            </Button>

          </InputGroup>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Table className="table table-transparent">
            <thead>
              <tr>
                <th>
                  <Row className="justify-content-between">
                    <Col><div className="square-container"></div></Col>
                    <Col><div className="square-container"></div></Col>
                  </Row>
                </th>
                <th>
                  <Row className="justify-content-between">
                    <Col><div className="square-container"></div></Col>
                    <Col><div className="square-container"></div></Col>
                  </Row>
                </th>
                <th>
                  <Row className="justify-content-between">
                    <Col><div className="square-container"></div></Col>
                    <Col><div className="square-container"></div></Col>
                  </Row>
                </th>
                <th>
                  <Row className="justify-content-between">
                    <Col><div className="square-container"></div></Col>
                    <Col><div className="square-container"></div></Col>
                  </Row>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A compléter</td>
                <td>En cours</td>
                <td>Terminer</td>
                <td>Archiver</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Liste;
