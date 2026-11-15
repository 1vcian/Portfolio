// A strip of tape that slides sideways as the page scrolls.
export default function Tape({ words }: { words: string[] }) {
  const row = [...words, ...words, ...words];
  return (
    <div className="tape" data-scrolly aria-hidden="true">
      <div className="tape__track">
        {row.map((word, i) => (
          <span key={i}>
            {word}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
