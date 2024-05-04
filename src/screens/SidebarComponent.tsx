import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import MainApi from "../api/MainApi";
import React from "react";
import PeopleOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/Create";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/Warning";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { LoginOutlined, RequestPageOutlined, RequestQuoteOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import KeycloakApi from "../api/KeycloakApi";

const SidebarComponent: React.FC = () => {

    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(true);

    const handleCollapseSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    //MainApi.initInstance()
    KeycloakApi.initInstance()

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
            }}>
            <Menu>
                <MenuItem
                    icon={<MenuOutlinedIcon />}
                    onClick={handleCollapseSidebar}
                    style={{ textAlign: "center" }}
                >
                    <h2>{sidebarCollapsed ? null : ''}</h2>
                </MenuItem>

                {/* Menu principal */}
                <MenuItem icon={<LoginOutlined />} style={{ backgroundColor: 'white' }} component={<Link to="/login" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />}>
                    {sidebarCollapsed ? null : 'Connexion'}
                </MenuItem>
                <MenuItem icon={<PeopleOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/listeStatus" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />}>
                    {sidebarCollapsed ? null : 'Liste des chantiers'}
                </MenuItem>
                <MenuItem icon={<RequestQuoteOutlined />} style={{ backgroundColor: 'white' }} component={<Link to="/listeDemandeChantiers" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />}>
                    {sidebarCollapsed ? null : 'Demandes de chantiers'}
                </MenuItem>
                <MenuItem icon={<ContactsOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/creerDemande" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />}>
                    {sidebarCollapsed ? null : 'Créer une demande'}
                </MenuItem>
                <MenuItem icon={<ReceiptOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/detailChantier" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />}>
                    {sidebarCollapsed ? null : 'Détail d\'un chantier'}
                </MenuItem>
                <MenuItem icon={<HelpOutlineOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/incidents" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />}>
                    {sidebarCollapsed ? null : 'Incidents'}
                </MenuItem>
                <MenuItem icon={<CalendarTodayOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/planning" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />}>
                    {sidebarCollapsed ? null : 'Planning'}
                </MenuItem>
            </Menu>
        </Sidebar >
    )
}

export default SidebarComponent