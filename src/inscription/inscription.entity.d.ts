import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Course } from '../course/course.entity.js';
import { Client } from '../client/clients.entity.js';
export declare class Inscription extends BaseEntity {
    course: Course;
    client: Client;
    insc_date: Date;
}
