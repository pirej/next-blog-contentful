import Image from "next/image";
import Link from "next/link";

function PostCard({ post }) {
  const { title, slug, featuredImage, thumbnail } = post.fields;
  return (
    <div className="card">
      <div className="featured">
        <Image
          src={`https:${thumbnail.fields.file.url}`}
          width="600"
          height="386"
          // width={thumbnail.fields.file.details.image.width}
          // height={thumbnail.fields.file.details.image.height}
          alt={featuredImage.fields.file.title}
        />
      </div>
      <div className="content">
        <div className="info">
          <h4>{title}</h4>
        </div>
        <div className="actions">
          <Link href={`/posts/${slug}`}>
            <a>Read more</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
