import Link from "next/link";
export default function NotFound() {
    return <div className="notice">Сайт не знайдено в індексі. <Link href="/">До каталогу →</Link></div>;
}
