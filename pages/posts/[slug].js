import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function BlogDetails({ post }) {
  console.log(post);
  const { featuredImage, title, requirements, content } = post.fields;
  return (
    <div>
      <div className="banner">
        <Image
          src={`https:${featuredImage.fields.file.url}`}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
          alt={featuredImage.fields.title}
        />
        <h2>{title}</h2>
      </div>
      <div className="reqs">
        <h3>Requirements:</h3>
        {requirements.map(req => (
          <span key={req}>{req}</span>
        ))}
      </div>
      <div className="content">
        <div>{documentToReactComponents(content)}</div>
      </div>
    </div>
  );
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

// get the paths for eash post
export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "webdev",
  });

  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

// get the content of each post based on the params generated above
// export async function getStaticProps(context) {
export async function getStaticProps({ params }) {
  // const res = await client.getEntries({
  const { items } = await client.getEntries({
    content_type: "webdev",
    "fields.slug": params.slug,
  });

  return {
    props: { post: items[0] },
  };
}
