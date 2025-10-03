import Image from "next/image";
import logo from "../../public/logo.JPG";

export default function Footer() {
  return (
    <>
      <h1>Footer</h1>
      <Image src={logo} alt="logo" width="220" height="auto" priority="true" />
    </>
  );
}
