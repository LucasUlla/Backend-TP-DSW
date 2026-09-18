import { EntityData, RequiredEntityData } from '@mikro-orm/core';
import { Client } from './clients.entity.js';
export declare function getAllClients(filters?: {
    name?: string;
    doc?: string;
}): Promise<import("@mikro-orm/core").Loaded<Client, never, never, never>[]>;
export declare function getOneClient(id: number): Promise<import("@mikro-orm/core").Loaded<Client, "inscriptions", never, never>>;
export declare function addClient(data: RequiredEntityData<Client>): Promise<Client>;
export declare function updateClient(id: number, data: EntityData<Client>): Promise<import("@mikro-orm/core").Loaded<Client, never, never, never>>;
export declare function removeClient(id: number): Promise<void>;
