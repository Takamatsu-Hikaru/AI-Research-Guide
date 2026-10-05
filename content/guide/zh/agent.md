# Agent：让模型去做事

让模型解释一个报错，和让它打开项目、定位文件、修改代码、运行测试，是两种不同的任务。后者需要持续观察环境，决定下一步动作，并判断事情有没有做完。Agent 研究里很多问题就发生在这个过程里。

## 先看一次完整执行

从 [ReAct 的项目页](https://react-lm.github.io/)看一个推理、行动和环境反馈交替进行的例子。这里最值得看的是过程：模型拿到新信息后，下一步有没有变化？

再选 [Hello Agents](https://github.com/datawhalechina/hello-agents) 或 [Hugging Face Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction) 的一个基础练习。先做一个工具调用能看清楚的小系统，保存完整记录。Python 和接口调用卡住时，回[基础页](basics.md)。

## 从失败的地方找到问题

**任务变长会怎样？** 早期错误会不会传到后面，重要信息是否丢失，失败后能否重新规划。这会把你带到记忆、上下文管理、恢复与长任务评测。

**工具有了，为什么还不会用？** 问题可能在工具描述、可见信息、调用格式，也可能在模型选择动作的能力。先检查它每一步实际看到了什么。

**几个 Agent 合作会更好吗？** 看任务有没有需要分工的部分，通信带来了什么帮助，又增加多少时间和成本。用同样预算下的简单方案作比较，才容易知道收益来自哪里。

**怎样让行为通过反馈改善？** 这会接到训练数据、奖励、[RL](rl.md)和自动评测。

## 做一个你能检查的小实验

给系统一组同类型任务，例如从几份公开资料中找出指定事实并附出处。记录成功、错误出处、漏掉信息和工具调用失败各有多少次。每次改动都保留原来的题目与运行条件，再看失败是否减少。

关注代码 Agent，可以看 [SWE-bench](https://www.swebench.com/)；想认识更多任务，可以看 [AgentBench](https://github.com/THUDM/AgentBench)。它们提供的任务和评价值得单独读。

## 往下读

[Lilian Weng：LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)适合建立早期组件视角。[LLM Agent Paper List](https://github.com/WooooDyy/LLM-Agent-Paper-List)适合选定问题后继续找论文。

如果你现在主要想用 Agent 帮自己科研，去[和 AI 一起做事](ai.md)。如果开始研究它为何失败，接着看[实验与评估](experiments.md)。

## 再看评测与组织方式

[Chai 的研究笔记](blogs.md#chai)收有 AutomationBench 评分分析和多 Agent 组织的模拟研究。更多教程与 paper list 见[Agent 资料目录](catalog-directions.md#topic-21)。
