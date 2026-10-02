import Link from "next/link";

export default function Pagination({ base, params, page, total, size }: {
    base: string; params: Record<string, string | undefined>; page: number; total: number; size: number;
}) {
    const pages = Math.min(Math.ceil(total / size), Math.floor(10000 / size)); // ліміт API: from+size ≤ 10 000
    if (pages <= 1) return null;
    const href = (n: number) => {
        const sp = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => v && sp.set(k, v));
        if (n > 1) sp.set("page", String(n));
        return `${base}?${sp}`;
    };
    return (
        <nav className="pager">
            {page > 1 ? <Link href={href(page - 1)}>← Назад</Link> : <span className="off">← Назад</span>}
            <span>Сторінка {page} з {pages.toLocaleString("uk")}</span>
            {page < pages ? <Link href={href(page + 1)}>Далі →</Link> : <span className="off">Далі →</span>}
        </nav>
    );
}
