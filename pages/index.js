import { createClient } from "contentful";

export default function Home({ posts }) {
  console.log(posts);
  return <div>home content</div>;
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: "webdev",
  });

  return {
    props: {
      posts: res.items,
    },
  };
}
