import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Movie = {
  id: number;
  title_ko: string | null;
  title_en: string | null;
  slug: string;
  year: number | null;
  genre: string | null;
  director: string | null;
  thumbnail_url: string | null;
};

type BlogPost = {
  id: number;
  title_ko: string | null;
  title_en: string | null;
  slug: string;
  category: string | null;
  excerpt_ko: string | null;
  excerpt_en: string | null;
  thumbnail_url: string | null;
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const keyword = q?.trim() || "";

  let movies: Movie[] = [];
  let posts: BlogPost[] = [];

  if (keyword) {
    const movieResult = await supabase
      .from("movies")
      .select("id, title_ko, title_en, slug, year, genre, director, thumbnail_url")
      .eq("is_visible", true)
      .or(
        `title_ko.ilike.%${keyword}%,title_en.ilike.%${keyword}%,genre.ilike.%${keyword}%,director.ilike.%${keyword}%,actors.ilike.%${keyword}%,description_ko.ilike.%${keyword}%,description_en.ilike.%${keyword}%`
      )
      .limit(12);

    const blogResult = await supabase
      .from("blog_posts")
      .select("id, title_ko, title_en, slug, category, excerpt_ko, excerpt_en, thumbnail_url")
      .eq("is_visible", true)
      .or(
        `title_ko.ilike.%${keyword}%,title_en.ilike.%${keyword}%,category.ilike.%${keyword}%,excerpt_ko.ilike.%${keyword}%,excerpt_en.ilike.%${keyword}%,content_ko.ilike.%${keyword}%,content_en.ilike.%${keyword}%`
      )
      .limit(12);

    movies = (movieResult.data || []) as Movie[];
    posts = (blogResult.data || []) as BlogPost[];
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="bg-gradient-to-b from-sky-100 to-white px-6 py-20 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          SEARCH
        </p>

        <h1 className="text-4xl font-bold text-slate-950 md:text-6xl">
          통합 검색
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-slate-600">
          영화와 블로그 글을 한 번에 검색해보세요.
        </p>

        <form
          action="/search"
          className="mx-auto mt-10 flex max-w-2xl rounded-2xl bg-white p-2 shadow-lg ring-1 ring-sky-100"
        >
          <input
            name="q"
            defaultValue={keyword}
            className="w-full rounded-xl px-5 py-4 text-slate-900 outline-none"
            placeholder="영화, 감독, 배우, 블로그 글을 검색해보세요"
          />

          <button className="rounded-xl bg-sky-500 px-6 font-semibold text-white hover:bg-sky-600">
            Search
          </button>
        </form>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {!keyword ? (
          <p className="rounded-2xl bg-sky-50 p-8 text-center text-slate-500">
            검색어를 입력하면 결과가 표시됩니다.
          </p>
        ) : (
          <>
            <h2 className="mb-10 text-2xl font-bold text-slate-950">
              “{keyword}” 검색 결과
            </h2>

            <section className="mb-16">
              <h3 className="mb-6 text-xl font-bold text-slate-950">
                Movies ({movies.length})
              </h3>

              {movies.length === 0 ? (
                <p className="rounded-2xl bg-sky-50 p-6 text-slate-500">
                  일치하는 영화가 없습니다.
                </p>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {movies.map((movie) => (
                    <Link
                      key={movie.id}
                      href={`/movies?movie=${movie.slug}`}
                      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="aspect-video overflow-hidden bg-gradient-to-br from-sky-100 to-slate-100">
                        {movie.thumbnail_url && (
                          <img
                            src={movie.thumbnail_url}
                            alt={movie.title_ko || movie.title_en || "Movie"}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>

                      <div className="p-4">
                        <h4 className="font-semibold text-slate-950">
                          {movie.title_ko || movie.title_en}
                        </h4>
                        <p className="mt-1 text-sm text-slate-500">
                          {movie.year || "Classic"} · {movie.genre || "Movie"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h3 className="mb-6 text-xl font-bold text-slate-950">
                Blog Articles ({posts.length})
              </h3>

              {posts.length === 0 ? (
                <p className="rounded-2xl bg-sky-50 p-6 text-slate-500">
                  일치하는 블로그 글이 없습니다.
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="aspect-video overflow-hidden bg-gradient-to-br from-sky-100 to-slate-100">
                        {post.thumbnail_url && (
                          <img
                            src={post.thumbnail_url}
                            alt={post.title_ko || post.title_en || "Blog"}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>

                      <div className="p-6">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">
                          {post.category || "Cinema"}
                        </p>

                        <h4 className="text-lg font-bold text-slate-950">
                          {post.title_ko || post.title_en}
                        </h4>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                          {post.excerpt_ko || post.excerpt_en || "요약이 없습니다."}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </section>
    </main>
  );
}