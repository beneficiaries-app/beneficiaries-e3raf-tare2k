import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import RegisterStatus from './pages/RegisterStatus'
import RegisterForm from './pages/RegisterForm'
import HomePage from './pages/HomePage'
import AdminDashboard from './pages/AdminDashboard'
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

function PublicGate({ registerStatus }: { registerStatus: RegisterStatusType }) {
    if (registerStatus === RegisterStatusEnum.PENDING) {
        return (
            <Routes>
                <Route path="/" element={<RegisterStatus status={RegisterStatusEnum.PENDING} />} />
                <Route path="/pending" element={<RegisterStatus status={RegisterStatusEnum.PENDING} />} />
                <Route path="*" element={<Navigate to="/pending" replace />} />
            </Routes>
        )
    }

    if (registerStatus === RegisterStatusEnum.CLOSED) {
        return (
            <Routes>
                <Route path="/" element={<RegisterStatus status={RegisterStatusEnum.CLOSED} />} />
                <Route path="/closed" element={<RegisterStatus status={RegisterStatusEnum.CLOSED} />} />
                <Route path="*" element={<Navigate to="/closed" replace />} />
            </Routes>
        )
    }

    return <OpenRoutes />
}

function App() {
    const [registerStatus] = useState<RegisterStatusType>(RegisterStatusEnum.OPEN)

    return (
        <BrowserRouter>
            <Routes>
                {/* مستقلة تمامًا — مش مربوطة بأي لينك في الموقع */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/*" element={<PublicGate registerStatus={registerStatus} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
