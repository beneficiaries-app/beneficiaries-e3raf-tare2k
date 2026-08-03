import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../components/Loader"
import bra3emLogo from "../../assets/bra3em-elhoda.jpeg"
import nadyLogo from "../../assets/nady-badaway.jpeg"
import workshopBg from "../../assets/workshop-bg.jpg"

const inputClass =
    "w-full px-4 py-3 bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#c4a035] focus:border-transparent"

const labelClass = "block text-sm font-bold text-white/70 mb-2 text-right"

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL as string | undefined

const roles = ["طالب", "ولي أمر", "معلم"] as const

export default function RegisterForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [role, setRole] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isSubmitting) return

        if (!SCRIPT_URL) {
            setError("رابط حفظ البيانات غير مضبوط. أضف VITE_GOOGLE_SHEETS_SCRIPT_URL في ملف .env")
            return
        }

        if (!role) {
            setError("من فضلك اختر: طالب أو ولي أمر أو معلم")
            return
        }

        const form = e.currentTarget
        const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim()
        const expectation = (form.elements.namedItem("expectation") as HTMLTextAreaElement).value.trim()

        setIsSubmitting(true)
        setError("")

        const body = new URLSearchParams({
            name,
            role,
            expectation,
        })

        try {
            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: body.toString(),
            })
            navigate("/submission")
        } catch {
            setError("حصل خطأ أثناء التسجيل. حاول مرة أخرى.")
            setIsSubmitting(false)
        }
    }

    return (
        <div className="relative min-h-svh text-white" dir="rtl" lang="ar">
            {isSubmitting && <Loader />}

            <div
                className="event-parallax-bg absolute inset-0"
                style={{ backgroundImage: `url(${workshopBg})` }}
                aria-hidden
            />
            <div className="absolute inset-0 bg-black/85" />

            <div className="relative z-10 max-w-md mx-auto px-6 py-10">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-5 mb-5">
                        <div className="org-logo-frame" style={{ width: 88, height: 88 }}>
                            <img src={bra3emLogo} alt="براعم الهدى" />
                        </div>
                        <span className="text-[#c4a035] text-xl font-black">×</span>
                        <div className="org-logo-frame" style={{ width: 88, height: 88, animationDelay: "0.7s, 0.7s" }}>
                            <img src={nadyLogo} alt="نادي شبان بدواي" />
                        </div>
                    </div>

                    <p className="text-[#c4a035] text-sm font-bold tracking-[0.25em] mb-3">
                        مبادرة
                    </p>
                    <h1 className="text-3xl md:text-4xl font-black mb-2">اعرف طريقك</h1>
                    <p className="text-white/60 text-sm font-bold mb-4">
                        تسجيل الحضور
                    </p>
                    <Link
                        to="/"
                        className="inline-block text-sm text-white/60 hover:text-[#c4a035] transition-colors"
                    >
                        ← العودة للصفحة الرئيسية
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className={labelClass}>
                            الاسم <span className="text-[#c4a035]">*</span>
                        </label>
                        <input
                            type="text"
                            className={inputClass}
                            name="name"
                            id="name"
                            placeholder="الاسم بالكامل"
                            required
                        />
                    </div>

                    <div>
                        <p className={labelClass}>
                            الفئة <span className="text-[#c4a035]">*</span>
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {roles.map((item) => {
                                const selected = role === item
                                return (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => {
                                            setRole(item)
                                            setError("")
                                        }}
                                        className={`py-3 px-2 text-sm font-bold transition-colors border ${
                                            selected
                                                ? "bg-[#1a6b4a] border-[#1a6b4a] text-white"
                                                : "bg-white/5 border-white/15 text-white/80 hover:border-[#c4a035]/60 hover:text-white"
                                        }`}
                                    >
                                        {item}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="expectation" className={labelClass}>
                            متوقع إيه من المبادرة؟ <span className="text-[#c4a035]">*</span>
                        </label>
                        <textarea
                            className={`${inputClass} resize-none`}
                            name="expectation"
                            id="expectation"
                            placeholder="اكتب توقعاتك من المبادرة"
                            rows={4}
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-center text-red-300 text-sm leading-relaxed bg-red-500/10 px-3 py-2">
                            {error}
                        </p>
                    )}

                    <div className="text-center pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`inline-flex items-center justify-center gap-2 px-12 py-3.5 font-bold text-lg transition-colors ${
                                !isSubmitting
                                    ? "bg-[#1a6b4a] text-white hover:bg-[#145539] cursor-pointer cta-pulse"
                                    : "bg-white/20 text-white/40 cursor-not-allowed"
                            }`}
                        >
                            تأكيد التسجيل
                        </button>
                    </div>
                </form>

                <p className="text-center text-white/35 text-sm mt-10">
                    الجمعة · 8 أغسطس 2026 · الساعة 6 مساءً · نادي شبان بدواي
                </p>
            </div>
        </div>
    )
}
