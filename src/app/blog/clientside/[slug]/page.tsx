import { BLOG_POST_QUERY } from "@/app/blog/clientside/[slug]/blog-query.graphql";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const response = await fetch("https://graphql.datocms.com/", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DANGEROUS_DONT_DO_THIS_DATOCMS_GRAPHQL_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify({
        query: BLOG_POST_QUERY,
        variables: { slug: slug },
      }),
    });

    const { data } = await response.json();

    if (
      !response.ok ||
      (Array.isArray(data) && data[0]?.type === "api_error")
    ) {
      throw new Error(
        `Encountered error ${data[0].attributes.code} while fetching.`,
        { cause: data },
      );
    }

    return (
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message, error.cause);
      return (
        <div>
          <h2>Error fetching from DatoCMS GraphQL</h2>
          <pre>
            <code>{JSON.stringify(error.cause, null, 2)}</code>
          </pre>
        </div>
      );
    } else {
      console.error('Unknown error', error)
    }
  }
}
