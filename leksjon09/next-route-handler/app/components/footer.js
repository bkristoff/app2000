import Image from "next/image";
import logo from "../../public/logo.jpg";

export default function Footer() {
  return (
    <>
      <h1>Footer</h1>
      {/* Høyden regnes ut automatisk fra bildets proporsjoner (statisk import). */}
      <Image src={logo} alt="logo" width={220} preload />
    </>
  );
}
