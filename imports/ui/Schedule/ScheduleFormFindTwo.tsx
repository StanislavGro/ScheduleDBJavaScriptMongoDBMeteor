import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Properties } from '../Properties'
import { ScheduleCollection, AuditoryCollection } from '../../api/Collections'
import { Mongo } from 'meteor/mongo'

import './scheduleFormFindTwo.css'

interface Props {
    week: number
    numberOfHours: number
    onSubmit: (week: number, numberOfHours: number) => void
}

export const ScheduleFormFindTwo: React.FC<Props> = ({ week, numberOfHours, onSubmit }) => {

    const schedulesFromDB = useTracker(() => ScheduleCollection.find({}).fetch())
    const auditoriesFromDB = useTracker(() => AuditoryCollection.find({}).fetch())

    const [week_, setWeek] = useState(week ?? 0)
    const [numberOfHours_, setNumberOfHours] = useState(numberOfHours ?? 0)


    const onClick = () => {

        if (document.getElementById("findInfo") != undefined) document.getElementById("findInfo")?.remove()

        var amountOfNecessaryLessons = Math.ceil((numberOfHours_ * 60) / 90)
        var amountOfMaxLessons = 42

        if (week_ >= 1 && week_ <= 18 && numberOfHours_ >= 1 && numberOfHours_ <= 63) {
            onSubmit(week_, numberOfHours_)

            var findInfo = document.createElement('findInfo')
            findInfo.id = "findInfo"
            findInfo.className = "property-title"
            findInfo.innerHTML = ""

            auditoriesFromDB.forEach(aud => {
                schedulesFromDB.forEach(sched => {
                    if (sched.auditory._id.equals(aud._id ?? new Mongo.ObjectID('')) && sched.week == week_)
                        amountOfMaxLessons--
                })
                if (amountOfMaxLessons < amountOfNecessaryLessons)
                    findInfo.innerHTML += aud.name + " аудитория не подойдет<br>"
                else
                    findInfo.innerHTML += aud.name + " аудитория подойдет<br>"

                amountOfMaxLessons = 42
            })

            document.getElementById("ScheduleFormFindTwo")?.append(findInfo)
        }
    }
    

    return (
        <div className="schedule-form" id="ScheduleFormFindTwo">
            <Properties title="Номер недели:" >
                <select defaultValue="defaultWeek" onChange={e => setWeek(Number.parseInt(e.target.value))}>
                    <option disabled value="defaultWeek">-</option>
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
            <Properties title="Количество часов (max. 63):">
                <input type="text" onChange={e => setNumberOfHours(Number.parseInt(e.target.value))} />
            </Properties>

            <Properties title="Будут выведены аудитории, занятые в заданную неделю" />

            <button className="button buttonGreen" onClick={onClick}>Ок</button>
        </div>
    )
}