"use client";
import { getBlogPost } from "@/lib/getBlogPost";
import { use, useEffect, useMemo, useState } from "react";
import BlogPostRenderer, { type BlogPost } from "@/components/BlogPostRenderer";

export default function ClientBlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [data, setData] = useState<Record<string, unknown>>();
  const blogPost = useMemo<BlogPost|null>(() => {
    if(data?.blogPost) {
      return data.blogPost as BlogPost;
    }

    return null;
  }, [data]);

  useEffect(() => {
    (async () => {
      // DANGER! Don't do this, because you will expose your API token to the world
      const data = await getBlogPost(
        slug,
        process.env.NEXT_PUBLIC_DANGEROUS_DONT_DO_THIS_DATOCMS_GRAPHQL_TOKEN!,
      );
      if (data) {
        setData(data);
      } else {
        setData(undefined);
      }
    })();
  }, [slug]);

  if(!blogPost) {
    return <p>Loading...</p>
  }
  return <BlogPostRenderer blogPost={blogPost} />;
}
