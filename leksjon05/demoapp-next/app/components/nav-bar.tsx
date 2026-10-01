import Link from "next/link";

export default function NavBar() {
  return (
    <div>
      <Link href="/">Hjem</Link> &nbsp;&#9734;&nbsp;
      <Link href="/butikk">Butikk</Link> &nbsp;&#9734;&nbsp;
      <Link href="/faq">FAQ</Link> &nbsp;&#9734;&nbsp;
      <Link href="/om">Om</Link>
    </div>
  );
}
