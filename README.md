# Worldwide Schoolhouse — website

Next.js 15 (App Router) + TypeScript. No UI framework, just hand-written CSS in `src/app/globals.css`.
The contact form sends email through **Zoho Mail SMTP** using Nodemailer.

```bash
npm install
cp .env.example .env.local   # then fill it in
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## What to edit

| What                                   | Where                              |
| -------------------------------------- | ---------------------------------- |
| Domain, emails, phone, address, socials | `src/config/site.ts`               |
| Programs (names, ages, hours, subjects) | `src/content/programs.ts`          |
| Contact form topics                     | `src/lib/validate.ts` → `topics`   |
| SMTP credentials / where mail goes      | `.env.local` (see `.env.example`)  |
| Colours & fonts                         | `src/app/globals.css` (`:root`) and `src/app/layout.tsx` |

Leave `phone`, `whatsapp` or a social `href` empty (`""`) and it's hidden from the site.

## Zoho Mail setup (one time)

1. **Add the domain in Zoho Mail** (mail.zoho.com → Admin Console → Domains → Add).
2. **At your domain registrar's DNS**, add the records Zoho shows you. They usually look like this:

   | Type | Host / Name        | Value                                   | Priority |
   | ---- | ------------------ | --------------------------------------- | -------- |
   | TXT  | `@`                | `zoho-verification=zbXXXXXXXX.zmverify.zoho.com` | — |
   | MX   | `@`                | `mx.zoho.com`                           | 10       |
   | MX   | `@`                | `mx2.zoho.com`                          | 20       |
   | MX   | `@`                | `mx3.zoho.com`                          | 50       |
   | TXT  | `@`                | `v=spf1 include:zohomail.com ~all`      | —        |
   | TXT  | `zmail._domainkey` | *(DKIM key generated in Zoho Admin → Email Authentication)* | — |
   | TXT  | `_dmarc`           | `v=DMARC1; p=none; rua=mailto:hello@yourdomain.com` | — |

   On the EU data centre use `mx.zoho.eu` etc. **Copy the exact values from your Zoho admin panel.** They're the source of truth.

3. **Create the mailboxes** (for example `hello@` and `admissions@`, or make `admissions@` an alias).
4. **Create an App Password** for the mailbox that sends: Zoho → My Account → Security → App Passwords.
   Put it in `SMTP_PASS`. Your normal password won't work if 2FA is on.
5. **Pick the right SMTP host** in `.env.local`:
   - `smtppro.zoho.com`: paid / organisation accounts on your own domain
   - `smtp.zoho.com`: free / personal accounts
   - Swap `.com` for `.eu` / `.in` if your account lives in that data centre.

`MAIL_FROM` must be the `SMTP_USER` address (or an alias verified in Zoho), otherwise Zoho rejects the message.
Replies go straight to the visitor because the form sets `Reply-To` to their address.

## How the contact form works

- `src/components/ContactForm.tsx` (client) → `POST /api/contact`
- `src/app/api/contact/route.ts` checks the input, blocks bots with a hidden honeypot field,
  and rate-limits each IP (5 messages / 10 min)
- `src/lib/mailer.ts` sends the message to `CONTACT_TO` and, if `CONTACT_AUTOREPLY=true`,
  sends the visitor a short confirmation

## Deploying

**Vercel** (simplest): import the repo, add every variable from `.env.example` under
Project → Settings → Environment Variables, then add your domain under Settings → Domains
and follow the DNS instructions it shows (an `A` record for `@` and a `CNAME` for `www`).
These don't clash with the Zoho MX/TXT records.

Any Node 18+ host works too: `npm run build && npm start`.

> The rate limiter is in memory, so on serverless hosts it only applies per instance. That's
> fine for a school site. Swap in Upstash/Redis if spam ever becomes a problem.

## Content note

The copy (program hours, class sizes, FAQ answers, the about-page story) is a sensible
starting draft. Check every claim matches what the school actually offers before launch.
