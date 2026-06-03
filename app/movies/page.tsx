import { supabase } from "@/lib/supabase";
import MoviesClient from "./MoviesClient";

type Movie = {
  id: number;
  title_en: string;
  slug: string;
  year: number | null;
  genre: string | null;
  director: string | null;
  actors: string | null;
  description_en: string | null;
  poster_url: string | null;
  thumbnail_url: string | null;
  watch_url: string | null;
  is_visible: boolean;
};

const genres = ["All", "Horror", "Comedy", "Drama", "Sci-Fi", "Animation", "Silent Films"];

export default async function MoviesPage() {
  const { data, error } = await supabase
    .from("movies")
     .select(
    "id, title_ko, title_en, slug, year, genre, director, actors, description_ko, description_en, poster_url, thumbnail_url, watch_url, is_visible, created_at"
     )
    .eq("is_visible", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  const movies = (data || []) as Movie[];

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
        <MoviesClient movies={movies} />
      </section>
    </main>
  );
}