import Link from "next/link";
import { notFound } from "next/navigation";
import SiteCard from "@/components/SiteCard";
import { getSite, searchSites } from "@/lib/freeserp";

export default async function SitePage({ params }: { params: Promise<{ domain: string }> }) {
    const domain = decodeURIComponent((await params).domain);
    const s = await getSite(domain).catch(() => null);
    if (!s) notFound();

    const cat = s.ai_categories?.[0];
    const similar = cat
        ? (await searchSites({ cat, sort: "dr", size: 7 }).catch(() => null))?.results.filter((x) => x.domain !== s.domain).slice(0, 6) ?? []
        : [];

    const facts: [string, string | number | null][] = [
        ["Domain Rating", s.dr], ["Запуск (перша перевірка)", s.went_live], ["Знайдено", s.first_seen],
        ["Стек / білдер", s.ai_source], ["TLD", s.tld], ["HTTP", s.http_status],
    ];

    return (
        <>
            <Link href="/" className="back">← До каталогу</Link>
            <section className="detail">
                <div>
                    <span className="domain">{s.domain}</span>
                    <h1>{s.title || s.domain}</h1>
                    <p className="lead">{s.ai_summary}</p>
                    <div className="tags">{s.ai_categories?.map((c) => <Link key={c} href={`/?cat=${encodeURIComponent(c)}`} className="tag">{c}</Link>)}</div>
                    <a className="btn" href={s.url} target="_blank" rel="noreferrer nofollow">Відвідати сайт ↗</a>
                    {s.content && <details><summary>Фрагмент тексту з головної</summary><p className="excerpt">{s.content}…</p></details>}
                </div>
                <dl className="facts">
                    {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v ?? "—"}</dd></div>)}
                </dl>
            </section>
            {similar.length > 0 && (
                <>
                    <h2 className="h2">Схожі в ніші «{cat}»</h2>
                    <div className="grid">{similar.map((x) => <SiteCard key={x.domain} s={x} />)}</div>
                </>
            )}
        </>
    );
}
