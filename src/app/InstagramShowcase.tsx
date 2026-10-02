"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Post = {
  id: string;
  imageUrl: string | null;
  permalink: string;
  caption: string | null;
};

export default function InstagramShowcase({
  posts,
  handle,
}: {
  posts: Post[];
  handle: string;
}) {
  const shown = posts.filter((p) => p.imageUrl).slice(0, 6);

  if (shown.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
      {shown.map((post, i) => (
        <motion.a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="group relative block aspect-square overflow-hidden rounded-xl"
          aria-label={post.caption ? `Open Instagram post: ${post.caption}` : "Open Instagram post"}
        >
          <Image
            src={post.imageUrl as string}
            alt={post.caption ?? `Recent post from @${handle}`}
            fill
            sizes="(max-width: 700px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold tracking-wide uppercase">
              View on Instagram
            </span>
          </span>
        </motion.a>
      ))}
    </div>
  );
}
