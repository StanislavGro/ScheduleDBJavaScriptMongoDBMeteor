import React, { useState } from 'react'
import { Properties } from '../Properties'
import { Group } from '../../api/Collections'

interface Props {
    group?: Group
    onSubmit: (group: Group) => void
}

export const GroupForm: React.FC<Props> = ({ group, onSubmit }) => {

    const [name, setName] = useState(group?.name ?? '')

    const onClick = () => {
        if (name === '') return
        onSubmit({
            name,
        })
        setName('')
    }

    return (
        <div className="schedule-form">
            <Properties title="Новая группа:" value={<input type="text" value={name} onChange={e => setName(e.target.value)} />} />
            <button className="button button_green" onClick={onClick}>ОК</button>
        </div>
    )
}