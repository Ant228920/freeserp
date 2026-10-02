import type { Metadata } from "next";
import Link from "next/link";
import "./global.css";

export const metadata: Metadata = {
    title: "NeuroIndex — каталог AI-сайтів",
    description: "Каталог нових AI-стартапів з фільтрами за нішею, авторитетом і датою запуску. Дані: freeserp.ai",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="uk">
        <body>
        <div className="glow" aria-hidden />
        <header className="nav">
            <Link href="/" className="logo"><i /> NeuroIndex</Link>
            <nav>
                <Link href="/">Каталог</Link>
                <Link href="/new">Новинки</Link>
                <a href="https://freeserp.ai/docs.php" target="_blank" rel="noreferrer">API ↗</a>
            </nav>
        </header>
        <main>{children}</main>
        <footer>Дані надає <a href="https://freeserp.ai" target="_blank" rel="noreferrer">freeserp.ai</a> · тестовий проєкт</footer>
        </body>
        </html>
    );
}
