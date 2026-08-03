import { useState } from "react"
import { Link } from "react-router-dom"
import { RegisterStatus as RegisterStatusEnum, type RegisterStatusType } from "../enums/register-status.enum"
import bra3emLogo from "../../assets/bra3em-elhoda.jpeg"
import nadyLogo from "../../assets/nady-badaway.jpeg"
import workshopBg from "../../assets/workshop-bg.jpg"

interface RegisterStatusProps {
    status?: RegisterStatusType
}

export default function RegisterStatus({ status = RegisterStatusEnum.OPEN }: RegisterStatusProps) {
    const [registerStatus] = useState<RegisterStatusType>(status)

    return (
        <div className="relative min-h-svh text-white" dir="rtl" lang="ar">
            <div
                className="event-parallax-bg absolute inset-0"
                style={{ backgroundImage: `url(${workshopBg})` }}
                aria-hidden
            />
            <div className="absolute inset-0 bg-black/85" />

            <div className="relative z-10 max-w-md mx-auto px-6 py-16 text-center">
                <div className="flex items-center justify-center gap-5 mb-6">
                    <div className="org-logo-frame" style={{ width: 88, height: 88 }}>
                        <img src={bra3emLogo} alt="براعم الهدى" />
                    </div>
                    <span className="text-[#c4a035] text-xl font-black">×</span>
                    <div className="org-logo-frame" style={{ width: 88, height: 88, animationDelay: "0.7s, 0.7s" }}>
                        <img src={nadyLogo} alt="نادي شبان بدواي" />
                    </div>
                </div>

                <h1 className="text-3xl font-black mb-6">اعرف طريقك</h1>

                {registerStatus === RegisterStatusEnum.CLOSED && (
                    <>
                        <p className="text-xl font-bold text-red-400 mb-4">تم إغلاق التسجيل</p>
                        <p className="text-white/70 leading-relaxed mb-2">
                            شكرًا لاهتمامك بمبادرة اعرف طريقك
                        </p>
                        <p className="text-white/50 text-sm">
                            الجمعة · 8 أغسطس 2026 · الساعة 6 مساءً · نادي شبان بدواي
                        </p>
                    </>
                )}

                {registerStatus === RegisterStatusEnum.PENDING && (
                    <>
                        <p className="text-xl font-bold text-[#c4a035] mb-4">التسجيل لم يبدأ بعد</p>
                        <p className="text-white/50 text-sm">
                            الجمعة · 8 أغسطس 2026
                        </p>
                    </>
                )}

                {registerStatus === RegisterStatusEnum.OPEN && (
                    <>
                        <p className="text-xl font-bold text-[#1a6b4a] mb-3 bg-white/10 inline-block px-6 py-2">
                            تم التسجيل بنجاح
                        </p>
                        <p className="text-white/70 leading-relaxed mt-6 mb-8">
                            نتطلع لرؤيتك الجمعة 8 أغسطس 2026
                            <br />
                            الساعة 6 مساءً · نادي شبان بدواي
                        </p>
                        <div className="flex flex-col gap-3 items-center">
                            <Link
                                to="/register"
                                className="inline-flex bg-[#1a6b4a] text-white font-bold px-8 py-3 hover:bg-[#145539] transition-colors"
                            >
                                تسجيل مشارك جديد
                            </Link>
                            <Link
                                to="/"
                                className="text-sm text-white/50 hover:text-[#c4a035] transition-colors"
                            >
                                العودة للصفحة الرئيسية
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
