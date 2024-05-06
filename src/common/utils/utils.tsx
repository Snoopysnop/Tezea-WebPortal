import { Category, IncidentLevel, ToolName, Role, WorkSiteRequestStatus, WorkSiteStatus, Emergency, CustomerStatus, Civility, Service } from "../../api/Model";
import { ReactComponent as InProgressIcon } from 'bootstrap-icons/icons/hourglass-split.svg'
import { ReactComponent as DoneIcon } from 'bootstrap-icons/icons/check-lg.svg'
import { ReactComponent as StandByIcon } from 'bootstrap-icons/icons/pause.svg'
import { ReactComponent as CanceledIcon } from 'bootstrap-icons/icons/x-lg.svg'
import { ReactComponent as NotFoundIcon } from 'bootstrap-icons/icons/bug.svg'
import { ReactComponent as ConciregeIcon } from 'bootstrap-icons/icons/inbox.svg'
import { ReactComponent as RecycleIcon } from 'bootstrap-icons/icons/recycle.svg'
import { ReactComponent as CarWashIcon } from 'bootstrap-icons/icons/car-front-fill.svg'
import { ReactComponent as GreenSpacesIcon } from 'bootstrap-icons/icons/tree-fill.svg'
import { ReactComponent as TravelingStoreIcon } from 'bootstrap-icons/icons/shop.svg'
import { ReactComponent as BloodDonationIcon } from 'bootstrap-icons/icons/droplet-half.svg'
import { ReactComponent as PickupPointIcon } from 'bootstrap-icons/icons/box-seam-fill.svg'
import { ReactComponent as SmallWorkIcon } from 'bootstrap-icons/icons/tools.svg'
import { ReactComponent as BicycleIcon } from 'bootstrap-icons/icons/bicycle.svg'
import { ReactComponent as FireWoodIcon } from 'bootstrap-icons/icons/fire.svg'
import CryptoJS from 'crypto-js';

export function getStatusColor(status: WorkSiteStatus): string {
    switch (status) {
        case WorkSiteStatus.Standby:
            return '#ebab34';
        case WorkSiteStatus.InProgress:
            return '#24a6d1';
        case WorkSiteStatus.Done:
            return '#6bc238';
        case WorkSiteStatus.Archive:
            return '#FFB6C1';
        default:
            return '#000000';
    }
}

export function getRequestStatusColor(status: WorkSiteRequestStatus): string {
    switch (status) {
        case WorkSiteRequestStatus.Standby:
            return '#ebab34';
        case WorkSiteRequestStatus.Done:
            return '#6bc238';
        case WorkSiteRequestStatus.Archive:
            return '#d12424';
        case WorkSiteRequestStatus.ToComplete:
            return '#FFB6C1';
        default:
            return '#000000';
    }
}

export function getIncidentLevelIconColor(status: IncidentLevel): string {
    switch (status) {
        case IncidentLevel.Minor:
            return 'text-success';
        case IncidentLevel.Medium:
            return 'text-warning';
        case IncidentLevel.Severe:
            return 'text-danger';
        default:
            return '#FFFFFF';
    }
}

export function getIncidentLevelColor(status: IncidentLevel): string {
    switch (status) {
        case IncidentLevel.Minor:
            return '#008000';
        case IncidentLevel.Medium:
            return '#FFFF00';
        case IncidentLevel.Severe:
            return '#FF0000';
        case IncidentLevel.Blocking:
            return '#000000';
        default:
            return '#FFFFFF';
    }
}




export function getStatusIcon(status: WorkSiteStatus) {
    switch (status) {
        case WorkSiteStatus.Standby:
            return <StandByIcon className='secondary' width='10px' height='100%' />;
        case WorkSiteStatus.InProgress:
            return <InProgressIcon className='secondary' width='8px' height='100%' />;
        case WorkSiteStatus.Done:
            return <DoneIcon className='secondary' width='10px' height='100%' />;
        case WorkSiteStatus.Archive:
            return <CanceledIcon className='secondary' width='8px' height='100%' />;
        default:
            return <NotFoundIcon className='secondary' width='10px' height='100%' />;
    }
}


export function getEmergency(emergency: string) {
    switch (emergency) {
        case "Low":
            return Emergency.Low;
        case "Average":
            return Emergency.Average;
        case "Medium":
            return Emergency.Medium;
        case "High":
            return Emergency.High;
        case "VeryHigh":
            return Emergency.VeryHigh;
    }
}

