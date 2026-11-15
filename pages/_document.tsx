import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#04060b" />
        <meta name="color-scheme" content="dark" />
      </Head>
      <body>
        {/* Marks that scripts run, so scroll reveals only hide content when they can show it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
