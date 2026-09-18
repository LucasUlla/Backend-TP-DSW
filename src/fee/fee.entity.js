var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryKey, Property, ManyToOne, Unique } from '@mikro-orm/decorators/legacy';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Client } from '../client/clients.entity.js';
let Fee = class Fee extends BaseEntity {
    constructor() {
        super(...arguments);
        this.paid = false;
        this.generated_at = new Date();
    }
};
__decorate([
    PrimaryKey()
], Fee.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Client, { nullable: false, deleteRule: 'cascade' })
], Fee.prototype, "client", void 0);
__decorate([
    Property()
], Fee.prototype, "period", void 0);
__decorate([
    Property()
], Fee.prototype, "base_amount", void 0);
__decorate([
    Property()
], Fee.prototype, "courses_amount", void 0);
__decorate([
    Property()
], Fee.prototype, "total", void 0);
__decorate([
    Property({ default: false })
], Fee.prototype, "paid", void 0);
__decorate([
    Property({ onCreate: () => new Date() })
], Fee.prototype, "generated_at", void 0);
Fee = __decorate([
    Entity(),
    Unique({ properties: ['client', 'period'] }) //El PAR no se puede repetir, es decir, un cliente no puede tener dos fees para el mismo periodo
], Fee);
export { Fee };
//# sourceMappingURL=fee.entity.js.map