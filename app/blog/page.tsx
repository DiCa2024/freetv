import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type BlogPost = {
  id: number;
  title_ko: string;
  title_en: string;
  slug: string;
  category: string | null;
  excerpt_ko: string | null;
  excerpt_en: string | null;
  thumbnail_url: string | null;
  is_visible: boolean;
  created_at: string;
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const keyword = q?.trim() || "";

  let query = supabase
    .from("blog_posts")
    .select(
      "id, title_ko, title_en, slug, category, excerpt_ko, excerpt_en, thumbnail_url, is_visible, created_at"
    )
    .eq("is_visible", true);

  if (keyword) {
    query = query.or(
      `title_ko.ilike.%${keyword}%,title_en.ilike.%${keyword}%,category.ilike.%${keyword}%,excerpt_ko.ilike.%${keyword}%,excerpt_en.ilike.%${keyword}%,content_ko.ilike.%${keyword}%,content_en.ilike.%${keyword}%`
    );
  }

  const { data, error } = await query.order("created_at", {
    ascending: false,
  });

  if (error) {
    console.error(error);
  }

  const posts = (data || []) as BlogPost[];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="bg-gradient-to-b from-sky-100 to-white px-6 py-24 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          BLOG
        </p>

        <h1 className="text-5xl font-bold text-slate-950">
          Open Cinema Notes
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-slate-600">
          퍼블릭 도메인 영화, 고전 영화 감상법, 작품 해설을 쉽고 아름답게 정리합니다.
        </p>

        <form
          action="/blog"
          className="mx-auto mt-10 flex max-w-2xl rounded-2xl bg-white p-2 shadow-lg ring-1 ring-sky-100"
        >
          <input
            name="q"
            defaultValue={keyword}
            className="w-full rounded-xl px-5 py-4 outline-none"
            placeholder="블로그 글 제목이나 내용을 검색해보세요"
          />

          <button className="rounded-xl bg-sky-500 px-6 font-semibold text-white hover:bg-sky-600">
            Search
          </button>
        </form>

        {keyword && (
          <p className="mt-6 text-center text-slate-500">
            "{keyword}" 검색 결과 {posts.length}건
          </p>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {posts.length === 0 ? (
          <p className="rounded-2xl bg-sky-50 p-8 text-slate-500">
            {keyword
              ? "검색 결과가 없습니다."
              : "아직 등록된 글이 없습니다."}
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
                  {post.thumbnail_url ? (
                    <img
                      src={post.thumbnail_url}
                      alt={post.title_ko || post.title_en}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>

                <div className="p-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">
                    {post.category || "Cinema"}
                  </p>

                  <h2 className="text-xl font-bold text-slate-950">
                    {post.title_ko || post.title_en}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {post.excerpt_ko || post.excerpt_en || "본문 요약이 없습니다."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}