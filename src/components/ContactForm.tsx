"use client";

import { useState, type FormEvent } from "react";
import { topics, type FieldErrors } from "@/lib/validate";
import { site } from "@/config/site";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setErrors({});
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (json.errors) setErrors(json.errors);
      setMessage(json.error ?? "Please check the highlighted fields.");
      setStatus("error");
    } catch {
      setMessage("Network problem — please try again, or email us directly.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <p className="eyebrow">Received</p>
        <h3>Thank you — your note is on our desk.</h3>
        <p>
          Someone from the school will reply within two working days. If it&apos;s urgent,
          write to <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        </p>
        <button className="link-btn" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  const field = (name: keyof FieldErrors) =>
    errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-err` } : {};

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="row-2">
        <label>
          <span>Your name</span>
          <input name="name" autoComplete="name" required {...field("name")} />
          {errors.name && <small id="name-err">{errors.name}</small>}
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required {...field("email")} />
          {errors.email && <small id="email-err">{errors.email}</small>}
        </label>
      </div>

      <label>
        <span>What is it about?</span>
        <select name="topic" defaultValue={defaultTopic ?? topics[0]} {...field("topic")}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {errors.topic && <small id="topic-err">{errors.topic}</small>}
      </label>

      <div className="row-2">
        <label>
          <span>
            Student&apos;s age <i>optional</i>
          </span>
          <input name="studentAge" inputMode="numeric" />
        </label>
        <label>
          <span>
            Country you live in <i>optional</i>
          </span>
          <input name="country" autoComplete="country-name" />
        </label>
      </div>

      <label>
        <span>Message</span>
        <textarea name="message" rows={6} required {...field("message")} />
        {errors.message && <small id="message-err">{errors.message}</small>}
      </label>

      {/* Honeypot — hidden from people, tempting for bots */}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="form-foot">
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {message && (
          <p className="form-error" role="alert">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
