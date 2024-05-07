import { Outlet, Navigate, Link } from 'react-router-dom'
import KeycloakApi from '../../api/KeycloakApi'
import { Role } from '../../api/Model'
import { jwtDecode } from "jwt-decode";
import { decodeToken } from 'react-jwt';
import { Container } from 'react-bootstrap';
import { hasRequieredRole } from '../../common/utils/utils';

interface ProtectedRouteProps {
    role: Role
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {

    return(
        hasRequieredRole(role) ? <Outlet/> : 
        <Container className='mt-5 justify-content-center'>
            <h1>Access Denied</h1>
            <p>
                <span>You don't have access to this page ...</span>
                <span>Go back <Link to="/login">Login</Link></span>
            </p>
        </Container>
    )
}

export default ProtectedRoute