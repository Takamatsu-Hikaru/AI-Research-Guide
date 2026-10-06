# 更新指南

这个仓库保存指南的正文、论文卡片、图片和页面代码。`main` 分支更新后，GitHub Actions 会重新生成中英文 HTML，并发布到[在线指南](https://takamatsu-hikaru.github.io/AI-Research-Guide/zh/)。

## 直接在 GitHub 修改

1. 在下表找到对应文件，打开后点铅笔按钮。网站每篇文章底部也有“编辑本页”入口。
2. 修改文字或链接，用 Preview 看排版。正文使用 Markdown，也可以嵌入视频等 HTML。
3. 提交修改。有仓库写入权限可以提交到 `main`；其他贡献者通过 PR 提交。
4. 在 [Actions](https://github.com/Takamatsu-Hikaru/AI-Research-Guide/actions/workflows/pages.yml) 查看发布结果。发布成功后，网站就会显示新内容。

## 改什么，去哪里

| 内容 | 文件 |
| --- | --- |
| 中文文章、首页、学习路线、课程与资源链接 | [content/guide/zh](content/guide/zh) |
| 英文文章 | [content/guide/en](content/guide/en)，文件名与中文对应 |
| 科研 60 问 | [中文](content/guide/zh/research.md) · [英文](content/guide/en/research.md) |
| 方向简介、发展路线、术语、论文卡片、入门练习 | [content/guide/fieldnotes](content/guide/fieldnotes)，每个方向一个 JSON，含 `zh`、`en` 文案；例如 [agent.json](content/guide/fieldnotes/agent.json) |
| AI 与机器人公司、模型技术报告 | [scripts/guide-directory.mjs](scripts/guide-directory.mjs) 中的 `companies`、`roboticsCompanies`、`reports` |
| OE、Lumina、AgentHub 等社区介绍 | 两种语言的 [home.md](content/guide/zh/home.md) 和 [lookout.md](content/guide/zh/lookout.md) |
| 论文插图及来源 | [public/blog/guide/figures](public/blog/guide/figures) · [paper-figures.json](content/guide/paper-figures.json) |
| 公司、社区图标及来源 | [public/blog/guide/brands](public/blog/guide/brands)；社区图标由 [guide-directory.mjs](scripts/guide-directory.mjs) 选择 |
| 编年史视频、封面和字幕 | [public/blog/guide/chronicle](public/blog/guide/chronicle)；视频位置写在 `home.md` 和 `directions.md` |
| 导航里的页面与顺序 | [content/guide/manifest.json](content/guide/manifest.json) |
| 全站 HTML 布局 | [scripts/build-guide.mjs](scripts/build-guide.mjs) |
| 论文小卡与方向页布局 | [scripts/fieldnotes.mjs](scripts/fieldnotes.mjs) |
| 颜色、间距和移动端排版 | [guide.css](public/blog/guide/guide.css) · [fieldnotes.css](public/blog/guide/fieldnotes.css) · [guide-motion.css](public/blog/guide/guide-motion.css) |
| 方向演示动画 | [scripts/guide-motion.mjs](scripts/guide-motion.mjs) · [guide-motion.js](public/blog/guide/guide-motion.js) |
| 仓库首页介绍与导航 | [README.md](README.md) · [README_EN.md](README_EN.md) |

网站的方向页会把 Markdown 正文与 JSON 中的简介、论文卡片拼在一起；Lookout 的公司目录由共享模块插入。查看这些页的全部内容时，可以同时看对应的在线页面和上表中的源文件。

## 本地预览

安装 Node.js 22 或更新版本，在仓库目录运行：

```bash
npm ci
npm run build
```

构建会检查页面链接、论文配图和科研问答数量。然后打开 `public/blog/guide/zh/index.html` 或 `public/blog/guide/en/index.html`。需要播放视频字幕时，可以通过本地 HTTP 服务预览。

`public/blog/guide/zh/` 和 `en/` 是生成的 HTML，构建时会重建。文章改 Markdown；布局改生成模板；图片、视频、CSS 和浏览器脚本直接改 `public/blog/guide/` 内对应文件。

## 补充内容

欢迎补链接、纠正错误、分享亲自做过的项目和失败经验。介绍一份资料时，交代它在讲什么、适合解决什么问题，并附原文或项目地址。论文卡片沿用相邻条目的结构，配上原图和来源。

两种语言能一起更新最好；只方便写一种语言也可以提交，在 PR 中说明即可。

## Editing in English

Articles live in [content/guide/en](content/guide/en), paired by filename with [Chinese articles](content/guide/zh). Edit a file on GitHub and submit your change or a pull request. Each website article also has an **Edit this page** link. Updates to `main` automatically build and publish both languages through [GitHub Actions](https://github.com/Takamatsu-Hikaru/AI-Research-Guide/actions/workflows/pages.yml).

- **Field introductions, milestones, terminology, paper cards and exercises:** [content/guide/fieldnotes](content/guide/fieldnotes). Each JSON contains both languages.
- **Company directory and technical reports:** [scripts/guide-directory.mjs](scripts/guide-directory.mjs).
- **Community introductions:** `home.md` and `lookout.md` in each language.
- **Figures and attribution:** [figures](public/blog/guide/figures) and [paper-figures.json](content/guide/paper-figures.json).
- **Video and subtitles:** [chronicle](public/blog/guide/chronicle), embedded in `home.md` and `directions.md`.
- **HTML layout:** [build-guide.mjs](scripts/build-guide.mjs) and [fieldnotes.mjs](scripts/fieldnotes.mjs). Styling and browser scripts are in [public/blog/guide](public/blog/guide).

Use Node.js 22+, run `npm ci` and `npm run build`, then open the generated guide. Generated language folders are rebuilt from source; edit Markdown for articles and templates for layout. Keep resource descriptions concrete and link to original sources. Contributions in either language are welcome.
