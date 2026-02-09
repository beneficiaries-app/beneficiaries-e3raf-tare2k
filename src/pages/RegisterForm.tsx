import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import DatePicker, { registerLocale } from "react-datepicker"
import { ar } from "date-fns/locale/ar"
import "react-datepicker/dist/react-datepicker.css"
import TermsAndConditionsModal from "./TermsAndConditions"
import Loader from "../components/Loader"

registerLocale("ar", ar)

export default function RegisterForm() {
    const [acceptedTerms, setAcceptedTerms] = useState(false)
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [birthDate, setBirthDate] = useState<Date | null>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const navigate = useNavigate()

    const formatDateToISO = (date: Date | null): string => {
        if (!date) return ""
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!acceptedTerms || isSubmitting) {
            return
        }
        
        // تحويل تاريخ الميلاد إلى الصيغة المطلوبة (YYYY-MM-DD)
        if (birthDate && formRef.current) {
            const hiddenDateInput = formRef.current.querySelector('#birthDateHidden') as HTMLInputElement
            if (hiddenDateInput) {
                hiddenDateInput.value = formatDateToISO(birthDate)
            }
        }
        
        setIsSubmitting(true)
        setSubmitted(true)
        if (formRef.current) {
            formRef.current.submit()
        }
    }

    const handleIframeLoad = () => {
        if (submitted && iframeRef.current) {
            navigate('/submission')
        }
    }

    return (
        <div className="space-y-4 relative">
            {/* Full Page Loader Overlay */}
            {isSubmitting && (
                <Loader />
            )}

            {/* Separator Line */}
            <hr className="border-t border-gray-300 w-[95%] max-w mx-auto my-4" />

            {/* Hidden iframe for form submission */}
            <iframe
                ref={iframeRef}
                name="hiddenConfirm"
                id="hiddenConfirm"
                style={{ display: 'none' }}
                onLoad={handleIframeLoad}
            />

            <form
                ref={formRef}
                action="https://docs.google.com/forms/d/e/1FAIpQLSfsRYlAKSzSQIv0tcXNTOr6p76J3D8IY4ofLY2CP2tirlEpSg/formResponse"
                method="post"
                target="hiddenConfirm"
                onSubmit={handleSubmit}
                className="space-y-4 text-right"
                lang="ar"
                dir="rtl"
            >
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        اسم المتسابق <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06918C]"
                        name="entry.929859737"
                        id="name"
                        placeholder="اسم المتسابق رباعي"
                        required
                    />
                </div>

                {/* Date of Birth Field */}
                <div>
                    <label htmlFor="birthDate" className="block text-sm font-semibold text-gray-700 mb-2">
                        تاريخ الميلاد <span className="text-red-600">*</span>
                    </label>
                    <div className="w-full">
                        <DatePicker
                            selected={birthDate}
                            onChange={(date: Date | null) => setBirthDate(date)}
                            locale="ar"
                            dateFormat="dd/MM/yyyy"
                            placeholderText="اختر تاريخ الميلاد"
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06918C] focus:border-transparent"
                            wrapperClassName="w-full"
                            onKeyDown={(e) => {
                                // منع الكتابة - السماح فقط بمفاتيح التحكم والتنقل
                                if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && e.key !== 'Tab' && e.key !== 'Enter') {
                                    e.preventDefault()
                                }
                            }}
                            onChangeRaw={(e) => {
                                // منع التعديل المباشر في الحقل
                                if (e) {
                                    e.preventDefault()
                                }
                            }}
                            required
                            maxDate={new Date()}
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                            yearDropdownItemNumber={100}
                            scrollableYearDropdown
                        />
                    </div>
                    <input
                        type="hidden"
                        name="entry.1014855338"
                        id="birthDateHidden"
                    />
                </div>

                {/* Phone Field */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        رقم الهاتف <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="number"
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06918C] focus:border-transparent"
                        name="entry.1943207684"
                        id="phone"
                        placeholder="0123456789"
                        min="10"
                        required
                    />
                </div>

                {/* Address Field */}
                <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                        العنوان <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06918C] focus:border-transparent"
                        name="entry.800027578"
                        id="address"
                        placeholder="العنوان"
                        required
                    />
                </div>


                {/* Mohfez (Memorization Teacher) Field */}
                <div>
                    <label htmlFor="mohfez" className="block text-sm font-semibold text-gray-700 mb-2">
                        اسم المحفظ <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06918C] focus:border-transparent"
                        name="entry.1435194035"
                        id="mohfez"
                        placeholder="اسم المحفظ"
                        required
                    />
                </div>
                
                {/* Level Selection */}
                <div className="level-element">
                    <label htmlFor="level" className="block text-sm font-semibold text-gray-700 mb-2">
                        اختر المستوى <span className="text-red-600">*</span>
                    </label>
                    <select
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06918C] focus:border-transparent bg-white"
                        name="entry.1686949628"
                        id="level"
                        required
                    >
                        <option value="القرآن الكريم كاملا">القرآن الكريم كاملا</option>
                        <option value="ثلاثة أرباع القرآن الكريم">ثلاثة أرباع القرآن الكريم</option>
                        <option value="نصف القرآن الكريم">نصف القرآن الكريم</option>
                        <option value="ربع القرآن الكريم">ربع القرآن الكريم</option>
                        <option value="ثلاثة أجزاء من القرآن الكريم">ثلاثة أجزاء من القرآن الكريم</option>
                    </select>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="w-5 h-5 text-[var(--primary-color)] border-gray-300 rounded focus:ring-[#06918C]"
                            required
                        />
                        <span className="text-sm text-gray-700 flex-1 font-semibold">
                            أوافق على{" "}
                            <button
                                type="button"
                                onClick={() => setIsTermsModalOpen(true)}
                                className="text-[var(--secondary-color)] hover:underline"
                            >
                                الشروط والضوابط
                            </button>
                            {" "}للمسابقة
                        </span>
                    </label>
                </div>

                {!acceptedTerms && (
                    <p className="text-sm text-red-600 text-center">
                        يجب الموافقة على الشروط والضوابط للمتابعة
                    </p>
                )}

                {/* Submit Button */}
                <div className="text-center pt-2">
                    <button
                        type="submit"
                        disabled={!acceptedTerms || isSubmitting}
                        className={`px-10 py-3 rounded-lg font-semibold transition-colors ${acceptedTerms && !isSubmitting
                                ? "bg-[#06918C] text-white hover:bg-[#057a75] cursor-pointer"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        تسجيل
                    </button>
                </div>
            </form>

            {/* Terms and Conditions Modal */}
            <TermsAndConditionsModal
                isOpen={isTermsModalOpen}
                onClose={() => setIsTermsModalOpen(false)}
            />
        </div>
    )
}