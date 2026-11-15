import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const stroke = (props: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const ArrowUpRight = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowUp = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

export const ArrowDown = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const Download = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
  </svg>
);

export const Copy = (p: P) => (
  <svg {...stroke(p)}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...stroke(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const Mail = (p: P) => (
  <svg {...stroke(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const Github = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export const Linkedin = (p: P) => (
  <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden {...p}>
    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg {...stroke(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);

export const Apple = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M16.37 12.63c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.19-1.73-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.75 2.21 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.88.69 1.19-.02 1.94-1.08 2.67-2.15.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.31-.89-2.33-3.54zM14.2 6.13c.61-.74 1.02-1.76.91-2.78-.88.04-1.94.59-2.57 1.32-.56.65-1.06 1.7-.93 2.7.98.08 1.98-.5 2.59-1.24z" />
  </svg>
);

export const GooglePlay = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M4.3 2.6c-.2.2-.3.5-.3.9v17c0 .4.1.7.3.9l9.4-9.4-9.4-9.4zm10.5 10.5 2.6 2.6-11 6.2 8.4-8.8zm0-2.2L6.4 2.1l11 6.2-2.6 2.6zm3.9-1.8 2.6 1.5c.9.5.9 1.3 0 1.8l-2.6 1.5-2.9-2.9 2.9-1.9z" />
  </svg>
);

export const Menu = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export const Close = (p: P) => (
  <svg {...stroke(p)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

/** A little cartoon satellite: body, two solar panels, an antenna. */
export const Satellite = (p: P) => (
  <svg viewBox="0 0 48 48" aria-hidden {...p}>
    <g stroke="#0d1020" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <rect x="2.5" y="18" width="13" height="12" rx="2" fill="#4f8dff" />
      <rect x="32.5" y="18" width="13" height="12" rx="2" fill="#4f8dff" />
      <path d="M9 18v12M39 18v12" fill="none" strokeWidth="2" />
      <rect x="16" y="13" width="16" height="22" rx="4" fill="#fff5dc" />
      <path d="M24 13V6" fill="none" />
      <circle cx="24" cy="5" r="3" fill="#ffb200" />
      <circle cx="24" cy="25" r="3.5" fill="#ff5340" />
    </g>
  </svg>
);

export const MapPin = (p: P) => (
  <svg viewBox="0 0 32 42" aria-hidden {...p}>
    <path
      d="M16 2.5C8.5 2.5 2.5 8.4 2.5 15.7 2.5 25.6 16 39.5 16 39.5s13.5-13.9 13.5-23.8C29.5 8.4 23.5 2.5 16 2.5z"
      fill="#ff5340"
      stroke="#0d1020"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="15.5" r="5" fill="#fff5dc" stroke="#0d1020" strokeWidth="2.5" />
  </svg>
);
