<p align="center"><img src="public/blog/guide/logo.png" width="190" alt="UESTC AI 社"></p>

<h1 align="center">AI 科研入门指南</h1>
<p align="center">大学选择、第一项研究与一路上的经验</p>
<p align="center"><b>中文</b> · <a href="README_EN.md">English</a> · <a href="https://takamatsu-hikaru.github.io/AI-Research-Guide/zh/">在线阅读</a> · <a href="https://takamatsu-hikaru.github.io/AI-Research-Guide/zh/ama.html">讨论区</a></p>

这份指南从 UESTC AI 社的学习与交流出发，面向正在探索 AI 与科研的大学生。我们把自己的经历、科研中常用的做法、入门项目和各方向的资料放在一起，聊聊为什么学、学什么、怎么开始，以及过程中那些没人认真解释过的小问题。

## 从这里开始

| 你现在想了解什么 | 入口 |
| --- | --- |
| 大学有哪些选择，自己想往哪里走 | [写给刚进大学的你](content/guide/zh/welcome.md) |
| 为什么做科研，如何开始、找方向、联系老师 | [How to 入门科研：60 个问题](content/guide/zh/research.md) |
| 先做一个能看到结果的小项目 | [Kaggle MNIST、YOLO 与其他入门项目](content/guide/zh/start.md) |

## 内容导航

| 板块 | 内容 |
| --- | --- |
| 基础与学习 | [按问题补基础](content/guide/zh/basics.md) · [挑一篇论文读](content/guide/zh/papers.md) |
| 认识研究方向 | [方向总览](content/guide/zh/directions.md) · [大语言模型](content/guide/zh/llm.md) · [Agent](content/guide/zh/agent.md) · [视觉](content/guide/zh/vision.md) · [多模态](content/guide/zh/multimodal.md) · [生成](content/guide/zh/generation.md) · [强化学习](content/guide/zh/rl.md) · [世界模型](content/guide/zh/world-model.md) · [具身智能](content/guide/zh/embodied.md) · [效率与系统](content/guide/zh/systems.md) · [AI 交叉学科](content/guide/zh/ai4x.md) |
| 推进一项研究 | [找资料、读论文](content/guide/zh/reading.md) · [做实验](content/guide/zh/experiments.md) · [写作、画图与汇报](content/guide/zh/writing.md) · [联系与合作](content/guide/zh/contact.md) · [使用 AI](content/guide/zh/ai.md) · [投稿](content/guide/zh/publishing.md) |
| 经历与生活 | [经验与复盘](content/guide/zh/experience.md) · [大一回忆](content/guide/zh/timeline.md) · [怎么好好生活](content/guide/zh/life.md) |
| 看看外面 | [Lookout](content/guide/zh/lookout.md) · [作者博客](content/guide/zh/blogs.md) · [LessWrong](content/guide/zh/lesswrong.md) · [李沐](content/guide/zh/limu.md) · [研究团队](content/guide/zh/labs.md) |
| 找具体资料 | [资料总索引](content/guide/zh/resources.md) · [科研经验与问答](content/guide/zh/research-conversations.md) |

[在线阅读](https://takamatsu-hikaru.github.io/AI-Research-Guide/zh/)包含全文搜索、可展开的科研问答，以及 10 个方向的简介、发展路线、术语和 37 张带原图的论文卡片。每张卡片都附论文原文及相关项目链接。

## 交流与参与

欢迎在[讨论区](https://takamatsu-hikaru.github.io/AI-Research-Guide/zh/ama.html)聊学习、项目和科研中的问题。错别字、失效链接和内容补充可以[提 Issue](https://github.com/Takamatsu-Hikaru/AI-Research-Guide/issues)或提交 PR。觉得有用，也欢迎 Star 收藏、分享给身边的同学。

中文正文在 [content/guide/zh](content/guide/zh)，英文正文在 [content/guide/en](content/guide/en)。方向介绍和论文卡片的数据在 [content/guide/fieldnotes](content/guide/fieldnotes)。

## 关于与致谢

[关于 UESTC AI 社与这份指南](content/guide/zh/about.md)。大学开篇、科研问答和个人经历由社团成员撰写，课程、论文和博客链接到原作者页面。

这份指南承接[《UESTC AI 社指南》](https://my.feishu.cn/docx/HQYodz7thohS1Nxo6KAcoeNtnbb)及 AI4UESTC_Beginners 的整理工作，感谢旧库作者与贡献者。[Lumina 具身智能指南](https://github.com/TianxingChen/Embodied-AI-Guide)为具身方向的组织与资料选取提供了参考。论文插图的来源记录在[配图索引](content/guide/paper-figures.json)。

## 本地构建

需要 Node.js 22 或更高版本。

```bash
npm ci
npm run build
```

打开 `public/blog/guide/zh/index.html` 或 `public/blog/guide/en/index.html`。GitHub Pages 会在主分支更新后自动构建发布。
