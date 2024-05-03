import { LockOutlined, PeopleAlt } from '@mui/icons-material';
import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    return (
        <Container>
            <Row className="justify-content-center mt-5">
            <Col md={5} >
            <Container className="border bg-white p-4" style={{borderRadius: '20px'}}>
                    <h1 className="text-center mb-4">Inscription</h1>
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

                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Numéro de téléphone</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Entrez votre numéro de téléphone"
                                style={{ fontSize: '0.9rem' }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicProfilePic">
                            <Form.Label>Photo de profil</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                            />
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
                    </Form>

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
        </Container>
    );
}

export default RegisterPage;
