# Building your research workflow

By [irene](https://github.com/tseirene6) · Adapted from “一些小分享” · [Original Chinese PDF with screenshots](../../../public/blog/guide/sources/irene-research-workflow.pdf) · [Paper-reading toolkit](https://github.com/tseirene6/paper-tools-marketplace)

> Most of these ideas came from learning how other people work. They have helped me a lot, and I wanted to share them. Finding these bits of knowledge separately can take time; I hope this helps.

This account starts with collecting papers and taking notes, then moves through research briefs, reading depth, and questions from AI. It ends with following your own questions into the literature. The workflow and preferences below come from irene's account; instructions and prompts sit alongside the steps they support.

<a id="notes"></a>

## Organize papers with Zotero and Obsidian

irene uses Zotero for papers and PDFs, Obsidian for literature notes and longer-term thinking, and Codex to read the note directory and help compare, organize, and write. Scholaread is a reader she regularly uses.

Start with one paper:

1. Save its title, authors, year, DOI, source, and PDF in [Zotero](https://www.zotero.org/support/quick_start_guide).
2. Create an [Obsidian](https://obsidian.md/) vault and configure an import template with [Zotero Integration](https://github.com/community-archive/obsidian-zotero-integration). Its repository documents dependencies and setup.
3. Import the literature note and add your annotations, questions, and links to related papers.
4. Open the note directory in an AI coding tool with local file access. Specify the files to work with and the result you need.

Her folders are Papers, Notes, Projects, Attachments, and Templates: literature notes, everyday thinking, project material, images and attachments, and reusable templates. She also recommends [apex-dashboard](https://github.com/PandoraReads/apex-dashboard) for bringing notes, tasks, and projects onto one page.

| Field | What to keep |
| --- | --- |
| Source | Title, authors, year, DOI, Zotero item, and PDF link |
| Question and method | The problem, method, and data |
| Evidence | Main conclusions and the figures, experiments, or passages supporting them |
| Your annotations | Questions, unclear points, and material you might cite |
| Connections | Related topics, papers, projects, and follow-up questions |

With those materials available, requests become concrete:

> Compare the methods, data, and conclusions in these three paper notes. Attach the paper and note location to each comparison, and list missing information.

> Reformat this literature note using the template, preserving my annotations and questions. Check that its equations display correctly in Obsidian.

> Use these notes to outline an article around my research question. Put the evidence and sources beside each proposed paragraph.

<a id="brief"></a>

## Make a research brief for yourself

irene uses a research brief to widen her reading. Within her interests, she wants to keep encountering work she did not know about but would benefit from knowing.

Describe your interests and current questions, then assign attention across topics. Her examples include:

- LLMs 60%, agents 20%, theory 10%, university news 10%.
- Embodied AI 50%, world models 20%, vision 20%, lab news 10%.
- Virtual cells 40%, single-cell foundation models 30%, AI methods 20%, university news 10%.

The weights express preferences. Change them as your questions develop or a topic becomes repetitive.

### A brief prompt to adapt

> Prepare a research brief in my preferred language. My stage is [fill in], my current question is [fill in], and my interests and weights are [fill in]. Use my research notes, the last seven days of briefs, and my reading log.
>
> Select about five worthwhile items, prioritizing papers, models, open-source projects, benchmarks, tools, conference results, and academic opportunities from the last day to the last week. Include publication dates and original sources. For each item: What happened? How does it relate to my question? Which figure, project, or follow-up question should I look at next?
>
> Avoid papers, projects, benchmarks, and events already recommended in the last seven days. For a new version, code release, or result, explain exactly what changed. Cover different subfields where possible.
>
> Aim for at least four topics not recommended during the last seven days, including at least two items from the last 24–72 hours. If there is little new material, expand the window to fourteen days and retain dates. End with the number of new topics in this issue.

She first requests one issue, reads it, and adjusts: more multimodal and video work, less repeated diffusion coverage, or specific papers and projects in place of broad trends. Once the selection works, she uses the tool's scheduling feature for a daily 9 a.m. brief or a weekly digest.

Deduplication needs a record. Keep dates, paper titles, project links, and reading status in a list, and provide it for the next issue. This also helps catch the same material under a different description.

<a id="depth"></a>

## How deeply should you read this paper?

A brief produces candidates. irene first examines the research question, then the evidence, and finally the time, connections, and experiments that could justify reading further.

She maintains a changing research map:

- Current research threads and unresolved questions.
- Foundational work and prerequisites she already knows.
- Models or experiments she is running or has reproduced.
- Threads she wants to connect, such as AI and biology.
- Topics she is not currently pursuing.

For a new paper, ask whether it directly addresses a question, connects two threads, supplies a useful tool, or simply shares keywords. “World models” and “AI4S” name fields; the question you want to investigate is usually more specific.

### Match claims to evidence

| Element | Question |
| --- | --- |
| Problem | What bottleneck do earlier methods face? |
| Claim | What does the author want to establish? |
| Evidence | Which experiments, figures, and analyses support it? |
| Assumption | Which premises does the conclusion depend on? Which have not been adequately tested? |

Supply the PDF, project page, and code, together with the issue you care about:

> Restate the research question in one sentence. Extract at most three central claims and locate their evidence. Does the contribution come from a new principle, a hypothesis-driven design, or engineering integration? Can the ablations separate the modules' contributions? Do the metrics measure the claimed capability? Identify the relevant sections and figures, and questions worth pursuing.

An important point in her account: a paper with gaps in its evidence may still deserve close reading. The question may matter, and understanding why the conclusion remains unproven can itself be useful research. Conversely, a rigorous paper with little connection to your current question may need only a skim.

### Choose the scope of this reading

She considers relevance, importance of the question, evidence, connections between fields, experimental value, and the time and prerequisites needed. The result may be close reading, a selective reading, a skim, or setting it aside. One or two factors often determine the choice.

> Propose a reading plan: which sections and figures must I read, which can I skim, and what background should I learn first? What three questions should I be able to answer afterward? Keep one research question and one worthwhile validation experiment, and explain what new evidence would change the reading priority.

<a id="grill"></a>

## Read with AI—and let it question you

irene shares her reading workflow in [paper-tools-marketplace](https://github.com/tseirene6/paper-tools-marketplace). She likes Grill Me: explain the paper yourself, let AI ask follow-up questions and identify gaps in the explanation, then return to the source.

> I will explain this method diagram. Ask one question at a time about the inputs and outputs, why a module is needed, key assumptions, and experimental evidence. Wait for my answer, then identify what I have not explained clearly and which part of the paper to revisit.

Page 16 of the original PDF includes an actual exchange, using red cars, red trucks, and blue cars to discuss representations, labels, and generalization. The next question follows from the answer just given.

### Close reading: explain the method from its diagram

Her sequence is:

1. **Prerequisites.** Identify the mathematics, domain knowledge, and earlier papers needed.
2. **Abstract and introduction.** Recover the problem, motivation, and structure of the argument.
3. **Method.** Explain each module using the complete diagram: what enters, what happens, and where the output goes.
4. **Mathematics.** Understand the quantities and roles of important equations. She also notes that she has not spent enough time on this part herself.
5. **Experiments.** Focus on ablations, failure cases, and generalization, relating them to the claims.
6. **Conclusions and your own ideas.** Record contributions, limitations, connections, and what to test next.

### Selective reading: connect work across a field

This reading builds a map of a field through questions, evidence, method logic, limitations, and research connections. Learn the necessary background, identify what earlier approaches could not do, draw the overall pipeline, then examine each module's role, implementation, and problems. Finish by checking the supporting experiments.

In her setup, Scholaread handles reading, Obsidian keeps reusable notes, and Grill Me probes understanding. Pages 18–20 of the original PDF show notes and pipeline examples.

### Skimming: leave a reason to return

Write one sentence describing the mechanism, problem, and result. Add the earlier limitation, up to three contributions, the key experiment, and a connection to your own question. A worthwhile new question can change the depth of the next reading.

<a id="search"></a>

## Follow questions into the literature

A deeper search becomes useful when several papers point to the same bottleneck, one connects two research threads, or a reproducible question emerges. The same process can lead to teams, supervisors, labs, and follow-up projects.

She expresses a question as “research object + mechanism + task + phenomenon to investigate,” and uses tools such as [Qiewen](https://qiewenpaper.com/zh/home) to find matching literature. She then looks for foundational papers, direct predecessors, and contemporary work, and follows author and project pages to code, data, supplementary experiments, and later versions.

Update the research map with what is clearer, which explanations have changed, and what remains worth pursuing. Those questions also make useful starting points for conversations with researchers.

<a id="tools"></a>

## Tools, extensions, and reusable prompts

Her recommended Xiaohongshu account is **tabris🔑**, whose reading recommendations lead her to papers and blogs. She also likes [Scholaread](https://www.scholaread.com/help) for reading and [Qiewen](https://qiewenpaper.com/zh/home) for search.

Alongside the note tools above, the original discusses using Claude Code with DeepSeek in a terminal: [DeepSeek integration instructions](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code).

### Editor and browser tools

| Task | Tools mentioned in the original |
| --- | --- |
| Editor language and Markdown | Simplified Chinese language pack, markdownlint, Markdown Preview Enhanced with litvis |
| Spelling and formatting | [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) |
| Errors and version history | [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens), [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) |
| Data analysis | [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter), [Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv) |
| LaTeX | [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop), with a local LaTeX installation |
| Browser reading | AnyDoc translator, LaTex Math Equations Viewer, Markdown Reader |
| Collecting references | [Zotero Connector](https://www.zotero.org/download/connectors) |

### Keep repeated steps as a workflow

Her sequence starts with Grill Me to clarify questions and Plan to organize the task, followed by Arxiv / Firecrawl for sources, Zotero for originals, Obsidian for notes, and Jupyter for analysis. Writing, editing, and presentation follow; she refers to skills such as Research Paper Writing, Humanizer, and PowerPoint for these steps.

When describing a task, she specifies the inputs, intended result, format, length or time, material to preserve, and citation needs. The first run can simply collect one paper, import a note, and ask AI to organize it. Repeated steps can then become reusable workflows.

[Finding and reading papers](reading.md) · [Working with AI](ai.md) · [Lookout](lookout.md) · [More experience and methods](experience.md)
