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
    title: string;
    evidences: string[] | undefined
};

const EmergencyComponent: React.FC<EmergencyProps> = ({ description, emergency, title, evidences }) => {
    const [showModal, setShowModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleModalOpen = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);




    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

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
                <Col lg={6}>
                    <Row>
                        <Col lg={1} className='pe-1' style={{ minHeight: '40px', backgroundColor: getIncidentLevelColor(emergency) }}>
                        </Col>
                        <Col lg={10} className='primary d-flex justify-content-center align-items-center ps-3 pe-0' style={{ fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {title}
                        </Col>
                    </Row>
                </Col>

                <Col lg={1} className='pe-0 ps-0 justify-content-center align-items-center d-flex'>
                    <div className='divider-half'></div>
                </Col>
                <Col lg={4} className='primary d-flex align-items-center justify-content-center ps-0 pe-0'>
                    <Row>
                        <Col lg={8} className='secondary' style={{ fontSize: '12px' }}>
                            {emergency}
                        </Col>
                        <Col className='d-flex justify-content-center align-items-center ps-0 pe-2'>
                            <TriangleIcon className={`${getIncidentLevelIconColor(emergency)}`} width='14px' height='100%' />
                        </Col>
                    </Row>
                </Col>
            </Row>






            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{description}</p>
                </Modal.Body>
                

                <Modal.Body>
                    
                    <Row>
                        {evidences &&
                            evidences.map((image, index) => (
                                
                                <Col key={index} xs={4}>
                                    <img
                                        src={`data:image/jpeg;charset=utf-8;base64,${image.substring(1, image.length - 1)}`}
                                        alt={`Image ${index}`}
                                        onClick={() => handleImageClick(image)}
                                        style={{ width: '140px', height: '100px', cursor: 'pointer', marginBottom: '20px' }}
                                    />
                                </Col>
                            ))}
                    </Row>
                    {selectedImage && (
                        <Modal
                            show={!!selectedImage}
                            onHide={() => setSelectedImage(null)}
                            centered
                        >
                            <Modal.Body className="d-flex justify-content-center align-items-center">
                                <img
                                    src={`data:image/jpeg;charset=utf-8;base64,${selectedImage.substring(1, selectedImage.length - 1)}`}
                                    alt="Selected Image"
                                    style={{ maxWidth: '200%', maxHeight: '200%' }}
                                />
                            </Modal.Body>
                        </Modal>
                    )}
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

