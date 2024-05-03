import { Category, WorkSiteStatus } from "../../api/Model";
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
        case WorkSiteStatus.Canceled:
            return '#d12424';
        default:
            return '#000000';
    }
}

export function getStatusIcon(status: WorkSiteStatus) {
    switch (status) {
        case WorkSiteStatus.Standby:
            return <StandByIcon className='secondary' width='10px' height='100%' />;
        case WorkSiteStatus.InProgress:
            return <InProgressIcon className='secondary' width='8px' height='100%'/>;
        case WorkSiteStatus.Done:
            return <DoneIcon className='secondary' width='10px' height='100%' />;
        case WorkSiteStatus.Canceled:
            return <CanceledIcon className='secondary' width='8px' height='100%' />;
        default:
            return <NotFoundIcon className='secondary' width='10px' height='100%' />;
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

