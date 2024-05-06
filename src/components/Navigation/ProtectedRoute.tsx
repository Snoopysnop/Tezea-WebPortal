import { Outlet, Navigate, Link } from 'react-router-dom'
import KeycloakApi from '../../api/KeycloakApi'
import { Role } from '../../api/Model'
import { jwtDecode } from "jwt-decode";
import { decodeToken } from 'react-jwt';
import { Container } from 'react-bootstrap';

interface ProtectedRouteProps {
    role: Role
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {

    function hasRequieredRole(role: Role): boolean {

        const token = localStorage.getItem("access-token")
        const decodedToken: any = token ? decodeToken(token) : undefined
        const realmAccess = decodedToken ? decodedToken.realm_access : undefined
        const roles: string[] = realmAccess ? realmAccess.roles : []
        console.log(roles)
        console.log(role)
        return KeycloakApi.isTokenValid() && roles.includes(role.toUpperCase())
    }

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