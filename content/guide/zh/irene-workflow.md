# 搭建自己的科研工作流

作者：[irene](https://github.com/tseirene6) · 根据《一些小分享》整理 · [原文 PDF（含截图）](../../../public/blog/guide/sources/irene-research-workflow.pdf) · [论文阅读工具](https://github.com/tseirene6/paper-tools-marketplace)

> 其实真正我的灵机一动基本上没有，都是借鉴学习（可以说蒸馏吗？）各种优秀的人的优秀经验，我就自己收益很多，也想分享给大家，零碎收获这些知识可能会耗费一些时间，所以我相当于只是一个搬运工，希望能有帮助！

这篇分享从收论文、记笔记开始，接着讲科研简报、阅读深度和 AI 追问，最后回到怎样沿着自己的问题继续找资料。下面保留 irene 的做法与使用感受，并把配置和提示词放在对应步骤里。

<a id="notes"></a>

## 用 Zotero 和 Obsidian 整理论文

irene 用 Zotero 管理论文与 PDF，用 Obsidian 保存文献笔记和长期思考，再让 Codex 读取笔记目录，参与比较、整理和写作。Scholaread 是她读论文时常用的阅读器。

先收一篇论文，用它走完一遍：

1. 在 [Zotero](https://www.zotero.org/support/quick_start_guide) 保存题目、作者、年份、DOI、原文和 PDF。
2. 在 [Obsidian](https://obsidian.md/) 建好笔记库，通过 [Zotero Integration](https://github.com/community-archive/obsidian-zotero-integration) 配置导入模板。插件的依赖与配置在仓库说明中。
3. 导入文献笔记，补上自己的批注、疑问和相关论文链接。
4. 在能访问本地文件的 AI 编程工具中打开这个笔记目录，指定要处理的文件和希望得到的结果。

她的笔记目录分为 Papers、Notes、Projects、Attachments、Templates，分别放文献笔记、日常思考、项目资料、图片附件与模板。想把笔记、待办和项目放在同一页，她还推荐了 [apex-dashboard](https://github.com/PandoraReads/apex-dashboard)。

一篇文献笔记可以按下面的内容留下：

| 内容 | 记什么 |
| --- | --- |
| 来源 | 标题、作者、年份、DOI、Zotero 条目与 PDF 链接 |
| 问题与做法 | 论文要解决什么，方法和数据是什么 |
| 证据 | 关键结论及对应图表、实验或原文位置 |
| 自己的批注 | 哪里没懂、哪里有疑问、哪些内容可能引用 |
| 联系 | 相关主题、其他论文、自己的项目与后续问题 |

有了这些材料，就可以提出具体任务：

> 比较这三篇论文笔记里的方法、数据和结论。每项比较附上对应论文和笔记位置，把缺少的信息列出来。

> 把这篇文献笔记整理成模板，保留我的批注和疑问。检查数学公式能否在 Obsidian 中正常显示。

> 根据这些已有笔记，围绕我的研究问题列一个文章提纲，把每段要用的证据和来源放在旁边。

<a id="brief"></a>

## 给自己做一份科研简报

irene 用科研简报扩大阅读范围。她希望在自己的兴趣边界之内，持续看到原本不知道、但值得知道的新东西。

先说明兴趣和当前问题，再决定各方向的比重。她给了三组例子：

- LLM 60%、Agent 20%、理论 10%、高校动态 10%。
- 具身智能 50%、世界模型 20%、视觉 20%、实验室动态 10%。
- Virtual Cell 40%、单细胞基础模型 30%、AI 基础方法 20%、高校动态 10%。

这些比例用于表达偏好。随着研究问题变化，也可以把某个方向的比重提高，或暂时减少已经反复看过的主题。

### 一份可以修改的简报提示词

> 给我一份中文科研简报。我的阶段是［填写］，当前研究问题是［填写］，关注方向及比重是［填写］。参考我提供的研究笔记，以及最近七天的简报和已读清单。
>
> 选约五条值得关注的工作，优先看最近二十四小时到一周内的论文、模型、开源项目、benchmark、工具、会议成果和学术机会。每条附发布日期和原始来源，并回答：发生了什么？为什么与我的问题有关？接下来值得读哪张图、试哪个项目或查哪个问题？
>
> 最近七天推荐过的论文、项目、benchmark 和事件不再重复；如果有新版本、新代码或新结果，说明这次具体增加了什么。同一天尽量覆盖不同子方向。
>
> 我希望五条中至少四条是最近七天未推荐的新主题，至少两条来自近二十四到七十二小时。当天材料不足时，可以把范围扩大到十四天，并标明日期。最后列出本期新主题数量。

她在原文中的做法，是先要求“今天按这个规则推送一期”，读过后再调整。例如：增加多模态与视频、减少连续重复的 diffusion、把泛泛的趋势换成具体论文和开源项目。内容合适后，再通过工具中的定时任务设置每天早上九点，或改成每周汇总。

去重需要有记录可查：把简报日期、论文标题、项目链接和是否读过保存在一份清单里，下一次生成时一并提供。这样换个说法重复推荐的材料也能被识别。

<a id="depth"></a>

## 这篇论文值得读多深？

简报带来候选论文，接下来要决定给哪篇文章投入时间。irene 先看研究问题，再看证据，最后结合阅读成本、连接价值和能做的实验决定深度。

她会维护一份随时更新的研究地图：

- 当前主线与正在困惑的问题。
- 已经掌握的基础工作和前置知识。
- 正在做、已经复现过的模型与实验。
- 希望联系起来的方向，例如 AI 与 Biology。
- 目前暂时不感兴趣的内容。

看到新论文时，问它与这份地图是什么关系：直接回答问题、连接两条主线、提供一个能用的工具，还是仅仅关键词相似。“世界模型”“AI4S”可以标出方向；真正要找的，往往是其中一个更具体的问题。

### 把主张与证据对应起来

她把一篇论文拆成四项：

| 项目 | 要问的问题 |
| --- | --- |
| Problem：问题 | 旧方法遇到了什么瓶颈？ |
| Claim：主张 | 作者希望证明什么？ |
| Evidence：证据 | 哪些实验、图表和分析支持它？ |
| Assumption：假设 | 结论依赖哪些前提？哪些前提还没有充分检验？ |

提供论文 PDF、项目页与代码后，可以把自己的关注点一起交给 AI：

> 用一句话还原研究问题，提取不超过三个核心主张，逐项找到证据。创新来自新的原理、清晰假设驱动的设计，还是工程整合？消融能否区分各模块的贡献？指标测到的东西，是否对应作者声称的能力？请标明相关章节、图表，以及值得继续追问的地方。

她特别强调：证据有缺口的论文，也可能值得精读。它的问题可能很重要，弄明白为什么尚未证明结论，本身就有研究价值。反过来，一篇扎实但与当前问题关系很小的文章，也可以先略读。

### 决定这次的阅读范围

她会综合主线相关性、问题的重要性、证据强度、跨方向的联系、实验价值，以及前置知识和时间成本，选择精读、半精读、略读或暂时搁置。真正影响决定的往往是一两个因素。

> 请为这篇论文制定阅读方案：哪些章节、图表必须看，哪些可以浏览，需要先补什么知识？读完要能回答哪三个问题？留下一个研究问题和一个值得做的验证实验，并说明什么新证据会改变目前的阅读优先级。

<a id="grill"></a>

## 和 AI 一起读，也让它问你

irene 把自己常用的阅读流程整理在 [paper-tools-marketplace](https://github.com/tseirene6/paper-tools-marketplace)。她喜欢用 Grill Me：自己尝试把论文讲给 AI 听，由它继续追问、指出逻辑断点，再回原文补上。

> 我先解释这张方法图，你每次只追问一个问题。围绕输入输出、模块为什么需要、关键假设和实验证据来问。等我回答后，再指出哪一步没有讲清楚，并告诉我应该回看论文的哪个位置。

原 PDF 第 16 页保留了一段实际追问的截图：从红车、红卡车和蓝车的例子，继续追到表征、标签和泛化。问题要跟着刚才的回答走。

### 精读：能结合方法图讲明白

她自己的顺序是：

1. **补前置知识。** 找出需要的数学、领域知识和前置论文。
2. **摘要与引言。** 还原问题、动机和文章骨架。
3. **方法。** 配着完整机制图逐模块解释：输入是什么，做了什么，输出到哪里。
4. **数学。** 理解关键公式中的量和作用。原文里她也坦言，自己在这部分投入还不够多。
5. **实验。** 重点看消融、失败情况与泛化，逐项对应方法的主张。
6. **结论与自己的想法。** 记下贡献、局限、与研究方向的联系，以及下一步想验证什么。

### 半精读：看出工作之间的联系

这类阅读用来建立领域地图。她围绕研究问题、证据、方法逻辑、局限和研究联系做笔记。先补理解这篇文章必需的背景，再问旧方法哪里不够；画出整体 pipeline 后，拆开各模块的作用、实现和问题，最后看实验如何支持它。

在她的配置中，Scholaread 用来阅读，Obsidian 留下可以再次使用的笔记，Grill Me 用来追问理解。原 PDF 第 18—20 页有笔记与流程图示例。

### 略读：留下回来找它的理由

先用一句话记“这篇文章通过什么机制，解决什么问题，得到了什么结果”。再留下旧方法的局限、最多三个创新点、关键实验，以及与自己问题的联系。遇到值得深入的疑问，再调整阅读深度。

<a id="search"></a>

## 从读过的论文继续找问题

当连续几篇论文指向同一个瓶颈，某篇文章连接了两条研究主线，或者出现一个值得复现的问题，就可以开始定向搜索。找国内团队、导师、实验室和后续项目时，也可以沿用这个过程。

她会把问题写成“研究对象＋核心机制＋关键任务＋想验证的现象”，用 [切问](https://qiewenpaper.com/zh/home) 等检索工具匹配文献。随后寻找基础工作、直接前作和同期研究，再到作者主页、项目页核对代码、数据、补充实验和新版本。

把这些结果补回研究地图：现在更清楚了什么，哪些解释发生了变化，还有什么值得追下去。这些问题也能带进与学长、老师的讨论。

<a id="tools"></a>

## 工具、插件和提示词

她推荐的小红书账号是 **tabris🔑**，常从那里的阅读推荐继续找文章和博客。她也很喜欢 [Scholaread 靠岸学术](https://www.scholaread.cn/help) 和 [切问](https://qiewenpaper.com/zh/home)，分别用于论文阅读和检索。

除了前面的笔记工具，原文还提到了用 Claude Code 接入 DeepSeek 的终端工作方式：[DeepSeek 接入说明](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code)。

### 编辑器与浏览器

| 使用场景 | 原文提到的工具 |
| --- | --- |
| 编辑器语言与 Markdown | 简体中文语言包、markdownlint、Markdown Preview Enhanced with litvis |
| 拼写与格式 | [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)、[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) |
| 代码报错与历史 | [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)、[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) |
| 数据分析 | [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)、[Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv) |
| LaTeX | [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop)，配合本地 LaTeX 编译环境 |
| 浏览器阅读 | AnyDoc 翻译器、LaTex Math Equations Viewer、Markdown Reader |
| 收集文献 | [Zotero Connector](https://www.zotero.org/download/connectors) |

### 把常用步骤留成工作流

她把新任务的过程串成：Grill Me 明确问题，Plan 制定计划，Arxiv／Firecrawl 找资料，Zotero 保存原文，Obsidian 记笔记，Jupyter 分析数据，再组织论文、润色和制作汇报。原文使用 Research Paper Writing、Humanizer、PowerPoint 等名称指代相应的 skill。

交代任务时，她会说明输入在哪里、要得到什么、输出格式、篇幅或时间、哪些内容要保留，以及是否需要引用来源。最初可以先完成“一篇论文进入 Zotero—导入笔记—让 AI 帮忙整理”，之后把反复使用的步骤留下来。

[回到找资料和读论文](reading.md) · [和 AI 一起做事](ai.md) · [Lookout](lookout.md) · [更多经历与方法](experience.md)
