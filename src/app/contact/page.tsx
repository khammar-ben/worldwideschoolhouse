import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Write to ${site.name}. A teacher or member of our admissions team will reply.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  const { contact } = site;
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h1>
            Write to us. <em>A person will answer.</em>
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="wrap contact-grid">
          <aside className="contact-card">
            <dl>
              <div>
                <dt>General</dt>
                <dd>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </dd>
              </div>
              <div>
                <dt>Admissions</dt>
                <dd>
                  <a href={`mailto:${contact.admissionsEmail}`}>{contact.admissionsEmail}</a>
                </dd>
              </div>
              {contact.phone && (
                <div>
                  <dt>Telephone</dt>
                  <dd>
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                  </dd>
                </div>
              )}
              {contact.whatsapp && (
                <div>
                  <dt>WhatsApp</dt>
                  <dd>
                    <a
                      href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.whatsapp}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt>Office hours</dt>
                <dd>{contact.hours}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>
                  {contact.address.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
