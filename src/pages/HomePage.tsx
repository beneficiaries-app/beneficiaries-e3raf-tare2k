import { Link } from "react-router-dom"
import bra3emLogo from "../../assets/bra3em-elhoda.jpeg"
import nadyLogo from "../../assets/nady-badaway.jpeg"
import workshopBg from "../../assets/workshop-bg.jpg"
import heroBg from "../../assets/hero-bg.jpg"
import { useEffect, useRef, type ReactNode, type SVGProps } from "react"

const painPoints = [
    { text: "النتيجة مجتش زي ما كنت متوقع.", Icon: IconFrown },
    { text: "مش عارف الكلية المناسبة ليك.", Icon: IconHelp },
    { text: "الطريق بقى مش واضح.", Icon: IconFog },
    { text: "خايف من قرار يأثر علي مستقبلك سنين.", Icon: IconAlert },
]

const outcomes = [
    { text: "تستقبل نتيجتك بهدوء… من غير إحباط ولا ضغط.", Icon: IconHeart },
    { text: "تعرف الكلية اللي تناسب رغبتك وقدراتك.", Icon: IconGraduation },
    { text: "تتعلم مهارات هتفيدك في الجامعة وسوق العمل.", Icon: IconSkills },
    { text: "تفهم نظام البكالوريا الجديد بوضوح.", Icon: IconBook },
]

function IconBase({ children, ...props }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            {...props}
        >
            {children}
        </svg>
    )
}

function IconFrown(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <circle cx="12" cy="12" r="10" />
            <path d="M8 15c1.2-1 2.6-1.5 4-1.5s2.8.5 4 1.5" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
        </IconBase>
    )
}

function IconHelp(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <circle cx="12" cy="12" r="10" />
            <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </IconBase>
    )
}

function IconAlert(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </IconBase>
    )
}

function IconFog(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8M7 15h10M9 9h6" />
        </IconBase>
    )
}

function IconHeart(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1l1.7 1.7L12 21.3l7.1-7.1 1.7-1.7a5 5 0 0 0 0-7z" />
        </IconBase>
    )
}

function IconGraduation(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <path d="M22 10 12 5 2 10l10 5 10-5z" />
            <path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5" />
            <line x1="22" y1="10" x2="22" y2="16" />
        </IconBase>
    )
}

function IconSkills(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.8 3.8z" />
        </IconBase>
    )
}

function IconBook(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </IconBase>
    )
}

function IconCalendar(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </IconBase>
    )
}

function IconClock(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </IconBase>
    )
}

function IconMapPin(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </IconBase>
    )
}

function IconUsers(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.9" />
            <path d="M16 3.1a4 4 0 0 1 0 7.8" />
        </IconBase>
    )
}

function IconFlower(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
        </IconBase>
    )
}

function IconAward(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <circle cx="12" cy="8" r="6" />
            <path d="M8.2 13.5 7 22l5-3 5 3-1.2-8.5" />
        </IconBase>
    )
}

function IconCheck(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <path d="M20 6 9 17l-5-5" />
        </IconBase>
    )
}

