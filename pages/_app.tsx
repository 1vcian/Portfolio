import type { AppProps } from "next/app";
import { useEffect } from "react";

import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/caveat";
import "@fontsource/bangers/400.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "../styles/globals.css";

// Optional Google Analytics: set NEXT_PUBLIC_GA_TRACKING_ID at build time to enable it.
const GA_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!GA_ID) return;
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { page_path: window.location.pathname });
  }, []);

  return <Component {...pageProps} />;
}
