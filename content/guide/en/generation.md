# Generative models: how an image is made

Generating an image from text or progressively turning noise into a sample requires learning patterns in data and a practical sampling process. Research can concern objectives, generation paths, conditioning, or speed.

## Start with diffusion sampling

Begin with unit one of the [Hugging Face Diffusion Course](https://huggingface.co/learn/diffusion-course/unit1/1). Observe the relationship between noisy samples and denoising predictions, following each step's inputs and outputs in a small example.

Then choose an explanation from [Lilian Weng's Diffusion Models](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) or [Yang Song's score-based generative modeling](https://yang-song.net/blog/2021/score/).

## The mathematics of diffusion and flow matching

Distributions, noise, gradients, and differential equations gradually enter the picture. Use [foundations](basics.md) for the current gap, then the lectures and exercises in [MIT Flow Matching and Diffusion, 2025](https://diffusion.csail.mit.edu/2025/).

First distinguish what the model learns during training from how it is used during generation. Then compare objectives and sampling procedures.

## Sampling steps, speed and output quality

Hold the model and input conditions fixed, change sampling steps, and record time and generated outputs. Keep a set of results under matching conditions; selecting only the prettiest image makes the overall effect hard to judge.

These methods can also predict robot actions: see [Diffusion Policy](https://diffusion-policy.cs.columbia.edu/) and [embodied AI](embodied.md). For generation as environment prediction and decision-making, see [world models](world-model.md).

## Diffusion derivations and model comparisons

For Chinese derivations, see [Jianlin Su's diffusion series](blogs.md#su). For comparative experiments, see [LoopDiT](blogs.md#chai). More courses and projects are in the [generation catalog](catalog-directions.md#topic-16).
