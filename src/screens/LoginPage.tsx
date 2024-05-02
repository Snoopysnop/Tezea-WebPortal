import { LockOutlined, LoginOutlined, PeopleAlt, PeopleOutline } from '@mui/icons-material';
import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6} className="login-container border bg-white p-4">
          <h1 className="text-center mb-4">Connexion</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Identifiant</Form.Label>
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="Entrez votre identifiant"
                  style={{ fontSize: '0.9rem' }}
                />
                <span className="input-group-text input-group-append"><PeopleAlt /></span>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  style={{ fontSize: '0.9rem' }}
                />
                <span className="input-group-text input-group-append"><LockOutlined /></span>
              </InputGroup>
            </Form.Group>

            <Row className="justify-content-center">
              <Col md={4}>
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" className="mt-3">
                    Se connecter
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
          <p className="mb-0 text-center mt-3">
            Pas de compte ? <Link to="/register">Inscrivez-vous</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
