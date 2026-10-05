# Agents: getting models to do things

Asking a model to explain an error is different from asking it to open a project, locate files, change code, and run tests. The latter requires observing the environment, choosing the next action, and judging whether the job is done. Many agent research questions live in that process.

## Watch a complete execution

On the [ReAct project page](https://react-lm.github.io/), follow an example alternating reasoning, action, and environmental feedback. Notice whether new information changes the next action.

Then choose a basic exercise from [Hello Agents](https://github.com/datawhalechina/hello-agents) or the [Hugging Face Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction). Build a small system whose tool calls you can inspect and keep its full trace. For Python or API difficulties, return to [foundations](basics.md).

## Find questions in failures

**What happens as tasks get longer?** Do early errors propagate? Is important information lost? Can the system replan after failure? These questions lead to memory, context management, recovery, and long-task evaluation.

**Why can a model still misuse an available tool?** The description, visible information, call format, or action-selection ability may be responsible. Inspect what the model actually saw at each step.

**Do multiple agents help?** Identify work that benefits from division, what communication adds, and its time and cost. Compare a simpler system at the same budget to understand the source of gains.

**How can feedback improve behavior?** Follow this toward training data, rewards, [RL](rl.md), and automated evaluation.

## Make a small experiment you can inspect

Give the system a set of similar tasks, such as retrieving specified facts from public documents with sources. Count successes, incorrect citations, missing information, and tool failures. Keep tasks and conditions fixed across changes and check whether failures decrease.

For coding agents, see [SWE-bench](https://www.swebench.com/); for a broader range of tasks, see [AgentBench](https://github.com/THUDM/AgentBench). Read their task and evaluation definitions separately.

## Further reading

[Lilian Weng's LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/) introduces an early component-based view. The [LLM Agent Paper List](https://github.com/WooooDyy/LLM-Agent-Paper-List) helps once you have a question to follow.

For using agents in your own research, see [working with AI](ai.md). For studying why they fail, see [experiments and evaluation](experiments.md).

## Evaluation and organization

[Chai's research notes](blogs.md#chai) include AutomationBench scoring analysis and a simulation study of multi-agent organization. More tutorials and paper lists are in the [agent catalog](catalog-directions.md#topic-21).
