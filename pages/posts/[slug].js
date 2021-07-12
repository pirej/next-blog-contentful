import { createClient } from "contentful";

export default function BlogDetails({ post }) {
  console.log(post);
  return <div>Blog Details</div>;
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
