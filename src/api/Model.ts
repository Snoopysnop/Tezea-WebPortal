export enum Category {
    Conciergerie = "Conciergerie",
    Recyclerie = "Recyclerie",
    PetitsTravaux = "PetitsTravaux",
    NettoyageDeVehicule = "NettoyageDeVehicule",
    EspacesVerts = "EspacesVerts",
    LaverieBlanchisserie = "LaverieBlanchisserie",
    CommerceAmbulant = "CommerceAmbulant",
    PiquetsEnBois = "PiquetsEnBois",
    BoisDeChauffage = "BoisDeChauffage",
    CreaPalette = "CreaPalette",
    LeBioAVotrePorte = "LeBioAVotrePorte",
    DonDePlasmaEtDeSang = "DonDePlasmaEtDeSang",
    RelaisColis = "RelaisColis",
    LocationVelosElectriques = "LocationVelosElectriques"
}

export enum Civility {
    Mr = "Mr",
    Mme = "Mme",
    Other = "Other"
}

export enum CustomerStatus {
    Business = "Business",
    Community = "Community",
    Association = "Association",
    Particular = "Particular"
}

export enum Emergency {
    Low = "Low",
    Medium = "Medium",
    Average = "Average",
    High = "High",
    VeryHigh = "VeryHigh"
}

export enum Role {
    Concierge = "Concierge",
    SiteChief = "SiteChief",
    Commercial = "Commercial",
    WorkSiteChief = "WorkSiteChief",
    Employee = "Employee"
}

export enum SatisfactionLevel {
    Perfect = "Perfect",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Dissatisfied = "Dissatisfied"
}

export enum Service {
    Service = "Service",
    Donation = "Donation",
    ServiceAndDonation = "ServiceAndDonation",
    Plasma = "Plasma",
    Information = "Information"
}

export enum WorkSiteStatus {
    Standby = "Standby",
    InProgress = "InProgress",
    Canceled = "Canceled",
    Done = "Done"
}

export interface Task {
    id: number
    name: string
    date: string
    startHours: string
    endHour: string
    address: string
    status: WorkSiteStatus
}

export interface SubErrorDetails {
    message: string
    path?: string
    errorCode?: string
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    civility: Civility;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: number;
    status: CustomerStatus;
    company: string;
    requests: WorkSiteRequest[];
}

export interface WorkSiteRequest {
    id: string;
    concierge: User;
    siteChief: User;
    customer: Customer;
    city: string;
    workSites: WorkSite[];
    serviceType: Service;
    description: string;
    emergency: Emergency;
    status: WorkSiteStatus;
    title: string;
    category: Category;
}

export interface WorkSite {
    id: string;
    workSiteChief: User;
    staff: User[];
    equipment: ToolUsage[];
    begin: Date;
    end: Date;
    status: WorkSiteStatus;
    request: WorkSiteRequest;
    satisfaction: SatisfactionLevel;
    signature: ArrayBuffer;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
    email: string;
    phoneNumber: string;
}

export interface ToolUsage {
    id: string;
    tool: Tool;
    workSite: WorkSite;
    quantity: number;
}

export interface Tool {
    name: string;
    quantity: number;
    schedules: ToolUsage[];
}





