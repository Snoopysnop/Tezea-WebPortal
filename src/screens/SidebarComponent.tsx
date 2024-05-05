import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import MainApi from "../api/MainApi";
import React, { useEffect, useState } from "react"; // Importez useEffect
import PeopleOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/Create";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/Warning";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { LoginOutlined, RequestPageOutlined, RequestQuoteOutlined, SettingsAccessibilityOutlined, SettingsOutlined } from "@mui/icons-material";
import { Link, useNavigate } from 'react-router-dom';
import KeycloakApi from "../api/KeycloakApi";
import { WorkSiteJson, WorkSiteRequestJson, CustomerJson, EmergencyDetailsJson, UserJson } from '../api/ModelJson';
import { WorkSite, WorkSiteRequest, Customer, WorkSiteStatus, WorkSiteRequestStatus, EmergencyDetails, User } from '../api/Model';
import { getStatusWorksite, getStatusWorksiteRequest } from "../common/utils/utils";



const SidebarComponent: React.FC = () => {

    const navigate = useNavigate();

    const [worksiteData, setWorksiteData] = useState<WorkSite[]>();
    const [worksiteRequestData, setWorksiteRequestData] = useState<WorkSiteRequest[]>();
    const [emergencyData, setEmergencytData] = useState<EmergencyDetails[]>();


    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    const handleCollapseSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    MainApi.initInstance()
    KeycloakApi.initInstance()

    const handleListWorksite = async () => {
        setSidebarCollapsed(true);
        const responseWorksite = await MainApi.getInstance().getWorkSites() as WorkSiteJson[];

        const worksiteMapper: WorkSite[] = responseWorksite.map(worksiteJson => ({
            id: worksiteJson.id,
            workSiteChief: undefined,
            staff: undefined,
            equipment: undefined,
            begin: worksiteJson.begin ? new Date(worksiteJson.begin) : new Date(),
            end: worksiteJson.end ? new Date(worksiteJson.end) : new Date(),
            status: worksiteJson.status ? getStatusWorksite(worksiteJson.status) : WorkSiteStatus.Standby,
            request: undefined,
            satisfaction: worksiteJson.satisfaction,
            signature: worksiteJson.signature,
            title: worksiteJson.title ? worksiteJson.title : '',
            address: worksiteJson.address ? worksiteJson.address : ''
        }));
        setWorksiteData(worksiteMapper);

        console.log("sidebar:onclick:", worksiteMapper);
        navigate("/listeStatus", { state: { worksiteData } })
    }



    const handleListWorksiteRequest = async () => {
        setSidebarCollapsed(true);
        const responseWorksiteRequest = await MainApi.getInstance().getWorkSiteRequests("creationDate") as WorkSiteRequestJson[];

        const worksiteRequestMapper: WorkSiteRequest[] = responseWorksiteRequest.map(worksiteRequestJson => ({
            id: worksiteRequestJson.id,
            concierge: undefined,
            siteChief: undefined,
            customer: undefined,
            city: worksiteRequestJson.city,
            workSites: undefined,
            serviceType: undefined,
            description: worksiteRequestJson.description,
            emergency: worksiteRequestJson.emergency,
            title: worksiteRequestJson.title,
            category: undefined,
            removal: worksiteRequestJson.removal,
            delivery: worksiteRequestJson.delivery,
            removalRecycling: worksiteRequestJson.removalRecycling,
            chronoQuote: worksiteRequestJson.chronoQuote,
            estimatedDate: worksiteRequestJson.estimatedDate ? new Date(worksiteRequestJson.estimatedDate) : new Date(),
            requestStatus: worksiteRequestJson.requestStatus ? getStatusWorksiteRequest(worksiteRequestJson.requestStatus) : WorkSiteRequestStatus.Standby,
            weightEstimate: worksiteRequestJson.weightEstimate,
            volumeEstimate: worksiteRequestJson.volumeEstimate,
            provider: worksiteRequestJson.provider,
            tezeaAffectation: worksiteRequestJson.tezeaAffectation,
        }));
        setWorksiteRequestData(worksiteRequestMapper);
        console.log("Reponse", responseWorksiteRequest);

        console.log("mapper", worksiteRequestMapper);
        console.log("data", worksiteRequestData);

        navigate("/listeDemandeChantiers", { state: { worksiteRequestData } })
    }

    const handleSettingsItemClick = async () => {
        setSidebarCollapsed(true);
        const responseUserInfo = await MainApi.getInstance().getUserbyId("2245b540-88c7-42dd-b469-70c82c6beb02") as User;
        console.log(responseUserInfo);
        navigate("/parametres", { state: { responseUserInfo } })

    }


    const handleListEmergency = async () => {
        setSidebarCollapsed(true);
        const responseEmergency = await MainApi.getInstance().getEmergencies() as EmergencyDetailsJson[];
        console.log("Reponse", responseEmergency);

        /*const emergencyMapper: EmergencyDetails[] = responseEmergency.map(emergencyDetailsJson => ({
            description: emergencyDetailsJson.description,
            titre: emergencyDetailsJson.titre,
            id: emergencyDetailsJson.id,
            level: Emergency,
            worksite: undefined
        }));
        setEmergencytData(emergencyMapper);

        console.log("Reponse", responseEmergency);
        console.log("mapper", emergencyMapper);
        console.log("data", emergencytData);

        navigate("/incidents", { state: { emergencytData } })*/
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
            id="sidebar" // Ajoutez un ID à la barre latérale
        >
            <Menu>
                <MenuItem
                    icon={<MenuOutlinedIcon />}
                    onClick={handleCollapseSidebar}
                    style={{ textAlign: "center" }}
                >
                    <h2>{sidebarCollapsed ? null : ''}</h2>
                </MenuItem>
                <MenuItem icon={<LoginOutlined />} style={{ backgroundColor: 'white' }} component={<Link to="/login" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleMenuItemClick}>
                    {sidebarCollapsed ? null : 'Connexion'}
                </MenuItem>
                <MenuItem icon={<PeopleOutlinedIcon />} style={{ backgroundColor: 'white' }} onClick={handleListWorksite}>
                    {sidebarCollapsed ? null : 'Liste des chantiers'}
                </MenuItem>
                <MenuItem icon={<RequestQuoteOutlined />} style={{ backgroundColor: 'white' }} onClick={handleListWorksiteRequest}>
                    {sidebarCollapsed ? null : 'Demandes de chantiers'}
                </MenuItem>
                <MenuItem icon={<ContactsOutlinedIcon />} style={{ backgroundColor: 'white' }} component={<Link to="/creerDemande" style={{ display: 'flex', alignItems: 'center', color: 'black', textDecoration: 'none' }} />} onClick={handleMenuItemClick}>
                    {sidebarCollapsed ? null : 'Créer une demande'}
                </MenuItem>
                <MenuItem icon={<HelpOutlineOutlinedIcon />} style={{ backgroundColor: 'white' }} onClick={handleListEmergency}>
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
