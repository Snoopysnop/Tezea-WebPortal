export enum Category {
    Conciergerie = "Conciergerie",
    Recyclerie = "Recyclerie",
    PetitsTravaux = "Petits Travaux",
    NettoyageDeVehicule = "Nettoyage De Vehicule",
    EspacesVerts = "Espaces Verts",
    LaverieBlanchisserie = "Laverie Blanchisserie",
    CommerceAmbulant = "Commerce Ambulant",
    PiquetsEnBois = "Piquets En Bois",
    BoisDeChauffage = "Bois De Chauffage",
    CreaPalette = "Crea Palette",
    LeBioAVotrePorte = "Le Bio A Votre Porte",
    DonDePlasmaEtDeSang = "Don De Plasma Et De Sang",
    RelaisColis = "Relais Colis",
    LocationVelosElectriques = "Location Velos Electriques"
}

export enum ToolName{
    Stapler = "Agrafeuse",
    CementMixer = "Bétonnière",
    Shear = "Cisaille",
    Wrench = "Clé anglaise",
    Ladder = "Échelle",
    Axe = "Hache",
    Palette = "Palette",
    Rake = "Râteau",
    Saw = "Scie",
    Drill = "Perceuse",
    Shovel = "Pelle"
}

export enum Civility {
    M = "M",
    Mme = "Mme",
    Mlle = "Mlle"
}

export enum CustomerStatus {
    Business = "Business",
    Community = "Communauté",
    Association = "Association",
    Particular = "Particulier"
}

export enum Emergency {
    Low = "Basse",
    Medium = "Normale",
    Average = "Moyenne",
    High = "Haute",
    VeryHigh = "Très Haute"
}

export enum Role {
    Concierge = "Concièrge",
    SiteChief = "Chef de site",
    Commercial = "Commercial",
    WorkSiteChief = "Chef de chantier",
    Employee = "Employé"
}

export enum SatisfactionLevel {
    Perfect = "Parfait",
    High = "Très Satisfait",
    Medium = "Satisfait",
    Low = "Peu Satisfait",
    Dissatisfied = "Pas Du Tout"
}

export enum Service {
    Service = "Service",
    Donation = "Donation",
    ServiceAndDonation = "Service et Donation",
    Plasma = "Plasma",
    Information = "Information"
}

export enum WorkSiteRequestStatus {
    New = "Nouvelle",
    QuoteInProgress = "Devis en cours",
    QuoteSigned = "Devis signé",
    Duplicate = "Doublon",
    Billed = "Facturée",
    Refused = "Refusée",
    Closed = "Cloturée",
    Other = "Autre"
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
    siteChief: User | undefined;
    customer: Customer;
    city: string;
    workSites: WorkSite[] | undefined;
    serviceType: Service;
    description: string;
    emergency: Emergency;
    title: string;
    category: Category;
    removal: boolean;
    delivery: boolean;
    removalRecycling: boolean;
    chronoQuote: boolean;
    date: Date;
    requestStatus: WorkSiteRequestStatus;
    hourReturnDeposit: string;
    hourArrival: string;
    hourDeparture: string;
    weightEstimate: number;
    volumeEstimation: number;
    provider: string;
    tezeaAffectation: string;
}

export interface WorkSite {
    id: string;
    workSiteChief: User | undefined;
    staff: User[];
    equipment: ToolUsage[];
    begin: Date;
    end: Date;
    status: WorkSiteStatus;
    request: WorkSiteRequest | undefined; //todo a voir si on laisse undefined
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
    name: ToolName;
    quantity: number;
    schedules: ToolUsage[];
}

