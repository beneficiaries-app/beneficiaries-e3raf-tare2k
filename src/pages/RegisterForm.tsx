import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import TermsAndConditionsModal from "./TermsAndConditions"
import Loader from "../components/Loader"

export default function RegisterForm() {
    const [acceptedTerms, setAcceptedTerms] = useState(false)
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!acceptedTerms || isSubmitting) {
            return
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

                {/* Age Field */}
                <div>
                    <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
                        العمر <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="number"
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06918C] focus:border-transparent"
                        name="entry.1014855338"
                        id="age"
                        placeholder="العمر"
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