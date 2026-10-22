import Link from "next/link";
import { nav, site } from "@/config/site";
import { LogoMark } from "./Logo";

export function Footer() {
  const socials = site.socials.filter((s) => s.href);
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <LogoMark size={40} />
          <p>
            A small school with a large map. Live classes for children ages 6 to 18,
            wherever the family happens to live this year.
          </p>
        </div>

        <div>
          <h4>School</h4>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Write to us</h4>
          <ul>
            <li>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </li>
            <li>
              <a href={`mailto:${site.contact.admissionsEmail}`}>{site.contact.admissionsEmail}</a>
            </li>
            {site.contact.phone && (
              <li>
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a>
              </li>
            )}
          </ul>
        </div>

        {socials.length > 0 && (
          <div>
            <h4>Elsewhere</h4>
            <ul>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="wrap footer-base">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{site.domain}</span>
      </div>
    </footer>
  );
}
