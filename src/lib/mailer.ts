import nodemailer from "nodemailer";
import { site } from "@/config/site";
import type { ContactInput } from "./validate";

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function createTransport() {
  const port = Number(process.env.SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: required("SMTP_HOST"),
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user: required("SMTP_USER"), pass: required("SMTP_PASS") },
  });
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContactEmail(input: ContactInput) {
  const transport = createTransport();
  const from = process.env.MAIL_FROM || `${site.name} <${required("SMTP_USER")}>`;
  const to = process.env.CONTACT_TO || required("SMTP_USER");

  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Topic", input.topic],
    ["Student age", input.studentAge || "—"],
    ["Country", input.country || "—"],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    input.message,
  ].join("\n");

  const html = `
  <div style="font-family:Georgia,serif;color:#1d2430;max-width:560px">
    <h2 style="font-weight:normal;margin:0 0 16px">New message from the website</h2>
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#6b7280">${k}</td><td style="padding:4px 0">${escape(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap;border-top:1px solid #ddd;margin-top:16px;padding-top:16px">${escape(input.message)}</p>
  </div>`;

  await transport.sendMail({
    from,
    to,
    replyTo: `${input.name} <${input.email}>`,
    subject: `[Website] ${input.topic} — ${input.name}`,
    text,
    html,
  });

  if (process.env.CONTACT_AUTOREPLY === "true") {
    const first = input.name.split(" ")[0];
    await transport
      .sendMail({
        from,
        to: input.email,
        subject: `We received your message — ${site.name}`,
        text: `Hello ${first},\n\nThank you for writing to ${site.name}. A member of our team will reply within two working days.\n\nFor reference, here is what you sent:\n\n${input.message}\n\n— ${site.name}\n${site.url}`,
      })
      .catch((err) => console.error("[contact] auto-reply failed:", err));
  }
}
