import {Tool,WorkSiteStatus,IncidentLevel,Civility,CustomerStatus,Service,Category,WorkSiteRequestStatus,SatisfactionLevel,Role,ToolName} from './Model'


export interface EmergencyDetailsJson {
    description: string,
    id?: string ,
    level: string,
    title: string,
    evidences? : string[],
    workSiteId? : string
}

export interface EmergencyDetailsJsonToSend {
    description: string,
    level: IncidentLevel,
    worksite: string,
    title: string
}

export interface SubErrorDetailsJson {
    message: string
    path?: string
    errorCode?: string
}

export interface CustomerJson {
    id?: string;
    firstName?: string;
    lastName?: string;
    civility?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
    postalCode?: number;
    status?: string;
    company?: string;
}

export interface WorkSiteRequestJson {
    id?: number;
    concierge?: string;
    siteChief?: string;
    customer?: string;
    city?: string;
    serviceType?: string;
    description?: string;
    emergency?: string;
    title?: string;
    category?: string;
    removal?: boolean;
    delivery?: boolean;
    removalRecycling?: boolean;
    chronoQuote?: boolean;
    estimatedDate?: string;
    status?: string;
    weightEstimate?: number;
    volumeEstimate?: number;
    provider?: string;
    tezeaAffectation?: string;
}

export interface WorkSiteJsonChelou {
    id?: string;
    workSiteChief?: string;
    staff?: string[];
    equipments?: { [key: string]: number };
    begin: string;
    end: string;
    status?: WorkSiteStatus;
    workSiteRequest?: number | undefined; 
    satisfaction?: SatisfactionLevel;
    signature?: string;
    title?: string;
    address?:string
}

export interface WorkSiteJson {
    id?: string;
    workSiteChief?: string;
    staff?: string[];
    equipments?: Tool[];
    begin: string;
    end: string;
    status?: WorkSiteStatus;
    workSiteRequest?: number | undefined; //todo a voir si on laisse undefined
    satisfaction?: SatisfactionLevel;
    signature?: string;
    title?: string;
    address?:string;
    category?:string;
}

export interface UserJson {
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
    email: string;
    phoneNumber: string;
}

export interface ToolJson {
    name: ToolName;
    quantity: number;
}

