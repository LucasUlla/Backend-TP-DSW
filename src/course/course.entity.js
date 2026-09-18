var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryKey, Property, ManyToOne, OneToMany } from '@mikro-orm/decorators/legacy';
import { Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Sport } from '../sport/sport.entity.js';
import { Inscription } from '../inscription/inscription.entity.js';
let Course = class Course extends BaseEntity {
    constructor() {
        super(...arguments);
        this.inscriptions = new Collection(this);
    }
};
__decorate([
    PrimaryKey()
], Course.prototype, "id", void 0);
__decorate([
    Property({ unique: true })
], Course.prototype, "course_no", void 0);
__decorate([
    Property()
], Course.prototype, "sched", void 0);
__decorate([
    Property()
], Course.prototype, "professor", void 0);
__decorate([
    Property()
], Course.prototype, "start_date", void 0);
__decorate([
    Property()
], Course.prototype, "finish_date", void 0);
__decorate([
    Property()
], Course.prototype, "quota", void 0);
__decorate([
    ManyToOne(() => Sport, { nullable: false, deleteRule: 'cascade' })
], Course.prototype, "sport", void 0);
__decorate([
    OneToMany(() => Inscription, (inscription) => inscription.course)
], Course.prototype, "inscriptions", void 0);
Course = __decorate([
    Entity()
], Course);
export { Course };
//# sourceMappingURL=course.entity.js.map