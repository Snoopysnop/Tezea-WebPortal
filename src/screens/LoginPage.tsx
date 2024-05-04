import { LockOutlined, Password, PeopleAlt } from '@mui/icons-material';
import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MainApi from '../api/MainApi';
import KeycloakApi from '../api/KeycloakApi';

const LoginPage: React.FC = () => {

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Ce champ est requis'),
    password: Yup.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères').required('Ce champ est requis'),
  });

  return (
    <Container>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={async (values) => {
            //await MainApi.getInstance().getUsers()
            //await KeycloakApi.getInstance().login(values.username, values.password)
            await KeycloakApi.getInstance().auth()
        }}
        validationSchema={validationSchema}
      >
        {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
        <Form onSubmit={handleSubmit}>
          {JSON.stringify(values)}
          <Row className="justify-content-center mt-5">
            <Col md={5} >
            <Container className="border bg-white p-4" style={{borderRadius: '20px'}}>

              <h1 className="text-center mb-4">Connexion</h1>
                <Form.Group className="mb-3">
                  <Form.Label>ID</Form.Label>
                  <InputGroup>
                    <Form.Control
                      isInvalid={touched.username && !!errors.username}
                      type="input"
                      name='username'
                      placeholder="Entrez votre pseudo"
                      style={{ fontSize: '0.9rem' }}
                      onChange={handleChange}
                    />
                    <span className="input-group-text input-group-append"><PeopleAlt /></span>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mot de passe</Form.Label>
                  <InputGroup>
                    <Form.Control
                      isInvalid={touched.password && !!errors.password}
                      type="password"
                      name='password'
                      placeholder="Entrez votre mot de passe"
                      style={{ fontSize: '0.9rem' }}
                      onChange={handleChange}
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
              <p className="mb-0 text-center mt-3">
                Pas de compte ? <Link to="/register">Inscrivez-vous</Link>
              </p>
              </Container>

            </Col>
          </Row>
        </Form>
       )}
      </Formik>
    </Container>
  );
}

export default LoginPage;
