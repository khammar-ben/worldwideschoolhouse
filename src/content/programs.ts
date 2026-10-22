export type Program = {
  slug: string;
  name: string;
  ages: string;
  hours: string;
  summary: string;
  subjects: string[];
};

export const programs: Program[] = [
  {
    slug: "lower",
    name: "Lower School",
    ages: "6 – 10",
    hours: "12 live hours / week",
    summary:
      "Reading, number sense and curiosity. Short live lessons, lots of making, and a teacher who knows each child by name.",
    subjects: ["Literacy", "Mathematics", "Science & nature", "Art & making", "Morning circle"],
  },
  {
    slug: "middle",
    name: "Middle School",
    ages: "11 – 13",
    hours: "16 live hours / week",
    summary:
      "The years where habits form. Students learn to plan their own week, write with care and argue a point politely.",
    subjects: ["English", "Mathematics", "Sciences", "History & geography", "Second language"],
  },
  {
    slug: "upper",
    name: "Upper School",
    ages: "14 – 18",
    hours: "20 live hours / week",
    summary:
      "Serious preparation for international exams and university applications, with a tutor who follows each student through.",
    subjects: ["Exam pathways", "Sciences", "Literature", "Economics", "University guidance"],
  },
  {
    slug: "language",
    name: "Language Bridge",
    ages: "8 – 18",
    hours: "4 – 6 live hours / week",
    summary:
      "For students joining a new school system or language. English, French and Arabic, taught alongside or before full enrolment.",
    subjects: ["English", "French", "Arabic", "Academic writing"],
  },
];
