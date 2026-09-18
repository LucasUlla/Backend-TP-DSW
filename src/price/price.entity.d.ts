import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Sport } from '../sport/sport.entity.js';
export declare class Price extends BaseEntity {
    id: number;
    value: number;
    modification_date: Date;
    sport: Sport;
}
