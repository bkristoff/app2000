import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <Link href="/">Hjem</Link> &nbsp;&#9734;&nbsp;
      <Link href="/butikk">Butikk</Link> &nbsp;&#9734;&nbsp;
      <Link href="/faq">FAQ</Link> &nbsp;&#9734;&nbsp;
      <Link href="/om">Om</Link>
    </nav>
  );
}
