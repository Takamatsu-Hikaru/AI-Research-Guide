# 大语言模型：理解、生成、推理

你每天用的对话模型，背后有一连串问题：文字怎样变成模型能处理的东西，模型从什么数据中学习，为什么换一种训练方式会改变回答，又怎样知道它真的做得更好。

想研究 LLM，可以从这些环节中的一个往下挖。

## 分词、表示与下一 token 预测

用 [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1)认识模型、tokenizer 和数据。拿同一句话看分词结果，再看模型输入输出。碰到 embedding、矩阵运算、梯度，回[基础页](basics.md)补对应部分。

接下来用 [LLMs from Scratch](https://github.com/rasbt/LLMs-from-scratch) 的配套代码，沿着文本、token、attention、输出一路读。仓库提供书的配套材料；具体阅读范围从你想弄懂的模块开始。

## 预训练、后训练与推理效率

**想知道能力怎样学出来**，看数据、训练目标与优化。等你能解释一段训练代码后，可以进入 [Stanford CS336（2025）](https://cs336.stanford.edu/spring2025/)，先沿课程目录选数据、训练或系统中的一个专题。

**想知道模型怎样变得更适合某项任务**，从微调、反馈与评测进入。先固定任务和评价方式，比较基础模型与调整后的模型；涉及奖励与策略更新时，接[强化学习](rl.md)。

**想知道模型为什么又慢又贵**，看[效率与系统](systems.md)。模型规模、上下文、精度、缓存和硬件，会一起影响你能做怎样的实验。

语言本身的表示、语义和任务也值得学。[CS224N](https://web.stanford.edu/class/cs224n/)能把这些问题和模型方法连起来。

## Transformer、BERT 与 LoRA

[Transformer](https://arxiv.org/abs/1706.03762)看结构；[BERT](https://arxiv.org/abs/1810.04805)看预训练目标和表示；[LoRA](https://arxiv.org/abs/2106.09685)看如何减少适配模型需要训练的参数。可以配[李沐论文精读](https://github.com/mli/paper-reading)读其中一篇。

再读邹嘉轩的 [pretrain 和 scaling 作为一种方法论和科学观](https://jiaxuanzou0714.github.io/blog/2026/pretrain-scaling-methodology-scientific-perspective/)，看看一位研究者怎样把训练规模、数据、稳定性和问题选择联系起来。

## 观察小模型的分词与输出

选一个你能运行的小模型和一小组文本，记录分词、输入长度、输出与错误。改一种设置，再观察它影响了什么。模型和设备条件按所选教程确认。

如果你关心模型怎样用工具做事情，接着看 [Agent](agent.md)；想让它读图，就去[多模态](multimodal.md)。

## 位置编码、优化器与 Scaling

位置编码和优化器可以查[苏剑林选文](blogs.md#su)；想理解 scaling 怎样做实验、怎样外推，可以看[邹嘉轩的文章](blogs.md#zou)。完整课程与项目在[LLM 资料目录](catalog-directions.md#topic-14)。
