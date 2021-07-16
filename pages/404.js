import Image from "next/image";
import Link from "next/link";
import backImage from "../public/404.jpg";

export default function NotFound() {
  return (
    <div>
      <h2 className="title404">Sorry, nothing to see here.</h2>
      <Image
        src={backImage}
        width="1200"
        height="300"
        alt="404 - page not found"
      />
      <Link href="/">
        <a className="a404">Go Home</a>
      </Link>
    </div>
  );
}
