"use client";

import { useState } from "react";

import { BlogCard } from "@/components/BlogCard";
import { blogCategories, blogCategoryLabel } from "@/lib/format";
import type { BlogPost } from "@/lib/types";

const ALL = "sve";

export function BlogCategoryFilter({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState(ALL);

  const usedCategories = blogCategories.filter((c) =>
    posts.some((post) => post.category === c.value),
  );

  const filtered =
    category === ALL ? posts : posts.filter((post) => post.category === category);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
      <aside>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          Kategorije
        </h2>
        <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          <button
            type="button"
            onClick={() => setCategory(ALL)}
            className={`rounded-full px-4 py-2 text-left text-sm font-medium transition lg:rounded-xl ${
              category === ALL ? "bg-accent text-white" : "bg-surface text-navy hover:bg-black/5"
            }`}
          >
            Svi tekstovi ({posts.length})
          </button>
          {usedCategories.map((c) => {
            const count = posts.filter((post) => post.category === c.value).length;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value)}
                className={`rounded-full px-4 py-2 text-left text-sm font-medium transition lg:rounded-xl ${
                  category === c.value ? "bg-accent text-white" : "bg-surface text-navy hover:bg-black/5"
                }`}
              >
                {blogCategoryLabel(c.value)} ({count})
              </button>
            );
          })}
        </div>
      </aside>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {filtered.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
