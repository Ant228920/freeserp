import Link from "next/link";
import type { Site } from "@/lib/freeserp";

export default function SiteCard({ s }: { s: Site }) {
    const dr = s.dr ?? 0;
    return (
        <Link href={`/site/${encodeURIComponent(s.domain)}`} className="card">
            <div className="card-top">
                <span className="domain">{s.domain}</span>
                <span className="dr" style={{ ["--p" as string]: `${dr}%` }} title="Domain Rating"><b>{s.dr ?? "–"}</b></span>
            </div>
            <h3>{s.title || s.domain}</h3>
            <p>{s.ai_summary || "Опис відсутній."}</p>
            <div className="tags">
                {(s.ai_categories ?? []).slice(0, 2).map((c) => <span key={c} className="tag">{c}</span>)}
                {s.ai_source && s.ai_source !== "not_ai" && <span className="tag ghost">{s.ai_source}</span>}
                {s.went_live && <span className="date">🟢 {s.went_live}</span>}
            </div>
        </Link>
    );
}
