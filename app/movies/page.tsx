import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import MoviesClient from "./MoviesClient";

export const dynamic = "force-dynamic";

type Movie = {
  id: number;
  title_ko: string;
  title_en: string | null;
  slug: string;
  year: number | null;
  genre: string | null;
  country: string | null;
  language: string | null;
  director: string | null;
  actors: string | null;
  description_ko: string | null;
  description_en: string | null;
  poster_url: string | null;
  thumbnail_url: string | null;
  watch_url: string | null;
  is_visible: boolean;
  created_at: string;
};

const genres = ["All", "Horror", "Comedy", "Drama", "Sci-Fi", "Animation", "Silent Films"];

export default async function MoviesPage() {
  const { data, error } = await supabase
    .from("movies")
     .select(
      "id, title_ko, title_en, slug, year, genre, country, language, director, actors, description_ko, description_en, poster_url, thumbnail_url, watch_url, is_visible, created_at"
    )
    .eq("is_visible", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  const movies = (data || []) as Movie[];

  const { data: articleData } = await supabase
  .from("blog_posts")
  .select("id, title_ko, title_en, slug, related_movie_slug")
  .eq("is_visible", true);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="bg-gradient-to-b from-sky-100 to-white px-6 py-24 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          MOVIES
        </p>

        <h1 className="text-5xl font-bold text-slate-950">Movie Library</h1>

        <p className="mx-auto mt-5 max-w-2xl text-slate-600">
          퍼블릭 도메인 고전 영화를 장르별로 탐색해보세요.
        </p>

       <form
  action="/movies"
  className="mx-auto mt-10 flex max-w-2xl rounded-2xl bg-white p-2 shadow-lg ring-1 ring-sky-100"
>
  <input
    name="q"
    className="w-full rounded-xl px-5 py-4 outline-none"
    placeholder="영화 제목, 감독, 배우를 검색해보세요"
  />

  <button className="rounded-xl bg-sky-500 px-6 font-semibold text-white hover:bg-sky-600">
    Search
  </button>
</form>
      </section>

            <section className="mx-auto max-w-7xl px-6 py-12">
        <Suspense fallback={<div className="text-slate-500">Loading movies...</div>}>
          <MoviesClient movies={movies} articles={articleData || []} />
        </Suspense>
      </section>
    </main>
  );
}