function Reveal({
    children,
    className = "",
    delay = 0,
}: {
    children: ReactNode
    className?: string
    delay?: number
}) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("is-visible")
                    observer.unobserve(el)
                }
            },
            { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const delayClass =
        delay === 1 ? "reveal-delay-1"
            : delay === 2 ? "reveal-delay-2"
                : delay === 3 ? "reveal-delay-3"
                    : delay === 4 ? "reveal-delay-4"
                        : ""

    return (
        <div ref={ref} className={`reveal ${delayClass} ${className}`}>
            {children}
        </div>
    )
}

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#faf8f4] text-[#1a2332]" dir="rtl" lang="ar">
            {/* ===== HERO ===== */}
            <header className="relative min-h-svh flex items-center px-6 py-16 text-white">
                <div
                    className="event-parallax-bg absolute inset-0"
                    style={{ backgroundImage: `url(${heroBg})` }}
                    aria-hidden
                />
                <div className="absolute inset-0 bg-black/85" />

                <div className="relative z-10 max-w-lg mx-auto w-full text-center">
                    <h1 className="animate-fade-up text-5xl md:text-6xl font-black leading-[1.1] mb-6">
                        اعرف طريقك
                    </h1>

                    <p className="animate-fade-up-delay-1 text-white/80 text-xl font-medium leading-relaxed mb-10 max-w-xs mx-auto">
                        في فرق بين إنك تختار كلية…
                        <span className="block mt-1 text-[#c4a035] font-bold">وإنك تختار مستقبلك.</span>
                    </p>

                    <div className="animate-fade-up-delay-2">
                        <Link
                            to="/register"
                            className="cta-pulse inline-flex items-center gap-2 bg-[#1a6b4a] text-white font-bold text-lg px-11 py-3.5 hover:bg-[#145539] transition-colors"
                        >
                            <IconCheck className="w-6 h-6" />
                            سجّل الآن
                        </Link>
                    </div>
                </div>
            </header>

            {/* ===== PAIN ===== */}
            <section className="relative px-6 py-10 md:py-20 bg-[#1a2332] text-white overflow-hidden">
                <div className="pain-orb pain-orb-1" aria-hidden />
                <div className="pain-orb pain-orb-2" aria-hidden />
                <div className="pain-orb pain-orb-3" aria-hidden />

                <div className="relative z-10 max-w-sm mx-auto">
                    <ul className="space-y-8">
                        {painPoints.map(({ text, Icon }, i) => (
                            <Reveal key={text} delay={i + 1}>
                                <li className="flex items-center gap-4 text-lg leading-snug text-white/90 font-medium">
                                    <Icon
                                        className="w-7 h-7 shrink-0 text-[#c4a035] icon-soft-bob"
                                        style={{ animationDelay: `${i * 0.35}s` }}
                                    />
                                    <span>{text}</span>
                                </li>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ===== OUTCOMES ===== */}
            <section className="px-6 py-10 md:py-20">
                <div className="max-w-sm mx-auto">
                    <Reveal>
                        <h2 className="text-2xl md:text-3xl font-black text-[#1a2332] mb-10 text-center">
                            هتخرج بإيه؟
                        </h2>
                    </Reveal>

                    <ul className="space-y-8">
                        {outcomes.map(({ text, Icon }, i) => (
                            <Reveal key={text} delay={i + 1}>
                                <li className="flex gap-4 items-center">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#1a6b4a] text-white icon-soft-bob"
                                        style={{ animationDelay: `${i * 0.35}s` }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <p className="text-lg leading-snug text-[#1a2332] font-medium">
                                        {text}
                                    </p>
                                </li>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ===== EVENT DETAILS ===== */}
            <section className="relative px-6 py-16 text-white">
                {/* Fixed parallax background */}
                <div
                    className="event-parallax-bg absolute inset-0"
                    style={{ backgroundImage: `url(${workshopBg})` }}
                    aria-hidden
                />
                <div className="absolute inset-0 bg-black/90" />

                <div className="relative z-10 max-w-sm mx-auto w-full">
                    <h2 className="text-2xl md:text-3xl font-black text-center mb-8">
                        موعد الورشة
                    </h2>

                    <ul className="space-y-4 mb-10">
                        <li className="flex items-center gap-4 bg-white/5 px-4 py-4">
                            <IconCalendar className="w-8 h-8 shrink-0 text-[#c4a035]" />
                            <div>
                                <p className="text-sm text-white/60 font-bold">اليوم والتاريخ</p>
                                <p className="text-xl font-bold">الجمعة · 8 أغسطس 2026</p>
                            </div>
                        </li>
                        <li className="flex items-center gap-4 bg-white/5 px-4 py-4">
                            <IconClock className="w-8 h-8 shrink-0 text-[#c4a035]" />
                            <div>
                                <p className="text-sm text-white/60 font-bold">الوقت</p>
                                <p className="text-xl font-bold">الساعة 6 مساءً</p>
                            </div>
                        </li>
                        <li className="flex items-center gap-4 bg-white/5 px-4 py-4">
                            <IconMapPin className="w-8 h-8 shrink-0 text-[#c4a035]" />
                            <div>
                                <p className="text-sm text-white/60 font-bold">المكان</p>
                                <p className="text-xl font-bold">نادي شبان بدواي</p>
                            </div>
                        </li>
                    </ul>

                    <div className="text-center">
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 bg-[#1a6b4a] text-white font-bold text-lg px-11 py-3.5 hover:bg-[#145539] transition-colors"
                        >
                            <IconCheck className="w-6 h-6" />
                            سجّل حضورك الآن
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== ORGANIZERS + SPONSOR ===== */}
            <section className="px-6 py-12 md:py-14 bg-[#faf8f4] border-t border-[#1a2332]/08">
                <div className="max-w-md mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-[#1a2332] mb-6">
                        التنظيم والرعاة
                    </h2>

                    <p className="inline-flex items-center justify-center gap-2 text-[#5a6578] text-sm font-bold mb-5">
                        <IconUsers className="w-5 h-5 text-[#1a6b4a]" />
                        تنظيم مشترك بين
                    </p>
                    <div className="flex items-center justify-center gap-5 sm:gap-8 mb-1">
                        <figure className="org-logo-wrap flex flex-col items-center gap-2">
                            <div className="org-logo-frame">
                                <img src={bra3emLogo} alt="براعم الهدى" />
                            </div>
                            <figcaption className="text-lg font-bold text-[#1a2332]">
                                فريق براعم الهدى
                            </figcaption>
                        </figure>

                        <span className="text-[#c4a035] text-xl font-black self-center pb-6">×</span>

                        <figure className="org-logo-wrap flex flex-col items-center gap-2">
                            <div className="org-logo-frame" style={{ animationDelay: "0.7s, 0.7s" }}>
                                <img src={nadyLogo} alt="نادي شبان بدواي" />
                            </div>
                            <figcaption className="text-lg font-bold text-[#1a2332]">
                                نادي شبان بدواي
                            </figcaption>
                        </figure>
                    </div>

                    <div className="w-12 h-px bg-[#c4a035] mx-auto my-6" />

                    <p className="inline-flex items-center justify-center gap-2 text-[#5a6578] text-sm font-bold mb-2">
                        <IconFlower className="w-5 h-5 text-[#1a6b4a]" />
                        تُقام الورشة صدقة جارية على
                    </p>
                    <p className="text-xl font-bold text-[#1a2332] leading-relaxed">
                        الأستاذ / السيد عبدالمنعم هيكل
                    </p>
                    <p className="text-xl font-bold text-[#1a2332] leading-relaxed mb-1">
                        الكابتن / صبري علي المحسن
                    </p>
                    

                    <div className="w-12 h-px bg-[#c4a035] mx-auto my-6" />

                    <p className="inline-flex items-center justify-center gap-2 text-[#5a6578] text-sm font-bold mb-2">
                        <IconAward className="w-5 h-5 text-[#c4a035]" />
                        الراعي الرسمي
                    </p>
                    <p className="text-xl font-bold text-[#1a6b4a]">
                        الأستاذ / رضا تقي الدين أصيل
                    </p>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="px-6 py-8 bg-[#1a2332] text-center">
                <p className="text-white/40 text-sm">
                    اعرف طريقك · 2026 · تصميم م. إسلام السيد هيكل
                </p>
            </footer>
        </div>
    )
}
