import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

export const Header: React.FC = () => {

    return (
        <div className="header-outer">
            <div className="header container">
                <div className="header__title">
                    <span>Lab 3</span>
                </div>
                <div className="header__line" />
                <div className="header__links">
                    {/*<Link className="header__link" to="/Schedule">Schedule</Link>*/}
                    <Link className="header__link" to="/Auditory">Auditory</Link>
                    <Link className="header__link" to="/Group">Group</Link>
                </div>
            </div>
        </div>
    )
}