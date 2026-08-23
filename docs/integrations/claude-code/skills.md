# 配置 Skills

Skills 是 Claude Code 的能力扩展包 —— 赋予 Claude 特定领域的专业知识、工作流和工具链。安装一个 Skill，Claude 就多一项技能。

## 安装 Skills

### 通过 /plugin 安装（推荐）

在 Claude Code 中输入 `/plugin`，进入插件管理界面。内置的 Marketplace 来源于 [Anthropic 官方 Skills 仓库](https://github.com/anthropics/skills)  ，可直接浏览、安装和管理：

Claude Code 对话框

```
/plugin
```

![Claude Code /plugin 界面](/imported/haoai/integrations-claude-code-skills-01.webp)

在 **Discover** 标签页搜索所需 Skill，选中后一键安装。

### 通过命令行安装

也可以直接用 CLI 安装指定 Skill：

```
claude install <skill-name>
```

## Skills 商店

除了内置的 Marketplace，还有优秀的第三方 Skills 平台：

### [Skills.sh](https://skills.sh/) 

开放的 Agent Skills 生态系统，一条命令搜索和安装：

```
npx skills find <query>
```

![Skills.sh](/imported/haoai/integrations-claude-code-skills-02.webp)

### [ClawHub](https://clawhub.ai/skills) 

社区驱动的 Skills 发布平台，支持版本管理和语义搜索：

![ClawHub](/imported/haoai/integrations-claude-code-skills-03.webp)

## 项目级 Skills：CLAUDE.md

在项目根目录创建 `CLAUDE.md`，Claude Code 启动时自动加载，作为项目级上下文和规范：

```markdown
# 项目规范

## 技术栈
- Next.js 16 + TypeScript
- Tailwind CSS v4
- pnpm 作为包管理器

## 编码约定
- 组件使用 PascalCase 命名
- 优先使用 Server Components
- 测试覆盖率不低于 80%
```

`CLAUDE.md` 是最常用的项目级 Skill 配置方式，无需安装，放在项目根目录即可生效。

## 了解更多

*   [Anthropic Skills 官方仓库](https://github.com/anthropics/skills)  — Anthropic 官方 Skills 集合
*   [Anthropic Skills 文档](https://docs.anthropic.com/en/docs/claude-code/skills) 
*   [Skills.sh — 开放 Skills 生态](https://skills.sh/) 
*   [ClawHub — Skills 发布平台](https://clawhub.ai/skills)

> 本页按 DouDi.ai 接入语境整理，覆盖同类教程的结构和步骤。
> 实际模型、分组、价格和权限以 DouDi 控制台为准。
