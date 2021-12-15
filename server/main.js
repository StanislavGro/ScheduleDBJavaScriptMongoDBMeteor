import { Meteor } from 'meteor/meteor';
import { ScheduleCollection } from '../imports/api/Collections';
import { AuditoryCollection } from '../imports/api/Collections';
import { GroupCollection } from '../imports/api/Collections';


Meteor.startup(() => {
    if (Meteor.isServer) {
        console.log("Server", process.env.MONGO_URL)
    }



    ScheduleCollection.createIndex({ weeks: 1, day: 1, time: 1, auditory: 1 }, { unique: true })

    AuditoryCollection.createIndex({ name: 1 }, { unique: true })

    GroupCollection.createIndex({ name: 1 }, { unique: true })

});