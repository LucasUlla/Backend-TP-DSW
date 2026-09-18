import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Client } from '../client/clients.entity.js';
export declare class Fee extends BaseEntity {
    id: number;
    client: Client;
    period: string;
    base_amount: number;
    courses_amount: number;
    total: number;
    paid: boolean;
    generated_at: Date;
}
