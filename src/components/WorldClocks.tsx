"use client";

import { useEffect, useState } from "react";

const cities = [
  { city: "Casablanca", tz: "Africa/Casablanca" },
  { city: "London", tz: "Europe/London" },
  { city: "Dubai", tz: "Asia/Dubai" },
  { city: "Singapore", tz: "Asia/Singapore" },
  { city: "Nairobi", tz: "Africa/Nairobi" },
  { city: "New York", tz: "America/New_York" },
];

function read(tz: string, now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const hour = Number(get("hour"));
  const weekend = get("weekday") === "Sat" || get("weekday") === "Sun";
  return {
    time: `${get("hour")}:${get("minute")}`,
    status: weekend ? "Weekend" : hour >= 8 && hour < 16 ? "Lessons on" : "After hours",
  };
}

export function WorldClocks() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="register" aria-label="Local time in cities where our students live">
      <div className="register-head">
        <span>Class register</span>
        <span>Local time</span>
      </div>
      <ol>
        {cities.map((c) => {
          const r = now ? read(c.tz, now) : null;
          return (
            <li key={c.tz}>
              <span className="register-city">{c.city}</span>
              <span className={`register-status${r?.status === "Lessons on" ? " is-on" : ""}`}>
                {r?.status ?? "\u00a0"}
              </span>
              <span className="register-time">{r?.time ?? "--:--"}</span>
            </li>
          );
        })}
      </ol>
      <p className="register-foot">One timetable, set around your time zone — not ours.</p>
    </div>
  );
}
