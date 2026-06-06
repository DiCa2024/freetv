import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { data: featuredMovies } = await supabase
    .from("movies")
    .select("id, title_ko, title_en, slug, thumbnail_url, poster_url, is_featured, is_visible")
    .eq("is_featured", true)
    .eq("is_visible", true)
    .limit(6);

  const { data: latestMovies } = await supabase
    .from("movies")
    .select("id, title_ko, title_en, slug, thumbnail_url, poster_url, is_visible, created_at")
    .eq("is_visible", true)
    .order("created_at", { ascending: false })
    .limit(12);

  const { data: latestArticles } = await supabase
    .from("blog_posts")
    .select("id, title_ko, title_en, slug, excerpt_ko, excerpt_en, category, thumbnail_url, is_visible, created_at")
    .eq("is_visible", true)
    .order("created_at", { ascending: false })
    .limit(6);

  const categories = ["Horror", "Comedy", "Drama", "Sci-Fi", "Animation", "Silent Films"];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-white to-white px-6 py-28 text-center">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-sky-200 opacity-60 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-blue-100 opacity-70 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            FREETV
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-slate-950 md:text-7xl">
            Open Cinema Library
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            누구나 자유롭게 감상할 수 있는 퍼블릭 도메인 고전 영화를 쉽고 아름답게 탐색하세요.
          </p>

          <form
            action="/search"
            className="mx-auto mt-10 flex max-w-2xl rounded-2xl bg-white p-2 shadow-lg ring-1 ring-sky-100"
          >
            <input
              name="q"
              className="w-full rounded-xl px-5 py-4 text-slate-900 outline-none"
              placeholder="영화와 블로그 글을 검색해보세요"
            />

            <button className="rounded-xl bg-sky-500 px-6 font-semibold text-white hover:bg-sky-600">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-sky-600">Featured</p>
            <h2 className="text-3xl font-bold">Featured Movies</h2>
          </div>

          <Link href="/movies" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
            View All
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredMovies?.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies?movie=${movie.slug}`}
              className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-sky-100 to-slate-100">
                {movie.thumbnail_url || movie.poster_url ? (
                  <img
                   src={(movie.thumbnail_url || movie.poster_url || "").trim()}
                    alt={movie.title_ko || movie.title_en || "Movie"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold">
                  {movie.title_ko || movie.title_en}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-sm font-semibold text-sky-600">Browse</p>
        <h2 className="mb-6 text-3xl font-bold">Browse Categories</h2>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/movies?q=${category}`}
              className="rounded-full bg-sky-50 px-5 py-3 font-medium text-sky-700 ring-1 ring-sky-100 transition hover:bg-sky-100"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-sky-600">New</p>
            <h2 className="text-3xl font-bold">Latest Movies</h2>
          </div>

          <Link href="/movies" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
            View All
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {latestMovies?.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies?movie=${movie.slug}`}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-sky-50">
                {movie.thumbnail_url || movie.poster_url ? (
                  <img
                   src={(movie.thumbnail_url || movie.poster_url || "").trim()}
                    alt={movie.title_ko || movie.title_en || "Movie"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>

              <div className="p-4">
                <h3 className="font-semibold">
                  {movie.title_ko || movie.title_en}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-sky-600">Magazine</p>
            <h2 className="text-3xl font-bold">Latest Articles</h2>
          </div>

          <Link href="/blog" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
            View All
          </Link>
        </div>

        <div className="space-y-5">
          {latestArticles?.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold">
                  {post.title_ko || post.title_en}
                </h3>

                <p className="mt-3 line-clamp-2 text-slate-600">
                  {post.excerpt_ko || post.excerpt_en}
                </p>

                <span className="mt-4 inline-block rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
                  {post.category || "Cinema"}
                </span>
              </div>

              <div className="hidden h-28 w-44 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-100 to-slate-100 sm:block">
                {post.thumbnail_url ? (
                  <img
                    src={post.thumbnail_url}
                    alt={post.title_ko || post.title_en || "Article"}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Link
           href="/blog?q=chaplin"
           className="block rounded-3xl bg-sky-50 p-10 ring-1 ring-sky-100 transition hover:bg-sky-100"
         >
          <p className="text-sm font-semibold text-sky-600">Featured Creator</p>
          <h2 className="mt-2 text-3xl font-bold">Charlie Chaplin</h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            웃음과 인간적인 따뜻함을 함께 담아낸 고전 영화의 상징적인 창작자입니다.
            앞으로 그의 작품들을 하나씩 소개할 예정입니다.
          </p>
        </Link>
      </section>
    </main>
  );
}