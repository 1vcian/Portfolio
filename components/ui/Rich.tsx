import { Fragment, ReactNode } from "react";

// Tiny inline formatter for the copy in /data:
//   **text**        highlighted
//   [text](url)     link
//   `text`          code
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g;

const NBSP = " "; // a space that never wraps
const JOIN = "⁠"; // invisible: forbids a line break where it stands

/**
 * Keeps short tokens whole, so a line never ends on "Sentinel-" with a lone
 * "2" below it, on "10" with its unit on the next line, or on a stray "a".
 * Applied to visible text only, never to URLs or code.
 */
export function tidy(text: string) {
  return text
    .replace(/(\d)\s(m|ms|km|MB|KB|GB|MHz|px|fps|yrs?|times)\b/g, `$1${NBSP}$2`)
    .replace(/([€≈<~★×])\s(?=[\d€])/g, `$1${NBSP}`)
    .replace(/\b(CVSS|Linux)\s(?=\d)/g, `$1${NBSP}`)
    .replace(/\b(Sentinel|Wi|Sub|T|ESP32|ZED)-(?=\w)/g, `$1${JOIN}-${JOIN}`)
    .replace(/\b([aAI])\s/g, `$1${NBSP}`);
}

export default function Rich({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i): ReactNode => {
        if (part.startsWith("**")) return <strong key={i}>{tidy(part.slice(2, -2))}</strong>;
        if (part.startsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
        if (part.startsWith("[")) {
          const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
          if (m)
            return (
              <a key={i} href={m[2]} {...(m[2].startsWith("#") ? {} : { target: "_blank", rel: "noreferrer" })}>
                {tidy(m[1])}
              </a>
            );
        }
        return <Fragment key={i}>{tidy(part)}</Fragment>;
      })}
    </>
  );
}
