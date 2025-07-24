export const BLOG_POST_QUERY:string =
  //language=graphql
  `query BlogPostQuery($slug: String) {
    blogPost(filter: {slug: {eq: $slug}}) {
      id
      slug
      title
      bodyText
      authors {
        name
        email
        profilePicture {
          ...ImageFragment
        }
      }
      coverImage {
        ...ImageFragment
      }
    }
  }

  fragment ImageFragment on FileField {
    responsiveImage {
      src
      width
      height
    }
  }`;
