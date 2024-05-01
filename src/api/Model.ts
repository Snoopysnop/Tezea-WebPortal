export enum TaskStatus {
    StandBy = "StandBy",
    InProgress = "InProgress",
    Canceled = "Canceled",
    Done = "Done"
}

export enum Category {
    Concierge = "Concierge",
    Recycle = "Recycle",
    SmallWork = "SmallWork",
    CarWash = "CarWash",
    GreenSpaces = "GreenSpaces",
    Laundry = "Laundry",
    TravelingStore = "TravelingStore",
    WoodenStakes = "WoodenStakes",
    FireWood = "FireWood",
    OrganicDelivery = "OrganicDelivery",
    CreaPalette = "CreaPalette",
    PickupPoint = "PickupPoint",
    BloodDonation = "BloodDonation",
    ElectricBikeRental = "ElectricBikeRental"
}

export interface Task {
    id: number
    name: string
    date: string
    startHours: string
    endHour: string
    address: string
    status: TaskStatus
}

export interface SubErrorDetails {
    message: string
    path?: string
    errorCode?: string
}


