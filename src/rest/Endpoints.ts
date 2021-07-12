export const BASE_URL = `https://api.spacetraders.io`;

export const GAME_STATUS = '/game/status';
export const USER_ACCESS = (username: string) => `/users/${username}`;
export const ACCOUNT_INFO = `/my/account`;
export const USER_CLAIM = (username: string) => `/users/${username}/claim`;

export const FLIGHT_PLANS = `/my/flight-plans`;
export const FLIGHT_PLAN = (flightPlanId: string) => `/my/flight-plans/${flightPlanId}`;
export const WARP_JUMP = `/my/warp-jumps`;

export const LEADERBOARD = `/game/leaderboard/net-worth`;

export const LOANS = `/my/loans`;
export const LOAN = (loanId: string) => `/my/loans/${loanId}`;

export const LOCATION = (locationSymbol: string) => `/my/locations/${locationSymbol}`;
export const LOCATION_MARKETPLACE = (locationSymbol: string) => `/my/locations/${locationSymbol}/marketplace`;
export const LOCATION_SHIPS = (locationSymbol: string) => `/my/locations/${locationSymbol}/ships`;

export const PURCHASE_ORDERS = `/my/purchase-orders`;
export const SELL_ORDERS = `/my/sell-orders`;

export const SHIPS = `/my/ships`;
export const SHIP = (shipId: string) => `/my/ships/${shipId}`;
export const SHIP_JETTISON = (shipId: string) => `/my/ships/${shipId}/jettison`;
export const SHIP_TRANSFER = (shipId: string) => `/my/ships/${shipId}/transfer`;

export const STRUCTURES = `/my/structures`;
export const STRUCTURE = (structureId: string) => `/my/structures/${structureId}`;
export const STRUCTURE_DEPOSIT = (structureId: string) => `/my/structures/${structureId}/deposit`;
export const STRUCTURE_WITHDRAW = (structureId: string) => `/my/structures/${structureId}/transfer`;

export const SYSTEM = (systemSymbol: string) => `/my/systems/${systemSymbol}`;
export const SYSTEM_SHIPS = (systemSymbol: string) => `/systems/${systemSymbol}/ship-listings`;
export const SYSTEM_FLIGHTPLANS = (systemSymbol: string) => `/systems/${systemSymbol}/flight-plans`;
export const SYSTEM_DOCKED_SHIPS = (systemSymbol: string) => `/systems/${systemSymbol}/ships`;
export const SYSTEM_LOCATIONS = (systemSymbol: string) => `/systems/${systemSymbol}/locations`;

export const AVAILABLE_GOODS = `/types/goods`;
export const AVAILABLE_LOANS = `/types/loans`;
export const AVAILABLE_STRUCTURES = `/types/structures`;
export const AVAILABLE_SHIPS = `/types/ships`;