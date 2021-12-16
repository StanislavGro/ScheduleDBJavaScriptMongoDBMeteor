import React, { useState } from 'react'
import { AuditoryCollection, Schedule, ScheduleCollection, GroupCollection } from '../../api/Collections'
import './scheduleCard.css'
import { ScheduleForm } from './ScheduleForm'
import { Properties } from '../Properties'
import { useTracker } from 'meteor/react-meteor-data'
import { Mongo } from 'meteor/mongo'


interface Props {
    schedule: Schedule
}

export const ScheduleCard: React.FC<Props> = ({ schedule }) => {

    const auditoryFromDb = useTracker(() => AuditoryCollection.find({}).fetch())
    const groupFromDb = useTracker(() => GroupCollection.find({}).fetch())


    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newSchedule: Schedule) => {
        ScheduleCollection.update(schedule._id ?? new Mongo.ObjectID(''), newSchedule)
        setIsEdit(false)
    }

    const onDelete = () => {
        ScheduleCollection.remove(schedule._id ?? new Mongo.ObjectID(''))
    }

    return (
        <div className="card schedule-card">
            {isEdit ?
                <ScheduleForm schedule={schedule} onSubmit={onEdit} />
                :
                <div className="schedule-card__main">   
                    <Properties title="Номер недели:" value={schedule.week} />
                    <Properties title="День недели:" value={schedule.day} />
                    <Properties title="Промежуток времени:" value={schedule.time} />
                    <Properties title="Группа:" value={groupFromDb.find(g => g._id?.equals(schedule.group._id))?.name } />
                    <Properties title="Аудитория:" value={auditoryFromDb.find(a => a._id?.equals(schedule.auditory._id))?.name} />
                </div>
            }
            <div className="schedule-card__controls">
                <button className="button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Отмена' : 'Редактировать'}</button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}