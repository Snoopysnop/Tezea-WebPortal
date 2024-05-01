import { Category, TaskStatus } from "../../api/Model";
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

export function getStatusColor(status: TaskStatus): string {
    switch (status) {
        case TaskStatus.StandBy:
            return '#ebab34';
        case TaskStatus.InProgress:
            return '#24a6d1';
        case TaskStatus.Done:
            return '#6bc238';
        case TaskStatus.Canceled:
            return '#d12424';
        default:
            return '#000000';
    }
}

export function getStatusIcon(status: TaskStatus) {
    switch (status) {
        case TaskStatus.StandBy:
            return <StandByIcon className='secondary' width='10px' height='100%' />;
        case TaskStatus.InProgress:
            return <InProgressIcon className='secondary' width='8px' height='100%'/>;
        case TaskStatus.Done:
            return <DoneIcon className='secondary' width='10px' height='100%' />;
        case TaskStatus.Canceled:
            return <CanceledIcon className='secondary' width='8px' height='100%' />;
        default:
            return <NotFoundIcon className='secondary' width='10px' height='100%' />;
    }
}

export function getCategoryIcon(status: Category) {
    switch (status) {
        case Category.Concierge:
            return <ConciregeIcon className='primary' width='20px' height='100%' />;
        case Category.Recycle:
            return <RecycleIcon className='primary' width='20px' height='100%' />;
        case Category.SmallWork:
            return <SmallWorkIcon className='primary' width='20px' height='100%' />;
        case Category.CarWash:
            return <CarWashIcon className='primary' width='20px' height='100%' />;
        case Category.GreenSpaces:
            return <GreenSpacesIcon className='primary' width='20px' height='100%' />;
        case Category.TravelingStore:
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

        case Category.FireWood:
            return <FireWoodIcon className='primary' width='20px' height='100%' />;
        case Category.BloodDonation:
            return <BloodDonationIcon className='primary' width='20px' height='100%' />;
        case Category.PickupPoint:
            return <PickupPointIcon className='primary' width='20px' height='100%' />;
        case Category.ElectricBikeRental:
            return <BicycleIcon className='primary' width='20px' height='100%' />;
        default:
            return <NotFoundIcon className='primary' width='20px' height='100%' />;
    }
}
