# 生成模型：图像是怎样一步步得到的

从一段话得到图像，或者从噪声逐步生成一个样本，背后需要学习数据的规律，也需要一条能实际采样的计算过程。研究可以发生在训练目标、生成路径、控制条件或速度上。

## 从一次扩散采样开始

从 [Hugging Face Diffusion Course](https://huggingface.co/learn/diffusion-course/unit1/1) 的第一单元进入，观察带噪样本与去噪预测之间的关系。配合一份小例子看每一步的输入输出。

接着读 [Lilian Weng 的 Diffusion Models](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/)或 [Yang Song 的 score-based generative modeling](https://yang-song.net/blog/2021/score/)，选一种讲法往下走。

## 扩散与 Flow Matching 的数学

概率分布、噪声、梯度和微分方程会逐渐出现。用[基础页](basics.md)补当前卡点，再接 [MIT Flow Matching and Diffusion（2025）](https://diffusion.csail.mit.edu/2025/)的讲义与练习。

第一遍先分清训练时模型在学什么、生成时怎么使用它。之后再比较不同方法的目标和采样过程。

## 采样步数怎样影响速度和结果

固定模型与输入条件，改变采样步数，记录时间与生成结果怎样变化。如果只挑最好看的图，很难知道改动整体是否有效；把相同条件下的一组结果一起保留下来。

这些方法也可能用于预测机器人动作，接 [Diffusion Policy](https://diffusion-policy.cs.columbia.edu/)和[具身页](embodied.md)。如果关心生成过程怎样用于环境预测和决策，再读 [World Model](world-model.md)。

## 扩散推导与模型比较

中文推导可以看[苏剑林的扩散系列入口](blogs.md#su)，比较实验可以看 [LoopDiT](blogs.md#chai)。课程与其他项目集中在[生成模型资料目录](catalog-directions.md#topic-16)。
