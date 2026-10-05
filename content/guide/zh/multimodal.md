# 多模态：把图像和语言接起来

给模型一张图，再问“左边的人拿着什么”，需要把视觉信息和问题联系起来。看图说话、图文检索、视频理解，都有这样的连接问题。

## CLIP 与 LLaVA：匹配和问答

[CLIP](https://github.com/openai/CLIP) 适合从图文匹配认识两种表示如何靠近。[LLaVA](https://llava-vl.github.io/) 适合观察图像怎样接到语言模型上，并利用指令数据学习回答。

配合 [Hugging Face 的 VLM 讲解](https://huggingface.co/blog/vlms)，沿着图像编码、表示转换、语言输出读。视觉部分不熟，回[视觉页](vision.md)；attention 和语言模型不熟，回 [LLM](llm.md)与[基础](basics.md)。

## 改变图片，检查模型的回答

挑一张可以清楚判断答案的图，分别问物体、数量、位置和文字。再改图中的一个细节，看看回答是否跟着改变。保存问题、图像和原始回答。

这样容易看见模型是在利用图片，还是更多依靠语言上的猜测。要把这个观察变成研究，需要进一步控制样本、任务和比较条件，接[实验页](experiments.md)。

## 多模态论文与应用方向

[多模态大模型论文索引](https://github.com/BradyFU/Awesome-Multimodal-Large-Language-Models)用来查具体任务的文章。需要生成图像时看[生成模型](generation.md)，需要把视觉和语言接到动作时看[具身](embodied.md)。

## 编码器设计与系统开销

[Purshow 的 Encoder-Free 分析](blogs.md#purshow)从负载和并行调度解释设计动机。其他课程、论文和项目见[多模态资料目录](catalog-directions.md#topic-15)。
