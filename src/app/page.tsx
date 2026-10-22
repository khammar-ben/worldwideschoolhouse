import Link from "next/link";
import { WorldClocks } from "@/components/WorldClocks";
import { programs } from "@/content/programs";

type Kind = "live" | "self" | "one";

const week: { day: string; blocks: [string, Kind][] }[] = [
  { day: "Mon", blocks: [["Morning circle", "live"], ["Mathematics", "live"], ["Reading hour", "self"]] },
  { day: "Tue", blocks: [["Morning circle", "live"], ["Sciences", "live"], ["Language", "live"]] },
  { day: "Wed", blocks: [["Morning circle", "live"], ["Writing studio", "live"], ["Tutor check-in", "one"]] },
  { day: "Thu", blocks: [["Morning circle", "live"], ["History & geography", "live"], ["Practice", "self"]] },
  { day: "Fri", blocks: [["Project Friday", "live"], ["Show & tell", "live"], ["Free afternoon", "self"]] },
];

const legend: Record<Kind, string> = { live: "Live class", self: "Independent work", one: "One-to-one" };

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Live online school · Ages 6 – 18</p>
            <h1>
              School, wherever you <em>happen to be</em> this year.
            </h1>
            <p className="lede">
              Worldwide Schoolhouse is a small online school for families who move, travel, or
              simply want something better. Real teachers, classes of twelve or fewer, and a
              timetable built around your time zone.
            </p>
            <div className="hero-actions">
              <Link href="/admissions#apply" className="btn">
                Book a trial lesson
              </Link>
              <Link href="/programs" className="link-arrow">
                See the programs
              </Link>
            </div>
          </div>
          <WorldClocks />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-no">01</span>
            <h2>What we believe a school should be</h2>
          </div>
          <div className="principles">
            <article>
              <h3>Small enough to notice.</h3>
              <p>
                No class is larger than twelve. Teachers learn how each child thinks, where they
                get stuck, and what makes them light up.
              </p>
            </article>
            <article>
              <h3>Live, not recorded.</h3>
              <p>
                Lessons happen face to face on screen, with discussion and questions. Recordings
                exist for revision — never as a replacement.
              </p>
            </article>
            <article>
              <h3>Portable on purpose.</h3>
              <p>
                Move country mid-year and nothing changes but the view from the window. Same
                teachers, same friends, same records.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <div className="section-head">
            <span className="section-no">02</span>
            <h2>Programs</h2>
            <Link href="/programs" className="link-arrow head-link">
              All details
            </Link>
          </div>
          <ul className="program-list">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link href={`/programs#${p.slug}`}>
                  <span className="pl-name">{p.name}</span>
                  <span className="pl-ages">Ages {p.ages}</span>
                  <span className="pl-summary">{p.summary}</span>
                  <span className="pl-hours">{p.hours}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-no">03</span>
            <h2>A week at the Schoolhouse</h2>
          </div>
          <p className="section-intro">
            A typical Middle School week. Mornings are live and shared; afternoons are for
            reading, practice and getting outside. Times shift to suit each class&apos;s region.
          </p>
          <div className="timetable" role="table" aria-label="Sample weekly timetable">
            {week.map((d) => (
              <div className="tt-day" role="row" key={d.day}>
                <div className="tt-label" role="rowheader">
                  {d.day}
                </div>
                {d.blocks.map(([title, kind]) => (
                  <div className={`tt-block tt-${kind}`} role="cell" key={title}>
                    {title}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <ul className="tt-legend">
            {(Object.keys(legend) as Kind[]).map((k) => (
              <li key={k}>
                <i className={`tt-${k}`} /> {legend[k]}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <div className="section-head">
            <span className="section-no">04</span>
            <h2>How joining works</h2>
          </div>
          <ol className="steps">
            <li>
              <h3>Write to us</h3>
              <p>Tell us about your child, where you live and what you&apos;re looking for.</p>
            </li>
            <li>
              <h3>A conversation</h3>
              <p>A thirty-minute video call with a teacher — for you and your child together.</p>
            </li>
            <li>
              <h3>A trial week</h3>
              <p>Your child joins real classes for a week, free of charge, before anyone decides.</p>
            </li>
            <li>
              <h3>Welcome</h3>
              <p>We set up the timetable, introduce the tutor, and school begins.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="closing">
        <div className="wrap closing-inner">
          <h2>
            Have a question? <em>Ask a teacher,</em> not a call centre.
          </h2>
          <Link href="/contact" className="btn btn-light">
            Write to us
          </Link>
        </div>
      </section>
    </>
  );
}
