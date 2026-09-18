import { Price } from './price.entity.js';
import { RequiredEntityData } from '@mikro-orm/core';
export declare function getAllPrices(sportId?: number): Promise<import("@mikro-orm/core").Loaded<Price, "sport", never, never>[]>;
export declare function getOnePrice(id: number): Promise<import("@mikro-orm/core").Loaded<Price, "sport", never, never>>;
export declare function addPrice(data: RequiredEntityData<Price>): Promise<Price>;
