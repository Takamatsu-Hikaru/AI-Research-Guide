# 挑一篇论文读

下面按问题选了几篇论文，每篇附有阅读切入点。读法可以参考[找资料和读论文](reading.md)。

## 第一次认识一篇论文

**[ResNet](https://arxiv.org/abs/1512.03385)**  
看作者遇到了什么训练问题，结构改动是什么，用哪些比较说明它有效。可以配[李沐精读](https://github.com/mli/paper-reading)，再回到[视觉](vision.md)。

**[Attention Is All You Need](https://arxiv.org/abs/1706.03762)**  
先沿架构图追输入输出，再看 attention 解决了哪一部分计算。[图解](https://jalammar.github.io/illustrated-transformer/)可以帮你走第一遍。接[基础与架构](basics.md)。

**[ReAct](https://react-lm.github.io/)**  
先读一条完整轨迹：模型什么时候行动，看到反馈后发生什么变化。再看论文怎样比较只有推理、只有行动与两者结合。接 [Agent](agent.md)。

## 沿着自己的兴趣继续

- [BERT](https://arxiv.org/abs/1810.04805)：训练目标怎样影响学到的表示，以及表示怎样用于任务。接 [LLM](llm.md)。
- [LoRA](https://arxiv.org/abs/2106.09685)：减少需要训练的参数，具体节省了什么，又怎样评价效果。接 [LLM](llm.md)与[系统](systems.md)。
- [CLIP](https://github.com/openai/CLIP)：图文匹配怎样成为训练任务，训练之后又怎样使用。接[多模态](multimodal.md)。
- [DDPM](https://arxiv.org/abs/2006.11239)：带噪数据、学习目标与生成过程如何联系。配[生成方向](generation.md)读。
- [World Models](https://worldmodels.github.io/)：压缩观察、预测动态与选择动作怎样组合。接[世界模型](world-model.md)。
- [DreamerV3](https://danijar.com/project/dreamerv3/)：学到的模型怎样用于行为学习，评价覆盖什么任务。接 [RL](rl.md)。
- [ACT / ALOHA](https://tonyzhaozh.github.io/aloha/)：把示范、动作预测与实际机器人任务对应起来。接[具身](embodied.md)。
- [Diffusion Policy](https://diffusion-policy.cs.columbia.edu/)：生成建模怎样用于动作，为什么要这样表示动作。接[生成](generation.md)与[具身](embodied.md)。

## 已经有问题，再翻长清单

[Agent](https://github.com/WooooDyy/LLM-Agent-Paper-List) · [多模态](https://github.com/BradyFU/Awesome-Multimodal-Large-Language-Models) · [World Models](https://github.com/JiahuaDong/Awesome-World-Models) · [具身指南](https://github.com/TianxingChen/Embodied-AI-Guide) · [AI for Science](https://github.com/ai4s-research/awesome-ai-for-science)

想认识新工作，可以看 [Hugging Face Daily Papers](https://huggingface.co/papers)。

## 跟着有经验的人读一次

[李沐论文精读](limu.md)适合拿自己的阅读记录对照；需要方向 paper list 和更多项目，查[方向资料目录](catalog-directions.md)。
