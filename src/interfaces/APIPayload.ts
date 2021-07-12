export interface ErrorPayload {
    error: {
        message: string;
        code: number;
    }
}

export interface AccountPayload {
    user: {
        credits: number;
        joinedAt: string;
        shipCount: number;
        structureCount: number;
        username: string;
    }
}

export interface UsernameClaimPayload {
    token: string;
    user: {
        username: string;
        credits: 0;
        ships: [];
        loans: [];
    }
}

export interface FlightPlansPayload {
    flightPlan: RawFlightPlan;
}

export interface RawFlightPlan {
    arrivesAt: string;
    createdAt: string;
    departure: string;
    destination: string;
    distance: number;
    fuelConsumed: number;
    fuelRemaining: number;
    id: string;
    shipId: string;
    terminatedAt?: string;
    timeRemainingInSeconds: number;
}

export interface GameStatusPayload {
    status: string;
}

export interface LeaderboardPayload {
    netWorth: LeaderboardUser[],
    userNetWorth?: LeaderboardUser[]
}

export interface LeaderboardUser {
    netWorth: number;
    rank: number;
    username: string;
}

export type LoansPayload  = 
FetchedLoans |
RawAvailableLoans |
CreatedLoan |
PaidLoan;

export interface FetchedLoans {
    credits?: number;
    loans: RawLoan[];
}

export interface CreatedLoan {
    credits: number;
    loan: RawLoan;
}

export interface PaidLoan {
    credits: number;
    loans: RawLoan[];
}

export interface RawAvailableLoans {
    loans: RawAvailableLoan[];
}

export interface RawAvailableLoan {
    amount: number;
    collateralRequired: boolean;
    rate: number;
    termInDays: number;
    type: LoanType;
}

export interface RawLoan {
    due: string;
    id: string;
    repaymentAmount: number;
    status: LoanStatus;
    type: LoanType;
}

export type LoanStatus = 'CURRENT' | 'PAID';
export type LoanType = 'STARTUP';

export type LocationsPayload =
FetchedLocation |
LocationMarketplace |
DockedShips;

export interface FetchedLocation {
    location: RawLocation;
}

export interface RawLocation {
    allowsConstruction: boolean;
    dockedShips?: number;
    name: string;
    symbol: string;
    type: string;
    x: number;
    y: number;
}

export interface LocationMarketplace {
    marketplace: MarketplaceItem[];
}

export interface MarketplaceItem {
    pricePerUnit: number;
    purchasePricePerUnit: number;
    quantityAvailable: number;
    sellPricePerUnit: number;
    spread: number;
    symbol: string;
    volumePerUnit: number;
}

export interface DockedShips {
    ships: DockedShip[];
}

export interface DockedShip {
    shipId: string;
    shipType: string;
    username: string;
}

export interface OrdersPayload {
    credits: number;
    order: RawOrder;
    ship: RawShip;
}

export interface RawOrder {
    good: string;
    pricePerUnit: number;
    quantity: number;
    total: number;
}

export type ShipsPayload = 
PurchasedShip |
FetchedShips |
FetchedShip |
JettisonedShip |
ScrappedShip |
ShipCargoTransfer;

export interface PurchasedShip {
    credits: number;
    ship: RawShip;
}

export interface FetchedShips {
    ships: RawShip[];
}

export interface FetchedShip {
    ship: RawShip;
}

export interface JettisonedShip {
    good: string;
    quantityRemaining: number;
    shipId: string;
}

export interface ScrappedShip {
    success: `Ship scrapped for ${number} credits`;
}

export interface ShipCargoTransfer {
    fromShip: RawShip;
    toShip: RawShip;
}

export interface BaseShip {
    class: string;
    manufacturer: string;
    maxCargo: number;
    plating: number;
    speed: number;
    type: string;
    weapons: number;
}

export interface RawShip extends BaseShip {
    cargo: RawCargo[];
    flightPlanId?: string;
    id: string;
    location: string;
    spaceAvailable: number;
    x: number;
    y: number;
}

export interface RawCargo extends RawPartialCargo {
    totalVolume: number;
}

export type StructuresPayload =
FetchedStructure |
FetchedStructures |
StructureDeposit |
StructureWithdrawal;

export interface RawStructure {
    active: boolean;
    consumes: string[];
    id: string;
    inventory: RawPartialCargo[];
    location: string;
    ownedBy: {
        username: string;
    };
    produces: string[];
    status: string;
    type: string;
}

export interface FetchedStructure {
    structure: RawStructure;
} 

export interface FetchedStructures { 
    structures: RawStructure[];
} 

export interface StructureDeposit {
    deposit: RawPartialCargo;
    ship: RawShip;
    structure: RawStructure;
}

export interface StructureWithdrawal {
    ship: RawShip;
    structure: RawStructure;
    transfer: RawPartialCargo;
}

export interface RawPartialCargo {
    good: string;
    quantity: number;
}

export type SystemsPayload = 
RawSystem |
SystemShipListing |
SystemFlightPlans |
DockedShips |
SystemLocations;

export interface FetchedSystem {
    system: RawSystem;
}

export interface RawSystem {
    name: string;
    symbol: string;
}

export interface SystemShipListing {
    shipListings: SystemListedShip[];
}

export interface SystemListedShip {
    class: string;
    manufacturer: string;
    maxCargo: number;
    plating: number;
    purchaseLocations: {
        location: string;
        price: number;
        system: string;
    }[]
    speed: number;
    type: string;
    weapons: number;
}

export interface SystemFlightPlans {
    flightPlans: RawFlightPlan[];
}

export interface SystemLocations {
    locations: RawLocation[];
}

export interface SystemInfo {
    name: string;
    symbol: string;
}

export type TypesPayload =
AvailableGoods |
RawAvailableLoans |
AvailableStructures |
AvailableShips;

export interface AvailableGoods {
    goods: GoodInfo[];
}

export interface GoodInfo {
    name: string;
    symbol: string;
    volumePerUnit: number;
}

export interface AvailableStructures {
    structures: RawStructure[];
}

export interface AvailableShips {
    ships: BaseShip[];
}