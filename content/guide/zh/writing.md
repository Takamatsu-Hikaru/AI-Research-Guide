# 写作、画图和汇报

你已经在一个问题上花了很多时间，读者还没有。写作要把他带到能理解问题、做法和证据的位置。

## 先说清你发现了什么

可以先用几句话写出：以前有什么问题，你做了什么，结果让我们多知道了什么。再把相应的图、实验或分析放在旁边。发现某句话没有依据时，就知道还缺哪一块。

这是一个表达示例：

> 笼统：我们提出了一个创新、高效、鲁棒的框架。  
> 具体：我们发现系统在长任务中经常丢失早期约束，因此加入了任务状态记录，并检查它是否减少了这类失败。

第二种写法交代了现象、做法和验证目标。写完再问，后面的结果是否回答了前面的句子。

## 从文章结构到具体段落

[黄哲威、丁霄汉的 Writing AI Conference Papers](https://github.com/hzwer/WritingAIPaper)适合在提炼贡献、搭结构和修改初稿时查。[Simon Peyton Jones 的写作讲座](https://www.microsoft.com/en-us/research/academic-program/write-great-research-paper/)可以一起看，想想如何让读者尽早抓住关键想法。

Introduction 交代问题和贡献；方法解释做法；实验提供证据；相关工作帮助定位。真正写的时候，这些部分会互相逼着你把事情想清楚。

把重要条件直接写清，把不支持的形容词删掉。遇到有争议的选择，解释理由与结果即可，不需要替所有可能的批评预先写一段辩护。

已有一批阅读笔记时，围绕这次要回答的问题，把自己的判断和支撑它的论文、实验放在一起，再列段落提纲。让 AI 协助整理时，可以要求每段附上笔记位置和原始来源，接着补入自己的分析。[irene 的笔记配置与任务示例](irene-workflow.md#notes)可以配着用。

## 图先决定让人看见什么

方法图里，输入从哪里来，经过什么，输出什么；结果图里，比较对象、指标和变化应当容易读出来。箭头、颜色、图例都要有明确用途。

画完缩小看看，再给一个没参与项目的人看。[Fundamentals of Data Visualization](https://clauswilke.com/dataviz/)适合查图表类型与表达方式。白板、PPT 或其他绘图工具，选能完成这张图的就好。

## 排版与汇报

排版用 [Overleaf 的 LaTeX 入门](https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes)查文字、公式、图片与引用。日常笔记和项目 README，用 [Markdown 基础语法](https://www.markdownguide.org/basic-syntax/)就能开始。

汇报时先想听众已经知道什么，选足够讲清核心问题的内容。[研究汇报讲座](https://www.microsoft.com/en-us/research/academic-program/give-great-research-talk/)有进一步材料。一次组会可以围绕问题、关键结果、当前解释和想讨论的地方展开。

[投稿与发表](publishing.md) · [实验记录](experiments.md) · [借助 AI 修改](ai.md)

## 写到具体段落时再查

[黄哲威与丁霄汉的写作手册](blogs.md#ding)适合对照贡献、结构和初稿；[The Bottom Line](lesswrong.md#bottom-line)讨论证据怎样决定结论。LaTeX、画图和汇报的材料放在[科研资料目录](catalog-research.md#topic-11)。