export function getStatusWorksite(status: string) {
    switch (status) {
        case "Standby":
            return WorkSiteStatus.Standby;
        case "InProgress":
            return WorkSiteStatus.InProgress;
        case "Done":
            return WorkSiteStatus.Done;
        case "Archive":
            return WorkSiteStatus.Archive;
        default:
            return WorkSiteStatus.Standby;
    }
}

export function getRoleWorksite(status: string) {
    switch (status) {
        case "WorkSiteChief":
            return Role.WorkSiteChief;
        case "Employee":
            return Role.Employee;
    }
}
export function getStatusWorksiteRequest(status: string) {
    switch (status) {
        case "Standby":
            return WorkSiteRequestStatus.Standby;
        case "ToComplete":
            return WorkSiteRequestStatus.ToComplete;
        case "Done":
            return WorkSiteRequestStatus.Done;
        case "Archive":
            return WorkSiteRequestStatus.Archive;
    }
}




export function getIncidentLevel(emergency: string) {
    switch (emergency) {
        case "Minor":
            return IncidentLevel.Minor;
        case "Medium":
            return IncidentLevel.Medium;
        case "Severe":
            return IncidentLevel.Severe;
        case "Blocking":
            return IncidentLevel.Blocking;
        default:
            return IncidentLevel.Minor;
    }
}

export function getCustomerStatus(customerStatus: string) {
    switch (customerStatus) {
        case "Business":
            return CustomerStatus.Business;
        case "Community":
            return CustomerStatus.Community;
        case "Association":
            return CustomerStatus.Association;
        case "Particular":
            return CustomerStatus.Particular;

    }
}

export function getCivility(civility: string) {
    switch (civility) {
        case "Mr":
            return Civility.Mr;
        case "Ms":
            return Civility.Ms;
        case "Other":
            return Civility.Other;

    }
}

export function getCategorie(category: string) {
    switch (category) {
        case "Conciergerie":
            return Category.Conciergerie;
        case "Recyclerie":
            return Category.Recyclerie;
        case "PetitsTravaux":
            return Category.PetitsTravaux;
        case "NettoyageDeVehicule":
            return Category.NettoyageDeVehicule;
        case "EspacesVerts":
            return Category.EspacesVerts;
        case "LaverieBlanchisserie":
            return Category.LaverieBlanchisserie;
        case "CommerceAmbulant":
            return Category.CommerceAmbulant;
        case "PiquetsEnBois":
            return Category.PiquetsEnBois;
        case "BoisDeChauffage":
            return Category.BoisDeChauffage;
        case "CreaPalette":
            return Category.CreaPalette;
        case "LeBioAVotrePorte":
            return Category.LeBioAVotrePorte;
        case "DonDePlasmaEtDeSang":
            return Category.DonDePlasmaEtDeSang;
        case "RelaisColis":
            return Category.RelaisColis;
        case "LocationVelosElectriques":
            return Category.LocationVelosElectriques;

    }

}
export function getServiceType(serviceType: string) {
    switch(serviceType){
        case "Service":
            return Service.Service;
        case "Donation":
            return Service.Donation;
        case "ServiceAndDonation":
            return Service.ServiceAndDonation;
        case "Plasma":
            return Service.Plasma;
        case "Information":
            return Service.Information;
    }
}



export function getToolName(toolname: string) {
    switch (toolname) {
        case "Agrafeuse":
            return ToolName.Stapler;
        case "Bétonnière":
            return ToolName.CementMixer;
        case "Cisaille":
            return ToolName.Shear;
        case "Clé anglaise":
            return ToolName.Wrench;
        case "Échelle":
            return ToolName.Ladder;
        case "Hache":
            return ToolName.Axe;
        case "Palette":
            return ToolName.Palette;
        case "Râteau":
            return ToolName.Rake;
        case "Scie":
            return ToolName.Saw;
        case "Perceuse":
            return ToolName.Drill;
        case "Pelle":
            return ToolName.Shovel;
    }
}

export function getCivilityName(civility: string) {
switch(civility){
    case "Mr":
        return Civility.Mr;
    case "Ms":
        return Civility.Ms;
    case "Other":
        return Civility.Other;
}       
}

export function getRequestStatusIcon(status: WorkSiteRequestStatus) {
    switch (status) {
        case WorkSiteRequestStatus.Standby:
            return <StandByIcon className='secondary' width='10px' height='100%' />;
        case WorkSiteRequestStatus.Done:
            return <DoneIcon className='secondary' width='10px' height='100%' />;
        case WorkSiteRequestStatus.Archive:
            return <CanceledIcon className='secondary' width='8px' height='100%' />;
        case WorkSiteRequestStatus.ToComplete:
            return <CanceledIcon className='secondary' width='8px' height='100%' />;
        default:
            return <NotFoundIcon className='secondary' width='10px' height='100%' />;
    }
}


