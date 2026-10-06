# Writing, figures, and talks

You have spent a long time with a problem; the reader has not. Writing brings them to a place where they can understand the question, method, and evidence.

## Say what you found

Write a few sentences: what was wrong before, what did you do, and what do we now know? Put the corresponding figures, experiments, or analyses beside them. Unsupported sentences reveal missing work.

For example:

> Vague: We propose an innovative, efficient, robust framework.  
> Specific: We found that the system often loses early constraints in long tasks, so we added a task-state record and tested whether it reduces these failures.

The second version identifies an observation, a method, and a test. Check that later results answer the opening statement.

## From structure to paragraphs

[Zhewei Huang and Xiaohan Ding's Writing AI Conference Papers](https://github.com/hzwer/WritingAIPaper) helps with contributions, structure, and revision. Pair it with [Simon Peyton Jones's writing talk](https://www.microsoft.com/en-us/research/academic-program/write-great-research-paper/) and think about helping readers grasp the key idea early.

The introduction establishes the question and contribution; methods explain the approach; experiments provide evidence; related work gives context. Writing these sections forces the underlying thinking to become clearer.

State important conditions directly and remove unsupported adjectives. For a disputed choice, explain reasons and results; you do not need a preemptive defense against every imaginable objection.

If you already have reading notes, group your judgments with supporting papers and experiments around the question you want to answer, then outline the paragraphs. When AI helps organize them, ask it to attach note locations and original sources to each paragraph, and add your own analysis. See [irene's note setup and example requests](irene-workflow.md#notes).

## Decide what a figure should show

In a method figure, show where inputs come from, what happens, and what comes out. In a results figure, make comparisons, metrics, and changes readable. Arrows, colors, and legends need clear purposes.

Inspect the figure at a smaller size and show it to someone outside the project. [Fundamentals of Data Visualization](https://clauswilke.com/dataviz/) helps with chart choice and communication. Use a whiteboard, slides, or another tool that serves the figure.

## Typesetting and presenting

Use [Overleaf's LaTeX introduction](https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes) for text, equations, figures, and citations. For everyday notes and READMEs, [basic Markdown](https://www.markdownguide.org/basic-syntax/) is enough to begin.

For a talk, consider what the audience knows and select enough material to explain the central question. See [the research-talk lecture](https://www.microsoft.com/en-us/research/academic-program/give-great-research-talk/). A lab update can center on the question, key results, current interpretation, and what you want to discuss.

[Publication](publishing.md) · [Experiment records](experiments.md) · [AI-assisted revision](ai.md)

## Consult while drafting

[Huang and Ding's guide](blogs.md#ding) helps with contributions, structure, and drafts. [The Bottom Line](lesswrong.md#bottom-line) discusses how evidence determines conclusions. LaTeX, figures, and presentation resources are in the [research catalog](catalog-research.md#topic-11).
