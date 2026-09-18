import { Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Sport } from '../sport/sport.entity.js';
import { Inscription } from '../inscription/inscription.entity.js';
export declare class Course extends BaseEntity {
    id: number;
    course_no: number;
    sched: string;
    professor: string;
    start_date: Date;
    finish_date: Date;
    quota: number;
    sport: Sport;
    inscriptions: Collection<Inscription, object>;
}
