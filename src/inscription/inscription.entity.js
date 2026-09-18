var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Course } from '../course/course.entity.js';
import { Client } from '../client/clients.entity.js';
let Inscription = class Inscription extends BaseEntity {
    constructor() {
        super(...arguments);
        this.insc_date = new Date();
    }
};
__decorate([
    ManyToOne(() => Course, { primary: true, deleteRule: 'cascade' })
], Inscription.prototype, "course", void 0);
__decorate([
    ManyToOne(() => Client, { primary: true, deleteRule: 'cascade' })
], Inscription.prototype, "client", void 0);
__decorate([
    Property({ onCreate: () => new Date() })
], Inscription.prototype, "insc_date", void 0);
Inscription = __decorate([
    Entity()
], Inscription);
export { Inscription };
//# sourceMappingURL=inscription.entity.js.map