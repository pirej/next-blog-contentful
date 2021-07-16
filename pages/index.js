import { createClient } from "contentful";
import PostCard from "../components/PostCard";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div className="postGrid">
      {posts.map(post => (
        <PostCard key={post.sys.id} post={post} />
      ))}
    </div>
  );
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
