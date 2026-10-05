# Efficiency and systems: making models run

Why does changing batch size speed up a model? Why can a program struggle before memory is full? Why can throughput improve while users wait longer? These questions appear when models meet software and hardware.

## Compute, memory access and execution overhead

Read [Horace He's Making Deep Learning go Brrrr](https://horace.io/brrr_intro.html) for compute, memory, and execution overhead. Record inputs, hardware, execution mode, and time for a small program, then investigate its bottleneck.

Use [Machine Learning Systems](https://mlsysbook.ai/) for a broader view. For quantization, compression, and efficient computing, see [MIT 6.5940, 2024](https://hanlab.mit.edu/courses/2024-fall-65940).

## Latency, throughput, memory and quality

Interactive services may prioritize time to first token and tail latency; offline batches may prioritize throughput. Memory and cost also constrain deployment. Write these conditions down and retain an evaluation of task quality.

Measure different input lengths or batch sizes, then consult the relevant [PyTorch Performance Tuning Guide](https://docs.pytorch.org/tutorials/recipes/recipes/tuning_guide.html) advice. Remeasure under the same workload after a change.

## Distributed training and inference

[How To Scale Your Model](https://jax-ml.github.io/scaling-book/) introduces distributed computation and hardware constraints. With a concrete bottleneck, follow communication, parallelism, memory, and compute.

This also tests your use of AI. It can write benchmark scripts, but you should explain what the test measures and whom the optimization affects. See [working with AI](ai.md).

## System case studies, courses and research teams

Compare [Purshow's systems notes](blogs.md#purshow), the [systems catalog](catalog-directions.md#topic-22), and [teams such as MIT HAN Lab](labs.md) to connect model design and deployment constraints.
