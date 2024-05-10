import { LockOutlined, Password, PeopleAlt } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import KeycloakApi from '../api/KeycloakApi';

const LoginPage: React.FC<{setIsLoggedIn: any}> = ({setIsLoggedIn}) => {

  const navigate = useNavigate();

  const [apiError, setApiError] = useState<String | undefined>()

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Ce champ est requis'),
    password: Yup.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères').required('Ce champ est requis'),
  });

  useEffect(() => {
    localStorage.removeItem("access-token")
  }, [])

  return (
    <Container >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values) => {
          try {
            setApiError(undefined)
            console.log("here")
            await KeycloakApi.getInstance().login(values.email, values.password)
            setIsLoggedIn(true)
            navigate("/worksiteList")

              
          } catch (err) {
            console.log(err)
            setApiError("Error")
          }
        }}
        validationSchema={validationSchema}
      >
        {({
         handleChange,
         handleSubmit,
       }) => (
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center mt-5">
            <Col md={5} >
            <Container className="border bg-white p-4 mt-5" style={{borderRadius: '20px'}}>

              <h1 className="text-center mb-4">Connexion</h1>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <Form.Control
                      /* TODO remettre pour keycloak isInvalid={touched.email && !!errors.email}*/
                      type="input"
                      name='email'
                      placeholder="Entrez votre email"
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
                      /* TODO remettre pour keycloak isInvalid={touched.password && !!errors.password}*/
                      type="password"
                      name='password'
                      placeholder="Entrez votre mot de passe"
                      style={{ fontSize: '0.9rem' }}
                      onChange={handleChange}
                    />
                    <span className="input-group-text input-group-append"><LockOutlined /></span>
                  </InputGroup>
                </Form.Group>
                {apiError &&
                <Container>
                 Invalid email or password

                </Container>
                }
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
