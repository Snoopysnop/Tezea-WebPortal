import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SchedulePage: React.FC = () => {
  return (
    <Container className='mt-5 justify-content-center'>
    <h1>Schedule</h1>
    <p>
        <span>Not implemented yet ... </span>
        <span>Go back <Link to="/worksiteList">Home</Link></span>
    </p>
</Container>

  );
}

export default SchedulePage;
