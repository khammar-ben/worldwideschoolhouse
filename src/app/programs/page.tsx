import type { Metadata } from "next";
import Link from "next/link";
import { programs } from "@/content/programs";

export const metadata: Metadata = {
  title: "Programs",
  description: "Lower, Middle and Upper School, plus Language Bridge courses.",
  alternates: { canonical: "/programs" },
};

export default function Programs() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">Programs</p>
          <h1>
            Four ways in, <em>one school.</em>
          </h1>
          <p className="lede">
            Every program shares the same teachers, the same values and the same small classes.
            What changes is the pace, the hours and what we ask of students.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap program-detail">
          {programs.map((p, i) => (
            <article id={p.slug} key={p.slug}>
              <header>
                <span className="section-no">{String(i + 1).padStart(2, "0")}</span>
                <h2>{p.name}</h2>
                <p className="pd-meta">
                  Ages {p.ages} <span aria-hidden="true">·</span> {p.hours}
                </p>
              </header>
              <div>
                <p>{p.summary}</p>
                <ul className="tags">
                  {p.subjects.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <Link href="/admissions#apply" className="link-arrow">
                  Ask about {p.name}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
