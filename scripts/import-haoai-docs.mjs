import * as cheerio from "cheerio";
import fs from "node:fs/promises";
import path from "node:path";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const SOURCE_ORIGIN = "https://hao.ai";
const HUBS = [
  "https://hao.ai/docs/zh/develop",
  "https://hao.ai/docs/zh/api",
  "https://hao.ai/docs/zh/integrations",
];

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "docs");
const IMAGE_DIR = path.join(DOCS_DIR, "public", "imported", "haoai");
const MANIFEST_FILE = path.join(DOCS_DIR, "data", "haoai-docs-manifest.json");

const turndown = new TurndownService({
  codeBlockStyle: "fenced",
  emDelimiter: "*",
  headingStyle: "atx",
});
turndown.use(gfm);

turndown.addRule("fencedCodeWithLanguage", {
  filter: (node) => node.nodeName === "PRE",
  replacement: (_content, node) => {
    const code = node.querySelector("code");
    const text = code?.textContent ?? node.textContent ?? "";
    const langClass = code?.getAttribute("class") ?? "";
    const language = langClass.match(/language-([a-zA-Z0-9_-]+)/)?.[1] ?? "";
    return `\n\n\`\`\`${language}\n${text.replace(/\n+$/g, "")}\n\`\`\`\n\n`;
  },
});

function toAbsoluteUrl(href) {
  return new URL(href, SOURCE_ORIGIN).toString();
}

function sourcePathFromUrl(url) {
  return new URL(url).pathname.replace(/\/+$/g, "") || "/docs/zh";
}

function targetPathFromSource(sourcePath) {
  if (sourcePath === "/docs/zh") return null;
  const local = sourcePath.replace(/^\/docs\/zh\/?/, "");
  if (!local) return null;
  if (local === "develop") return "develop/index.md";
  if (local === "api") return "api/index.md";
  if (local === "integrations") return "integrations/index.md";
  return `${local}.md`;
}

function routeFromSource(sourcePath) {
  const target = targetPathFromSource(sourcePath);
  if (!target) return "/";
  if (target.endsWith("/index.md")) {
    return `/${target.replace(/index\.md$/g, "")}`;
  }
  return `/${target.replace(/\.md$/g, "")}`;
}

function safeSegment(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "page";
}

function decodeHtml(value) {
  return cheerio.load(`<span>${value ?? ""}</span>`)("span").text();
}

function normalizeMarkdown(markdown) {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/Copy code/gi, "")
    .trim();
}

