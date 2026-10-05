# 基础：带着问题回来学

ML、DL、数学和计算机值得慢慢建立起来。做项目时补一个卡点，和抽时间系统学一门课，可以一起进行。

## Python 与计算机

先能读懂一个小程序：数据从哪里进来，函数接收什么、返回什么，循环在重复什么，报错指向哪里。用 [CS50P](https://cs50.harvard.edu/python/) 补函数、条件、循环、异常和文件操作；如果已经能写，就直接从正在看的项目找问题。

电脑里的环境、路径、终端、Git 经常比算法先把人卡住。[Missing Semester](https://missing.csail.mit.edu/) 适合在这里用，先看 shell 和版本管理；想知道 CPU、操作系统、网络在整台电脑里扮演什么角色，可以看 [Crash Course Computer Science](https://thecrashcourse.com/topic/computerscience/)。

把一个程序改好后，保存一个能回去的版本，写明怎么启动。接下来读别人项目时，你会知道 README 为什么要交代这些。

## ML：模型为什么在没见过的数据上有用

训练集、验证集、测试集，loss、过拟合、泛化、baseline，这些词决定了你怎样解释一个实验。先拿分类或回归问题把它们连起来。

[An Introduction to Statistical Learning](https://www.statlearning.com/) 适合建立这层认识，先找统计学习、分类、重采样和模型选择的章节。喜欢中文视频，也可以从[李宏毅课程](https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php)的目录选择相应主题。

学过之后，回到自己的小项目，解释为什么不能用测试结果一路挑参数，为什么训练分数高不一定好。之后需要更系统的推导，再接 [CS229](https://cs229.stanford.edu/)。

## DL：把训练这件事看清楚

用[动手学深度学习](https://zh.d2l.ai/)串起数据操作、线性模型、损失、梯度、优化和多层感知机。[配套课程](https://courses.d2l.ai/zh-v2/)有中文视频。

一边学，一边对照 [PyTorch 基础教程](https://docs.pytorch.org/tutorials/beginner/basics/intro.html)里的训练循环。现在能沿着一批数据讲清前向计算、loss、反向传播和更新，就可以继续做项目；碰到新模型，再回来查它用了什么结构。

想先从应用进入，可以选 [fast.ai](https://course.fast.ai/)；想亲手拆开自动求导，可以看 Karpathy [Zero to Hero](https://karpathy.ai/zero-to-hero.html) 的 micrograd。根据眼下的问题选一种讲法。

## 数学在哪些地方会出现

**向量、矩阵和线性变换**会出现在数据表示、网络层和 attention 里。先用 [3b1b 线性代数](https://www.3blue1brown.com/?topic=linear-algebra)建立图像，再拿代码中的维度验证；系统深入用 [MIT 18.06](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)。

**导数、梯度和链式法则**连接损失与参数更新。[3b1b 微积分](https://www.3blue1brown.com/lessons/essence-of-calculus/)适合补直觉，接着手算一个简单函数，再和自动求导结果对比。

**概率、期望和条件概率**会出现在生成模型、强化学习和实验分析里。[Seeing Theory](https://seeing-theory.brown.edu/)可以动手看分布；需要完整课程时用 [Stat 110](https://stat110.hsites.harvard.edu/)。

找一个你当前会用到的概念，做几道题，再回论文看它承担了什么作用。需要把几块数学接起来时，查 [Mathematics for Machine Learning](https://mml-book.github.io/)。

## 从模型结构继续往下

看 Transformer，可以先沿 [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) 的图走一遍，再用 [Transformer Explainer](https://poloclub.github.io/transformer-explainer/)观察输入与输出。下一步看 [Annotated Transformer](https://github.com/harvardnlp/annotated-transformer)，把图里的 attention 对应到实现。

想深入位置编码、扩散等推导，可以去[苏剑林的科学空间](https://kexue.fm/content.html)按主题找系列。先记下自己要弄清的一个问题，读到能够解释它，再回当前的工作。

## 回到你想做的事情

[小实验](start.md) · [LLM](llm.md) · [视觉](vision.md) · [RL](rl.md) · [方向总览](directions.md)

## 换一种讲法继续学

[完整课程与教材目录](catalog-foundation.md)保留数学、计算机、ML/DL 和编程的其他选择。[李沐的课程与论文精读](limu.md)可以把基础、代码和研究阅读串起来。
