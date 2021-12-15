import React, { ReactElement } from 'react'
import './Properties.css'

interface propert{
    title: string
    value?: string | number | ReactElement
    children?: ReactElement
}

export const Properties: React.FC<propert> = ({ title, value, children }) => (
    <div className="property">
        <span className="property__title">{title}</span>
        {children ?? <span className="property__value">{value}</span>}
    </div>
)