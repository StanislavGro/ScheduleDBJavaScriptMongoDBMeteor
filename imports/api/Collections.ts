import { Mongo } from 'meteor/mongo';

export interface Schedule {
    _id?: Mongo.ObjectID
    day: string
    time: string
    week: number
    auditory: { _id: Mongo.ObjectID }
    group: { _id: Mongo.ObjectID }
}

export const ScheduleCollection = new Mongo.Collection<Schedule>('schedule', { idGeneration: 'MONGO' })

export interface Auditory {
    _id?: Mongo.ObjectID
    name: string
}

export const AuditoryCollection = new Mongo.Collection<Auditory>('auditory', { idGeneration: 'MONGO' })

export interface Group {
    _id?: Mongo.ObjectID
    name: string
}

export const GroupCollection = new Mongo.Collection<Group>('group', { idGeneration: 'MONGO' })
