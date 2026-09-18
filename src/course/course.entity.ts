import { Entity, PrimaryKey, Property, ManyToOne, OneToMany} from '@mikro-orm/decorators/legacy'
import { Collection } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Sport } from '../sport/sport.entity.js'
import { Inscription } from '../inscription/inscription.entity.js'

@Entity()
export class Course extends BaseEntity {
    @PrimaryKey()
    id!: number

    @Property({unique: true})
    course_no!: number

    @Property()
    sched!: string

    @Property()
    professor!: string

    @Property()
    start_date!: Date

    @Property()
    finish_date!: Date

    @Property()
    quota!: number

    @ManyToOne(() => Sport, {nullable: false, deleteRule: 'cascade'})
    sport!: Sport

    @OneToMany(() => Inscription, (inscription) => inscription.course)
    inscriptions = new Collection<Inscription>(this)

}