import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

export const Header: React.FC = () => {

    return (
        <div className="header-outer">
            <div className="header container">
                <div className="header__links">
                    <Link className="header__link" to="/Schedule">Расписание</Link>
                    <Link className="header__link" to="/Auditory">Аудитории</Link>
                    <Link className="header__link" to="/Group">Группы</Link>
                </div>
            </div>
        </div>
    )
}