import { Entity, PrimaryKey, Property, ManyToOne, Unique } from '@mikro-orm/decorators/legacy'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Client } from '../client/clients.entity.js'

@Entity()
@Unique({ properties: ['client', 'period'] }) //El PAR no se puede repetir, es decir, un cliente no puede tener dos fees para el mismo periodo
export class Fee extends BaseEntity {
    @PrimaryKey()
    id!: number

    @ManyToOne(() => Client, { nullable: false, deleteRule: 'cascade' })
    client!: Client

    @Property()
    period!: string // formato "YYYY-MM"

    @Property()
    base_amount!: number

    @Property()
    courses_amount!: number

    @Property()
    total!: number

    @Property({ default: false })
    paid: boolean = false

    @Property({ onCreate: () => new Date() })
    generated_at: Date = new Date()
}