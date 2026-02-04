import { useState } from "react"
import { Link } from "react-router-dom"
import { RegisterStatus as RegisterStatusEnum, type RegisterStatusType } from "../enums/register-status.enum";
import TermsAndConditionsModal from "./TermsAndConditions";

interface RegisterStatusProps {
    status?: RegisterStatusType;
}

export default function RegisterStatus({ status = RegisterStatusEnum.OPEN }: RegisterStatusProps) {

    const [registerStatus] = useState<RegisterStatusType>(status);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

    return (
        <>
            {/* Registration Status */}
            {registerStatus === RegisterStatusEnum.CLOSED && (
                <div className="text-1xl font-semibold text-red-600 mb-4 text-center">
                    تم اغلاق التسجيل
                </div>
            )}
            {registerStatus === RegisterStatusEnum.OPEN && (
                <div className="text-1xl font-semibold text-red-600 mb-4 mt-4 text-center">
                    تم التسجيل بنجاح
                </div>
            )}

            {/* Separator Line */}
            <hr className="border-t border-gray-300 w-[95%] max-w mx-auto my-4" />

            {/* Competition Date */}
            <div className="text-1xl font-semibold  text-[var(--primary-color)] text-center">

                {registerStatus === RegisterStatusEnum.CLOSED && (
                    <span dangerouslySetInnerHTML={{ __html: import.meta.env.VITE_REGISTER_CLOSED_MSG }}>
                    </span>
                )}

                {registerStatus === RegisterStatusEnum.PENDING && (
                    <>
                        <span dangerouslySetInnerHTML={{ __html: import.meta.env.VITE_REGISTER_PENDING_MSG }}>
                        </span>

                        <br />
                        <br />
                        
                        <button 
                            onClick={() => setIsTermsModalOpen(true)}
                            className="text-[var(--secondary-color)] hover:underline cursor-pointer"
                        >
                            الشروط والأحكام
                        </button>
                    </>
                )}

                {registerStatus === RegisterStatusEnum.OPEN && (
                    <Link to="/register" className="hover:underline cursor-pointer">
                        تسجيل متسابق جديد
                    </Link>
                )}

            </div>

            {/* Terms and Conditions Modal */}
            <TermsAndConditionsModal 
                isOpen={isTermsModalOpen} 
                onClose={() => setIsTermsModalOpen(false)} 
            />
        </>
    )
}