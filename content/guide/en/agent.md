# Agents: getting models to do things

Asking a model to explain an error is different from asking it to open a project, locate files, change code, and run tests. The latter requires observing the environment, choosing the next action, and judging whether the job is done. Many agent research questions live in that process.

## ReAct: reasoning, action and feedback

On the [ReAct project page](https://react-lm.github.io/), follow an example alternating reasoning, action, and environmental feedback. Notice whether new information changes the next action.

Then choose a basic exercise from [Hello Agents](https://github.com/datawhalechina/hello-agents) or the [Hugging Face Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction). Build a small system whose tool calls you can inspect and keep its full trace. For Python or API difficulties, return to [foundations](basics.md).

## What can you study within agent research?

The same agent task can be studied through decisions, coordination, data, training, evaluation, or system design. These directions often overlap: recovering from failure on a long task might involve changing memory, adding training examples, or adjusting a tool interface.

### Planning, tools, and memory

As tasks get longer, do early errors propagate, does important information disappear, and can the system replan after failure? When a model misuses an available tool, the description, visible information, call format, or action-selection ability may be responsible. Inspect what it actually saw at each step, then study which memories to retain, when to call a tool, and when to change the plan. These questions also lead to context management, recovery, and long-task evaluation.

- [Reflexion](https://arxiv.org/abs/2303.11366): follow a failure as it becomes written memory and influences another attempt, making the role of feedback in decisions concrete.
- [Voyager](https://voyager.minedojo.org/): inspect task selection, code revision, and the skill library in Minecraft to see how later tasks reuse successful behavior.

### Multi-agent systems (MAS): division of work, communication, and organization

Do multiple agents help? Identify work that benefits from division, what communication adds, and its time and cost. Research questions include who messages whom, how much context to share, who checks results, and how disagreements are resolved. Compare a simpler system at the same budget to understand the source of gains. Another line studies collective behavior: how individual memories and interactions shape information spreading and social relationships.

- [AutoGen](https://arxiv.org/abs/2308.08155): examine configurable roles and conversation patterns to understand how agents complete tasks together and explore ways to divide work and communicate.
- [Generative Agents](https://arxiv.org/abs/2304.03442): trace a party invitation through a town's social network to connect individual behavior with collective outcomes.

### Trajectory data: which experiences teach an agent?

Agent training examples can contain observations, actions, tool responses, and final results. Which tasks to collect, how to select successful trajectories, whether failures and retries help, and how to mix data from different tasks are all research questions. Follow a complete trajectory to check what the model could see, what it was trained to predict, and how tool responses enter training.

- [Toolformer](https://arxiv.org/abs/2302.04761): inspect how candidate tool calls are generated, executed, and filtered to understand how a few demonstrations can support tool-use data generation.
- [AgentTuning](https://arxiv.org/abs/2310.12823): look at how its AgentInstruct interaction trajectories are mixed with general instructions, and how transfer to unseen agent tasks is evaluated.

### Agent RL: improving behavior through feedback

How can task feedback teach a model to choose better actions? This connects training data, rewards, [RL](rl.md), and automated evaluation. Success on a multi-step task may depend on a much earlier search or tool choice. Questions include how to assign rewards across steps, explore new actions, and handle environment responses during training. One concrete question is whether a model learns to search more effectively or simply makes more calls.

- [Search-R1](https://arxiv.org/abs/2503.09516): study how search enters multi-turn RL training, focusing on outcome rewards and the treatment of retrieved text, then compare actual search trajectories.
- [Agent Lightning](https://arxiv.org/abs/2508.03680): see how agent execution records become training data and how credit assignment connects task feedback to particular decisions.

### Environments and evaluation: did the task actually get done?

Agent research includes building environments for repeated interaction and methods for judging completion. Can a task be reset, are initial conditions consistent, and does the evaluator recognize a partially finished result? These choices affect whether comparisons are reliable. Alongside overall success, study where failures occur, how many calls a task takes, and what changes on a different type of task.

- [AgentBench](https://arxiv.org/abs/2308.03688): explore interactive settings such as operating systems and databases, comparing their task definitions, evaluation methods, and typical failures.
- [WebArena](https://arxiv.org/abs/2307.13854): examine reproducible website environments and evaluation based on task completion to understand how browser actions become comparable experiments.

### Harness and infrastructure

The program surrounding a model determines which tools it can use, how results return, how failures are retried, and when a task ends. Research can focus on tool interfaces and context organization, or on sandboxes, parallel execution, logs, and state recovery. Hold the model fixed and compare success, time, and cost under different interfaces or execution methods to understand the effect of system design.

- [SWE-agent](https://arxiv.org/abs/2405.15793): inspect interfaces for viewing files, editing, and execution to understand how interface design affects the process of completing coding tasks.
- [OpenHands](https://arxiv.org/abs/2407.16741): see how code execution, a command line, a browser, and sandboxes form a platform, and how the runtime and evaluation support agent experiments.


<a id="agent-projects"></a>

## What agents are doing: from code to everyday life

Real agents combine tools, memory, planning, and feedback. Coding assistants, personal assistants, and research tools put these capabilities to work on different tasks.

### Coding agents: working in a repository

<div class="agent-project-grid">
<article class="agent-project"><h4><a href="https://openai.com/codex/">Codex ↗</a></h4><p>Codex reads projects, edits code, runs tests, and reviews changes, with support for parallel tasks and ongoing background work. Follow a bug fix to see how it locates files, checks an edit, and responds to test results.</p></article>
<article class="agent-project"><h4><a href="https://code.claude.com/docs/en/overview">Claude Code ↗</a></h4><p>Claude Code reads repositories, edits files, and runs commands from the terminal, connecting code exploration, implementation, and testing. Its tools, Skills, and project instructions show how a coding agent can adapt to a team’s workflow.</p></article>
<article class="agent-project"><h4><a href="https://www.kimi.com/code/en">Kimi Code ↗</a></h4><p>Kimi Code works through the terminal and editor to search code, change a project, run commands, and adjust its next steps from feedback. A small feature and its execution trace show how code understanding, tools, and verification work together.</p></article>
<article class="agent-project"><h4><a href="https://www.zcode.network/en/">ZCode ↗</a></h4><p>ZCode is a coding-agent workspace for GLM that brings projects, conversations, and task execution together. It uses AGENTS.md for project conventions, making it useful for studying how that context shapes edits and checks.</p></article>
<article class="agent-project"><h4><a href="https://pi.dev/">Pi ↗</a></h4><p>Pi is a lightweight, extensible agent harness built around reading and writing files and executing commands. Extensions, Skills, and prompt templates let you adapt its workflow; the code is a useful entry into agent loops and tool interfaces.</p></article>
</div>

### Personal agents: remembering and following through

<div class="agent-project-grid">
<article class="agent-project"><h4><a href="https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/">Muse ↗</a></h4><p>Meta’s Muse has its own cloud computer and browser and connects to everyday apps for email, travel, and longer-term goals. It brings personal preferences and ongoing tasks together, linking memory, cross-app actions, and task state.</p></article>
<article class="agent-project"><h4><a href="https://openai.com/index/introducing-dots/">Dots ↗</a></h4><p>OpenAI’s Dots are always-on agents that use cloud computers and connected apps to work on tasks and learn user preferences from conversations and feedback. They connect ongoing collaboration with long-term context, background execution, and learning from feedback.</p></article>
<article class="agent-project"><h4><a href="https://github.com/NousResearch/hermes-agent">Hermes ↗</a></h4><p>Hermes is an open-source personal agent from Nous Research, accessible through the terminal and messaging apps. It keeps memory across sessions and turns methods developed during tasks into reusable skills; its implementation offers a concrete way to study both.</p></article>
</div>

### Research agents: connecting literature and experiments

<div class="agent-project-grid">
<article class="agent-project"><h4><a href="https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep">ARIS ↗</a></h4><p>ARIS uses Skills to organize machine-learning research, including literature review, idea development, experiments, analysis, and paper revision. An executor advances the work while another model reviews it, with feedback feeding the next round—a concrete multi-agent research workflow.</p></article>
</div>

### Health agents: supporting everyday health needs

<div class="agent-project-grid">
<article class="agent-project"><h4><a href="https://www.antgroup.com/en/news-media/press-releases/1765779300000">蚂蚁阿福 / Ant A-Fu ↗</a></h4><p>Ant A-Fu brings together health questions, report interpretation, health records, and access to healthcare services. The application connects longitudinal personal information, specialist knowledge, and services, making information organization and task workflows concrete in a specific domain.</p></article>
</div>

[Working with AI](ai.md) · [Building a research workflow](irene-workflow.md)

## Evaluate an agent on retrieval tasks

Give the system a set of similar tasks, such as retrieving specified facts from public documents with sources. Count successes, incorrect citations, missing information, and tool failures. Keep tasks and conditions fixed across changes and check whether failures decrease.

For coding agents, see [SWE-bench](https://www.swebench.com/); AgentBench above also provides [environment and evaluation code](https://github.com/THUDM/AgentBench). Read their task and evaluation definitions separately.

## Agent overviews and paper lists

[Lilian Weng's LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/) introduces an early component-based view. The [LLM Agent Paper List](https://github.com/WooooDyy/LLM-Agent-Paper-List) helps once you have a question to follow.

For using agents in your own research, see [working with AI](ai.md). For studying why they fail, see [experiments and evaluation](experiments.md).

## Evaluation analysis and multi-agent organization

[Chai's research notes](blogs.md#chai) include AutomationBench scoring analysis and a simulation study of multi-agent organization. More tutorials and paper lists are in the [agent catalog](catalog-directions.md#topic-21).
