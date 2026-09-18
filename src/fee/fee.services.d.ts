import { Fee } from './fee.entity.js';
import { EntityData } from '@mikro-orm/core';
export declare class DuplicateFeeError extends Error {
}
export declare function getAllFees(clientId?: number, period?: string): Promise<import("@mikro-orm/core").Loaded<Fee, "client", never, never>[]>;
export declare function getOneFee(id: number): Promise<import("@mikro-orm/core").Loaded<Fee, "client", never, never>>;
export declare function updateFee(id: number, data: EntityData<Fee>): Promise<Fee>;
export declare function generateFeeForClient(clientId: number, period: string): Promise<Fee>;
export declare function generateFeesForAllClients(period: string): Promise<{
    clientId: number;
    status: "created" | "skipped";
    reason?: string;
}[]>;
