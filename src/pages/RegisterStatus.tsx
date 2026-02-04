import { useState } from "react"
import { RegisterStatus as RegisterStatusEnum, type RegisterStatusType } from "../enums/register-status.enum";

interface RegisterStatusProps {
    status?: RegisterStatusType;
}

export default function RegisterStatus({ status = RegisterStatusEnum.OPEN }: RegisterStatusProps) {

    const [registerStatus, setRegisterStatus] = useState<RegisterStatusType>(status);

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
            <div className="text-1xl font-semibold  text-[#06918C] text-center">
                {registerStatus === RegisterStatusEnum.CLOSED && (
                    <span>
                        موعدنا يوم السبت الموافق 7 رمضان 1447
                    </span>
                )}
                {registerStatus === RegisterStatusEnum.PENDING && (
                    <span>
                        بداية التسجيل يوم السبت الموافق 7 فبراير 2026
                    </span>
                )}
                {registerStatus === RegisterStatusEnum.OPEN && (
                    <span>
                        تسجيل متسابق جديد
                    </span>
                )}
            </div>
        </>
    )
}