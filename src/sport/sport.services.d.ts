import { Sport } from './sport.entity.js';
import { RequiredEntityData, EntityData } from '@mikro-orm/core';
export declare function getAllSports(): Promise<import("@mikro-orm/core").Loaded<Sport, never, never, never>[]>;
export declare function getOneSport(id: number): Promise<import("@mikro-orm/core").Loaded<Sport, never, never, never>>;
export declare function addSport(data: RequiredEntityData<Sport>): Promise<Sport>;
export declare function updateSport(id: number, data: EntityData<Sport>): Promise<Sport>;
export declare function removeSport(id: number): Promise<void>;
