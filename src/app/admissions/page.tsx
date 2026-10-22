import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Admissions",
  description: "How to join Worldwide Schoolhouse, and how to book a free trial week.",
  alternates: { canonical: "/admissions" },
};

const faqs = [
  {
    q: "When can my child start?",
    a: "Any time. We take new students throughout the year and place them in a class that suits their level, not just their age.",
  },
  {
    q: "Which curriculum do you follow?",
    a: "A broad international curriculum in the younger years, leading to recognised international exam pathways in Upper School. We'll explain the options during your first call.",
  },
  {
    q: "What equipment is needed?",
    a: "A laptop or tablet with a camera, headphones and a reliable internet connection. A quiet corner helps more than any gadget.",
  },
  {
    q: "Do you offer reports and transcripts?",
    a: "Yes. Families receive written reports each term, and we provide transcripts for transfers and university applications.",
  },
];

export default function Admissions() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">Admissions</p>
          <h1>
            Start with a conversation, <em>then a trial week.</em>
          </h1>
          <p className="lede">
            No entrance exams and no pressure. We want your child to try real classes before anyone
            makes a decision.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-no">Questions families ask</span>
          </div>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint" id="apply">
        <div className="wrap contact-grid">
          <div>
            <p className="eyebrow">Book a trial lesson</p>
            <h2 className="h-mid">Tell us a little about your child.</h2>
            <p>
              We reply within two working days to arrange a call. You can also write directly to{" "}
              <a href={`mailto:${site.contact.admissionsEmail}`}>{site.contact.admissionsEmail}</a>.
            </p>
          </div>
          <ContactForm defaultTopic="Booking a trial lesson" />
        </div>
      </section>
    </>
  );
}
