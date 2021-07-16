import { createClient } from "contentful";
import Image from "next/image";
import styles from "./slug.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "../../components/Skeleton";

export default function BlogDetails({ post }) {
  // console.log(post);
  if (!post) return <Skeleton />;
  const { featuredImage, title, requirements, content } = post.fields;
  return (
    <div>
      <div className={styles.banner}>
        <Image
          src={`https:${featuredImage.fields.file.url}`}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
          alt={featuredImage.fields.title}
        />
        <h2>{title}</h2>
      </div>
      <div className={styles.requirements}>
        <h3>Requirements:</h3>
        {requirements.map(req => (
          <span key={req}>{req}</span>
        ))}
      </div>
      <div className={styles.content}>
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
    fallback: true,
  };
};

// get the content of each post based on the params generated above
// export async function getStaticProps(context) {
export async function getStaticProps({ params }) {
  // const res = await client.getEntries({
  const { items } = await client.getEntries({
    content_type: "webdev",
    "fields.slug": params.slug,
  })

  if(!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }


  return {
    props: { post: items[0] },
    revalidate: 1,
  };
}
