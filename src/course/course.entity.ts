import { Entity, PrimaryKey, Property, ManyToOne, OneToMany} from '@mikro-orm/decorators/legacy'
import { Collection } from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Sport } from '../sport/sport.entity.js'
//import { Inscripcion } from '../inscripcion/inscripcion.entity.js'

@Entity()
export class Course extends BaseEntity {
    @PrimaryKey()
    id!: number

    @Property()
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

    @ManyToOne(() => Sport, {nullable: false})
    sport!: Sport

    /*@OneToMany(() => Inscripcion, (inscripcion) => inscripcion.dictado)
    inscripciones = new Collection<Inscripcion>(this)*/
}