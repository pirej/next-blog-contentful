import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

const fetcher = url => fetch(url).then(res => res.json());

function PostCard({ index }) {
  const { data } = useSWR(`/api/posts?pageIndex=${index}`, fetcher);

  if (!data) {
    return <h2>Loading...</h2>;
  } else {
    // console.log("data is", data.items);
    return data.items.map(item => (
      <div className="card" key={item.sys.id}>
        <div className="featured">
          <Image
            src={`https:${item.fields.thumbnail.fields.file.url}`}
            width="392"
            height="252"
            // width="600"
            // height="386"
            // width={thumbnail.fields.file.details.image.width}
            // height={thumbnail.fields.file.details.image.height}
            alt={item.fields.featuredImage.fields.file.title}
          />
          <div className="actions">
            <Link href={`/posts/${item.fields.slug}`}>
              <a className="a404 acard">Read more</a>
            </Link>
          </div>
        </div>
        <div className="content">
          <div className="info">
            <h4>{item.fields.title}</h4>
            <hr />
          </div>
        </div>
      </div>
    ));
  }
}

export default PostCard;
