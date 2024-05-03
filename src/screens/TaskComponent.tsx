import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Import des composants Bootstrap
import { Category, WorkSiteRequestStatus, WorkSiteRequestStatusListPage, WorkSiteStatus } from '../api/Model';
import { getCategoryIcon, getStatusColor, getStatusIcon } from '../common/utils/utils';
import { ReactComponent as ClockIcon } from 'bootstrap-icons/icons/clock.svg'
import { ReactComponent as AddressIcon } from 'bootstrap-icons/icons/house-door.svg'

type TaskProps = {
    id: number
    name: string
    date: string
    startHours: string
    endHour: string
    address: string
    status: WorkSiteStatus | WorkSiteRequestStatusListPage
    category: Category
}

const TaskComponent: React.FC<TaskProps> = ({ id, name, date, startHours, endHour, address, status, category }) => {

    return (
        <Container style={{ borderColor: '#c2c2c2', borderStyle: 'solid', borderWidth: '2px', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px'}}>
            <Row className='mb-3' style={{ backgroundColor: getStatusColor(status), height: '15px' }} />
            <Row>
                <Col className='d-flex align-items-center' xs='auto'>
                    {getCategoryIcon(category)}
                </Col>
                <Col xs='auto' className='d-flex align-items-center ps-0 pe-0 primary'>
                    <div className='divider' />
                </Col>
                <Col className='primary' style={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {name}
                </Col>
            </Row>
            <Row className='pb-2 pt-3'><Col className="lineTitle"></Col></Row>
            <Row className='mb-2'>
                <Col className='d-flex align-items-center pe-2' xs='auto'>
                    <ClockIcon className='primary' width='12px' height='100%' />
                </Col>
                <Col xs='auto' className='d-flex align-items-center ps-0'>
                    <div className='divider-half' />
                </Col>
                <Col className='primary ps-2' style={{ fontSize: '11px'}}>
                    <Row>
                        {startHours}
                    </Row>
                    <Row>
                        {endHour}
                    </Row>
                </Col>
            </Row>
            <Row className='mb-2'>
                <Col className='pe-2' xs='auto'>
                    <AddressIcon className='primary d-flex align-items-center ' width='12px' height='100%' />
                </Col>
                <Col className='secondary' style={{ fontSize: '11px',  fontStyle: 'italic'}}>
                    <Row>
                        {address}
                    </Row>
                </Col>
            </Row>
            <Row className='mb-1'>
                <Col className='text-end pe-1 secondary' style={{ fontSize: '8px'}}>
                    {status}
                </Col>
                <Col className='d-flex align-items-center ps-0 pe-2' xs='auto'>
                    {getStatusIcon(status)}
                </Col>
            </Row>
        </Container>
    );
}

export default TaskComponent;
