import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Collection } from '@mikro-orm/core';
import { Price } from '../price/price.entity.js';
import { Course } from '../course/course.entity.js';
export declare class Sport extends BaseEntity {
    id: number;
    name: string;
    prices: Collection<Price, object>;
    courses: Collection<Course, object>;
}
