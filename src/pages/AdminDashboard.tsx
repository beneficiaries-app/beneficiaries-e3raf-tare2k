import { useEffect, useMemo, useState, type FormEvent, type ReactNode, type SVGProps } from "react"
import bra3emLogo from "../../assets/bra3em-elhoda.jpeg"
import nadyLogo from "../../assets/nady-badaway.jpeg"

type Registration = {
    id: number
    timestamp: string
    name: string
    role: string
    expectation: string
}

type ListResponse = {
    ok: boolean
    error?: string
    count?: number
    registrations?: Registration[]
}

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL as string | undefined
const SESSION_KEY = "nadwa-admin-key"
const ROLES = ["طالب", "ولي أمر", "معلم"] as const

const ROLE_COLORS: Record<string, string> = {
    طالب: "#1a6b4a",
    "ولي أمر": "#c4a035",
    معلم: "#2563eb",
}

function formatDate(iso: string) {
    if (!iso) return "—"
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return d.toLocaleString("ar-EG", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

function formatShortDate(iso: string) {
    if (!iso) return "—"
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return d.toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    })
}

function initialOf(name: string) {
    const t = name.trim()
    return t ? t.charAt(0) : "?"
}

function rolePill(role: string) {
    if (role === "طالب") return "bg-emerald-50 text-emerald-700 ring-emerald-600/15"
    if (role === "ولي أمر") return "bg-amber-50 text-amber-700 ring-amber-600/15"
    if (role === "معلم") return "bg-blue-50 text-blue-700 ring-blue-600/15"
    return "bg-slate-100 text-slate-600 ring-slate-500/10"
}

