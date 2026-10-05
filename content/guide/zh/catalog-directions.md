# 各方向课程、论文与项目

已经对一个问题感兴趣，想找课程、代表论文、代码或更完整的 paper list，可以在这里继续。第一次接触一个方向，先看[方向导读](directions.md)，再回来挑材料。

[返回资料总索引](resources.md)

<a id="topic-13"></a>

## CV：感知任务、视觉表示与图像模型

- **[Kaggle Digit Recognizer：MNIST 手写数字识别](https://www.kaggle.com/competitions/digit-recognizer/overview)**｜从数据展示、训练和验证做到生成预测、提交结果。配套 [Code 页面](https://www.kaggle.com/competitions/digit-recognizer/code)可以找入门 notebook，具体开始方式见[动手路线](start.md)。

- **[Ultralytics YOLO Quickstart](https://docs.ultralytics.com/quickstart)**｜先用预训练模型检测自己的图片，再接小数据集训练和验证。适合想做一个能展示结果的视觉 demo 的同学。

- **[Stanford CS231n](https://cs231n.stanford.edu/schedule)**｜英文课程与课件。先认识视觉任务、损失、训练与卷积/视觉架构，再选专题；排课页提供各讲材料。

- **[CNN Explainer — Polo Club](https://poloclub.github.io/cnn-explainer/)**｜卷积网络的交互演示，可观察输入图像和网络中间表示。

- **[Computing Receptive Fields of Convolutional Neural Networks — Distill](https://distill.pub/2019/computing-receptive-fields/)**｜可视化技术文章。围绕感受野，解释卷积网络结构怎样影响一个位置能看到的输入范围。

<a id="topic-14"></a>

## NLP & LLM：概念、使用、从头实现和研究深入

- **[Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1)**｜课程与代码。从语言模型概念进入 tokenizer、模型和数据的实际使用，先走通一个小例子。

- **[Build a Large Language Model From Scratch — Sebastian Raschka](https://github.com/rasbt/LLMs-from-scratch)**｜英文书的配套开源代码与章节材料。先看 token、embedding、attention 和训练流程；书籍另行购买。

- **[Stanford CS224N](https://web.stanford.edu/class/cs224n/)**｜英文 NLP 课程。按表示、注意力和感兴趣的语言任务选读，认识语言模型背后的任务与方法。

- **[Stanford CS336：Language Modeling from Scratch，2025](https://cs336.stanford.edu/spring2025/)**｜英文课程、作业和视频，2025 年。连接数据、训练、系统与评估，适合已有 DL 和编程基础的人。 [官方第一讲](https://www.youtube.com/watch?v=SQ3fZ1sAqXI)

- **[Deep Dive into LLMs like ChatGPT — Karpathy](https://www.youtube.com/watch?v=7xTGNNLPyMI)**｜面向较广泛观众的英文 LLM 介绍视频，适合在动手实现之前建立整体印象。

<a id="topic-15"></a>

## 多模态与 MLLM：先看输入输出怎样连接

- **[Vision Language Models Explained — Hugging Face](https://huggingface.co/blog/vlms)**｜英文讲解文章，介绍视觉语言模型的组成、使用与评价，适合从 LLM 进入多模态。

- **[CLIP 官方项目](https://github.com/openai/CLIP)**｜官方代码与论文。先看图文对应任务、输入输出和零样本使用方式，再读训练细节。

- **[LLaVA：Visual Instruction Tuning](https://llava-vl.github.io/)**｜作者项目页、图示与论文。从模型拼接和指令数据理解图像怎样进入语言交互，先看示例与整体结构。

- **[Awesome Multimodal Large Language Models](https://github.com/BradyFU/Awesome-Multimodal-Large-Language-Models)**｜多模态大模型的论文与资源列表，可以按任务继续找综述和相关工作。

<a id="topic-16"></a>

## AIGC、Diffusion 与 Flow Matching

- **[Hugging Face Diffusion Course](https://huggingface.co/learn/diffusion-course/unit1/1)**｜实践教程与 notebook。第一单元用小扩散例子介绍图像生成，再沿加噪和去噪过程补数学。

- **[MIT：Introduction to Flow Matching and Diffusion Models，2025](https://diffusion.csail.mit.edu/2025/)**｜英文讲义、课程与练习，2025 年。建立生成过程、流与扩散的数学联系，需要概率与微积分基础。

- **[Generative Modeling by Estimating Gradients of the Data Distribution — Yang Song](https://yang-song.net/blog/2021/score/)**｜Yang Song 的技术博客，从 score 的角度解释生成模型。先看直觉与图示，再进入推导。

- **[What are Diffusion Models? — Lilian Weng](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/)**｜技术综述博客，2021 年。适合有扩散基础后对照不同概念与推导的关系。

<a id="topic-17"></a>

## World Model：预测、交互、想象与决策

- **[World Models — David Ha、Jürgen Schmidhuber](https://worldmodels.github.io/)**｜作者文章、可视化与实验展示。通过一个完整系统理解压缩观察、预测动态和控制怎样联系。

- **[DreamerV3 — Danijar Hafner 等](https://danijar.com/project/dreamerv3/)**｜论文、代码与演示。可以接着 World Models 看模型怎样服务行为学习，以及训练与评价怎样组织。

- **[Awesome World Models — JiahuaDong](https://github.com/JiahuaDong/Awesome-World-Models)**｜按主题整理的世界模型论文清单，可继续查视频、机器人等用途下的研究。

<a id="topic-18"></a>

## RL：交互问题、中文入门、代码与深入课程

- **[动手学强化学习](https://hrl.boyuai.com/)**｜中文在线书，配有代码与视频。先看问题定义和一个小环境，从价值与策略进入深度 RL。

- **[Easy RL：蘑菇书](https://github.com/datawhalechina/easy-rl)**｜中文社区教程。学习强化学习时，可用它对照另一种讲法，补不熟悉的概念。

- **[Gymnasium：Basic Usage](https://gymnasium.farama.org/introduction/basic_usage/)**｜官方代码教程。通过小环境观察 observation、action、reward 和终止信号怎样流动。

- **[CleanRL](https://docs.cleanrl.dev/)**｜强化学习算法实现与说明。选一个算法，沿相对集中的代码读训练循环，对照概念与实现。

- **[Berkeley Deep Reinforcement Learning](https://rail.eecs.berkeley.edu/deeprlcourse/)**｜深度强化学习课程、视频与作业。已有 RL 基础后，可以继续看模型学习、策略优化等专题。

<a id="topic-19"></a>

## 具身：方向认知、路线、论文与动手入口

- **[Lumina／陈天行：Embodied-AI-Guide](https://github.com/TianxingChen/Embodied-AI-Guide)**｜中文具身智能指南。先认识技术版图，再按方向查学习路线、论文、教程与项目。

- **[MIT Robotic Manipulation — Russ Tedrake](https://manipulation.csail.mit.edu/)**｜英文操作课程与教材，涉及几何、感知、规划与控制。适合进一步理解机器人操作的组成。

- **[MIT Underactuated Robotics](https://underactuated.mit.edu/)**｜控制与机器人课程。想深入动力学、控制和决策时，可以按专题学习。

- **[LeRobot](https://github.com/huggingface/lerobot)**｜机器人学习的开源实现、数据与文档。可以先读示范数据和运行模型；实机操作需要对应机器人设备。

- **[RoboTwin 2.0](https://robotwin-platform.github.io/)**｜仿真数据与评测项目，用来了解任务、数据、训练和评价怎样串起来。安装与训练前先看项目列出的 GPU 和环境要求。

- **[ALOHA／ACT：Learning Fine-Grained Bimanual Manipulation](https://tonyzhaozh.github.io/aloha/)**｜项目视频与论文。把动作数据、模仿学习和双臂操作任务连起来，先看演示和方法结构。

- **[Diffusion Policy](https://diffusion-policy.cs.columbia.edu/)**｜作者项目页与演示。把生成建模用于动作学习，可以对照图像扩散与动作序列的区别。

- **[Open X-Embodiment](https://robotics-transformer-x.github.io/)**｜跨机器人数据与模型项目。重点看数据来源、机器人之间的差异，以及泛化怎样评价。

<a id="topic-20"></a>

## 具身细分方向的论文索引

- **[Awesome Humanoid Robot Learning — Yanjie Ze](https://github.com/YanjieZe/awesome-humanoid-robot-learning)**｜人形机器人学习论文索引，可以按运动、操作等关注点继续查找。

- **[Awesome RL-VLA](https://github.com/Denghaoyuan123/Awesome-RL-VLA)**｜RL 与 VLA 操作学习的交叉论文列表。

- **[Awesome Efficient VLA](https://github.com/guanweifan/awesome-efficient-vla)**｜VLA 效率研究索引，连接推理速度、部署约束与模型设计。

- **[Data Pyramid for Embodied Manipulation](https://github.com/worldbench/awesome-embodied-data-pyramid)**｜具身操作数据的综述资源，适合按数据来源与组织方式认识这个领域。

<a id="topic-21"></a>

## Agentic：概念、教程、项目与评测

- **[LLM Powered Autonomous Agents — Lilian Weng](https://lilianweng.github.io/posts/2023-06-23-agent/)**｜英文技术博客，2023 年。用 planning、memory、tool use 等组件介绍 LLM Agent。

- **[Hugging Face Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction)**｜官方课程与实践。先理解工具和执行过程，再做小 Agent。涉及模型 API 的练习需要相应账号，并可能产生调用费用。

- **[Hello Agents — Datawhale](https://github.com/datawhalechina/hello-agents)**｜中文原理与实践教程。先从基础定义和小实现开始，再按项目需要看框架。

- **[LLM-Agent-Paper-List](https://github.com/WooooDyy/LLM-Agent-Paper-List)**｜综述作者维护的论文列表。先看综述分类，再挑一个问题向下找文章。

- **[AgentBench](https://github.com/THUDM/AgentBench)**｜Agent 评测项目。读任务设置、成功判定与失败案例，理解怎样评价任务完成情况。

- **[SWE-bench](https://www.swebench.com/)**｜软件任务评测入口。看真实 issue、测试与结果的关系，比较结果时注意模型使用的工具、预算和设置。

<a id="topic-22"></a>

## 效率、推理和软硬协同

- **[Machine Learning Systems](https://mlsysbook.ai/)**｜系统视角教材，把模型与数据、软件、硬件和部署联系起来，可按遇到的瓶颈查专题。

- **[MIT 6.5940：TinyML and Efficient Deep Learning Computing，2024](https://hanlab.mit.edu/courses/2024-fall-65940)**｜英文课程、视频与材料，2024 年。系统学习量化、压缩与高效计算。

- **[Making Deep Learning go Brrrr From First Principles — Horace He](https://horace.io/brrr_intro.html)**｜英文工程博客。解释为什么算力数字高，程序却不快，从计算、内存和执行开销看性能。

- **[How To Scale Your Model](https://jax-ml.github.io/scaling-book/)**｜开放技术书。适合深入分布式训练、推理与硬件约束，带着瓶颈问题选章节。

- **[PyTorch Performance Tuning Guide](https://docs.pytorch.org/tutorials/recipes/recipes/tuning_guide.html)**｜PyTorch 官方性能调优说明。选与当前瓶颈相关的改动，用相同负载测量前后差别。

<a id="topic-23"></a>

## AI4X：科学数据与任务

- **[DeepChem](https://github.com/deepchem/deepchem)**｜开源工具与教程。选一个输入、标签和评价清楚的药物或分子任务，认识领域数据的特点。

- **[Therapeutics Data Commons](https://tdcommons.ai/)**｜药物与生物任务的数据和评价入口。先看任务定义与数据划分，再研究模型。

- **[MONAI Tutorials](https://github.com/Project-MONAI/tutorials)**｜医学影像项目教程。可从数据处理和分割示例认识图像、标注与评价。

- **[DeePMD-kit](https://github.com/deepmodeling/deepmd-kit)**｜分子动力学与机器学习项目，适合材料和分子模拟方向，需要相应的物理与化学背景。

- **[FinRL](https://github.com/AI4Finance-Foundation/FinRL)**｜金融强化学习项目。可以观察环境、数据划分与回测设计，重点看时间顺序、交易成本和评价条件。

- **[Awesome AI for Science](https://github.com/ai4s-research/awesome-ai-for-science)**｜AI for Science 的跨领域工具、论文与项目集合，可按学科找到具体工作。

<a id="topic-24"></a>

## 自动研究：作为项目案例观察

- **[autoresearch — Karpathy](https://github.com/karpathy/autoresearch)**｜训练实验的自动迭代项目。看目标、可修改范围、结果记录和评价怎样组成实验循环。

- **[The AI Scientist — Sakana AI](https://github.com/SakanaAI/AI-Scientist)**｜论文、代码与说明，展示自动生成想法、实验和写作的系统设计。可以沿流程看各环节如何评价。

<a id="topic-25"></a>

## 图学习与时序预测

- **[Stanford CS224W：Machine Learning with Graphs](https://web.stanford.edu/class/cs224w/)**｜英文图学习课程。先认识图表示与典型任务，再按自己的关系数据问题深入。

- **[Forecasting: Principles and Practice，第三版](https://otexts.com/fpp3/)**｜开放时序预测教材，配套使用 R。学习趋势、季节性、预测与评价；使用 Python 的读者也可以先读概念和图。

- **[tsai](https://github.com/timeseriesAI/tsai)**｜基于 PyTorch/fastai 的时序学习工具与示例，适合已有任务和数据后查实践方案。
