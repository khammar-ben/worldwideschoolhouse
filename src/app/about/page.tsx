import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `Why ${site.name} exists and how we teach.`,
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">About the school</p>
          <h1>
            Built for children whose <em>address keeps changing.</em>
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="wrap prose-grid">
          <aside className="prose-aside">
            <span className="section-no">Our story</span>
          </aside>
          <div className="prose">
            <p className="lede">
              Worldwide Schoolhouse started with a simple frustration: families who move between
              countries were forced to choose between a new school every two years or a pile of
              worksheets at the kitchen table.
            </p>
            <p>
              We thought there should be a third option — a proper school, with teachers who stay,
              classmates who become friends, and a curriculum that holds together from one year to
              the next. It just happens to meet online.
            </p>
            <p>
              Our students log in from many countries. Some are children of diplomats and
              engineers; some live somewhere without a good local school; some are athletes,
              performers or simply children who learn better at their own pace.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <div className="section-head">
            <span className="section-no">How we teach</span>
          </div>
          <dl className="facts">
            <div>
              <dt>12</dt>
              <dd>Maximum students in any live class.</dd>
            </div>
            <div>
              <dt>1</dt>
              <dd>Personal tutor for every student, every year.</dd>
            </div>
            <div>
              <dt>3</dt>
              <dd>Teaching languages: English, French and Arabic.</dd>
            </div>
            <div>
              <dt>0</dt>
              <dd>Pre-recorded courses passed off as teaching.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap prose-grid">
          <aside className="prose-aside">
            <span className="section-no">Our teachers</span>
          </aside>
          <div className="prose">
            <p>
              Every teacher is qualified in their subject and trained to teach online — which is a
              different craft from teaching in a room. They work in small teams by age group, so a
              student is known by more than one adult.
            </p>
            <p>
              Interested in teaching with us? <Link href="/contact">Get in touch</Link> and choose
              &ldquo;Teaching with us&rdquo; as the topic.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
