"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through phrases with a typewriter effect.
 * Falls back to the first phrase under reduced-motion.
 */
export function TypingHeadline({
  phrases,
  className,
}: {
  phrases: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    if (reduce) {
      setText(phrases[0]);
      return;
    }
    const current = phrases[index % phrases.length];
    const done = text === current;
    const cleared = text === "";

    let delay = deleting ? 45 : 85;
    if (!deleting && done) delay = 1500;
    if (deleting && cleared) delay = 250;

    const timer = setTimeout(() => {
      if (!deleting && done) {
        setDeleting(true);
      } else if (deleting && cleared) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(
          deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases, reduce]);

  return (
    <span className={className}>
      {text}
      {!reduce && (
        <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-primary align-middle [height:0.9em]" />
      )}
    </span>
  );
}
