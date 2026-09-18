import { Inscription } from './inscription.entity.js';
import { RequiredEntityData } from '@mikro-orm/core';
export declare function getAllInscriptions(courseId?: number, clientId?: number): Promise<import("@mikro-orm/core").Loaded<Inscription, "course" | "client", never, never>[]>;
export declare function getOneInscription(courseId: number, clientId: number): Promise<import("@mikro-orm/core").Loaded<Inscription, "course" | "client", never, never>>;
export declare function addInscription(data: RequiredEntityData<Inscription>): Promise<Inscription>;
export declare function removeInscription(courseId: number, clientId: number): Promise<void>;
