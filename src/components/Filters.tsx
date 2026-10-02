import { CATEGORIES, SORTS } from "@/lib/freeserp";

type P = { q?: string; cat?: string; sort?: string; dr_min?: string };

export default function Filters({ p, action = "/" }: { p: P; action?: string }) {
    return (
        <form action={action} method="get" className="filters">
            <input name="q" defaultValue={p.q} placeholder="Пошук: chatbot, voice, vector db…" className="search" />
            <select name="cat" defaultValue={p.cat ?? ""}>
                <option value="">Усі ніші</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select name="sort" defaultValue={p.sort ?? "relevance"}>
                {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <select name="dr_min" defaultValue={p.dr_min ?? ""}>
                <option value="">Будь-який DR</option>
                {[10, 20, 30, 50].map((n) => <option key={n} value={n}>DR ≥ {n}</option>)}
            </select>
            <button type="submit">Знайти</button>
        </form>
    );
}
