import {Entity, PrimaryKey, Property, ManyToMany, OneToMany} from '@mikro-orm/decorators/legacy'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Client } from '../client/clients.entity.js'
import { Collection } from '@mikro-orm/core'
import { Price } from '../price/price.entity.js'
import { Course } from '../course/course.entity.js'

@Entity()
export class Sport extends BaseEntity{
    @PrimaryKey({ type: 'number' })
    id!: number
    
    @Property({ nullable: false, unique: true })
    name!: string

    /*@ManyToMany(() => Client, (client) => client.sports, { owner: true })
    clients = new Collection<Client>(this)*/

    @OneToMany(() => Price, (price) => price.sport)
    prices = new Collection<Price>(this)

    @OneToMany(() => Course, (course) => course.sport)
    courses = new Collection<Course>(this)
}