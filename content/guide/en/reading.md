# Finding and reading papers

Decide why you are reading: to explore a direction, solve a code problem, or reproduce a result. That purpose changes where you pause and how deeply you go.

## How do you find related work from one paper?

With a title, find the original, project page, and code. Use [Google Scholar](https://scholar.google.com/) for references and later citations, then compare author pages. Consult [Scholar help](https://scholar.google.com/intl/en/scholar/help.html) or try [AMiner's search and reading tools](https://docs.aminer.cn/user-guide/platform-overview/).

Use [Zotero](https://www.zotero.org/support/quick_start_guide) to save titles, authors, links, versions, and attachments. Keep your questions nearby so you can resume later.

<a id="reading-depth"></a>

## How deeply should you read this paper?

Write down the question you are currently trying to understand. Does the paper answer it directly, connect two previously separate ideas, supply a usable method, or merely share keywords?

| Purpose | Focus | What to keep |
| --- | --- | --- |
| Get a quick picture | Problem, main mechanism, key result | A one-sentence account and a reason to return |
| Understand a field | Background, relationships between methods, evidence, conditions | Comparisons and unresolved questions |
| Reproduce or extend | Architecture, equations, data, settings, ablations, implementation | A method diagram you can explain, questions, and experiments to try |

A gap in the evidence may itself justify close reading if the question matters or the gap offers a research opportunity. Conversely, a rigorous paper with little connection to your current question may need only a skim.

This judgment comes from [irene's reading experience](irene-workflow.md#depth). She also considers prerequisites and time, listing the essential sections and figures alongside the questions she wants to answer.

## What should you focus on in a first reading?

Start with the abstract, introduction, key figures, and conclusion, then check experiments. Write a few sentences:

Under which conditions does the paper address which problem? What is its main method? What results support it? What do I still not understand?

[Keshav's How to Read a Paper](https://cs.uwaterloo.ca/~brecht/courses/854-Experimental-Performance-Evaluation-2018/readings/common/how-to-read/keshav-paper-reading.pdf) and [Mu Li's paper readings](https://github.com/mli/paper-reading) show two approaches. Apply one to an actual paper instead of only collecting reading advice.

<a id="claims-evidence"></a>

For each main conclusion, locate the supporting figure or experiment and the conditions under which it was run. Keep four columns: **claim, evidence, conditions, and your questions**. If a module is credited with an improvement, check whether the ablation isolates it. For a generalization claim, examine how test settings relate to the training data.

Explain this record alongside the method diagram, then try [having AI question your explanation](ai.md#grill-me).

## Go deeper for reproduction

Where did data come from? Do splits overlap? How are metrics computed and baselines set? Where is the core implementation? How much variation is there? Read paper and code together; critical conditions may be in appendices, configurations, or issues.

AI can explain a passage or help list questions. Return to the original or an actual run when you need evidence for a judgment.

<a id="paper-notes"></a>

## What should you keep in a note?

[irene's setup](irene-workflow.md#notes) uses Zotero for papers and attachments, Obsidian for literature notes and her own thinking, and AI to help compare, organize, and question those notes.

Start with:

- **Source:** title, authors, year, and original link.
- **Question and method:** the problem and the central approach.
- **Evidence:** figures, experimental settings, and conclusions.
- **My questions:** unclear points and explanations to test.
- **Related work:** connections to papers you have read or projects you are doing.

Separate your annotations from excerpts and keep page references for key figures. When comparing papers or writing, these lead back to the evidence. Import setup, folders, and example requests are in the [full workflow](irene-workflow.md#notes).

## Connect papers

Choose a shared question and record what each paper changes, depends on, and leaves unresolved. Pay particular attention to matching tasks and resources.

Finish with “After reading these, I want to investigate…” It may lead to another paper, a conversation, or an experiment.

[Choose a paper](papers.md) · [Experiment](experiments.md) · [Discuss your question](contact.md)

<a id="research-map"></a>

## Search from the questions that remain

Keep a page for your current questions, the work you have read, experiments you have tried, unresolved points, and directions you want to connect. irene calls this a [research map](irene-workflow.md#depth).

For example, if you care about agents failing on long tasks, organize papers around planning, tool use, memory, and environmental feedback. Which failure does each explain? What do the experiments cover? Which observations remain unexplained?

Specify the research object, mechanism, task, and phenomenon when searching. Follow references and citations to foundational work, direct predecessors, and contemporary studies. Author pages, repositories, and project pages can lead to later versions. See [irene's targeted search process](irene-workflow.md#search).

## Other entries

Compare your reading with [Mu Li](limu.md). The [research catalog](catalog-research.md) includes search, storage, publication, and reading resources. [Research conversations](research-conversations.md) preserves questions other students have asked.
