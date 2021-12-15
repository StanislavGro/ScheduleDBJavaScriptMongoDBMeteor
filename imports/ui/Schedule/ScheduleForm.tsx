import { Mongo } from 'meteor/mongo'
import { useTracker } from 'meteor/react-meteor-data'
import React, { useState } from 'react'
import { AuditoryCollection, Schedule, GroupCollection } from '../../api/Collections'
import { Properties } from '../Properties'

import './scheduleForm.css'

interface Props {
    schedule?: Schedule
    onSubmit: (schedule: Schedule) => void
}

export const ScheduleForm: React.FC<Props> = ({ schedule, onSubmit }) => {

    const auditoryFromDb = useTracker(() => AuditoryCollection.find({}).fetch())
    const groupFromDb = useTracker(() => GroupCollection.find({}).fetch())

    const [day, setDay] = useState(schedule?.day ?? '')
    const [time, setTime] = useState(schedule?.time ?? '')
    const [week, setWeek] = useState(schedule?.week ?? 0)
    const [auditory, setAuditory] = useState(schedule?.auditory._id.toHexString() ?? '')
    const [group, setGroup] = useState(schedule?.group._id.toHexString() ?? '')


    const onClick = () => {
        if (day === '' || time === '' || week === 0 || auditory === '' || group === '') return
        onSubmit({
            day,
            time,
            week: week ?? 0,
            auditory: { _id: new Mongo.ObjectID(auditory) },
            group: { _id: new Mongo.ObjectID(group) }
        })
        setDay('')
        setTime('')
        setWeek(0)
        setAuditory('')
        setGroup('')
    }
    

    return (
        <div className="schedule-form">
            <Properties title="Недели:" >
                {/*    value={<input type="text" value={week} onChange={e => setWeek(Number.parseInt(e.target.value))} />}*/}
                <select onChange={e => setWeek(Number.parseInt(e.target.value))}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                </select>
            </Properties>
            <Properties title="День:">
                {/*value={<input type="text" value={day} onChange={e => setDay(e.target.value)} />}*/}
                <select value={day} onChange={e => setDay(e.target.value)} >
                    <option value="Понедельник">Понедельник</option>
                    <option value="Вторник">Вторник</option>
                    <option value="Среда">Среда</option>
                    <option value="Четверг">Четверг</option>
                    <option value="Пятница">Пятница</option>
                    <option value="Суббота">Суббота</option>
                </select>
            </Properties>
            <Properties title="Время:" >
                <select defaultValue="8:30-10:00" onChange={e => setTime(e.target.value)}>
                    <option value="8:30-10:00">8:30-10:00</option>
                    <option value="10:15-11:45">10:15-11:45</option>
                    <option value="12:00-13:30">12:00-13:30</option>
                    <option value="14:00-15:30">14:00-15:30</option>
                    <option value="15:45-17:15">15:45-17:15</option>
                    <option value="17:30-19:00">17:30-19:00</option>
                    <option value="19:15-20:45">19:15-20:45</option>
                </select>
            </Properties>
            <Properties title="Группа:">
                <select value={group} onChange={e => setGroup(e.target.value)}>
                    {
                        groupFromDb.map(a =>
                            <option key={a._id?.toHexString()} value={a._id?.toHexString()}>
                                {
                                    a.name
                                }
                            </option>)
                    }
                </select>
            </Properties>
            <Properties title="Аудитория:" value={
                <select value={auditory} onChange={e => setAuditory(e.target.value)}>
                    {
                        auditoryFromDb.map(a =>
                            <option key={a._id?.toHexString()} value={a._id?.toHexString()}>
                                {
                                    a.name
                                }
                            </option>)
                    }
                </select>
            } />
            <button className="button button_green" onClick={onClick}>Ок</button>
        </div>
    )
}