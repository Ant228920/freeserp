const BASE = "https://freeserp.ai/api.php";
const AGENT = "ai-catalog-test/1.0";

export type Site = {
    domain: string; url: string; title: string | null; ai_summary: string | null;
    category: string | null; ai_categories: string[] | null; ai_source: string | null;
    dr: number | null; went_live: string | null; first_seen: string | null;
    tld: string | null; http_status: number | null; content?: string;
};
export type SearchResult = { total: number; from: number; size: number; results: Site[] };

export const CATEGORIES = [
    "AI Agents & Autonomous", "Code & Dev Tools", "AI Infrastructure & API", "AI Automation & Workflows",
    "LLM & Prompt Tools", "AI Search & Answers", "AI Website Builder", "No-code / App Builder",
    "Image Generation", "Video Generation", "Voice & Text-to-Speech", "Data & Analytics",
    "Research & Science", "Design & UI", "Chatbot & Assistant",
];
export const SORTS: Record<string, string> = {
    relevance: "Релевантність", dr: "Авторитет (DR)", went_live: "Найновіші",
};
export const PAGE_SIZE = 24;

export type Query = { q?: string; cat?: string; sort?: string; dr_min?: string; page?: number; size?: number; content?: boolean };

async function call(params: Record<string, string>) {
    const url = `${BASE}?${new URLSearchParams({ agent: AGENT, ...params })}`;
    const r = await fetch(url, { next: { revalidate: 60 } });
    if (!r.ok) throw new Error(`FreeSerp API: HTTP ${r.status}`);
    const j = await r.json();
    if (j.ok === false) throw new Error(`FreeSerp API: ${j.error}`);
    return j;
}

export async function searchSites(o: Query): Promise<SearchResult> {
    const size = o.size ?? PAGE_SIZE;
    const page = Math.max(1, o.page ?? 1);
    const p: Record<string, string> = { ai_startups: "1", size: String(size), from: String((page - 1) * size) };
    if (o.q) p.q = o.q;
    if (o.cat) p.ai_categories = o.cat;
    if (o.dr_min) p.dr_min = o.dr_min;
    if (o.sort && o.sort !== "relevance") { p.sort = o.sort; p.order = "desc"; }
    if (o.content) { p.content = "1"; p.content_max = "1200"; }
    return call(p);
}

export async function getSite(domain: string): Promise<Site | null> {
    const j = await call({ q: domain, all: "1", size: "1", content: "1", content_max: "1500" });
    const s: Site | undefined = j.results?.[0];
    return s && s.domain.toLowerCase() === domain.toLowerCase() ? s : null;
}

export async function getStats(): Promise<{ total: number; today: number } | null> {
    try { const j = await call({ stats: "1" }); return j.ai_startups ?? null; } catch { return null; }
}
