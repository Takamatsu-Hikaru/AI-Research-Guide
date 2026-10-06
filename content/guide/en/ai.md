# Working with AI

AI can participate in many stages of work. Pay attention to which judgments remain with you afterward.

## Make a task concrete

For a paper reproduction, collect the paper, code version, running conditions, and result you want to check. Ask AI to explain entry points, split the work into steps, inspect the environment, and write scripts.

Proceed in inspectable steps: find how data enters the model, run a small part, then expand to complete evaluation. Understand costs and stopping conditions before long or paid runs.

Goals, checks, and reusable steps mean “what to finish this time,” “how to know it is done,” and “how to use it again.” Plain text and records can do this before you choose particular tool features.

When you already have reading notes, provide their location and the comparison you need:

> Read the three paper notes I specify in Papers and compare how they address the same question. Attach the paper and note location to each comparison, preserve my annotations, and list missing information.

[irene's note workflow](irene-workflow.md#notes) connects Zotero, Obsidian, and a local AI tool.

## When it says it is finished, what do you inspect?

What changed in the code? Which configuration ran? What did tests cover? Where are outputs and logs? Turn “the experiment succeeded” into something you can examine.

The same applies to reading. Ask for an explanation, then ask which passage supports it. Open and check any references it supplies.

## Keep an understanding of your own

For model deployment, do you know why a metric was chosen, whether the test workload resembles real use, which trick helped, and what might change under different conditions?

Explain a before-and-after comparison to someone. The point where your explanation breaks is worth investigating. You need not do everything manually, but understanding affects how you use tools in work you intend to pursue long term.

## AI can be a discussion partner

Ask it for counterexamples, alternative explanations, and missing evidence for a concrete idea. Then decide what to use and how to test it.

[Lilian Weng's agent article](https://lilianweng.github.io/posts/2023-06-23-agent/) and [Anthropic's Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) explain how systems organize tasks. To research agents themselves, see the [direction page](agent.md).

Handle unpublished and review material according to the actual team and venue requirements; find rule entry points under [publication](publishing.md). My [freshman-year review](timeline.md) also discusses whether you have really learned something.

<a id="grill-me"></a>

## Let AI ask you questions

Explain a method in your own words alongside its diagram, then ask AI to follow up on that explanation. Why is a module needed? What happens if it is removed? Which experiment supports your judgment? Return to the relevant passage, equation, or figure when you get stuck.

> I will explain this method diagram. Ask one question at a time and wait for my answer. Focus on inputs and outputs, module roles, conditions, and evidence. Identify the step I have not explained clearly and where to look again.

This is how irene uses **Grill Me**. Her [experience article](irene-workflow.md#grill) describes close reading, selective reading, and skimming; she also shares a [paper-reading toolkit](https://github.com/tseirene6/paper-tools-marketplace). When a task works well repeatedly, keep its input requirements, steps, and output format as a prompt or skill to use with new material.

## Compare your own AI habits

[Two essays about AI](lesswrong.md#ai) discuss students' attitudes and how certain interactions can shape judgment. Compare their situations with your own process.
