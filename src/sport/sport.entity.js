var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Collection } from '@mikro-orm/core';
import { Price } from '../price/price.entity.js';
import { Course } from '../course/course.entity.js';
let Sport = class Sport extends BaseEntity {
    constructor() {
        super(...arguments);
        /*@ManyToMany(() => Client, (client) => client.sports, { owner: true })
        clients = new Collection<Client>(this)*/
        this.prices = new Collection(this);
        this.courses = new Collection(this);
    }
};
__decorate([
    PrimaryKey({ type: 'number' })
], Sport.prototype, "id", void 0);
__decorate([
    Property({ nullable: false, unique: true })
], Sport.prototype, "name", void 0);
__decorate([
    OneToMany(() => Price, (price) => price.sport)
], Sport.prototype, "prices", void 0);
__decorate([
    OneToMany(() => Course, (course) => course.sport)
], Sport.prototype, "courses", void 0);
Sport = __decorate([
    Entity()
], Sport);
export { Sport };
//# sourceMappingURL=sport.entity.js.map