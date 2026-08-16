import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Sport } from '../sport/sport.entity.js'

@Entity()
export class Price extends BaseEntity {
    @PrimaryKey()
    id!: number

    @Property()
    value!: number

    @Property({ onCreate: () => new Date() })
    modification_date: Date = new Date()

    @ManyToOne(() => Sport, { nullable: false, deleteRule: 'cascade' }) // FK obligatoria, NO primary
    sport!: Sport
}