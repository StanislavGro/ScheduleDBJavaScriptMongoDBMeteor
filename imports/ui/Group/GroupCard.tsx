import React, { useState } from 'react'
import { Mongo } from 'meteor/mongo'
import { Properties } from '../Properties'
import { GroupForm } from './GroupForm'
import { Group, GroupCollection } from '../../api/Collections'


interface Props {
    group: Group
}

export const GroupCard: React.FC<Props> = ({ group }) => {

    const [isEdit, setIsEdit] = useState(false)

    const onEdit = (newGroup: Group) => {
        GroupCollection.update(group._id ?? new Mongo.ObjectID(''), newGroup)
        setIsEdit(false)
    }

    const onDelete = () => {
        GroupCollection.remove(group._id ?? new Mongo.ObjectID(''))
    }

    return (
        <div className="card schedule-card">
            {isEdit ?
                <GroupForm group={group} onSubmit={onEdit} />
                :
                <div className="schedule-card__main">

                    <Properties title="Название:" value={group.name} />
                </div>
            }
            <div className="schedule-card__controls">
                <button className="button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? 'Закрыть' : 'Редактировать'}</button>
                <button className="button button_red" onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}