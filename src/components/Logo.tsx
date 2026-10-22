export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {/* bell tower */}
      <path d="M17 9V4.5h6V9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 4.5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* roof + walls */}
      <path d="M4 18 20 8l16 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 16.5V36h25V16.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      {/* globe window */}
      <circle cx="20" cy="22" r="5.2" stroke="var(--brick)" strokeWidth="1.6" />
      <path d="M14.8 22h10.4M20 16.8c-2.2 2.9-2.2 7.5 0 10.4M20 16.8c2.2 2.9 2.2 7.5 0 10.4" stroke="var(--brick)" strokeWidth="1.2" />
      {/* door */}
      <path d="M17.5 36v-5.5h5V36" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
