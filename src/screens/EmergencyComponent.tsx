import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { Category, Emergency, Task } from '../api/Model';
import { getEmergencyColor, getEmergencyIconColor } from '../common/utils/utils';
import { ReactComponent as TriangleIcon } from 'bootstrap-icons/icons/exclamation-triangle.svg';

type EmergencyProps = {
    id: number;
    description: string;
    emergency: Emergency;
    task: Task;
    category: Category;
};

const EmergencyComponent: React.FC<EmergencyProps> = ({ id, description, emergency, task, category }) => {
    const [showModal, setShowModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleModalOpen = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleClick = () => {
        setIsHovered(false);
    };

    return (
        <Container
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                borderColor: '#c2c2c2',
                borderStyle: 'solid',
                borderWidth: '2px',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '10px',
                backgroundColor: isHovered ? '#D3D3D3' : 'transparent'
            }}
        >
            <Row onClick={handleModalOpen}>
                <Col style={{ backgroundColor: getEmergencyColor(emergency), minHeight: '100%' }} lg={1}></Col>

                <Col lg={5}>
                    <Row className='primary' style={{ fontSize: '14px', whiteSpace: 'nowrap', marginBottom: '10px', marginTop: '10px', marginLeft: '5px' }}>
                        {task.name}
                    </Row>
                    <Row className='primary' style={{ fontSize: '10px', whiteSpace: 'nowrap', marginBottom: '10px', marginLeft: '5px' }}>
                        {task.date}
                    </Row>
                </Col>

                <Col className='align-items-center d-flex'>
                    <div className='divider-half'></div>
                </Col>

                <Col lg={5}>
                    <Row className="justify-content-end align-items-center h-100">
                        <Col className='text-end pe-1 secondary' style={{ fontSize: '8px' }}>
                            {emergency}
                        </Col>
                        <Col className='d-flex align-items-center ps-0 pe-2' lg={'auto'}>
                            <TriangleIcon className={`primary ${getEmergencyIconColor(emergency)}`} width='12px' height='100%' />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Description de l'incident</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default EmergencyComponent;
