import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import KeycloakApi from '../api/KeycloakApi';
import { Role } from '../api/Model';
import MainApi from '../api/MainApi';

const RegisterPage: React.FC = () => {

    const navigate = useNavigate();

    const [apiError, setApiError] = useState<String | undefined>()

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Ce champ est requis'),
        firstName: Yup.string().required('Ce champ est requis'),
        lastName: Yup.string().required('Ce champ est requis'),
        phoneNumber: Yup.string().required('Ce champ est requis'),
        password: Yup.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères').required('Ce champ est requis'),
    });

    return (
        <Container>
            <Formik
                initialValues={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    password: '',
                    role: Role.Employee
                }}
                onSubmit={async (values) => {
                    try {
                        setApiError(undefined)
                        await KeycloakApi.getInstance().createUser(values.email, values.firstName, values.lastName, values.phoneNumber, values.role, values.password)
                        navigate("/login")

                    } catch (err) {
                        setApiError("Error")
                    }
                }}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Row className="justify-content-center mt-5">
                            <Col md={5} >
                                <Container className="border bg-white p-4" style={{ borderRadius: '20px' }}>
                                    <h1 className="text-center mb-4">Inscription</h1>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    isInvalid={touched.email && !!errors.email}
                                                    type="email"
                                                    name='email'
                                                    placeholder="Entrez votre email"
                                                    style={{ fontSize: '0.9rem' }}
                                                    onChange={handleChange}
                                                />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Prénom</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    isInvalid={touched.firstName && !!errors.firstName}
                                                    type="input"
                                                    name='firstName'
                                                    placeholder="Entrez votre prénom"
                                                    style={{ fontSize: '0.9rem' }}
                                                    onChange={handleChange}
                                                />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Nom</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    isInvalid={touched.lastName && !!errors.lastName}
                                                    type="input"
                                                    name='lastName'
                                                    placeholder="Entrez votre nom"
                                                    style={{ fontSize: '0.9rem' }}
                                                    onChange={handleChange}
                                                />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Numéro de téléphone</Form.Label>
                                            <Form.Control
                                                isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                                                type="input"
                                                name="phoneNumber"
                                                placeholder="Entrez votre numéro de téléphone"
                                                style={{ fontSize: '0.9rem' }}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Role</Form.Label>
                                            <Form.Select size='sm' 
                                                value={values.role} 
                                                style={{borderRadius: '0.375rem'}} 
                                                name='role' 
                                                onChange={handleChange}>

                                                {Object.values(Role).map(role => {
                                                    return (
                                                        <option value={role}>{role}</option>
                                                    )
                                                })}

                                            </Form.Select>
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
                                            </InputGroup>
                                        </Form.Group>

                                        <Row className="justify-content-center">
                                            <Col md={4}>
                                                <div className="mt-3 d-grid gap-2">
                                                    <Button variant="primary" type="submit" >
                                                        S'inscrire
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>

                                    <Row className="justify-content-center mt-3">
                                        <Col>
                                            <p className="mb-0 text-center">
                                                Déjà un compte ? <Link to="/login">Connectez-vous</Link>
                                            </p>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default RegisterPage;
