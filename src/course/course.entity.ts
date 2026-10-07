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

    @Property({ type: 'json' })
    days!: string[]  // ej: ['Lunes', 'Miercoles']

    @Property()
    start_date!: Date

    @Property()
    finish_date!: Date

    @Property({ type: 'time' })
    start_time!: string  // 'HH:MM'

    @Property({ type: 'time' })
    end_time!: string

    @Property()
    professor!: string

    @Property()
    quota!: number

    @ManyToOne(() => Sport, {nullable: false, deleteRule: 'cascade'})
    sport!: Sport

    @OneToMany(() => Inscription, (inscription) => inscription.course)
    inscriptions = new Collection<Inscription>(this)

}