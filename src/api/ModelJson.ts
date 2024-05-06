import {Tool,WorkSiteStatus,Emergency,Civility,CustomerStatus,Service,Category,WorkSiteRequestStatus,SatisfactionLevel,Role,ToolName} from './Model'


export interface EmergencyDetailsJson {
    description: string,
    id?: string ,
    level: string,
    title: string,
    evidences? : any[],
    workSiteId? : string
}

export interface EmergencyDetailsJsonToSend {
    description: string,
    level: Emergency,
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
    civility?: Civility;
    email?: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
    postalCode?: number;
    status?: CustomerStatus;
    company?: string;
}

export interface WorkSiteRequestJson {
    id?: number;
    concierge?: string;
    siteChief?: string;
    customer?: string;
    city?: string;
    serviceType?: Service;
    description?: string;
    emergency?: Emergency;
    title?: string;
    category?: Category;
    removal?: boolean;
    delivery?: boolean;
    removalRecycling?: boolean;
    chronoQuote?: boolean;
    estimatedDate?: string;
    requestStatus?: WorkSiteRequestStatus;
    weightEstimate?: number;
    volumeEstimate?: number;
    provider?: string;
    tezeaAffectation?: string;
}

export interface WorkSiteJson {
    id: string;
    workSiteChief?: string;
    staff?: string[];
    equipment?: Tool[];
    begin?: string;
    end?: string;
    status?: WorkSiteStatus;
    request?: string | undefined; //todo a voir si on laisse undefined
    satisfaction?: SatisfactionLevel;
    signature?: String;
    title?: string;
    address?:string
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

