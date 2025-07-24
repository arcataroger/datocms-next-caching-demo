import { BLOG_POST_QUERY } from "@/lib/blog-query.graphql";

export const getBlogPost = async (slug: string, apiToken:string): Promise<object> => {
  const response = await fetch("https://graphql.datocms.com/", {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    method: "POST",
    body: JSON.stringify({
      query: BLOG_POST_QUERY,
      variables: { slug: slug },
    }),
  });

  const { data } = await response.json();

  if (!response.ok || (Array.isArray(data) && data[0]?.type === "api_error")) {
    throw new Error(
      `Encountered error ${data[0].attributes.code} while fetching.`,
      { cause: data },
    );
  }

  return data;
};
