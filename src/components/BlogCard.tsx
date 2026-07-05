import Link from "next/link";
import Image from "next/image";

import { PlaceholderImage } from "@/components/PlaceholderImage";
import { blogCategoryLabel, formatDate } from "@/lib/format";
import type { BlogPost } from "@/lib/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:border-accent/20 hover:shadow-lg"
    >
      <div className="relative h-40 w-full overflow-hidden">
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage label={`Naslovna slika: ${post.title}`} className="h-40 w-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2">
          {post.category && (
            <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-accent">
              {blogCategoryLabel(post.category)}
            </span>
          )}
          <span className="text-xs text-muted">{formatDate(post.publishedAt)}</span>
        </div>
        <h3 className="font-semibold text-navy group-hover:text-accent">
          {post.title}
        </h3>
        <p className="text-sm text-muted">{post.excerpt}</p>
      </div>
    </Link>
  );
}
