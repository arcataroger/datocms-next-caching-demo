"use client";
import { getBlogPost } from "@/lib/getBlogPost";
import { useEffect, useState, use } from "react";

export default function ClientBlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [data, setData] = useState<object>();

  useEffect(() => {
    (async () => {
      // DANGER! Don't do this, because you will expose your API token to the world
      const data = await getBlogPost(slug, process.env.NEXT_PUBLIC_DANGEROUS_DONT_DO_THIS_DATOCMS_GRAPHQL_TOKEN!);
      if (data) {
        setData(data);
      } else {
        setData(undefined);
      }
    })();
  }, [slug]);

  return (
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
}
