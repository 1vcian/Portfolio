import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect } from "react";

import Nav from "../components/Nav";
import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import Experience from "../components/sections/Experience";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import Resume from "../components/sections/Resume";
import Tape from "../components/ui/Tape";
import { startScrolly } from "../lib/scrolly";
import { startProjectSnap } from "../lib/snap";
import { asset, site } from "../lib/site";

// three.js only ever runs in the browser, and only after the page is readable.
const SceneLayer = dynamic(() => import("../components/scene/Scene"), { ssr: false });

export default function Home() {
  const title = `${site.name} · ${site.role}`;
  const image = `${site.url}og.png`;

  // Scroll-linked motion for the DOM: tilting screenshots, the sliding tape, the progress bar.
  useEffect(() => startScrolly(), []);

  // The page glides to rest on a project when scrolling stops near one.
  useEffect(() => startProjectSnap(), []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={site.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="follow, index" />
        <link rel="canonical" href={site.url} />
        <link rel="icon" href={asset("/favicon.ico")} sizes="48x48" />
        <link rel="icon" href={asset("/icon.svg")} type="image/svg+xml" />
        <link rel="icon" href={asset("/icon-192.png")} type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href={asset("/apple-touch-icon.png")} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:url" content={site.url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={site.description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content={image} />
      </Head>

      <a className="skip" href="#about">
        Skip to content
      </a>
      <SceneLayer />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Tape words={["After hours", "Bug hunting", "Apps on the stores", "Open source", "Reverse engineering", "ESP32", "Rust", "Games"]} />
        <Projects />
        <Resume />
        <Contact />
      </main>
    </>
  );
}
