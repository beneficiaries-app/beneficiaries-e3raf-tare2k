import { useState } from "react"
import TermsAndConditionsModal from "./TermsAndConditions"

export default function RegisterForm() {
    const [acceptedTerms, setAcceptedTerms] = useState(false)
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[var(--primary-color)] text-center mb-6">
                نموذج التسجيل
            </h1>

            {/* Terms and Conditions Checkbox */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-1 w-5 h-5 text-[var(--primary-color)] border-gray-300 rounded focus:ring-[#06918C]"
                    />
                    <span className="text-sm text-gray-700 flex-1">
                        أوافق على{" "}
                        <button
                            type="button"
                            onClick={() => setIsTermsModalOpen(true)}
                            className="text-[var(--primary-color)] hover:underline font-semibold"
                        >
                            الشروط والأحكام
                        </button>
                        {" "}للمسابقة
                    </span>
                </label>
            </div>

            {/* Submit Button - Disabled if terms not accepted */}
            <div className="text-center">
                <button
                    type="submit"
                    disabled={!acceptedTerms}
                    className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                        acceptedTerms
                            ? "bg-[#06918C] text-white hover:bg-[#057a75] cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    تسجيل
                </button>
            </div>

            {!acceptedTerms && (
                <p className="text-sm text-red-600 text-center">
                    يجب الموافقة على الشروط والأحكام للمتابعة
                </p>
            )}

            {/* Terms and Conditions Modal */}
            <TermsAndConditionsModal 
                isOpen={isTermsModalOpen} 
                onClose={() => setIsTermsModalOpen(false)} 
            />
        </div>
    )
}