function adaptMarkdown(markdown) {
  return normalizeMarkdown(markdown)
    .replace(/HaoAI/g, "DouDi.ai")
    .replace(/Hao AI/g, "DouDi.ai")
    .replace(/HAO\.AI/g, "DouDi.ai")
    .replace(/HAOAI_API_KEY/g, "DOUDI_API_KEY")
    .replace(/HAOAI/g, "DOUDI")
    .replace(/support@hao\.ai/g, "DouDi 运营支持")
    .replace(/mailto:DouDi 运营支持/g, "")
    .replace(/\[DouDi 运营支持\]\(\)/g, "DouDi 运营支持")
    .replace(/https:\/\/api\.hao\.ai\/v1/g, "https://doudi.ai/v1")
    .replace(/https:\/\/api\.hao\.ai/g, "https://doudi.ai")
    .replace(/https:\/\/hao\.ai\/api/g, "https://doudi.ai/api")
    .replace(/hao\.ai\/api/g, "doudi.ai/api")
    .replace(/hao\.ai\/console\/api-keys/g, "doudi.ai/keys")
    .replace(/hao\.ai\/console\/keys/g, "doudi.ai/keys")
    .replace(/hao\.ai\/console\/overview/g, "doudi.ai/dashboard")
    .replace(/hao\.ai\/console\/dashboard/g, "doudi.ai/dashboard")
    .replace(/hao\.ai\/console\/wallet/g, "doudi.ai/wallet")
    .replace(/hao\.ai\/console\/recharge/g, "doudi.ai/wallet")
    .replace(/hao\.ai\/console\/invoices/g, "doudi.ai/invoices")
    .replace(/hao\.ai\/console\/(usage-logs|request-logs|logs)/g, "doudi.ai/usage-logs/common")
    .replace(/hao\.ai\/console\/(analytics|models|model-analytics)/g, "doudi.ai/dashboard/models")
    .replace(/hao\.ai\/console/g, "doudi.ai/dashboard")
    .replace(/api\.hao\.ai\/v1/g, "doudi.ai/v1")
    .replace(/api\.hao\.ai/g, "doudi.ai")
    .replace(/站点域名`\s*hao\.ai\s*`/g, "站点域名 `doudi.ai`")
    .replace(/站点域名\*\*\s*`hao\.ai`\s*\*\*/g, "站点域名 **`doudi.ai`**")
    .replace(/而不是 API 网关域名 `doudi\.ai`/g, "而不是 OpenAI Compatible 的 `https://doudi.ai/v1` Base URL")
    .replace(/https:\/\/hao\.ai\/docs\/zh/g, "")
    .replace(/https:\/\/hao\.ai/g, "https://doudi.ai")
    .replace(/https:\/\/doudi\.ai\/console\/api-keys/g, "https://doudi.ai/keys")
    .replace(/https:\/\/doudi\.ai\/console\/keys/g, "https://doudi.ai/keys")
    .replace(/https:\/\/doudi\.ai\/console\/overview/g, "https://doudi.ai/dashboard")
    .replace(/https:\/\/doudi\.ai\/console\/dashboard/g, "https://doudi.ai/dashboard")
    .replace(/https:\/\/doudi\.ai\/console\/wallet/g, "https://doudi.ai/wallet")
    .replace(/https:\/\/doudi\.ai\/console\/recharge/g, "https://doudi.ai/wallet")
    .replace(/https:\/\/doudi\.ai\/console\/invoices/g, "https://doudi.ai/invoices")
    .replace(/https:\/\/doudi\.ai\/console\/(usage-logs|request-logs|logs)/g, "https://doudi.ai/usage-logs/common")
    .replace(/https:\/\/doudi\.ai\/console\/(analytics|models|model-analytics)/g, "https://doudi.ai/dashboard/models")
    .replace(/https:\/\/doudi\.ai\/models/g, "https://doudi.ai/pricing")
    .replace(/doudi\.ai\/console\/api-keys/g, "doudi.ai/keys")
    .replace(/doudi\.ai\/console\/keys/g, "doudi.ai/keys")
    .replace(/doudi\.ai\/console\/overview/g, "doudi.ai/dashboard")
    .replace(/doudi\.ai\/console\/dashboard/g, "doudi.ai/dashboard")
    .replace(/doudi\.ai\/console\/wallet/g, "doudi.ai/wallet")
    .replace(/doudi\.ai\/console\/recharge/g, "doudi.ai/wallet")
    .replace(/doudi\.ai\/console\/invoices/g, "doudi.ai/invoices")
    .replace(/doudi\.ai\/console\/(usage-logs|request-logs|logs)/g, "doudi.ai/usage-logs/common")
    .replace(/doudi\.ai\/console\/(analytics|models|model-analytics)/g, "doudi.ai/dashboard/models")
    .replace(/doudi\.ai\/models/g, "doudi.ai/pricing")
    .replace(/"site_domain": "hao\.ai"/g, '"site_domain": "doudi.ai"')
    .replace(/"hao\.ai"/g, '"doudi.ai"')
    .replace(/`hao\.ai`/g, "`doudi.ai`")
    .replace(/\]\(\/docs\/zh\/([^)#]+)(#[^)]+)?\)/g, (_match, localPath, hash = "") => {
      const route = routeFromSource(`/docs/zh/${localPath}`);
      return `](${route}${hash})`;
    })
    .replace(/\]\(\/docs\/zh(#[^)]+)?\)/g, "](/)");
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "DouDi-Docs import script; contact https://docs.doudi.ai/",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
}

function extractDocLinks(html) {
  const $ = cheerio.load(html);
  const links = new Set();
  $("a[href]").each((_index, element) => {
    const href = $(element).attr("href");
    if (!href) return;
    const absolute = toAbsoluteUrl(href);
    const url = new URL(absolute);
    if (url.origin !== SOURCE_ORIGIN) return;
    const cleanPath = url.pathname.replace(/\/+$/g, "");
    if (!cleanPath.startsWith("/docs/zh")) return;
    if (cleanPath === "/docs/zh") return;
    links.add(`${SOURCE_ORIGIN}${cleanPath}`);
  });
  return [...links].sort((a, b) => sourcePathFromUrl(a).localeCompare(sourcePathFromUrl(b)));
}

function pageKind(sourcePath) {
  if (sourcePath.startsWith("/docs/zh/develop")) return "develop";
  if (sourcePath.startsWith("/docs/zh/api")) return "api";
  if (sourcePath.startsWith("/docs/zh/integrations")) return "integrations";
  return "other";
}

async function downloadImage(src, pageSlug, index) {
  const absolute = toAbsoluteUrl(src.replace(/&amp;/g, "&"));
  const url = new URL(absolute);
  let ext = path.extname(url.pathname).replace(/[^.a-zA-Z0-9]/g, "");
  const original = url.searchParams.get("url");
  if ((!ext || ext === ".image") && original) {
    ext = path.extname(decodeURIComponent(original)).replace(/[^.a-zA-Z0-9]/g, "");
  }
  if (!ext) ext = ".webp";

  const localName = `${pageSlug}-${String(index + 1).padStart(2, "0")}${ext}`;
  const localDiskPath = path.join(IMAGE_DIR, localName);
  const publicPath = `/imported/haoai/${localName}`;

  try {
    await fs.access(localDiskPath);
    return { src: absolute, local: publicPath, downloaded: false };
  } catch {
    // continue
  }

  const response = await fetch(absolute, {
    headers: { "user-agent": "DouDi-Docs image import" },
  });
  if (!response.ok) {
    return { src: absolute, local: null, downloaded: false, error: `${response.status}` };
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.mkdir(IMAGE_DIR, { recursive: true });
  await fs.writeFile(localDiskPath, buffer);
  return { src: absolute, local: publicPath, downloaded: true, bytes: buffer.length };
}

async function extractPage(url) {
  const sourcePath = sourcePathFromUrl(url);
  const html = await fetchText(url);
  const $ = cheerio.load(html);
  const main = $("main[data-pagefind-body], main").first();
  if (!main.length) {
    throw new Error(`No main content found for ${url}`);
  }

  main.find("script, style, svg, button, .subheading-anchor").remove();
  main.find("[aria-hidden='true']").remove();
  main.find("a").each((_index, element) => {
    const href = $(element).attr("href");
    if (!href) return;
    if (href.startsWith("/docs/zh")) {
      $(element).attr("href", routeFromSource(href.replace(/\/+$/g, "")));
    }
  });

  const title = normalizeMarkdown(main.find("h1").first().text()) || decodeHtml($("title").text());
  const slug = sourcePath.replace(/^\/docs\/zh\/?/, "").split("/").map(safeSegment).join("-") || "index";
  const imageRecords = [];
  const imageNodes = main.find("img").toArray();
  for (let index = 0; index < imageNodes.length; index += 1) {
    const image = imageNodes[index];
    const src = $(image).attr("src");
    if (!src || src.startsWith("data:")) continue;
    const record = await downloadImage(src, slug, index);
    record.alt = $(image).attr("alt") || "";
    imageRecords.push(record);
    if (record.local) {
      $(image).attr("src", record.local);
      $(image).removeAttr("srcset");
      $(image).removeAttr("style");
    }
  }

  const headings = [];
  main.find("h2, h3").each((_index, element) => {
    headings.push({
      level: element.tagName.toLowerCase(),
      text: normalizeMarkdown($(element).text()),
    });
  });

  let body = adaptMarkdown(turndown.turndown(main.html() ?? ""));
  if (!body.startsWith("# ")) {
    body = `# ${title}\n\n${body}`;
  }

  const route = routeFromSource(sourcePath);
  const sourceNote = [
    "> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。",
    "> 实际模型、分组、价格和权限以 DouDi 控制台为准。",
  ].join("\n");
  body = `${body.replace(/^# .+?\n/, `# ${title}\n`)}\n\n${sourceNote}\n`;

  return {
    sourceUrl: url,
    sourcePath,
    route,
    target: targetPathFromSource(sourcePath),
    kind: pageKind(sourcePath),
    title,
    headings,
    images: imageRecords,
    codeBlocks: (body.match(/```/g) ?? []).length / 2,
    markdown: body,
  };
}

async function writePage(page) {
  if (!page.target) return;
  const output = path.join(DOCS_DIR, page.target);
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, `${page.markdown.trim()}\n`, "utf8");
}

async function main() {
  await fs.mkdir(path.dirname(MANIFEST_FILE), { recursive: true });
  const discovered = new Set();
  for (const hub of HUBS) {
    const html = await fetchText(hub);
    for (const link of extractDocLinks(html)) {
      discovered.add(link);
    }
  }
  for (const hub of HUBS) discovered.add(hub);

  const urls = [...discovered].sort((a, b) => sourcePathFromUrl(a).localeCompare(sourcePathFromUrl(b)));
  const pages = [];
  for (const url of urls) {
    const page = await extractPage(url);
    await writePage(page);
    pages.push({
      sourceUrl: page.sourceUrl,
      sourcePath: page.sourcePath,
      route: page.route,
      target: page.target,
      kind: page.kind,
      title: page.title,
      headings: page.headings,
      images: page.images,
      codeBlocks: page.codeBlocks,
    });
    console.log(`imported ${page.sourcePath} -> ${page.target ?? "(skipped)"}`);
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceHubs: HUBS,
    sourceOrigin: SOURCE_ORIGIN,
    pageCount: pages.length,
    imageCount: pages.reduce((sum, page) => sum + page.images.length, 0),
    pages,
  };
  await fs.writeFile(MANIFEST_FILE, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`manifest ${MANIFEST_FILE}`);
  console.log(`pages ${manifest.pageCount}, images ${manifest.imageCount}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
