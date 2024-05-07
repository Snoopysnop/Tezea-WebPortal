import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import MainApi from "../api/MainApi";
import React, { useEffect, useState } from "react"; // Importez useEffect
import PeopleOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/Create";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/Warning";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { LoginOutlined, RequestPageOutlined, RequestQuoteOutlined, SettingsAccessibilityOutlined, SettingsOutlined } from "@mui/icons-material";
import { Link, useNavigate } from 'react-router-dom';
import KeycloakApi from "../api/KeycloakApi";
import { WorkSiteJson, WorkSiteRequestJson, CustomerJson, EmergencyDetailsJson, UserJson } from '../api/ModelJson';
import { WorkSite, WorkSiteRequest, Customer, WorkSiteStatus, EmergencyDetails, User, IncidentLevel } from '../api/Model';
import { getIncidentLevel, getStatusWorksite, getStatusWorksiteRequest } from "../common/utils/utils";



const SidebarComponent: React.FC<{sidebarCollapsed: any, setSidebarCollapsed: any}> = ({sidebarCollapsed, setSidebarCollapsed}) => {

    const navigate = useNavigate();


    const handleCollapseSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const handleSettingsItemClick = async () => {
        setSidebarCollapsed(true);
        const responseUserInfo = await MainApi.getInstance().getRandomConcierge() as User;
        navigate("/parametres", { state: { responseUserInfo } })

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
                <MenuItem icon={<LoginOutlined />} style={{ backgroundColor: 'white' }} component={<Link to="/login" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleMenuItemClick}>
                    {sidebarCollapsed ? null : 'Connexion'}
                </MenuItem>
                <MenuItem icon={<PeopleOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/listeStatus" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleMenuItemClick}>
                    {sidebarCollapsed ? null : 'Liste des chantiers'}
                </MenuItem>
                <MenuItem icon={<RequestQuoteOutlined />} style={{ backgroundColor: 'white' }} component={<Link to="/listeDemandeChantiers" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleMenuItemClick}>
                    {sidebarCollapsed ? null : 'Demandes de chantiers'}
                </MenuItem>
                <MenuItem icon={<ContactsOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/creerDemande" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleMenuItemClick}>
                    {sidebarCollapsed ? null : 'Créer une demande'}
                </MenuItem>
                <MenuItem icon={<ReceiptOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/detailChantier" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleMenuItemClick}>
                    {sidebarCollapsed ? null : 'Détail d\'un chantier'}
                </MenuItem>
                <MenuItem icon={<HelpOutlineOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/incidents" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleMenuItemClick}>
                    {sidebarCollapsed ? null : 'Incidents'}
                </MenuItem>
                <MenuItem icon={<CalendarTodayOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/planning" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleMenuItemClick}>
                    {sidebarCollapsed ? null : 'Planning'}
                </MenuItem>
                <MenuItem icon={<SettingsOutlined />} style={{ backgroundColor: 'white' }} onClick={handleSettingsItemClick}>
                    {sidebarCollapsed ? null : 'Paramètres'}
                </MenuItem>
            </Menu>
        </Sidebar >
    )
}

export default SidebarComponent;
