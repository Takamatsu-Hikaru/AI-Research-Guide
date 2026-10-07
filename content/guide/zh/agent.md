# Agent：让模型去做事

让模型解释一个报错，和让它打开项目、定位文件、修改代码、运行测试，是两种不同的任务。后者需要持续观察环境，决定下一步动作，并判断事情有没有做完。Agent 研究里很多问题就发生在这个过程里。

## ReAct：推理、行动与反馈

从 [ReAct 的项目页](https://react-lm.github.io/)看一个推理、行动和环境反馈交替进行的例子。这里最值得看的是过程：模型拿到新信息后，下一步有没有变化？

再选 [Hello Agents](https://github.com/datawhalechina/hello-agents) 或 [Hugging Face Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction) 的一个基础练习。先做一个工具调用能看清楚的小系统，保存完整记录。Python 和接口调用卡住时，回[基础页](basics.md)。

## Agent 里面，还能研究什么？

同一个 Agent 任务，可以从决策、协作、数据、训练、评测或系统实现切入。下面这些方向经常交叉：例如研究长任务的失败恢复，既可能改记忆，也可能补训练数据或调整工具接口。

### 规划、工具与记忆

任务变长后，早期错误会不会传到后面，重要信息是否丢失，失败后能否重新规划？工具有了却不会用，问题可能在工具描述、可见信息、调用格式，也可能在模型选择动作的能力。先检查它每一步实际看到了什么，再研究该保留哪些记忆、何时调用工具，以及什么时候需要换一个计划；这些问题也会接到上下文管理、恢复与长任务评测。

- [Reflexion](https://arxiv.org/abs/2303.11366)：看一次失败怎样变成文字记忆，并影响下一次尝试；适合理解反馈如何进入决策。
- [Voyager](https://voyager.minedojo.org/)：看 Minecraft 中的任务选择、代码修正和技能库，理解一段成功行为怎样被后续任务复用。

### 多 Agent 系统（MAS）：分工、通信与组织

几个 Agent 合作会更好吗？看任务有没有需要分工的部分，通信带来了什么帮助，又增加多少时间和成本。可以具体研究谁向谁传消息、共享多少上下文、谁负责检查结果，以及分歧如何解决。用同样预算下的简单方案作比较，才容易知道收益来自哪里。另一类问题关注群体行为：个体的记忆和互动怎样形成信息传播与社会关系。

- [AutoGen](https://arxiv.org/abs/2308.08155)：从可配置的角色与对话流程看多 Agent 如何共同完成任务，适合琢磨分工和通信机制。
- [Generative Agents](https://arxiv.org/abs/2304.03442)：沿小镇里的聚会邀请看信息怎样在人际网络中传播，理解个体行为与群体结果的联系。

### 轨迹数据：用什么经历教会 Agent

Agent 的训练样本可以包含观察、动作、工具返回和最终结果。哪些任务值得采集，成功轨迹怎样筛选，失败与重试是否有用，不同任务的数据如何混合，都是可研究的问题。看数据时可以沿一条完整轨迹检查：模型当时能看到什么，训练要求它预测什么，工具返回的内容又怎样参与训练。

- [Toolformer](https://arxiv.org/abs/2302.04761)：看候选工具调用如何生成、执行和筛选，理解怎样用少量示例构造工具使用数据。
- [AgentTuning](https://arxiv.org/abs/2310.12823)：看它的 AgentInstruct 交互轨迹与通用指令如何混合训练，以及怎样检查能力能否迁移到未见过的 Agent 任务。

### Agent RL：让行为通过反馈改善

怎样让模型通过任务反馈学会更好的动作？这会接到训练数据、奖励、[RL](rl.md)和自动评测。多步任务里，最终成功可能依赖很早的一次搜索或工具选择，因此值得研究奖励如何分配到各步、怎样探索新的动作，以及训练时怎样处理环境返回。一个具体问题是：模型是否学会了更有效地搜索，还是只是增加了调用次数。

- [Search-R1](https://arxiv.org/abs/2503.09516)：看搜索如何进入多轮 RL 训练，重点读结果奖励与检索文本的处理，再对照实际搜索轨迹。
- [Agent Lightning](https://arxiv.org/abs/2508.03680)：看 Agent 执行记录怎样转成训练所需的数据，以及信用分配如何把任务反馈关联到具体决策。

### 环境与评测：怎样知道任务真的做完了

研究 Agent 也包括构建它能反复交互的环境，以及判断任务是否完成的方法。任务能否重置、初始状态是否一致、评分能否识别只做了一半的结果，都会影响比较是否可信。除了总成功率，还可以看失败发生在哪一步、要花多少次调用，以及换一类任务后表现如何。

- [AgentBench](https://arxiv.org/abs/2308.03688)：认识操作系统、数据库等不同交互环境，比较各类任务的定义、评价方式与典型失败。
- [WebArena](https://arxiv.org/abs/2307.13854)：看可复现的网站环境和按任务完成情况评分的设计，理解网页操作怎样变成可比较的实验。

### 执行框架与基础设施（Harness / Infra）

围绕模型运行的程序会决定它能用哪些工具、怎样收到返回结果、失败后怎样重试，以及何时结束任务。这里可以研究工具接口和上下文组织，也可以研究沙箱、并行执行、日志与状态恢复。保持模型不变，比较不同接口或执行方式下的成功率、耗时和成本，能帮助判断系统设计带来了什么影响。

- [SWE-agent](https://arxiv.org/abs/2405.15793)：看面向 Agent 的文件查看、编辑与执行接口，理解接口设计为什么会影响模型完成代码任务的过程。
- [OpenHands](https://arxiv.org/abs/2407.16741)：看代码执行、命令行、浏览器与沙箱如何接成一个平台，理解运行环境和评测如何支持 Agent 实验。


<a id="agent-projects"></a>

## 从编程到日常生活，Agent 已经在做什么

一个实际的 Agent 往往会同时用到工具、记忆、规划和反馈。编程助手、个人助理和科研工具，已经把这些能力用在了不同的任务里。

### 编程 Agent：在代码仓库里完成任务

<div class="agent-project-grid">
<article class="agent-project"><h4><a href="https://openai.com/codex/">Codex ↗</a></h4><p>Codex 可以读取项目、修改代码、运行测试和审查改动，也支持并行处理任务与持续的后台工作。可以从一次修复报错的过程，看它怎样找到相关文件、验证修改，再根据测试结果继续处理。</p></article>
<article class="agent-project"><h4><a href="https://code.claude.com/docs/en/overview">Claude Code ↗</a></h4><p>Claude Code 在终端中读取仓库、编辑文件和执行命令，能把理解项目、实现功能与测试接在一起。它的工具、Skills 和项目指令，也适合用来观察一个编程 Agent 怎样适应团队的工作方式。</p></article>
<article class="agent-project"><h4><a href="https://www.kimi.com/code/en">Kimi Code ↗</a></h4><p>Kimi Code 提供终端和编辑器入口，可以搜索代码、修改项目、运行命令并根据反馈调整后续步骤。用它完成一次小功能，再翻执行记录，可以看到代码理解、工具调用和验证怎样配合。</p></article>
<article class="agent-project"><h4><a href="https://www.zcode.network/en/">ZCode ↗</a></h4><p>ZCode 是面向 GLM 的编程 Agent 工作环境，把项目、对话和任务执行放在一起。它支持通过 AGENTS.md 提供项目约定，可以关注这些上下文怎样影响模型的修改与检查。</p></article>
<article class="agent-project"><h4><a href="https://pi.dev/">Pi ↗</a></h4><p>Pi 是一个可以自行扩展的轻量 Agent harness，核心围绕文件读写和命令执行。扩展、Skills 和提示模板都可以按自己的工作流组合，适合顺着代码理解 Agent 循环和工具接口。</p></article>
</div>

### 个人 Agent：记住你的事情，持续跟进

<div class="agent-project-grid">
<article class="agent-project"><h4><a href="https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/">Muse ↗</a></h4><p>Meta 的 Muse 在云端有自己的计算机和浏览器，可以连接日常应用，处理邮件、行程和长期目标。它把个人偏好与持续任务放进同一个产品，能接着看记忆、跨应用操作和任务状态怎样协同。</p></article>
<article class="agent-project"><h4><a href="https://openai.com/index/introducing-dots/">Dots ↗</a></h4><p>OpenAI 的 Dots 是持续在线的个人 Agent，使用云端计算机和连接的应用推进任务，并从交流与反馈中积累对用户的了解。它把一次对话延伸到持续协作，对应长期上下文、后台执行和反馈学习等问题。</p></article>
<article class="agent-project"><h4><a href="https://github.com/NousResearch/hermes-agent">Hermes ↗</a></h4><p>Hermes 是 Nous Research 开源的个人 Agent，可以从终端和聊天软件接收任务。它保留跨会话记忆，并把执行中积累的方法整理成可复用技能；对记忆和技能积累感兴趣，可以继续读它的实现。</p></article>
</div>

### 科研 Agent：把调研和实验连起来

<div class="agent-project-grid">
<article class="agent-project"><h4><a href="https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep">ARIS ↗</a></h4><p>ARIS 用 Skills 组织机器学习研究流程，包括文献调研、想法讨论、实验、结果分析和论文修改。执行模型推进工作，另一个模型参与审阅，再把反馈带回下一轮；可以从中看多 Agent 协作怎样进入科研工作流。</p></article>
</div>

### 健康 Agent：围绕日常健康需求提供服务

<div class="agent-project-grid">
<article class="agent-project"><h4><a href="https://www.antgroup.com/en/news-media/press-releases/1765779300000">蚂蚁阿福 / Ant A-Fu ↗</a></h4><p>蚂蚁阿福围绕健康问答、报告解读、健康记录与医疗健康服务展开。这个场景把长期个人信息、专业知识和服务连接放到一起，也让 Agent 的研究问题延伸到具体行业中的信息组织与任务流程。</p></article>
</div>

[接着看：和 AI 一起做事](ai.md) · [搭建自己的科研工作流](irene-workflow.md)

## 用检索任务检查 Agent 的表现

给系统一组同类型任务，例如从几份公开资料中找出指定事实并附出处。记录成功、错误出处、漏掉信息和工具调用失败各有多少次。每次改动都保留原来的题目与运行条件，再看失败是否减少。

关注代码 Agent，可以看 [SWE-bench](https://www.swebench.com/)；上面的 AgentBench 也提供了[环境与评测代码](https://github.com/THUDM/AgentBench)。它们提供的任务和评价值得单独读。

## Agent 综述与论文索引

[Lilian Weng：LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)适合建立早期组件视角。[LLM Agent Paper List](https://github.com/WooooDyy/LLM-Agent-Paper-List)适合选定问题后继续找论文。

如果你现在主要想用 Agent 帮自己科研，去[和 AI 一起做事](ai.md)。如果开始研究它为何失败，接着看[实验与评估](experiments.md)。

## 评测分析与多 Agent 组织

[Chai 的研究笔记](blogs.md#chai)收有 AutomationBench 评分分析和多 Agent 组织的模拟研究。更多教程与 paper list 见[Agent 资料目录](catalog-directions.md#topic-21)。
