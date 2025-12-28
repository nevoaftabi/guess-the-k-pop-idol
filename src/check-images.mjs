import fs from "fs";
import path from "path";

const idolsPath = path.resolve("./src/idols.ts");
const raw = fs.readFileSync(idolsPath, "utf8");

// extract JSON array from: export default [ ... ]
const match = raw.match(/export default\s*(\[\s*[\s\S]*\s*\])\s*;?\s*$/);
if (!match) {
  console.error("Could not parse src/idols.ts export default array.");
  process.exit(1);
}

const idols = JSON.parse(match[1]);

// where your images actually live (try both common Vite locations)
const candidateBases = [
  path.resolve("public"),     // public/images/...
  path.resolve("src"),        // src/images/...
  path.resolve("."),          // ./images/...
];

const missing = [];

for (const idol of idols) {
  const rel = (idol.imageLinks?.[0] || "").trim(); // like "./images/xxx.png"
  if (!rel) {
    missing.push({ stageName: idol.stageName, id: idol.id, reason: "empty imageLinks[0]" });
    continue;
  }

  const normalized = rel.replace(/^\.\//, ""); // "./images/a.png" -> "images/a.png"
  const found = candidateBases.some((base) => fs.existsSync(path.join(base, normalized)));

  if (!found) {
    missing.push({ stageName: idol.stageName, id: idol.id, image: rel });
  }
}

if (missing.length === 0) {
  console.log("All idol images exist.");
} else {
  console.log("Missing images:");
  for (const m of missing) {
    console.log(`- ${m.stageName} (${m.id}): ${m.image || m.reason}`);
  }
  process.exitCode = 1;
}
