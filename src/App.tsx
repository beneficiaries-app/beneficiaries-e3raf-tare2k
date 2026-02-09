import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import logo from '../assets/nady-logo.jpg'
import RegisterStatus from './pages/RegisterStatus'
import RegisterForm from './pages/RegisterForm'
import { RegisterStatus as RegisterStatusEnum, type RegisterStatusType } from './enums/register-status.enum';
import { useState } from 'react';

function App() {

    const [registerStatus] = useState<RegisterStatusType>(RegisterStatusEnum.OPEN);

    return (
        <div className="min-h-screen bg-[#f8f8f8] flex justify-center px-6 py-6">
            <div className="md:w-[40%] mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 px-4 py-10 text-center mx-auto">
                    {/* Logo */}
                    <div className="mb-3 flex justify-center">
                        <img
                            src={logo}
                            alt="شعار النادي"
                            className="max-w-[150px] h-auto object-contain"
                        />
                    </div>

                    {/* Competition Title */}
                    <h1 className="text-1xl font-bold text-gray-500 text-center mb-6" dangerouslySetInnerHTML={{ __html: import.meta.env.VITE_REGISTER_HEADER_TITLE }}>
                    </h1>

                    <BrowserRouter>
                        <Routes>

                            {registerStatus === RegisterStatusEnum.PENDING && (
                                <>
                                    <Route path="/" element={<RegisterStatus status={RegisterStatusEnum.PENDING} />} />
                                    <Route path="/pending" element={<RegisterStatus status={RegisterStatusEnum.PENDING} />} />
                                    <Route path="*" element={<Navigate to="/pending" replace />} />
                                </>
                            )}

                            {registerStatus === RegisterStatusEnum.OPEN && (
                                <>
                                    <Route path="/" element={<RegisterForm />} />
                                    <Route path="/register" element={<RegisterForm />} />
                                    <Route path="/submission" element={<RegisterStatus status={RegisterStatusEnum.OPEN} />} />
                                    <Route path="*" element={<Navigate to="/register" replace />} />
                                </>
                            )}

                            {registerStatus === RegisterStatusEnum.CLOSED && (
                                <>
                                    <Route path="/" element={<RegisterStatus status={RegisterStatusEnum.CLOSED} />} />
                                    <Route path="/closed" element={<RegisterStatus status={RegisterStatusEnum.CLOSED} />} />
                                    <Route path="*" element={<Navigate to="/closed" replace />} />
                                </>
                            )}

                        </Routes>
                    </BrowserRouter>

                </div>
            </div>
        </div>
    )
}

export default App