export function getIncidentLevelIcon(status: IncidentLevel) {
    switch (status) {
        case IncidentLevel.Minor:
            return <StandByIcon className='secondary' width='10px' height='100%' />;
        case IncidentLevel.Medium:
            return <StandByIcon className='secondary' width='10px' height='100%' />;
        case IncidentLevel.Severe:
            return <StandByIcon className='secondary' width='10px' height='100%' />;
        case IncidentLevel.Blocking:
            return <StandByIcon className='secondary' width='10px' height='100%' />;
        default:
            return <StandByIcon className='secondary' width='10px' height='100%' />;
    }
}
export function getCivilityJsonFormat(civility: string) {
    switch (civility) {
        case "M":
            return "Mr";
        case "Mme":
            return "Ms";
        case "Autre":
            return "Other";
    }

}

export function getCustomerStatusJsonFormat(customerStatus: string) {
    switch (customerStatus) {
        case "Business":
            return "Business";
        case "Communauté":
            return "Community";
        case "Association":
            return "Association";
        case "Particulier":
            return "Particular";
    }

}

export function getServiceJsonFormat(service: string) {
    switch (service) {
        case "Service":
            return "Service";
        case "Donation":
            return "Donation";
        case "Service et Donation":
            return "ServiceAndDonation";
        case "Plasma":
            return "Plasma";
        case "Information":
            return "Information";
    }

}

export function getCategorieJsonFormat(category: string) {
    switch (category) {
        case "Conciergerie":
            return "Conciergerie";
        case "Recyclerie":
            return "Recyclerie";
        case "Petits Travaux":
            return "PetitsTravaux";
        case "Nettoyage De Vehicule":
            return "NettoyageDeVehicule";
        case "Espaces Verts":
            return "EspacesVerts";
        case "Laverie Blanchisserie":
            return "LaverieBlanchisserie";
        case "Commerce Ambulant":
            return "CommerceAmbulant";
        case "Piquets En Bois":
            return "PiquetsEnBois";
        case "Bois De Chauffage":
            return "BoisDeChauffage";
        case "Crea Palette":
            return "CreaPalette";
        case "Le Bio A Votre Porte":
            return "LeBioAVotrePorte";
        case "Don De Plasma Et De Sang":
            return "DonDePlasmaEtDeSang";
        case "Relais Colis":
            return "RelaisColis";
        case "Location Velos Electriques":
            return "LocationVelosElectriques";

    }

}

export function getEmergencyJsonFormat(emergency: string) {
    switch (emergency) {
        case "Très Faible":
            return "Low";
        case "Faible":
            return "Average";
        case "Moyen":
            return "Medium";
        case "Elevé":
            return "High";
        case "Très Elevé":
            return "VeryHigh";
    }

}



export function getCategoryIcon(status: Category) {
    switch (status) {
        case Category.Conciergerie:
            return <ConciregeIcon className='primary' width='20px' height='100%' />;
        case Category.Recyclerie:
            return <RecycleIcon className='primary' width='20px' height='100%' />;
        case Category.PetitsTravaux:
            return <SmallWorkIcon className='primary' width='20px' height='100%' />;
        case Category.NettoyageDeVehicule:
            return <CarWashIcon className='primary' width='20px' height='100%' />;
        case Category.EspacesVerts:
            return <GreenSpacesIcon className='primary' width='20px' height='100%' />;
        case Category.CommerceAmbulant:
            return <TravelingStoreIcon className='primary' width='20px' height='100%' />;

        //TODO
        // case Category.Laundry:
        //     return <LaundryIcon className='primary' width='20px' height='100%' />;
        // case Category.WoodenStakes:
        //     return <WoodenStakesIcon className='primary' width='20px' height='100%' />;
        // case Category.CreaPalette:
        //     return <CreaPaletteIcon className='primary' width='20px' height='100%' />;
        // case Category.OrganicDelivery:
        //     return <OrganicDeliveryIcon className='primary' width='20px' height='100%' />;

        case Category.BoisDeChauffage:
            return <FireWoodIcon className='primary' width='20px' height='100%' />;
        case Category.DonDePlasmaEtDeSang:
            return <BloodDonationIcon className='primary' width='20px' height='100%' />;
        case Category.RelaisColis:
            return <PickupPointIcon className='primary' width='20px' height='100%' />;
        case Category.LocationVelosElectriques:
            return <BicycleIcon className='primary' width='20px' height='100%' />;
        default:
            return <NotFoundIcon className='primary' width='20px' height='100%' />;
    }
}

export function hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
}

