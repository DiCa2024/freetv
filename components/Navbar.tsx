import Link from "next/link";
import { texts } from "@/lib/i18n/texts";

export default function Navbar() {
  const t = texts.ko;
  return (
    <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-sky-600">
          FREETV
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          <Link href="/" className="hover:text-sky-600">
            {t.common.home}
          </Link>
          <Link href="/movies" className="hover:text-sky-600">
            {t.common.movies}
          </Link>
          <Link href="/blog" className="hover:text-sky-600">
            {t.common.blog}
          </Link>
          <Link href="/about" className="hover:text-sky-600">
            {t.common.about}
          </Link>
        </nav>

        <div className="flex items-center gap-2 text-sm font-semibold">
          <button className="rounded-full bg-sky-500 px-3 py-1.5 text-white">
            KR
          </button>
          <button className="rounded-full px-3 py-1.5 text-slate-500 hover:bg-sky-50 hover:text-sky-600">
            EN
          </button>
        </div>
      </div>
    </header>
  );
}