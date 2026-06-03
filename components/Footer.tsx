import Link from "next/link";
import { texts } from "@/lib/i18n/texts";

export default function Footer() {
  const t = texts.ko;
  return (
    <footer className="border-t border-sky-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              FREETV
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
               {t.footer.desc}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-sky-600">
              Home
            </Link>

            <Link href="/movies" className="hover:text-sky-600">
              Movies
            </Link>

            <Link href="/blog" className="hover:text-sky-600">
              Blog
            </Link>

            <Link href="/about" className="hover:text-sky-600">
              About
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-sky-100 pt-6 text-sm text-slate-400">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}