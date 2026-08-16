var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Property, PrimaryKey, OneToMany } from "@mikro-orm/decorators/legacy";
import { Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
//import { Sport } from "../sport/sport.entity.js";
import { Inscription } from "../inscription/inscription.entity.js";
let Client = class Client extends BaseEntity {
    constructor() {
        super(...arguments);
        this.inscriptions = new Collection(this);
        /*@ManyToMany(() => Sport, (sport) => sport.clients)
        sports = new Collection<Sport>(this)*/
    }
};
__decorate([
    PrimaryKey({ type: 'number' })
], Client.prototype, "id", void 0);
__decorate([
    Property({ nullable: false })
], Client.prototype, "name", void 0);
__decorate([
    Property({ nullable: false })
], Client.prototype, "surname", void 0);
__decorate([
    Property({ nullable: false, unique: true })
], Client.prototype, "email", void 0);
__decorate([
    Property({ nullable: false, unique: true })
], Client.prototype, "doc", void 0);
__decorate([
    Property({ nullable: false, type: 'string' })
], Client.prototype, "type_doc", void 0);
__decorate([
    Property({ nullable: false })
], Client.prototype, "password", void 0);
__decorate([
    Property({ nullable: false })
], Client.prototype, "birth_date", void 0);
__decorate([
    Property({ nullable: false, type: 'string' })
], Client.prototype, "type_user", void 0);
__decorate([
    OneToMany(() => Inscription, (inscription) => inscription.client)
], Client.prototype, "inscriptions", void 0);
Client = __decorate([
    Entity()
], Client);
export { Client };
//# sourceMappingURL=clients.entity.js.map