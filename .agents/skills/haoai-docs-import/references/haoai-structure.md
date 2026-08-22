# HaoAI docs structure notes

## Observed hubs

- `https://hao.ai/docs/zh/develop`
- `https://hao.ai/docs/zh/api`
- `https://hao.ai/docs/zh/integrations`

## Structure pattern

- The three hub pages are the canonical entry points. Do not crawl only from the homepage.
- The site uses a left sidebar plus a right-side table of contents.
- Most pages are composed of titles, short intros, step-by-step instructions, code blocks, tables, screenshots, and tabs.
- Capture these elements first:
  - heading hierarchy
  - code blocks
  - tables
  - image references
  - warnings and notes

## develop content family

Observed content direction:

- quick start
- auth and key setup
- model catalog
- advanced guides
- higher-level features
- observability

## api content family

Observed content direction:

- OpenAI Compatible
- Anthropic native
- Grok / xAI
- HaoAI OpenAPI

## integrations content family

Observed content direction:

- Claude Code
- Codex CLI
- CC Switch
- OpenCode
- Cursor
- Cherry Studio
- Chatbox
- Cline
- Zed
- Trae
- CodeBuddy
- WorkBuddy
- LobeHub / LobeChat
- NextChat
- OpenCat
- Open WebUI
- GitHub Copilot
- LangChain
- LlamaIndex
- OpenClaw
- BotGem

## Migration note

The goal is not a raw clone. The goal is to adapt this kind of docs site into DouDi Docs:

- product / API / integrations as the top-level split
- tutorials grouped by tool or scenario
- images kept local and renamed for the target repo
- prose rewritten in DouDi terminology
