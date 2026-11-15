import { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHead({ index, label, children }: { index: string; label: string; children: ReactNode }) {
  return (
    <Reveal as="header" className="sec-head">
      <p className="sec-head__label">
        <span className="num">{index}</span>
        <span className="hand">{label}</span>
      </p>
      <h2>{children}</h2>
    </Reveal>
  );
}
