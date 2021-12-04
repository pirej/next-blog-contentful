import Image from "next/image";
import Link from "next/link";

function PostCard({ post }) {
  const { title, slug, featuredImage, thumbnail } = post.fields;
  return (
    <div className="card">
      <div className="featured">
        <div className="image-wrapper">
          <Image
            src={`https:${thumbnail.fields.file.url}`}
            width="392"
            height="252"
            // width="600"
            // height="386"
            // width={thumbnail.fields.file.details.image.width}
            // height={thumbnail.fields.file.details.image.height}
            alt={featuredImage.fields.file.title}
          />
        </div>
        <div className="actions">
          <Link href={`/posts/${slug}`}>
            <a className="a404 acard">Read more</a>
          </Link>
        </div>
      </div>
      <div className="content">
        <div className="info">
          <h4>{title}</h4>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default PostCard;
