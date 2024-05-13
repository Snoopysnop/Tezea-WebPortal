import { Outlet, Navigate } from 'react-router-dom'
import KeycloakApi from '../../api/KeycloakApi'
import { Role } from '../../api/Model'
import { Container } from 'react-bootstrap';
import { hasRequieredRoles } from '../../common/utils/utils';

interface ProtectedRouteProps {
    roles: Role[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {

    return(
        KeycloakApi.isTokenValid() ?  
        hasRequieredRoles(roles) ? <Outlet/> : 
        <Container className='mt-5 justify-content-center'>
            <h1>Access Denied</h1>
            <p>
                <span>You don't have access to this page ...</span>
            </p>
        </Container> :
        <Navigate to={"/login"}/> 

    )
}

export default ProtectedRoute