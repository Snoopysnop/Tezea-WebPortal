import { Outlet, Navigate } from 'react-router-dom'
import KeycloakApi from '../../api/KeycloakApi'

const ProtectedRoute = () => {
    return(
        KeycloakApi.isTokenValid() ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default ProtectedRoute