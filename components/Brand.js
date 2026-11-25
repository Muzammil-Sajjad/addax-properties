import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/data";

// Logo lockup: the Addax icon in a dark tile + wordmark (works on light and dark backgrounds).
export default function Brand({ dark = false, onClick }) {
  return (
    <Link href="/" className={`brand ${dark ? "brand--dark" : ""}`} aria-label={`${site.name} home`} onClick={onClick}>
      <span className="brand-tile">
        <Image src="/images/icon.png" alt="" width={30} height={38} priority />
      </span>
      <span className="brand-words">
        <span className="brand-name">ADDAX</span>
        <span className="brand-sub">{site.sub}</span>
      </span>
    </Link>
  );
}
