import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(root, "..");
const outputDir = resolve(projectRoot, "docs/data");
const origin = (process.env.DOUDI_PUBLIC_ORIGIN || "https://doudi.ai").replace(/\/+$/, "");
const strict = process.argv.includes("--strict");

const endpoints = [
  {
    name: "status",
    url: `${origin}/api/status`,
    file: "doudi-status.json",
  },
  {
    name: "pricing",
    url: `${origin}/api/pricing`,
    file: "doudi-pricing.json",
  },
];

async function readExisting(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return null;
  }
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "user-agent": "DouDi-Docs/0.1 data sync",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

await mkdir(outputDir, { recursive: true });

let failures = 0;

for (const endpoint of endpoints) {
  const path = resolve(outputDir, endpoint.file);
  const existing = await readExisting(path);

  try {
    const data = await fetchJson(endpoint.url);
    const snapshot = {
      source: endpoint.url,
      fetchedAt: new Date().toISOString(),
      ok: true,
      error: null,
      data,
    };

    await writeFile(path, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
    console.log(`synced ${endpoint.name} from ${endpoint.url}`);
  } catch (error) {
    failures += 1;
    const snapshot = existing ?? {
      source: endpoint.url,
      fetchedAt: null,
      ok: false,
      error: null,
      data: null,
    };

    snapshot.ok = false;
    snapshot.error = error instanceof Error ? error.message : String(error);
    snapshot.lastAttemptAt = new Date().toISOString();

    await writeFile(path, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
    console.warn(`failed to sync ${endpoint.name}: ${snapshot.error}`);
  }
}

if (strict && failures > 0) {
  process.exitCode = 1;
}
