import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import RegisterStatus from './pages/RegisterStatus'
import RegisterForm from './pages/RegisterForm'
import HomePage from './pages/HomePage'
import { RegisterStatus as RegisterStatusEnum, type RegisterStatusType } from './enums/register-status.enum'
import { useState } from 'react'

function OpenRoutes() {
    const location = useLocation()
    const isHome = location.pathname === '/'

    if (isHome) {
        return <HomePage />
    }

    return (
        <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/submission" element={<RegisterStatus status={RegisterStatusEnum.OPEN} />} />
            <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
    )
}

function App() {
    const [registerStatus] = useState<RegisterStatusType>(RegisterStatusEnum.OPEN)

    return (
        <BrowserRouter>
            {registerStatus === RegisterStatusEnum.PENDING && (
                <Routes>
                    <Route path="/" element={<RegisterStatus status={RegisterStatusEnum.PENDING} />} />
                    <Route path="/pending" element={<RegisterStatus status={RegisterStatusEnum.PENDING} />} />
                    <Route path="*" element={<Navigate to="/pending" replace />} />
                </Routes>
            )}

            {registerStatus === RegisterStatusEnum.OPEN && <OpenRoutes />}

            {registerStatus === RegisterStatusEnum.CLOSED && (
                <Routes>
                    <Route path="/" element={<RegisterStatus status={RegisterStatusEnum.CLOSED} />} />
                    <Route path="/closed" element={<RegisterStatus status={RegisterStatusEnum.CLOSED} />} />
                    <Route path="*" element={<Navigate to="/closed" replace />} />
                </Routes>
            )}
        </BrowserRouter>
    )
}

export default App
