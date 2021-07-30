import { useState } from "react";
import { createClient } from "contentful";
import PostCard from "../components/PostCard";
import { BsChevronBarRight } from "react-icons/bs";
import { BsChevronBarLeft } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import first from "../public/first.svg";
import last from "../public/last.svg";
import previous from "../public/left.svg";
import next from "../public/right.svg";

export default function Home() {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <div className="postGrid">
      <PostCard index={pageIndex} />
      <div style={{ display: "none" }}>
        <PostCard index={pageIndex + 1} />
      </div>
      <button className="Icons" onClick={() => setPageIndex(0)}>
        <Image src={first} width="18" height="18" alt="first" />
      </button>
      <button
        className="Icons"
        onClick={() => pageIndex > 0 && setPageIndex(pageIndex - 1)}
      >
        <Image src={previous} width="18" height="18" alt="previous" />
      </button>
      <button className="now Icons">{pageIndex}</button>
      <button
        className="Icons"
        onClick={() => pageIndex < 3 && setPageIndex(pageIndex + 1)}
      >
        <Image src={next} width="18" height="18" alt="next" />
      </button>
      <button className="Icons" onClick={() => setPageIndex(3)}>
        <Image className="test" src={last} width="18" height="18" alt="last" />
      </button>
      <style jsx>{`
        button {
          cursor: pointer;
        }
        .now {
          font-size: 1.2rem;
          color: #384e66;
          font-weight: 500;
          padding: 0.12rem 0.55rem 0rem 0.55rem;
        }
      `}</style>
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
