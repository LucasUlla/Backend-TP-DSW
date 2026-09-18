var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Sport } from '../sport/sport.entity.js';
let Price = class Price extends BaseEntity {
    constructor() {
        super(...arguments);
        this.modification_date = new Date();
    }
};
__decorate([
    PrimaryKey()
], Price.prototype, "id", void 0);
__decorate([
    Property()
], Price.prototype, "value", void 0);
__decorate([
    Property({ onCreate: () => new Date() })
], Price.prototype, "modification_date", void 0);
__decorate([
    ManyToOne(() => Sport, { nullable: false, deleteRule: 'cascade' }) // FK obligatoria, NO primary
], Price.prototype, "sport", void 0);
Price = __decorate([
    Entity()
], Price);
export { Price };
//# sourceMappingURL=price.entity.js.map