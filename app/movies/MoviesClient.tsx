"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Movie = {
  id: number;
  title_ko: string;
  title_en: string; 
  slug: string;
  year: number | null;
  genre: string | null;
  country: string | null;
  director: string | null;
  actors: string | null;
  language: string | null;
  description_ko: string | null;
  description_en: string | null;
  poster_url: string | null;
  thumbnail_url: string | null;
  watch_url: string | null;
  is_visible: boolean;
};

type Article = {
  id: number;
  title_ko: string | null;
  title_en: string | null;
  slug: string;
  related_movie_slug: string | null;
};

const genres = ["All", "Horror", "Comedy", "Drama", "Sci-Fi", "Animation", "Silent Films"];

export default function MoviesClient({
  movies,
  articles,
}: {
  movies: Movie[];
  articles: Article[];
}) {
  const searchParams = useSearchParams();
  const movieSlug = searchParams.get("movie");
  const query = searchParams.get("q") || "";

  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState(query);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!movieSlug) return;

    const targetMovie = movies.find((movie) => movie.slug === movieSlug);

    if (targetMovie) {
      setSelectedMovie(targetMovie);
    }
  }, [movieSlug, movies]);

  useEffect(() => {
  setSearchKeyword(query);
}, [query]);

  const closeModal = () => {
  setSelectedMovie(null);
  window.history.replaceState({}, "", "/movies");
  };

 const filteredMovies = movies.filter((movie) => {
  const matchesGenre =
    selectedGenre === "All" ||
    movie.genre?.toLowerCase().includes(selectedGenre.toLowerCase());

  const keyword = searchKeyword.toLowerCase().trim();

  const matchesSearch =
  keyword === "" ||
  movie.title_ko?.toLowerCase().includes(keyword) ||
  movie.title_en?.toLowerCase().includes(keyword) ||
  movie.genre?.toLowerCase().includes(keyword) ||
  movie.country?.toLowerCase().includes(keyword) ||
  movie.description_ko?.toLowerCase().includes(keyword) ||
  movie.description_en?.toLowerCase().includes(keyword);

  return matchesGenre && matchesSearch;
});

const relatedArticles = selectedMovie
  ? articles.filter(
      (article) => article.related_movie_slug === selectedMovie.slug
    )
  : [];

  return (
    <>
  
      <div className="mb-10 flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={
              selectedGenre === genre
                ? "rounded-full bg-sky-500 px-5 py-3 font-medium text-white"
                : "rounded-full bg-sky-50 px-5 py-3 font-medium text-sky-700 ring-1 ring-sky-100 hover:bg-sky-100"
            }
          >
            {genre}
          </button>
        ))}
      </div>

      <section>
        <h2 className="mb-6 text-3xl font-bold">
          {searchKeyword
  ? `"${searchKeyword}" 검색 결과`
  : selectedGenre === "All"
    ? "All Movies"
    : selectedGenre}
        </h2>

        {filteredMovies.length === 0 ? (
          <p className="rounded-2xl bg-sky-50 p-8 text-slate-500">
            아직 이 장르에 등록된 영화가 없습니다.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredMovies.map((movie) => (
              <button
                key={movie.id}
                onClick={() => setSelectedMovie(movie)}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-video overflow-hidden bg-gradient-to-br from-sky-100 to-slate-100">
                  {movie.thumbnail_url || movie.poster_url ? (
                  <img
                    src={(movie.thumbnail_url || movie.poster_url || "").trim()}
                    alt={movie.title_ko || movie.title_en}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold">{movie.title_ko || movie.title_en}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {movie.year || "Classic"} · {movie.genre || "Movie"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4">
          <div className="relative max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl md:p-8">
            <button
             onClick={closeModal}
             className="absolute right-5 top-5 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >
           닫기
            </button>

            <div className="grid gap-8 md:grid-cols-[260px_1fr]">
              <div className="flex items-center justify-center overflow-hidden rounded-3xl bg-sky-100 p-3">
                {selectedMovie.poster_url || selectedMovie.thumbnail_url ? (
                  <img
                   src={(selectedMovie.poster_url || selectedMovie.thumbnail_url || "").trim()}
                    alt={selectedMovie.title_en}
                   className="max-h-[70vh] w-full object-contain"
                  />
                ) : null}
              </div>

             <div className="pr-0 md:pr-10">
  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">
    {selectedMovie.genre || "Classic Movie"}
  </p>

  <h2 className="text-3xl font-bold text-slate-950 md:text-5xl">
    {selectedMovie.title_ko || selectedMovie.title_en}
  </h2>

  <p className="mt-3 text-sm text-slate-500">
    {selectedMovie.year || "Classic"}
    {selectedMovie.country ? ` · ${selectedMovie.country}` : ""}
  </p>

  <div className="mt-8">
    <h3 className="mb-3 text-lg font-bold text-slate-950">
      Summary
    </h3>

    <p className="text-base leading-8 text-slate-700">
      {selectedMovie.description_ko ||
        selectedMovie.description_en ||
        "No summary available."}
    </p>
  </div>

  {relatedArticles.length > 0 && (
    <div className="mt-8">
      <h3 className="mb-4 text-lg font-bold text-slate-950">
        Related Articles
      </h3>

      <div className="space-y-3">
        {relatedArticles.map((article) => (
          <a
            key={article.id}
            href={`/blog/${article.slug}`}
            className="block rounded-2xl bg-sky-50 p-4 text-sm font-semibold text-slate-700 ring-1 ring-sky-100 transition hover:bg-sky-100 hover:text-sky-600"
          >
            {article.title_ko || article.title_en}
          </a>
        ))}
      </div>
    </div>
  )}

  <div className="mt-8 flex flex-wrap gap-3">
    {selectedMovie.watch_url && (
      <a
        href={selectedMovie.watch_url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-sky-600"
      >
        Watch Movie
      </a>
    )}

    {relatedArticles.length > 0 && (
      <a
        href={`/blog/${relatedArticles[0].slug}`}
        className="inline-flex rounded-full bg-sky-50 px-6 py-3 text-sm font-bold text-sky-700 ring-1 ring-sky-100 transition hover:bg-sky-100"
      >
        Read Article
      </a>
    )}
  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}