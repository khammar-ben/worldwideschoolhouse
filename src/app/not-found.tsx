import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-head not-found">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>
          This page has <em>wandered off.</em>
        </h1>
        <p className="lede">It may have moved, or never existed. Let&apos;s get you back to class.</p>
        <Link href="/" className="btn">
          Back to the homepage
        </Link>
      </div>
    </section>
  );
}
