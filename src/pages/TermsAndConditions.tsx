interface TermsAndConditionsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TermsAndConditionsModal({ isOpen, onClose }: TermsAndConditionsModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b-2 border-[var(--secondary-color)]">
                    <h2 className="text-2xl font-bold text-[var(--primary-color)]">
                        الشروط والضوابط
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="إغلاق"
                    >
                        ×
                    </button>
                </div>

                {/* Modal Content */}
                <div className="overflow-y-auto flex-1 px-4 py-6">

                    {/* العنوان الرئيسي */}
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-[var(--primary-color)] mb-2">
                            إعلان مسابقة القرآن الكريم
                        </h2>
                        <p className="text-lg text-gray-600">
                            وتجويده وتفسيره وقراءاته وأدائه لشهر رمضان 1447 هـ بقرية بدواي
                        </p>
                    </div>

                    {/* مقدمة */}
                    <div className="bg-gray-50 border-r-4 border-[var(--secondary-color)] p-4 mb-6 rounded-lg">
                        <p className="text-right text-gray-700 leading-relaxed">
                            على غرار مسابقات الأزهر الشريف ووزارة الأوقاف يعلن <strong>نادي بدواي الثقافي</strong> عن إقامة
                            المسابقة الرمضانية السنوية لحفظ القرآن الكريم للسنة السابعة على التوالي بالتعاون مع
                            <strong> جمعية تنمية المجتمع المحلي ببدواي</strong>، وفقاً للمستويات والشروط الآتية:
                        </p>
                    </div>

                    {/* مستويات المسابقة */}
                    <section className="mb-8">
                        <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4 text-right">
                            أولاً: مستويات المسابقة
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-md">
                                <thead>
                                    <tr className="bg-[#06918C] text-white">
                                        <th className="border border-gray-300 p-2 text-center min-w-[100px]">المستوى</th>
                                        <th className="border border-gray-300 p-2 text-right min-w-[200px]">القدر المحفوظ</th>
                                        <th className="border border-gray-300 p-2 text-right min-w-[240px]">تفسير الجلالين</th>
                                        <th className="border border-gray-300 p-2 text-center min-w-[160px]">السن</th>
                                        <th className="border border-gray-300 p-2 text-right min-w-[240px]">ملاحظات</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    <tr className="bg-gray-50">
                                        <td className="border border-gray-300 p-2 text-center font-semibold">الأول</td>
                                        <td className="border border-gray-300 p-2 text-right">حفظ القرآن الكريم كاملاً بالقراءات العشر الصغرى أو بالسبع أو برواية غير رواية الإمام حفص</td>
                                        <td className="border border-gray-300 p-2 text-right">
                                            <b>التفسير:</b> من <b>الأعلى</b> إلى <b>الناس</b>

                                            <br />
                                            <br />

                                            <b>المتون</b> القراءات العشر:
                                            <br />
                                            <b>الشاطبية</b> و<b>الدرة</b>

                                            <br />
                                            <br />

                                            القراءات السبع: الشاطبية
                                            أي قراءة أو رواية: تحفة
                                            الأطفال، والجزرية، ومتن
                                            الشاطبية (586 : 1)

                                        </td>
                                        <td className="border border-gray-300 p-2 text-center">لا يزيد عن <b>40</b> سنة</td>
                                        <td className="border border-gray-300 p-2 text-right">
                                            القراءات العشر- السبع مفتوحة
                                            لمحافظة الدقهلية
                                            <br />
                                            <br />
                                            أي رواية غير اإلمام حفص: قرى الوحدة
                                            المحلية
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-2 text-center font-semibold">الثاني</td>
                                        <td className="border border-gray-300 p-2 text-right">
                                            حفظ القرآن الكريم كاملاً مع التجويد والصوت الحسن <b>(قرية التلاوة)</b>
                                        </td>
                                        <td className="border border-gray-300 p-2 text-right">
                                            <b>التفسير:</b> من <b>الأعلى</b> إلى <b>الناس</b>

                                            <br />
                                            <br />

                                            <b>المتون:</b> تحفة الأطفال،
                                            والجزرية
                                        </td>
                                        <td className="border border-gray-300 p-2 text-center">لا يزيد عن <b>40</b> سنة</td>
                                        <td className="border border-gray-300 p-2 text-right">مفتوحة لقرى الوحدة المحلية</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="border border-gray-300 p-2 text-center font-semibold">الثالث</td>
                                        <td className="border border-gray-300 p-2 text-right">حفظ القرآن الكريم كاملاً</td>
                                        <td className="border border-gray-300 p-2 text-right">
                                            <b>التفسير:</b> من <b>الأعلى</b> إلى <b>الناس</b>

                                            <br />
                                            <br />

                                            <b>المتن:</b> الجزرية
                                        </td>
                                        <td className="border border-gray-300 p-2 text-center">لا يزيد عن <b>21</b> سنة</td>
                                        <td className="border border-gray-300 p-2 text-right">قرية بدواي فقط</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-2 text-center font-semibold">الرابع</td>
                                        <td className="border border-gray-300 p-2 text-right">ثلاثة أرباع القرآن الكريم</td>
                                        <td className="border border-gray-300 p-2 text-right">
                                            <b>التفسير:</b> من <b>الشرح</b> إلى <b>الناس</b>

                                            <br />
                                            <br />

                                            <b>المتن:</b> تحفة الأطفال
                                        </td>
                                        <td className="border border-gray-300 p-2 text-center">لا يزيد عن <b>18</b> سنة</td>
                                        <td className="border border-gray-300 p-2 text-right">قرية بدواي فقط</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="border border-gray-300 p-2 text-center font-semibold">الخامس</td>
                                        <td className="border border-gray-300 p-2 text-right">نصف القرآن الكريم</td>
                                        <td className="border border-gray-300 p-2 text-right">
                                            <b>التفسير:</b> من <b>العاديات</b> إلى <b>الناس</b>

                                            <br />
                                            <br />

                                            <b>المتن:</b> تحفة الأطفال
                                        </td>
                                        <td className="border border-gray-300 p-2 text-center">لا يزيد عن <b>15</b> سنة</td>
                                        <td className="border border-gray-300 p-2 text-right">قرية بدواي فقط</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-2 text-center font-semibold">السادس</td>
                                        <td className="border border-gray-300 p-2 text-right">ربع القرآن الكريم</td>
                                        <td className="border border-gray-300 p-2 text-right">
                                            <b>المتن:</b> تحفة الأطفال
                                        </td>
                                        <td className="border border-gray-300 p-2 text-center">لا يزيد عن <b>12</b> سنة</td>
                                        <td className="border border-gray-300 p-2 text-right">قرية بدواي فقط</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="border border-gray-300 p-2 text-center font-semibold">السابع</td>
                                        <td className="border border-gray-300 p-2 text-right">خمسة أجزاء من القرآن الكريم</td>
                                        <td className="border border-gray-300 p-2 text-right">
                                            <b>المتن:</b> تحفة الأطفال
                                        </td>
                                        <td className="border border-gray-300 p-2 text-center">لا يزيد عن <b>10</b> سنة</td>
                                        <td className="border border-gray-300 p-2 text-right">قرية بدواي فقط</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-2 text-center font-semibold">الثامن</td>
                                        <td className="border border-gray-300 p-2 text-right">حفظ سورة الكهف وتفسيرها</td>
                                        <td className="border border-gray-300 p-2 text-right">تفسير الجلالين - وتفسير ابن كثير</td>
                                        <td className="border border-gray-300 p-2 text-center">من سن  <b>35</b> فما فوق</td>
                                        <td className="border border-gray-300 p-2 text-right">
                                            قرية بدواي - ويشترط أن لا يكون ذا صلة بمجال القرآن الكريم
                                            (مثل: الإمام - المدرس بالأزهر - مدرس اللغة العربية - طالب الأزهر)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* شروط المسابقة */}
                    <section className="mb-6">
                        <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4 text-right">
                            ثانياً: شروط المسابقة
                        </h3>

                        <div className="space-y-4 text-right text-gray-700 leading-relaxed">
                            <div className="border-r-4 border-[var(--secondary-color)] p-4 rounded-lg bg-gray-50">
                                <p className="mb-2">
                                    <strong className="text-[var(--secondary-color)] ml-1">1.</strong> 
                                    تقتصر مستويات المسابقة على قرية بدواي عدا المستويين <b>الأول</b> و<b>الثاني</b>، 
                                    فإتقان القراءات العشر والسبع مفتوحة لأبناء محافظة الدقهلية، وإتقان قراءة أو رواية غير حفص لأبناء قرى الوحدة المحلية، والمستوى الثاني لأبناء قرى الوحدة المحلية.
                                </p>
                            </div>

                            <div className="border-r-4 border-[var(--secondary-color)] p-4 rounded-lg bg-gray-50">
                                <p className="mb-2">
                                    <strong className="text-[var(--secondary-color)] ml-1">2.</strong> 
                                    لا يحق للمتسابق المشاركة في <b>مستويين</b>، ولا في <b>نفس المستوى</b> الذي شارك فيه العام السابق وفاز بأحد المراكز فيه، ويجوز له الاشتراك في المستوى الأعلى.
                                </p>
                            </div>

                            <div className="border-r-4 border-[var(--secondary-color)] p-4 rounded-lg bg-gray-50">
                                <p className="mb-2">
                                    <strong className="text-[var(--secondary-color)] ml-1">3.</strong>
                                    للمتقدم في مستوى حفظ القرآن بالقراءات المتواترة يشترط أن تكون رواية <b>غير رواية حفص عن عاصم</b>، وألا يكون قد اختبر في نفس الرواية في السنوات السابقة.
                                </p>
                            </div>

                            <div className="border-r-4 border-[var(--secondary-color)] p-4 rounded-lg bg-gray-50">
                                <p className="mb-2">
                                    <strong className="text-[var(--secondary-color)] ml-1">4.</strong>
                                    التقديم من خلال<b> ملء النموذج الإلكتروني</b> المرفق مع الإعلان، مع إمكانية التقديم يدويا في مقر جمعية تنمية المجتمع المحلي ببدواي بجوار مسجد الرحمة.
                                </p>
                            </div>

                            <div className="border-r-4 border-[var(--secondary-color)] p-4 rounded-lg bg-gray-50">
                                <p className="mb-2">
                                    <strong className="text-[var(--secondary-color)] ml-1">5.</strong> 
                                    يشترط ترتيب الأجزاء من <b>سورة الناس</b> فما فوق.
                                </p>
                            </div>

                            <div className="border-r-4 border-[var(--secondary-color)] p-4 rounded-lg bg-gray-50">
                                <p className="mb-2">
                                    <strong className="text-[var(--secondary-color)] ml-1">6.</strong> يجب على المتسابق الالتزام بالمواعيد المحددة للاختبارات.
                                </p>
                            </div>

                            <div className="border-r-4 border-[var(--secondary-color)] p-4 rounded-lg bg-gray-50">
                                <p className="mb-2">
                                    <strong className="text-[var(--secondary-color)] ml-1">7.</strong>
                                    تقدم جوائز قيمة للمتسابقين في شهر رمضان المبارك في موعد يعلن عنه لاحقا بإذن الله.
                                </p>
                            </div>

                            <div className="border-r-4 border-[var(--secondary-color)] p-4 rounded-lg bg-gray-50">
                                <p className="mb-2">
                                    <strong className="text-[var(--secondary-color)]">8.</strong> يجب على المتسابق قراءة وفهم جميع الشروط والضوابط قبل إتمام عملية التسجيل.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* تذييل */}
                    <div className="mt-8 text-center p-4 rounded-lg bg-gray-50">
                        <p className="text-lg font-semibold">
                            كل عام وأنتم بخير
                        </p>
                    </div>

                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t-2 border-[var(--secondary-color)] flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-[#06918C] text-white px-8 py-2 rounded-lg hover:bg-[#057a75] transition-colors font-semibold cursor-pointer"
                    >
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    )
}
