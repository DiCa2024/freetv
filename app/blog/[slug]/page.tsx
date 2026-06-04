import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogPost = {
  id: number;
  title_ko: string | null;
  title_en: string | null;
  slug: string;
  category: string | null;
  content_ko: string | null;
  content_en: string | null;
  thumbnail_url: string | null;
  related_movie_slug: string | null;
};

type RelatedMovie = {
  id: number;
  title_ko: string | null;
  title_en: string | null;
  slug: string;
  year: number | null;
  genre: string | null;
  director: string | null;
  thumbnail_url: string | null;
  poster_url: string | null;
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select(
      "id, title_ko, title_en, slug, category, content_ko, content_en, thumbnail_url, related_movie_slug"
    )
    .eq("slug", slug)
    .eq("is_visible", true)
    .single();

  if (error || !post) {
    notFound();
  }

  const blogPost = post as BlogPost;

  const { data: recentData } = await supabase
    .from("blog_posts")
    .select("id, title_ko, title_en, slug")
    .eq("is_visible", true)
    .neq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(5);

  const relatedQuery = supabase
    .from("blog_posts")
    .select("id, title_ko, title_en, slug, thumbnail_url")
    .eq("is_visible", true)
    .neq("slug", slug)
    .limit(3);

  const { data: relatedData } = blogPost.category
    ? await relatedQuery.eq("category", blogPost.category)
    : await relatedQuery.order("created_at", { ascending: false });

  const { data: relatedMovieData } = blogPost.related_movie_slug
    ? await supabase
        .from("movies")
        .select(
          "id, title_ko, title_en, slug, year, genre, director, thumbnail_url, poster_url"
        )
        .eq("slug", blogPost.related_movie_slug)
        .eq("is_visible", true)
        .single()
    : { data: null };

  const recentPosts = (recentData || []) as BlogPost[];
  const relatedPosts = (relatedData || []) as BlogPost[];
  const relatedMovie = relatedMovieData as RelatedMovie | null;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <article className="mx-auto max-w-7xl px-6 py-20">
        <Link
          href="/blog"
          className="mb-10 inline-flex text-sm font-semibold text-sky-600 hover:text-sky-700"
        >
          ← 블로그로 돌아가기
        </Link>

        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-sky-500">
              {blogPost.category || "Cinema"}
            </p>

            <h1 className="text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
              {blogPost.title_ko || blogPost.title_en}
            </h1>

            {blogPost.thumbnail_url && (
              <div className="mt-10 overflow-hidden rounded-[2rem] bg-sky-100">
                <img
                  src={blogPost.thumbnail_url.trim()}
                  alt={blogPost.title_ko || blogPost.title_en || "Blog thumbnail"}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="mt-12 text-slate-700">
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h2: ({ children }) => (
        <h2 className="mb-5 mt-12 text-3xl font-bold text-slate-950">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mb-4 mt-10 text-2xl font-bold text-slate-950">
          {children}
        </h3>
      ),
      p: ({ children }) => (
        <p className="mb-6 text-lg leading-8 text-slate-700">
          {children}
        </p>
      ),
      ul: ({ children }) => (
        <ul className="mb-8 ml-6 list-disc space-y-2 text-lg leading-8 text-slate-700">
          {children}
        </ul>
      ),
      li: ({ children }) => <li>{children}</li>,
      strong: ({ children }) => (
        <strong className="font-bold text-slate-950">{children}</strong>
      ),
    }}
  >
    {blogPost.content_ko || blogPost.content_en || ""}
  </ReactMarkdown>
</div>
          </div>

          <aside className="space-y-6">
            {relatedMovie && (
              <div className="rounded-3xl bg-sky-50 p-6 ring-1 ring-sky-100">
                <h2 className="mb-5 text-lg font-bold text-slate-950">
                  Related Movie
                </h2>

                <Link
                  href={`/movies?movie=${relatedMovie.slug}`}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-sky-100 to-slate-100">
                    {relatedMovie.thumbnail_url || relatedMovie.poster_url ? (
                      <img
                        src={(
                          relatedMovie.thumbnail_url ||
                          relatedMovie.poster_url ||
                          ""
                        ).trim()}
                        alt={relatedMovie.title_ko || relatedMovie.title_en || "Movie"}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-slate-950">
                      {relatedMovie.title_ko || relatedMovie.title_en}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {relatedMovie.year || "Classic"} ·{" "}
                      {relatedMovie.genre || "Movie"}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {relatedMovie.director || "Unknown Director"}
                    </p>

                    <p className="mt-4 text-sm font-bold text-sky-600">
                      영화 보기 →
                    </p>
                  </div>
                </Link>
              </div>
            )}

            <div className="h-fit rounded-3xl bg-sky-50 p-6 ring-1 ring-sky-100">
              <h2 className="mb-5 text-lg font-bold text-slate-950">
                Recent Posts
              </h2>

              <div className="space-y-4">
                {recentPosts.map((recent) => (
                  <Link
                    key={recent.id}
                    href={`/blog/${recent.slug}`}
                    className="block text-sm font-semibold leading-6 text-slate-700 hover:text-sky-600"
                  >
                    {recent.title_ko || recent.title_en}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-6 text-2xl font-bold text-slate-950">
              Related Articles
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-sky-100 to-slate-100">
                    {related.thumbnail_url && (
                      <img
                        src={related.thumbnail_url.trim()}
                        alt={related.title_ko || related.title_en || "Related article"}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-2 text-base font-bold text-slate-950">
                      {related.title_ko || related.title_en}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}