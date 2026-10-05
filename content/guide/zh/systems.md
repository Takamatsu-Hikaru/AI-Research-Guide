# 效率与系统：让模型真的跑得动

同一个模型，为什么换一个 batch size 就快了，显存明明没满却跑不动，吞吐提高了但用户等得更久？模型落到程序和硬件上，这些问题就会出现。

## 计算、访存与执行开销

从 [Horace He：Making Deep Learning go Brrrr](https://horace.io/brrr_intro.html)认识计算、内存和执行开销。然后选自己的一个小程序，记录输入、硬件、运行方式与耗时，再看具体瓶颈。

想补系统全貌，用 [Machine Learning Systems](https://mlsysbook.ai/) 按问题查；量化、压缩与高效计算可以接 [MIT 6.5940（2024）](https://hanlab.mit.edu/courses/2024-fall-65940)。

## 延迟、吞吐、显存与质量

交互服务可能在意首字延迟和尾延迟，离线批处理可能在意吞吐，部署还会受显存与成本约束。优化前把这些条件写下来，同时保留任务质量的评价。

可以先测不同输入长度或 batch size 下的表现，再查 [PyTorch Performance Tuning Guide](https://docs.pytorch.org/tutorials/recipes/recipes/tuning_guide.html)中的相关建议。一次改动之后，用相同负载重测。

## 分布式训练与推理

[How To Scale Your Model](https://jax-ml.github.io/scaling-book/)可以继续认识分布式计算与硬件约束。等你有一个具体瓶颈，再沿通信、并行、内存与算力往下读。

这里也很适合检验自己怎样使用 AI：它可以帮你写测试脚本，但你要能讲清测试测的是什么、优化影响了谁。接[和 AI 一起做事](ai.md)。

## 系统案例、课程与研究团队

可以对照[Purshow 的系统笔记](blogs.md#purshow)、[效率与系统资料](catalog-directions.md#topic-22)和[MIT HAN Lab 等团队](labs.md)，看看模型设计与部署约束怎样联系。
