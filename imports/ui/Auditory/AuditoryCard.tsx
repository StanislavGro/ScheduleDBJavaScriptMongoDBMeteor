import React, { useState } from 'react'
import { Mongo } from 'meteor/mongo'
import { Auditory, AuditoryCollection } from '../../api/Collections'
import { Properties } from '../Properties'
import { AuditoryForm } from './AuditoryForm'


interface Props {
    auditory: Auditory
}

export const AuditoryCard: React.FC<Props> = ({ auditory }) => {

    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newAuditory: Auditory) => {
        AuditoryCollection.update(auditory._id ?? new Mongo.ObjectID(''), newAuditory)
        setIsEdit(false)
    }

    const onDelete = () => {
        AuditoryCollection.remove(auditory._id ?? new Mongo.ObjectID(''))
    }

    return (
        <div className="card schedule-card">
            {isEdit ?
                <AuditoryForm auditory={auditory} onSubmit={onEdit} />
                :
                <div className="schedule-card__main">

                    <Properties title="Аудитория:" value={auditory.name} />
                </div>
            }
            <div className="schedule-card__controls">
                <button className="button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Отмена' : 'Редактировать'}</button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}
