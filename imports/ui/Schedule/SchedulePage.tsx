import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { /*AuditoryCollection,*/ Schedule, ScheduleCollection, /*GroupCollection*/ } from '../../api/Collections';
import { ScheduleCard } from './ScheduleCard';
import { ScheduleForm } from './ScheduleForm';

export const SchedulePage: React.FC = () => {

    const [search, setSearch] = useState<{ [key: string]: any }>({})
    const schedules = useTracker(() => ScheduleCollection.find(search, { sort: { auditories: 1 } }).fetch())

    const [addFormShow, setAddFormShow] = useState(false)

    const onAddSubmit = (schedule: Schedule) => {
        ScheduleCollection.insert(schedule)
        setAddFormShow(false)
    }


    return (
        <div className="schedule-page">
            <div className="card1">
                <button className="button1" onClick={() => setAddFormShow(!addFormShow)}>{`${addFormShow ? 'Отмена' : 'Добавить новую запись'}`}</button>
                {addFormShow &&
                    <ScheduleForm onSubmit={onAddSubmit} />
                }
            </div>
            <div>
                {schedules.map(schedule => <ScheduleCard key={schedule._id?.toHexString()} schedule={schedule} />)}
            </div>
        </div>
    )
}