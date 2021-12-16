import './app.css'
import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '../ui/Header'
import { SchedulePage } from '../ui/Schedule/SchedulePage'
import { AuditoryPage } from './Auditory/AuditoryPage'
import { GroupPage } from '../ui/Group/GroupPage'



export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Header/>

            <div className="container">
                <Routes>
                    <Route path="/Auditory" element={<AuditoryPage />} />
                    <Route path="/Group" element={<GroupPage />} />
                    <Route path="/Schedule" element={<SchedulePage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
