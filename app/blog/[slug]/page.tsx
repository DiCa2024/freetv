import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

type BlogPost = {
  id: number;
  title_ko: string | null;
  title_en: string | null;
  slug: string;
  category: string | null;
  content_ko: string | null;
  content_en: string | null;
  thumbnail_url: string | null;
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("id, title_ko, title_en, slug, category, content_ko, content_en, thumbnail_url")
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

  const { data: relatedData } = await supabase
    .from("blog_posts")
    .select("id, title_ko, title_en, slug, thumbnail_url")
    .eq("is_visible", true)
    .eq("category", blogPost.category)
    .neq("slug", slug)
    .limit(3);

  const recentPosts = (recentData || []) as BlogPost[];
  const relatedPosts = (relatedData || []) as BlogPost[];

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
                  src={blogPost.thumbnail_url}
                  alt={blogPost.title_ko || blogPost.title_en || "Blog thumbnail"}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-slate mt-12 max-w-none">
              {(blogPost.content_ko || blogPost.content_en || "")
                .split("\n")
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          </div>

          <aside className="h-fit rounded-3xl bg-sky-50 p-6 ring-1 ring-sky-100">
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
                        src={related.thumbnail_url}
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