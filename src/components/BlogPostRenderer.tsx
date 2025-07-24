import Image from "next/image";

export interface ResponsiveImage {
  src: string;
  width: number;
  height: number;
}

export interface Author {
  name: string;
  email: string;
  profilePicture: {
    responsiveImage: ResponsiveImage;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  bodyText: string;
  authors: Author[];
  coverImage: {
    responsiveImage: ResponsiveImage;
  };
}

export interface BlogPostProps {
  blogPost: BlogPost;
}

export default function BlogPostRenderer({ blogPost }: BlogPostProps) {
  const { title, bodyText, authors, coverImage } = blogPost;

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* Cover Image */}
      <div className="mb-8 overflow-hidden rounded-2xl">
        <Image
          src={coverImage.responsiveImage.src}
          width={coverImage.responsiveImage.width}
          height={coverImage.responsiveImage.height}
          alt={title}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold leading-tight mb-6">{title}</h1>

      {/* Authors */}
      <div className="flex items-center space-x-6 mb-10">
        {authors.map((author) => (
          <div key={author.email} className="flex items-center space-x-4">
            <Image
              src={author.profilePicture.responsiveImage.src}
              width={48}
              height={48}
              alt={author.name}
              className="rounded-full"
            />
            <div>
              <p className="text-lg font-medium">{author.name}</p>
              <p className="text-sm text-gray-500">{author.email}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Body Text */}
      <div className="prose prose-lg mx-auto">
        {bodyText
          .split("\n")
          .map((para, i) => (para.trim() ? <p key={i}>{para}</p> : null))}
      </div>

      <h2 className="text-2xl leading-tight my-6 text-gray-400">Debug</h2>
      <pre>
        <code className="text-wrap font-mono text-gray-400">{JSON.stringify(blogPost, null, 2)}</code>
      </pre>
    </article>
  );
}
