import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, InputGroup, Button, Form } from 'react-bootstrap'; // Import des composants Bootstrap

const Liste: React.FC = () => {
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
