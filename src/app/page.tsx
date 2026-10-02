import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import SiteCard from "@/components/SiteCard";
import { PAGE_SIZE, getStats, searchSites } from "@/lib/freeserp";

type SP = { q?: string; cat?: string; sort?: string; dr_min?: string; page?: string };

export default async function Home({ searchParams }: { searchParams: Promise<SP> }) {
    const sp = await searchParams;
    const page = Number(sp.page) || 1;
    const [stats, data] = await Promise.all([
        getStats(),
        searchSites({ ...sp, page }).catch((e: Error) => e),
    ]);

    return (
        <>
            <section className="hero">
                <span className="pill">● Живі дані · freeserp.ai</span>
                <h1>Каталог <em>AI-стартапів</em>,<br />що з’явились у мережі</h1>
                <p>Шукайте за нішею, авторитетом домену та датою запуску. Лише головні сторінки, лише справжні AI-продукти.</p>
                {stats && (
                    <div className="stats">
                        <div><b>{stats.total.toLocaleString("uk")}</b><span>AI-стартапів в індексі</span></div>
                        <div><b>+{stats.today.toLocaleString("uk")}</b><span>нових сьогодні</span></div>
                    </div>
                )}
            </section>

            <Filters p={sp} />

            {data instanceof Error ? (
                <div className="notice">Не вдалося завантажити дані ({data.message}). Оновіть сторінку за хвилину.</div>
            ) : data.results.length === 0 ? (
                <div className="notice">Нічого не знайдено. Спробуйте послабити фільтри.</div>
            ) : (
                <>
                    <p className="count">Знайдено {data.total.toLocaleString("uk")} сайтів</p>
                    <div className="grid">{data.results.map((s) => <SiteCard key={s.domain} s={s} />)}</div>
                    <Pagination base="/" params={{ q: sp.q, cat: sp.cat, sort: sp.sort, dr_min: sp.dr_min }} page={page} total={data.total} size={PAGE_SIZE} />
                </>
            )}
        </>
    );
}
