"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/config/site";
import { LogoMark } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} — home`}>
          <LogoMark />
          <span className="brand-name">
            Worldwide <em>Schoolhouse</em>
          </span>
        </Link>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav id="site-nav" className={`site-nav${open ? " is-open" : ""}`}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname.startsWith(item.href) ? "is-active" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/admissions#apply" className="btn btn-small">
            Book a trial lesson
          </Link>
        </nav>
      </div>
    </header>
  );
}
