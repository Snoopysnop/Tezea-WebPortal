import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { Category, IncidentLevel, WorkSite } from '../api/Model';
import { getIncidentLevelColor, getIncidentLevelIconColor } from '../common/utils/utils';
import { ReactComponent as TriangleIcon } from 'bootstrap-icons/icons/exclamation-triangle.svg';

type EmergencyProps = {
    id: string;
    description: string;
    emergency: IncidentLevel;
    category: Category;
    title: string
};

const EmergencyComponent: React.FC<EmergencyProps> = ({ description, emergency, title }) => {
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
                backgroundColor: isHovered ? '#D3D3D3' : 'transparent',
                cursor: 'pointer'
            }}
        >
            <Row onClick={handleModalOpen}>
                <Col style={{ backgroundColor: getIncidentLevelColor(emergency) }} lg={1}></Col>
                <Col lg={5} style={{ overflow: 'hidden' }}>
                    <Row className='primary justify-content-center text-center' style={{ fontSize: '14px', whiteSpace: 'pre-wrap', marginBottom: '5px', marginTop: '5px', marginLeft: '5px', maxHeight: '50px', overflowY: 'auto' }}>
                        {title}
                    </Row>
                </Col>
                <Col className='align-items-center d-flex'>
                    <div className='divider-half'></div>
                </Col>

                <Col lg={5}>
                    <Row className="justify-content-center align-items-center h-100">
                        <Col className='text-end pe-1 secondary' style={{ fontSize: '13px' }}>
                            {emergency}
                        </Col>
                        <Col className='d-flex align-items-center ps-0 pe-2'>
                            <TriangleIcon className={`primary ${getIncidentLevelIconColor(emergency)}`} width='14px' height='100%' />
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
