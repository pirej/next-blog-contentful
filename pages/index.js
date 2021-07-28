import { useState } from "react";
import { createClient } from "contentful";
import PostCard from "../components/PostCard";

export default function Home() {
  const [pageIndex, setPageIndex] = useState(0);
  return (
    <div className="postGrid">
      <PostCard index={pageIndex} />
      <div style={{ display: "none" }}>
        <PostCard index={pageIndex + 1} />
      </div>
      <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
      <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
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
    revalidate: 1,
  };
}
