<p align="center"><img src="public/blog/guide/logo.png" width="190" alt="UESTC AI Club"></p>

<h1 align="center">AI Research Guide</h1>
<p align="center">University choices, your first research project, and lessons along the way</p>
<p align="center"><a href="README.md">中文</a> · <b>English</b> · <a href="https://takamatsu-hikaru.github.io/AI-Research-Guide/en/">Read online</a> · <a href="https://takamatsu-hikaru.github.io/AI-Research-Guide/en/ama.html">Discussions</a></p>

This guide is for students starting university who want to explore AI and research. It brings together our answers to questions about university choices and getting started in research, alongside beginner projects, key papers across research areas, courses, and tools. It also covers contacting faculty, joining a lab for the first time, failed experiments, and the anxiety of comparing yourself with your peers.

## Start here

| What are you thinking about? | Read |
| --- | --- |
| The choices university offers and where you want to go | [A letter to new university students](content/guide/en/welcome.md) |
| Why try research? How do you begin, find a direction, or contact a supervisor? | [Getting started in research: 60 questions](content/guide/en/research.md) |
| Making a small project work | [Your first AI project: where to begin?](content/guide/en/start.md) |

## Explore the guide

| Section | Topics |
| --- | --- |
| Foundations and learning | [Which foundations do you need, and how much?](content/guide/en/basics.md) · [Pick a paper](content/guide/en/papers.md) |
| Research directions | [Overview](content/guide/en/directions.md) · [Language models](content/guide/en/llm.md) · [Agents](content/guide/en/agent.md) · [Vision](content/guide/en/vision.md) · [Multimodal learning](content/guide/en/multimodal.md) · [Generation](content/guide/en/generation.md) · [Reinforcement learning](content/guide/en/rl.md) · [World models](content/guide/en/world-model.md) · [Embodied AI](content/guide/en/embodied.md) · [Efficiency and systems](content/guide/en/systems.md) · [Interdisciplinary AI](content/guide/en/ai4x.md) |
| Doing research | [Finding and reading papers](content/guide/en/reading.md) · [Experiments](content/guide/en/experiments.md) · [Writing, figures, and presentations](content/guide/en/writing.md) · [Contact and collaboration](content/guide/en/contact.md) · [Working with AI](content/guide/en/ai.md) · [Publication](content/guide/en/publishing.md) |
| Experience and life | [Lessons and reflection](content/guide/en/experience.md) · [My freshman year](content/guide/en/timeline.md) · [Living well](content/guide/en/life.md) |
| Looking outside | [Lookout](content/guide/en/lookout.md) · [Blogs](content/guide/en/blogs.md) · [LessWrong](content/guide/en/lesswrong.md) · [Mu Li](content/guide/en/limu.md) · [Research groups](content/guide/en/labs.md) |
| Resources | [Resource index](content/guide/en/resources.md) · [Research conversations and Q&A](content/guide/en/research-conversations.md) |

The [website](https://takamatsu-hikaru.github.io/AI-Research-Guide/en/) includes full-text search, expandable research Q&A, and introductions, roadmaps, terminology, and 37 illustrated paper cards across 10 fields. Cards link to the original papers and related projects.

## Community knowledge sharing · OpenEnvision

[OpenEnvision (OE)](https://openenvision.github.io/) is an open AI research community connecting academia and industry, with interests in world models, multimodal intelligence, vision, and embodied AI. It also shares research knowledge through curated writing, interviews, and courses.

- **[BlogrXiv: AI research blogs and technical writing](https://openenvision.github.io/BlogrXiv/site/index.html)** brings together research blogs, lab essays, and technical notes. Browse by field for explanations, engineering experience, and research methods, then follow links to the original articles.
- **[ScholarTube: AI interviews, podcasts, and courses](https://openenvision.github.io/ScholarTube/)** collects long-form researcher interviews, video podcasts, complete courses, and research talks across agents, world models, vision, robotics, and research practice, with links to the original videos.

You can also recommend articles and videos to [BlogrXiv](https://github.com/OpenEnvision/BlogrXiv) and [ScholarTube](https://github.com/OpenEnvision/ScholarTube).

## Embodied AI community · Lumina

[Lumina](https://lumina-embodied.ai/) brings together embodied AI research, open projects and community events. Its [Embodied AI Guide](https://github.com/TianxingChen/Embodied-AI-Guide) organizes the field’s learning resources; Talks, research coverage and events on the website introduce the people and projects behind the work.



## Discuss and contribute

Bring questions about learning, projects, and research to the [discussion board](https://takamatsu-hikaru.github.io/AI-Research-Guide/en/ama.html). Report typos, broken links, or suggested additions through [Issues](https://github.com/Takamatsu-Hikaru/AI-Research-Guide/issues) or a pull request. If the guide helps, star it for later or share it with other students.

Articles are in [content/guide/zh](content/guide/zh) and [content/guide/en](content/guide/en). Field introductions and paper cards are in [content/guide/fieldnotes](content/guide/fieldnotes).

## About and acknowledgments

[About the UESTC AI Club and this guide](content/guide/en/about.md). Club members wrote the opening essays, research Q&A, and personal accounts. Courses, papers, and blogs link to their original authors.

This guide continues the work of the [UESTC AI Club Guide](https://my.feishu.cn/docx/HQYodz7thohS1Nxo6KAcoeNtnbb) and AI4UESTC_Beginners. We thank their authors and contributors. The [Lumina Embodied AI Guide](https://github.com/TianxingChen/Embodied-AI-Guide) informed the organization and resource selection for embodied AI. Figure attribution is recorded in the [figure index](content/guide/paper-figures.json).

## Build locally

Use Node.js 22 or newer.

```bash
npm ci
npm run build
```

Open `public/blog/guide/zh/index.html` or `public/blog/guide/en/index.html`. GitHub Pages builds and publishes changes to the main branch automatically.
