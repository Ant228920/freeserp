import Pagination from "@/components/Pagination";
import SiteCard from "@/components/SiteCard";
import { CATEGORIES, PAGE_SIZE, searchSites } from "@/lib/freeserp";
import Link from "next/link";

export const metadata = { title: "Новинки — NeuroIndex" };

export default async function New({ searchParams }: { searchParams: Promise<{ cat?: string; page?: string }> }) {
    const sp = await searchParams;
    const page = Number(sp.page) || 1;
    const data = await searchSites({ cat: sp.cat, sort: "went_live", page }).catch(() => null);

    return (
        <>
            <section className="hero small">
                <h1>Свіжі <em>новинки</em></h1>
                <p>Найновіші AI-сайти, які щойно підтвердили роботу. Дата — перша перевірка живості, а не офіційний реліз.</p>
            </section>
            <div className="chips">
                <Link href="/new" className={!sp.cat ? "on" : ""}>Усі</Link>
                {CATEGORIES.map((c) => (
                    <Link key={c} href={`/new?cat=${encodeURIComponent(c)}`} className={sp.cat === c ? "on" : ""}>{c}</Link>
                ))}
            </div>
            {!data ? <div className="notice">Помилка завантаження API.</div> : (
                <>
                    <div className="grid">{data.results.map((s) => <SiteCard key={s.domain} s={s} />)}</div>
                    <Pagination base="/new" params={{ cat: sp.cat }} page={page} total={data.total} size={PAGE_SIZE} />
                </>
            )}
        </>
    );
}
