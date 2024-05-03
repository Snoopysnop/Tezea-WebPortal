import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Category, Emergency, Task } from '../api/Model';
import { getCategoryIcon, getEmergencyColor, getEmergencyIconColor } from '../common/utils/utils';
import { ReactComponent as TriangleIcon } from 'bootstrap-icons/icons/exclamation-triangle.svg';

type EmergencyProps = {
    id: number;
    description: string;
    emergency: Emergency;
    task: Task;
    category: Category;
};

const EmergencyComponent: React.FC<EmergencyProps> = ({ id, description, emergency, task, category }) => {
    return (
        <Container style={{ borderColor: '#c2c2c2', borderStyle: 'solid', borderWidth: '2px', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px' }}>
            <Row>
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
        </Container>
    );
}

export default EmergencyComponent;
