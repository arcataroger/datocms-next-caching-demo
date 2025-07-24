import { getBlogPost } from "@/lib/getBlogPost";

export default async function ServerBlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getBlogPost(slug, process.env.DATOCMS_GRAPHQL_TOKEN!);

  return (
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
}
