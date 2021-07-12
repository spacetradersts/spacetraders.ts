export interface BaseFetchOptions {
    cache?: boolean;
    force?: boolean;
}

export interface FlightPlanFetchOptions extends BaseFetchOptions {
    flightPlanId: string;
}

export interface LoanFetchOptions extends BaseFetchOptions { 
    available?: boolean;
}

export interface LocationManagerFetchOptions extends BaseFetchOptions {
    locationSymbol: string;
}

export interface LocationFetchOptions extends BaseFetchOptions {
    ships?: boolean;
    marketplace?: boolean;
}

export interface ShipFetchOptions extends BaseFetchOptions {
    shipId?: string;
}

export interface StructureFetchOptions extends BaseFetchOptions {
    structureId?: string;
}

export interface SystemFetchOptions extends BaseFetchOptions {
    systemSymbol: string;
}