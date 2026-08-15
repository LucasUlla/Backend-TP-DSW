import { Entity, Property, ManyToMany, PrimaryKey} from "@mikro-orm/decorators/legacy";
import { Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Sport } from "../sport/sport.entity.js";

export type TipoDocumento = 'DNI' | 'Pasaporte' ;
export type TipoUsuario = 'Admin' | 'Socio' ;

@Entity()
export class Client extends BaseEntity{
    @PrimaryKey({ type: 'number' })
    id!: number

@Property({nullable: false })
    name!: string

    @Property({nullable: false })
    surname!: string

    @Property({nullable: false, unique: true })
    email!: string

    @Property({nullable: false, unique: true })
    doc!: string

    // union types no se infieren con reflect-metadata: hay que declarar el `type` a mano
    @Property({ nullable: false, type: 'string' })
    type_doc!: TipoDocumento

    @Property({ nullable: false })
    password!: string

    @Property({ nullable: false })
    birth_date!: Date

    @Property({ nullable: false, type: 'string' })
    type_user!: TipoUsuario

    /*@ManyToMany(() => Sport, (sport) => sport.clients)
    sports = new Collection<Sport>(this)*/
}
