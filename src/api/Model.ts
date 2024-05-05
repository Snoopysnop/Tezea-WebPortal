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
    Mr = "M",
    Ms = "Mme",
    Other = "Autre"
}

export enum CustomerStatus {
    Business = "Business",
    Community = "Communauté",
    Association = "Association",
    Particular = "Particulier"
}

export enum Emergency {
    Minor = "Faible",
    Medium = "Moyen",
    Severe = "Haut",
    Blocking = "Bloquant"
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
    ToComplete ="A compléter",
    Standby = "En attente",
    Done = "Terminé",
    Archive = "Archivé"
}

export enum WorkSiteStatus {
    Standby = "En attente",
    InProgress = "En cours",
    Archive = "Archivé",
    Done = "Terminé"
}

export interface EmergencyDetails {
    description: string,
    id: string,
    level: Emergency,
    worksite?: WorkSite
    title: string,
}


export interface SubErrorDetails {
    message: string
    path?: string
    errorCode?: string
}

export interface Customer {
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

export interface WorkSiteRequest {
    id?: number;
    concierge?: User;
    siteChief?: User;
    customer?: Customer;
    city?: string;
    workSites?: WorkSite[];
    serviceType?: Service;
    description?: string;
    emergency?: Emergency;
    title?: string;
    category?: Category;
    removal?: boolean;
    delivery?: boolean;
    removalRecycling?: boolean;
    chronoQuote?: boolean;
    estimatedDate?: Date;
    requestStatus?: WorkSiteRequestStatus;
    weightEstimate?: number;
    volumeEstimate?: number;
    provider?: string;
    tezeaAffectation?: string;
}

export interface WorkSite {
    id: string;
    workSiteChief?: User;
    staff?: User[];
    equipments?: Tool[];
    begin: Date;
    end: Date;
    status: WorkSiteStatus;
    request?: WorkSiteRequest ; 
    satisfaction?: SatisfactionLevel;
    signature?: String;
    title: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
    email: string;
    phoneNumber: string;
}

export interface Tool {
    name: ToolName;
    quantity: number;
}