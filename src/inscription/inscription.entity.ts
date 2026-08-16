import { Entity, Property, ManyToOne } from '@mikro-orm/decorators/legacy'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Course } from '../course/course.entity.js'
import { Client } from '../client/clients.entity.js'

@Entity()
export class Inscription extends BaseEntity {
    @ManyToOne(() => Course, { primary: true })
    course!: Course

    @ManyToOne(() => Client, { primary: true })
    client!: Client

    @Property({ onCreate: () => new Date() })
    insc_date: Date = new Date()
}