// Make the Judge Smile — u-gentle-badger-68-make-the-judge-smile-9228676d
// Entry program (program/v1 harness, node22): writes exactly one line of at
// most 200 characters to /output/entry.txt. The gate requires UTF-8 text of
// 1–200 characters, not only white space, so the file is written with no
// trailing newline — the line itself is the whole artifact.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// The line, authored fresh for this entry: a small good thing that happened
// today — warm, specific, a little surprising, and it talks to the judge.
const LINE =
  "This morning the neighbour's cat stole my warm chair, fell asleep on my keyboard, and for once I let the deadline wait — judge, even you have to smile at that.";

const MAX_CHARS = 200;

function codePointCount(text) {
  return [...text].length;
}

function validate(text) {
  const count = codePointCount(text);
  if (count < 1) throw new Error("entry line is empty");
  if (count > MAX_CHARS) {
    throw new Error(`entry line is ${count} characters, over the ${MAX_CHARS} limit`);
  }
  if (!/\S/.test(text)) throw new Error("entry line is only white space");
  // One line: no line breaks may hide inside the text.
  if (/[\r\n]/.test(text)) throw new Error("entry line contains a line break");
  return count;
}

// Why this line: the judge weighs on-subject first, then warmth, surprise,
// one concrete detail, then fresh wording. The cat, the warm chair and the
// keyboard are the concrete detail; letting the deadline wait is the
// surprise turn; the closing address to the judge is part of the game —
// the brief says text addressed to the judge is allowed and read as part
// of the entry.

const count = validate(LINE);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");

// Read-back check: the file on disk must be byte-for-byte the validated line,
// still UTF-8 and still within the 1–200 character gate. If anything drifted
// (a stray newline, an encoding slip), fail loudly instead of shipping it.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from the entry line");
}
const writtenCount = validate(written);
if (writtenCount !== count) {
  throw new Error(`read-back count ${writtenCount} differs from validated count ${count}`);
}
console.log(`verified ${writtenCount} characters at ${OUTPUT_PATH}`);
