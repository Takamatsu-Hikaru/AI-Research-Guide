# 课程、教材与基础学习

想换一种讲法，或者需要系统补一块基础，可以来这里找。先认识全貌用 Crash Course；公式直觉看 3b1b；要把模型和代码连起来，可以沿李沐的课程动手。

[返回资料总索引](resources.md)

<a id="topic-3"></a>

## 计算机全貌：先知道电脑和程序在做什么

- **[Crash Course Computer Science](https://thecrashcourse.com/topic/computerscience/)**｜英文短视频。先看二进制、CPU、程序、操作系统、文件系统和互联网，建立计算机的整体印象。主持人为 Carrie Anne Philbin。 [官方介绍](https://thecrashcourse.com/courses/crash-course-computer-science-preview/)

- **[CS 自学指南](https://csdiy.wiki/)**｜中文课程导航与学习经验。先看前言和使用说明，再按想补的知识找到课程页。

- **[The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)**｜英文课程，含视频与练习。补命令行、版本管理和调试等日常工具，建议从 shell、Git 和调试开始。

- **[Pro Git 中文版](https://git-scm.com/book/zh/v2)**｜中文在线书。先学基础操作、历史记录和远程协作，需要多人合作时再看分支。

<a id="topic-4"></a>

## 数学：直觉、系统基础、遇到问题再深入

- **[3Blue1Brown：线性代数](https://www.3blue1brown.com/?topic=linear-algebra)**｜英文可视化讲解。看向量、线性变换、矩阵乘法与特征向量的几何意义，帮助理解公式为什么这样写。 [B 站入口](https://space.bilibili.com/88461692/)

- **[3Blue1Brown：The Essence of Calculus](https://www.3blue1brown.com/lessons/essence-of-calculus/)**｜英文视频与图文。从变化率、微小变化和积分建立直觉，再接梯度和链式法则。

- **[Seeing Theory — Brown University](https://seeing-theory.brown.edu/)**｜概率与统计的交互可视化。通过拖动参数、观察分布和抽样结果理解概念。

- **[MIT 18.06 Linear Algebra — Gilbert Strang](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)**｜英文课程、讲义与作业，2010 年。需要系统补线性代数时，可按子空间、正交、特征值和 SVD 选章节。

- **[Harvard Stat 110 — Joe Blitzstein](https://stat110.hsites.harvard.edu/)**｜英文课程、教材与练习。条件概率、期望和常见分布会在 ML、RL 中反复出现，可以把概念和对应练习一起学。

- **[Mathematics for Machine Learning](https://mml-book.github.io/)**｜英文开放教材，把数学基础接到机器学习。适合查矩阵分解、向量微积分、概率与优化。

<a id="topic-5"></a>

## 机器学习与深度学习

- **[An Introduction to Statistical Learning](https://www.statlearning.com/)**｜英文教材与课程，有 Python、R 版本。先理解训练、泛化、回归、分类，再看模型选择与重采样，后续按任务选算法。

- **[动手学深度学习](https://zh.d2l.ai/)**｜中文教材与代码。先看数据操作、线性模型、损失、优化和多层感知机，结合代码走一遍；模型章节按兴趣选择。 [官方课程索引](https://courses.d2l.ai/zh-v2/)

- **[李宏毅 2025 机器学习课程](https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php)**｜中文讲解、课件与视频，2025 年。结合生成式 AI 理解机器学习概念，可按具体讲次学习。

- **[Stanford CS229](https://cs229.stanford.edu/)**｜英文系统课程。适合进一步理解算法假设、推导和统计学习，课程笔记也可以按问题查阅。

- **[Practical Deep Learning for Coders — fast.ai](https://course.fast.ai/)**｜英文实践课程，适合已有编程基础的人。先做出一个能工作的模型，再回头理解组成部分，可以从第一课及配套实践开始。

- **[3Blue1Brown：But what is a Neural Network?](https://www.3blue1brown.com/lessons/neural-networks/)**｜可视化视频与图文。先建立输入、层、参数与输出的图像，再接梯度下降和反向传播。

- **[StatQuest with Josh Starmer](https://www.youtube.com/channel/UCtYLUTtgS3k1Fg4y5tAhLbw)**｜英文短视频。卡在交叉验证、偏差方差、树模型等统计或 ML 概念时，可以找另一种解释。

<a id="topic-6"></a>

## Python、张量与第一次读懂训练代码

- **[CS50’s Introduction to Programming with Python](https://cs50.harvard.edu/python/)**｜英文 Python 入门课，配有练习。从函数、条件、循环学到异常、库和文件读写，练习解释和改动小程序。

- **[NumPy: the absolute basics for beginners](https://numpy.org/doc/stable/user/absolute_beginners.html)**｜英文官方教程。从 Python 过渡到数组计算，重点看 shape、索引、轴和广播。

- **[PyTorch：Learn the Basics](https://docs.pytorch.org/tutorials/beginner/basics/intro.html)**｜英文官方教程，把数据、模型、自动求导、优化与保存串成一个训练过程。适合第一次读训练循环。

- **[Neural Networks: Zero to Hero — Karpathy](https://karpathy.ai/zero-to-hero.html)**｜英文视频与代码，需要 Python 和基本数学。先看 micrograd，理解梯度怎样算出来，再进入语言模型。

<a id="topic-7"></a>

## 模型架构：直观图解、代码、进一步推导

- **[The Illustrated Transformer — Jay Alammar](https://jalammar.github.io/illustrated-transformer/)**｜英文图解。从 token 表示、注意力到 encoder/decoder 的组合，先沿图追输入输出，再回到公式。

- **[The Annotated Transformer — Harvard NLP](https://github.com/harvardnlp/annotated-transformer)**｜英文注释代码与 notebook。把 Transformer 原论文和实现放在一起，适合已经看过图解、想读懂张量与模块的人。

- **[Transformer Explainer — Polo Club](https://poloclub.github.io/transformer-explainer/)**｜交互可视化。观察输入怎样经过 Transformer，以及各部分怎样影响下一个 token 的预测。

- **[Understanding LSTM Networks — colah](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)**｜英文图解，2015 年。通过状态、门控和序列处理理解 LSTM，也可配合时序模型学习。

- **[科学空间：文章归档 — 苏剑林](https://kexue.fm/content.html)**｜中文技术博客归档。可按“Transformer 升级之路”“生成扩散模型漫谈”等系列查位置编码、模型架构与数学推导。

## Crash Course AI：先认识这个领域在做什么

[官方课程目录](https://thecrashcourse.com/topic/ai/) · [第 1 集：What Is Artificial Intelligence?](https://thecrashcourse.com/courses/what-is-artificial-intelligence-crash-course-ai-1/) · [课程预告](https://thecrashcourse.com/courses/crash-course-artificial-intelligence-preview/)

英文短视频系列，适合建立机器学习、语言、强化学习与机器人等问题的整体印象。可以先看前几集，再按兴趣挑专题。接下来可走[起步路线](start.md)，在一个小项目里认识训练、数据与评价。
