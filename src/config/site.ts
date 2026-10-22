/**
 * Everything specific to the business lives here.
 * Change the values below once the domain and mailboxes are ready —
 * the whole site (header, footer, contact page, SEO) reads from this file.
 */
export const site = {
  name: "Worldwide Schoolhouse",
  domain: "worldwideschoolhouse.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://worldwideschoolhouse.com",
  description:
    "A live online school for children ages 6 to 18. Small classes, real teachers, and a timetable that follows your family across time zones.",
  founded: 2026,

  contact: {
    email: "hello@worldwideschoolhouse.com",
    admissionsEmail: "admissions@worldwideschoolhouse.com",
    // Leave empty ("") to hide from the site
    phone: "",
    whatsapp: "",
    address: ["Registered office", "City, Country"],
    hours: "Monday – Friday, 08:00 – 18:00 GMT",
  },

  // Leave href empty to hide a network
  socials: [
    { label: "Instagram", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "Facebook", href: "" },
  ],
};

export const nav = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
] as const;
