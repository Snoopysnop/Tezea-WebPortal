import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import React, { useEffect } from "react"; // Importez useEffect
import PeopleOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/Create";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"
import HelpOutlineOutlinedIcon from "@mui/icons-material/Warning";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { LogoutOutlined, RequestQuoteOutlined, SettingsOutlined } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { hasRequieredRoles } from "../common/utils/utils";
import { Role } from "../api/Model";




const SidebarComponent: React.FC<{ setIsLoggedIn: any, sidebarCollapsed: any, setSidebarCollapsed: any }> = ({ setIsLoggedIn, sidebarCollapsed, setSidebarCollapsed }) => {

    const handleCollapseSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const handleSettingsItemClick = async () => {
        setSidebarCollapsed(true);
    }


    const handleMenuItemClick = () => {
        setSidebarCollapsed(true); // Rétracter la barre latérale lorsque vous cliquez sur un élément du menu
    };

    // Utilisez useEffect pour ajouter un écouteur d'événements lors du chargement du composant
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const sidebar = document.getElementById('sidebar');
            if (!sidebar?.contains(target) && !sidebarCollapsed) {
                setSidebarCollapsed(true);
            }
        };

        // Ajoutez l'écouteur d'événements au chargement du composant
        document.addEventListener('click', handleOutsideClick);

        // Retirez l'écouteur d'événements lorsque le composant est démonté
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [sidebarCollapsed]);

    return (
        <Sidebar
            collapsed={sidebarCollapsed}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                zIndex: 1000,
                backgroundColor: "#fff"
            }}
            id="sidebar"
        >
            <Menu>
                <MenuItem
                    icon={<MenuOutlinedIcon />}
                    onClick={handleCollapseSidebar}
                >
                    <h2>{sidebarCollapsed ? null : ''}</h2>
                </MenuItem>
                <MenuItem icon={<LogoutOutlined />}
                    style={{ backgroundColor: 'white' }}
                    component={<Link to="/login"
                        style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />}
                    onClick={() => {
                        localStorage.removeItem("access-token")
                        setIsLoggedIn(false)
                        handleMenuItemClick()
                    }}>
                    {sidebarCollapsed ? null : 'Déconnexion'}
                </MenuItem>
                <MenuItem icon={<PeopleOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/worksiteList" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleMenuItemClick}>
                    {sidebarCollapsed ? null : 'Liste des chantiers'}
                </MenuItem>
                {hasRequieredRoles([Role.SiteChief, Role.Concierge]) &&
                    <MenuItem icon={<RequestQuoteOutlined />} style={{ backgroundColor: 'white' }} component={<Link to="/worksiteRequestList" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleMenuItemClick}>
                        {sidebarCollapsed ? null : 'Demandes de chantier'}
                    </MenuItem>
                }
                {hasRequieredRoles([Role.Concierge]) &&
                    <MenuItem icon={<ContactsOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/worksiteRequestCreate" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleMenuItemClick}>
                        {sidebarCollapsed ? null : 'Créer une demande'}
                    </MenuItem>
                }
                <MenuItem icon={<HelpOutlineOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/incidentsList" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleMenuItemClick}>
                    {sidebarCollapsed ? null : 'Incidents'}
                </MenuItem>
                <MenuItem icon={<CalendarTodayOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/planning" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleMenuItemClick}>
                    {sidebarCollapsed ? null : 'Planning'}
                </MenuItem>
                <MenuItem icon={<SettingsOutlined />} style={{ backgroundColor: 'white' }} component={<Link to="/settings" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleSettingsItemClick}>
                    {sidebarCollapsed ? null : 'Paramètres'}
                </MenuItem>
            </Menu>
        </Sidebar >
    )
}

export default SidebarComponent;
