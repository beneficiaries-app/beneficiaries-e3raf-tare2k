import logo from '../assets/nady-logo.jpg'
import RegisterStatus from './pages/RegisterStatus'
import { RegisterStatus as RegisterStatusEnum } from './enums/register-status.enum';

function App() {
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
                    <h1 className="text-1xl font-bold text-gray-500 text-center mb-6">
                        مسابقة القرآن الكريم رمضان 1447
                    </h1>

                    <RegisterStatus status={RegisterStatusEnum.CLOSED} />
                </div>
            </div>
        </div>
    )
}

export default App