export default function AdminDashboard() {
    const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem(SESSION_KEY) || "")
    const [keyInput, setKeyInput] = useState("")
    const [authError, setAuthError] = useState("")
    const [rows, setRows] = useState<Registration[]>([])
    const [loading, setLoading] = useState(false)
    const [fetchError, setFetchError] = useState("")
    const [search, setSearch] = useState("")
    const [roleFilter, setRoleFilter] = useState("الكل")
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
    const [viewMode, setViewMode] = useState<"table" | "expectations">("table")
    const [selected, setSelected] = useState<Registration | null>(null)

    const load = async (key: string) => {
        if (!SCRIPT_URL) {
            setFetchError("رابط Google Apps Script غير مضبوط في .env")
            return
        }
        if (!key) return

        setLoading(true)
        setFetchError("")

        try {
            const url = `${SCRIPT_URL}?action=list&key=${encodeURIComponent(key)}`
            const res = await fetch(url)
            const data = (await res.json()) as ListResponse

            if (!data.ok) {
                if (data.error === "unauthorized") {
                    sessionStorage.removeItem(SESSION_KEY)
                    setAdminKey("")
                    setAuthError("الرقم السري غير صحيح")
                    setRows([])
                    return
                }
                setFetchError(data.error || "فشل تحميل البيانات")
                return
            }

            setRows(data.registrations || [])
            setLastUpdated(new Date())
            setAuthError("")
        } catch {
            setFetchError(
                "تعذر الاتصال بالخادم. تأكد من نشر نسخة جديدة من Apps Script بعد إضافة action=list"
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (adminKey) void load(adminKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adminKey])

    const handleUnlock = (e: FormEvent) => {
        e.preventDefault()
        const key = keyInput.trim()
        if (!key) {
            setAuthError("أدخل الرقم السري")
            return
        }
        sessionStorage.setItem(SESSION_KEY, key)
        setAdminKey(key)
        setAuthError("")
    }

    const handleLogout = () => {
        sessionStorage.removeItem(SESSION_KEY)
        setAdminKey("")
        setKeyInput("")
        setRows([])
        setFetchError("")
        setAuthError("")
    }

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase()
        return rows
            .filter((r) => (roleFilter === "الكل" ? true : r.role === roleFilter))
            .filter((r) => {
                if (!q) return true
                return (
                    r.name.toLowerCase().includes(q) ||
                    r.expectation.toLowerCase().includes(q) ||
                    r.role.toLowerCase().includes(q)
                )
            })
            .slice()
            .sort((a, b) => {
                const ta = new Date(a.timestamp).getTime() || 0
                const tb = new Date(b.timestamp).getTime() || 0
                return tb - ta
            })
    }, [rows, search, roleFilter])

    const stats = useMemo(() => {
        const byRole: Record<string, number> = {}
        for (const role of ROLES) byRole[role] = 0
        for (const r of rows) {
            byRole[r.role] = (byRole[r.role] || 0) + 1
        }
        const withExpectation = rows.filter((r) => r.expectation.trim()).length
        return { total: rows.length, byRole, withExpectation }
    }, [rows])

    useEffect(() => {
        if (!selected) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelected(null)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [selected])

    if (!adminKey) {
        return (
            <div className="admin-shell min-h-svh" dir="rtl" lang="ar">
                <div className="flex min-h-svh items-center justify-center px-4 py-12">
                    <form onSubmit={handleUnlock} className="admin-panel w-full max-w-[400px] p-8 sm:p-9">
                        <div className="mb-7 flex items-center gap-3">
                            <div className="admin-logo-stack">
                                <img src={bra3emLogo} alt="براعم الهدى" />
                                <img src={nadyLogo} alt="نادي شبان بدواي" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-400">Admin Dashboard</p>
                                <h1 className="text-xl font-black text-slate-900">اعرف طريقك</h1>
                            </div>
                        </div>

                        <h2 className="mb-1 text-lg font-bold text-slate-800">تسجيل الدخول</h2>
                        <p className="mb-6 text-sm leading-relaxed text-slate-500">
                            أدخل مفتاح الأدمن لمتابعة التسجيلات والإحصائيات.
                        </p>

                        <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="admin-key">
                            الرقم السري
                        </label>
                        <input
                            id="admin-key"
                            type="password"
                            autoComplete="current-password"
                            value={keyInput}
                            onChange={(e) => setKeyInput(e.target.value)}
                            className="admin-input"
                            placeholder="••••••••"
                        />
                        {authError && <p className="mt-2 text-sm text-red-600">{authError}</p>}
                        <button type="submit" className="admin-btn-primary mt-6 w-full">
                            دخول
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="admin-shell min-h-svh text-slate-800" dir="rtl" lang="ar">
            <div className="mx-auto flex min-h-svh max-w-[1200px] flex-col">
                <header className="admin-topbar sticky top-0 z-20">
                    <div className="flex flex-1 flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="admin-logo-stack admin-logo-stack--sm">
                                <img src={bra3emLogo} alt="" />
                                <img src={nadyLogo} alt="" />
                            </div>
                            <div>
                                <p className="text-[11px] font-semibold text-slate-400">لوحة التحكم</p>
                                <h1 className="text-base font-black text-slate-900 sm:text-lg">اعرف طريقك</h1>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {lastUpdated && (
                                <span className="hidden text-xs text-slate-400 md:inline">
                                    آخر تحديث {formatDate(lastUpdated.toISOString())}
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={() => void load(adminKey)}
                                disabled={loading}
                                className="admin-btn-secondary"
                            >
                                <IconRefresh className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                                <span className="hidden sm:inline">{loading ? "جاري التحديث" : "تحديث"}</span>
                            </button>
                            <button type="button" onClick={handleLogout} className="admin-btn-ghost">
                                خروج
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
                        {fetchError && (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {fetchError}
                            </div>
                        )}

                        {/* Stats: total + each role */}
                        <section className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5 sm:gap-3">
                            <KpiCard
                                label="الإجمالي"
                                value={stats.total}
                                icon={<IconUsers className="h-4 w-4" />}
                                accent="emerald"
                                active={roleFilter === "الكل" && viewMode === "table"}
                                onClick={() => {
                                    setRoleFilter("الكل")
                                    setViewMode("table")
                                }}
                            />
                            {ROLES.map((role) => (
                                <KpiCard
                                    key={role}
                                    label={role}
                                    value={stats.byRole[role] || 0}
                                    icon={<IconUsers className="h-4 w-4" />}
                                    accent={
                                        role === "طالب" ? "emerald" : role === "ولي أمر" ? "amber" : "blue"
                                    }
                                    active={roleFilter === role}
                                    onClick={() => setRoleFilter(roleFilter === role ? "الكل" : role)}
                                />
                            ))}
                            <KpiCard
                                label="التوقعات"
                                value={stats.withExpectation}
                                icon={<IconQuote className="h-4 w-4" />}
                                accent="slate"
                                active={viewMode === "expectations"}
                                onClick={() => setViewMode(viewMode === "expectations" ? "table" : "expectations")}
                            />
                        </section>

                        {/* Table / Expectations */}
                        <section className="admin-panel overflow-hidden">
                            <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                                <div>
                                    <div className="mb-2 flex flex-wrap gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => setViewMode("table")}
                                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                                                viewMode === "table"
                                                    ? "bg-[#1a6b4a] text-white"
                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            }`}
                                        >
                                            قائمة التسجيلات
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setViewMode("expectations")}
                                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                                                viewMode === "expectations"
                                                    ? "bg-[#1a6b4a] text-white"
                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            }`}
                                        >
                                            كل التوقعات
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-400">
                                        {filtered.length} نتيجة من {rows.length}
                                        {viewMode === "expectations"
                                            ? ` · ${filtered.filter((r) => r.expectation.trim()).length} توقع`
                                            : ""}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                    <div className="relative">
                                        <IconSearch className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="search"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder={
                                                viewMode === "expectations"
                                                    ? "بحث في التوقعات…"
                                                    : "بحث…"
                                            }
                                            className="admin-input !py-2 pe-3 ps-9 sm:w-52"
                                        />
                                    </div>
                                    <select
                                        value={roleFilter}
                                        onChange={(e) => setRoleFilter(e.target.value)}
                                        className="admin-input !py-2 sm:w-36"
                                    >
                                        <option value="الكل">كل الفئات</option>
                                        {ROLES.map((r) => (
                                            <option key={r} value={r}>
                                                {r}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {viewMode === "table" ? (
                                <div className="overflow-x-auto">
                                    <table className="admin-table w-full min-w-[720px] text-right">
                                        <thead>
                                            <tr>
                                                <th className="w-14">#</th>
                                                <th>المشارك</th>
                                                <th>الفئة</th>
                                                <th>متوقع من المبادرة</th>
                                                <th className="w-40">وقت التسجيل</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading && rows.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="!py-16 text-center text-slate-400">
                                                        <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-[#1a6b4a]" />
                                                        جاري التحميل…
                                                    </td>
                                                </tr>
                                            ) : filtered.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="!py-16 text-center text-slate-400">
                                                        لا توجد نتائج
                                                    </td>
                                                </tr>
                                            ) : (
                                                filtered.map((r, idx) => (
                                                    <tr
                                                        key={`${r.id}-${r.timestamp}-${r.name}`}
                                                        className="cursor-pointer"
                                                        onClick={() => setSelected(r)}
                                                    >
                                                        <td className="tabular-nums text-slate-400">
                                                            {filtered.length - idx}
                                                        </td>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <span
                                                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                                                                    style={{
                                                                        background:
                                                                            ROLE_COLORS[r.role] || "#64748b",
                                                                    }}
                                                                >
                                                                    {initialOf(r.name)}
                                                                </span>
                                                                <span className="font-semibold text-slate-800">
                                                                    {r.name}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span
                                                                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${rolePill(r.role)}`}
                                                            >
                                                                {r.role || "—"}
                                                            </span>
                                                        </td>
                                                        <td className="max-w-sm text-sm leading-relaxed text-slate-500">
                                                            <span className="line-clamp-2">
                                                                {r.expectation || "—"}
                                                            </span>
                                                            {r.expectation.trim().length > 80 && (
                                                                <span className="mt-1 block text-xs font-semibold text-[#1a6b4a]">
                                                                    عرض الكامل
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="whitespace-nowrap text-sm tabular-nums text-slate-500">
                                                            {formatShortDate(r.timestamp)}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-100">
                                    {loading && rows.length === 0 ? (
                                        <div className="px-4 py-16 text-center text-slate-400 sm:px-5">
                                            <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-[#1a6b4a]" />
                                            جاري التحميل…
                                        </div>
                                    ) : filtered.filter((r) => r.expectation.trim()).length === 0 ? (
                                        <div className="px-4 py-16 text-center text-slate-400 sm:px-5">
                                            لا توجد توقعات
                                        </div>
                                    ) : (
                                        filtered
                                            .filter((r) => r.expectation.trim())
                                            .map((r) => (
                                                <button
                                                    key={`${r.id}-${r.timestamp}-${r.name}-exp`}
                                                    type="button"
                                                    onClick={() => setSelected(r)}
                                                    className="flex w-full flex-col gap-3 px-4 py-4 text-start transition hover:bg-slate-50 sm:flex-row sm:items-start sm:gap-4 sm:px-5"
                                                >
                                                    <span
                                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                                                        style={{
                                                            background: ROLE_COLORS[r.role] || "#64748b",
                                                        }}
                                                    >
                                                        {initialOf(r.name)}
                                                    </span>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="mb-1.5 flex flex-wrap items-center gap-2">
                                                            <span className="font-semibold text-slate-800">
                                                                {r.name}
                                                            </span>
                                                            <span
                                                                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${rolePill(r.role)}`}
                                                            >
                                                                {r.role || "—"}
                                                            </span>
                                                            <span className="text-xs tabular-nums text-slate-400">
                                                                {formatShortDate(r.timestamp)}
                                                            </span>
                                                        </div>
                                                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                                                            {r.expectation}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))
                                    )}
                                </div>
                            )}
                        </section>
                    </main>
            </div>

            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-4 sm:items-center"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="expectation-dialog-title"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="admin-panel max-h-[85svh] w-full max-w-lg overflow-y-auto p-5 sm:p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-5 flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <span
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
                                    style={{ background: ROLE_COLORS[selected.role] || "#64748b" }}
                                >
                                    {initialOf(selected.name)}
                                </span>
                                <div>
                                    <h2
                                        id="expectation-dialog-title"
                                        className="text-lg font-bold text-slate-900"
                                    >
                                        {selected.name}
                                    </h2>
                                    <div className="mt-1 flex flex-wrap items-center gap-2">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${rolePill(selected.role)}`}
                                        >
                                            {selected.role || "—"}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {formatDate(selected.timestamp)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelected(null)}
                                className="admin-btn-ghost !px-2 !py-1 text-lg leading-none"
                                aria-label="إغلاق"
                            >
                                ×
                            </button>
                        </div>

                        <p className="mb-2 text-xs font-semibold text-slate-400">متوقع من المبادرة</p>
                        <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-700">
                            {selected.expectation.trim() || "—"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

function KpiCard({
    label,
    value,
    icon,
    accent,
    active,
    onClick,
}: {
    label: string
    value: number | string
    icon: ReactNode
    accent: "emerald" | "amber" | "blue" | "slate"
    active?: boolean
    onClick?: () => void
}) {
    const accents = {
        emerald: "bg-emerald-50 text-emerald-700",
        amber: "bg-amber-50 text-amber-700",
        blue: "bg-blue-50 text-blue-700",
        slate: "bg-slate-100 text-slate-600",
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={`admin-panel w-full p-3 text-start transition-shadow sm:p-3.5 ${
                active ? "ring-2 ring-[#1a6b4a]/35 shadow-md" : "hover:shadow-md"
            }`}
        >
            <div className="flex items-start justify-between gap-2">
                <p className="text-[11px] font-semibold text-slate-500 sm:text-xs">{label}</p>
                <span className={`rounded-md p-1.5 ${accents[accent]}`}>{icon}</span>
            </div>
            <p className="text-2xl font-black tabular-nums tracking-tight text-slate-900 sm:text-3xl">
                {value}
            </p>
        </button>
    )
}

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

function IconUsers(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </IconBase>
    )
}

function IconRefresh(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <path d="M21 12a9 9 0 1 1-2.6-6.3" />
            <polyline points="21 3 21 9 15 9" />
        </IconBase>
    )
}

function IconSearch(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
        </IconBase>
    )
}

function IconQuote(props: SVGProps<SVGSVGElement>) {
    return (
        <IconBase {...props}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </IconBase>
    )
}

