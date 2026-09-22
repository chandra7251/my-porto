import { cp, mkdir, rm } from "node:fs/promises";

const rootFiles = ["index.html", "project.html", "404.html", "favicon.svg", "og-image.svg", "script.js", "projects.js", "project-detail.js"];

await rm("public", { force: true, recursive: true });
await mkdir("public/assets", { recursive: true });
await Promise.all([
  ...rootFiles.map((file) => cp(file, `public/${file}`)),
  cp("assets", "public/assets", { recursive: true }),
  cp("output", "public/output", { recursive: true }),
]);
