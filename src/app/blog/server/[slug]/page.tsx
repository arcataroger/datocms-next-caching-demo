import { getBlogPost } from "@/lib/getBlogPost";
import BlogPostRenderer, { type BlogPost } from "@/components/BlogPostRenderer";

export default async function ServerBlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = (await getBlogPost(
    slug,
    process.env.DATOCMS_GRAPHQL_TOKEN!,
  )) as { blogPost: BlogPost };

  const blogPost = data.blogPost;

  return <BlogPostRenderer blogPost={blogPost} />;
}
