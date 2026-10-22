export const topics = [
  "Enrolment enquiry",
  "Booking a trial lesson",
  "Fees & payment",
  "Teaching with us",
  "Something else",
] as const;

export type ContactInput = {
  name: string;
  email: string;
  topic: string;
  studentAge: string;
  country: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function parseContact(body: Record<string, unknown>): {
  data: ContactInput;
  errors: FieldErrors;
} {
  const data: ContactInput = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    topic: str(body.topic, 60),
    studentAge: str(body.studentAge, 20),
    country: str(body.country, 80),
    message: str(body.message, 5000),
  };

  const errors: FieldErrors = {};
  if (data.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "That email address doesn't look right.";
  if (!topics.includes(data.topic as (typeof topics)[number])) errors.topic = "Choose a topic.";
  if (data.message.length < 10) errors.message = "A few more words, please (10 characters minimum).";

  return { data, errors };
}
