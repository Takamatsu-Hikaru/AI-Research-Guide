# 作者博客与研究笔记

博客常常把论文省略的过程补回来：为什么尝试一个方案，哪里没达到预期，怎么判断下一步。

想看经历，先读邹嘉轩的《认知复利》或 Chai 的 FAQ；正在做实验，可以看 LoopDiT 和 AutomationBench；正在补机制，可以查苏剑林与 Purshow 的笔记。

想继续找更多作者和主题，可以逛逛 OpenEnvision 的 [BlogrXiv](https://openenvision.github.io/BlogrXiv/site/index.html)，按研究方向查博客、实验室文章和技术笔记。

[返回资料总索引](resources.md)

<a id="purshow"></a>

## 牛宇威 Yuwei Niu / Purshow

[作者主页](https://purshow.github.io/) · [Purshow Notes](https://github.com/Purshow/Purshow_Notes)

### 从 Infra 角度看，为什么去掉 Encoder 更好

[作者原文](https://github.com/Purshow/Purshow_Notes/blob/main/Encoder-Free/从Infra角度看，为什么去掉Encoder更好.md)

文章从视觉编码器与语言模型的负载、并行配置和调度差异解释 encoder-free 的系统动机，也指出去掉编码器并不会消除变长视觉 token 带来的负载差异。

### Purshow Notes：按问题取用的研究笔记

[仓库目录](https://github.com/Purshow/Purshow_Notes) · [WAM](https://github.com/Purshow/Purshow_Notes/tree/main/WAM) · [Encoder-Free](https://github.com/Purshow/Purshow_Notes/tree/main/Encoder-Free)

包含 Attention、MoE、On-Policy Distillation、World Action Models、残差连接、稀疏词表嵌入与 YOCO 等主题，多项提供中英文版本。

### 两篇观点短文

- [When Vision Is Pushed to the Roadside](https://x.com/purshow04/status/2081395814610653588)
- [The (Possible) Future of Multimodal Understanding: From Describing the World to Entering the World](https://x.com/purshow04/status/2042451108283761154)

<a id="chai"></a>

## Wenhao Chai

[作者主页](https://wenhaochai.com/) · [博客目录](https://wenhaochai.com/blogs.html)

### FAQ for Juniors

[作者原文](https://wenhaochai.com/pages/junior_faq.html)

更新于 2026-02-25。涉及读博选择、非 CS 背景入门、学校没有合适实验室、如何联系研究者、方向选择和 benchmark 工作的价值。

### LoopDiT: Loop Transformers for Diffusion Models

[作者原文](https://wenhaochai.com/blogs/loopdit.html)

中英双语，2026-09-10。作者比较循环共享 Transformer 与普通模型，在固定参数量和固定计算量的不同条件下检查收益，也比较增加循环与增加去噪步数。

### What Happened to AutomationBench?

[作者原文](https://wenhaochai.com/blogs/automationbench-rubric.html)

中英双语，2026-09-19。作者检查 Agent 工作流评测里的不同计分口径和字符串规则，讨论它们怎样影响任务完成率与模型排名。

### Predictable Swarm Scaling

[作者原文](https://wenhaochai.com/blogs/predictable-swarm-scaling.html)

中英双语，2026-09-27。用任务依赖图和模拟比较单 Agent、标准/递归蜂群等组织方式，区分完成覆盖度与最好结果，讨论分工和成本限制。

<a id="zou"></a>

## 邹嘉轩 Jiaxuan Zou

[博客目录](https://jiaxuanzou0714.github.io/blog/)

### 本科两年，我最深的感悟：认知复利

[作者原文](https://jiaxuanzou0714.github.io/blog/2026/cognitive-compound-interest/)

中文，2026-07-04。作者以本科经历串起研讨班、公开技术写作、合作交流与实习机会，回顾自己如何随着新信息改变原有规划。

### pretrain 和 scaling 作为一种方法论和科学观

[作者原文](https://jiaxuanzou0714.github.io/blog/2026/pretrain-scaling-methodology-scientific-perspective/)

中文，2026-09-07。文章用预训练与具身等案例，串联通用学习框架、训练/推理计算扩展，以及效率、稳定性和外推预测在研究中的作用。

### 如何搭建一个科学的 Scaling Ladder

[作者原文](https://jiaxuanzou0714.github.io/blog/2026/how-to-build-scientific-scaling-ladder/)

中文，2026-09-20。按小规模实验、口径约定、配置搜索、数据与模型规模、拟合及外推验收梳理工作流，讨论 dense、MoE 和数据受限场景。

<a id="ding"></a>

## 丁霄汉 Xiaohan Ding

[作者主页](https://dingxiaohan.xyz/)

### Writing AI Conference Papers: A Handbook for Beginners

[作者仓库与全文](https://github.com/hzwer/WritingAIPaper)

黄哲威 Zhewei Huang、丁霄汉 Xiaohan Ding 合著，2024。覆盖提炼贡献、搭整体结构、写 introduction 与 related work，以及逻辑、可辩护性、理解成本和信息密度；附常见负面评语及投稿前检查。

### Rebuttal 与读博经历

- [Rebuttal 相关文章](https://zhuanlan.zhihu.com/p/602024489)
- [《前紧后松——清华读博前两年的焦虑与成长》](https://hub.baai.ac.cn/view/20773)（智源社区转载）

<a id="han"></a>

## 韩晓光 Xiaoguang Han

[校方主页](https://sse.cuhk.edu.cn/faculty/hanxiaoguang)。下面几份材料包括学术讨论实录、导师访谈和科研经验。

### GAMES 第一期学术沙龙观点集锦

[主办方实录](https://games-cn.org/gamesdiyiqixueshushalongguandianjijin/)

2022 年的讨论实录。围绕神经隐式表达与三维研究展开多方讨论，韩晓光的部分涉及理解与重建的关系，全文能看到研究者如何围绕具体问题互相追问。

### 《好导师在线》第一期

[GAMES-Webinar 官方 B 站视频](https://www.bilibili.com/video/BV11Jw5eVE5e/)

嘉宾彭思达、李冠彬，主持韩晓光，发布于 2025-01-16。

### 《谈形·说 AI》：科研双面镜——学术界 VS 工业界

[GAMES-Webinar 官方 B 站视频](https://www.bilibili.com/video/BV14V3d6wE5K/)

嘉宾齐晓娟、何盈庆，主持韩晓光，页面日期为 2026-08-02。

《什么是好的科研工作》见[韩晓光原帖与科研问答](research-conversations.md#han)。更多报告可查 [GAMES 往期报告](https://games-cn.org/previouswebinar-ppt/)。

<a id="su"></a>

## 苏剑林 Jianlin Su / BoJone：科学空间

[科学空间](https://kexue.fm/) · [文章归档](https://kexue.fm/content.html)

### Transformer 升级之路：1、Sinusoidal 位置编码追根溯源

[原文](https://spaces.ac.cn/archives/8231)，2021。

讨论为什么需要位置表示，以及怎样从希望具备的性质出发分析正弦位置编码。适合 LLM 的基础机制与数学应用；需要基本线性代数、Attention 和泰勒展开知识。可以带着“这些 sin/cos 到底从哪里来”读。

### Transformer 升级之路：2、博采众长的旋转式位置编码

[原文](https://spaces.ac.cn/archives/8265)，2021。

作者介绍 RoPE 的构思与 RoFormer，从希望内积体现相对位置这一目标出发构造位置变换。除了学机制，它还是“一个设计怎样从问题和约束里长出来”的第一手研究案例。可以接着上一篇的位置编码讨论读。

### 生成扩散模型漫谈（一）：DDPM = 拆楼 + 建楼

[原文](https://kexue.fm/archives/9119)，2022。

从逐步破坏与重建的类比进入 DDPM，再接加噪和生成过程。可以先用类比理解生成过程，再结合概率基础读推导。

### Muon 续集：为什么我们选择尝试 Muon？

[原文](https://spaces.ac.cn/archives/10739)，2025。

从作者团队的优化器实践解释选择 Muon 的理由，并讨论谱范数、学习率与权重衰减等理论和实验问题。想了解优化器或 scaling，可以先读问题、尝试理由和实验调整，再追公式。

### 第 1000 篇文章

[原文](https://spaces.ac.cn/archives/7782)，2020。

作者回顾长期博客写作，并把站点定位为个人做笔记的地方。想开始记录和分享自己的学习时，可以看看这篇写作回顾。
