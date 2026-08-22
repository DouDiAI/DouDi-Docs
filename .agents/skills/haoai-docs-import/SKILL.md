---
name: haoai-docs-import
description: Analyze external documentation sites and migrate their structure, tutorials, and images into DouDi Docs. Use for web-doc scraping, site-map extraction, and rewrite planning; do not use for login flows, form submission, or other remote mutations.
---

# HaoAI Docs Import

## Purpose

Turn external docs sites such as `hao.ai` into a clean migration map for DouDi Docs, then rewrite the content in DouDi terms.

## When to use

- The user asks to analyze an external docs site.
- The user asks to import or rebuild a set of tutorials.
- The user asks for a more efficient crawl order for a docs site.

## Workflow

1. Read `references/haoai-structure.md` first.
2. Start from canonical hubs and sidebar links instead of clicking around from the homepage.
3. Prefer an existing web-to-markdown extractor or skill when available. Firecrawl-style web scraping is a better fit for HTML docs than `anydoc`, which is for office/PDF-style files.
4. Record at least these fields for each page:
   - title
   - canonical URL
   - section or category
   - H2/H3 structure
   - code blocks and tables
   - callouts, tabs, and warnings
   - images and screenshots
5. Build a migration map before editing the repo.
6. Rewrite content in DouDi voice instead of copying external brand copy verbatim.
7. Verify the final docs build and resource references.

## Constraints

- Do not treat crawl output as final prose.
- Do not mirror the other site's navigation blindly.
- Do not reuse external images without rights or a clear source policy.
- Do not apply this skill to non-doc migration tasks.
