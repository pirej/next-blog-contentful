import Link from "next/link";
import Image from "next/image";
import logoimg from "../public/logo.svg";

export default function Layout({ children }) {
  let date = new Date().getFullYear();
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navlogo">
          <Link href="/" passHref>
            <Image src={logoimg} alt="logo" className="logo" />
          </Link>
        </div>
        <div>
          <Link href="#">
            <a className="link">link1</a>
          </Link>
          <Link href="#">
            <a className="link">link2</a>
          </Link>
          <Link href="#">
            <a className="link">link3</a>
          </Link>
        </div>
      </nav>
      <header>
        <Link href="/">
          <a>
            <h1>
              <span>Trying to Learn</span>
              <span>Web Development</span>
            </h1>
            <h2>New tricks for Old dogs</h2>
          </a>
        </Link>
      </header>

      <div className="page-content">{children}</div>

      <footer>
        <p>&copy; WebDev.Club {date}</p>
      </footer>
    </div>
  );
}
