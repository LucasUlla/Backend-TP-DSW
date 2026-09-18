import { Course } from './course.entity.js';
import { RequiredEntityData, EntityData } from '@mikro-orm/core';
export declare function getAllCourses(sportId?: number): Promise<import("@mikro-orm/core").Loaded<Course, "sport", never, never>[]>;
export declare function getOneCourse(id: number): Promise<import("@mikro-orm/core").Loaded<Course, "sport" | "inscriptions", never, never>>;
export declare function addCourse(data: RequiredEntityData<Course>): Promise<Course>;
export declare function updateCourse(id: number, data: EntityData<Course>): Promise<import("@mikro-orm/core").Loaded<Course, never, never, never>>;
export declare function removeCourse(id: number): Promise<void>;
