# Large language models: understanding, generation, and reasoning

Behind the chat models you use daily are connected questions: how text becomes model input, what data teaches the model, why different training changes its answers, and how to tell whether it improved.

Research can begin with any one of those steps.

## Tokenization, representations and next-token prediction

Use the [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1) to meet models, tokenizers, and datasets. Inspect the tokenization of a sentence and the model's inputs and outputs. For embeddings, matrix operations, or gradients, revisit [foundations](basics.md).

Then follow text, tokens, attention, and outputs through [LLMs from Scratch](https://github.com/rasbt/LLMs-from-scratch). The repository accompanies the book; begin with the module you want to understand.

## Pre-training, post-training and inference efficiency

**How capabilities are learned:** study data, objectives, and optimization. Once you can explain training code, enter [Stanford CS336, 2025](https://cs336.stanford.edu/spring2025/) through a topic in data, training, or systems.

**How a model becomes better for a task:** study fine-tuning, feedback, and evaluation. Fix the task and evaluation before comparing base and adapted models. Rewards and policy updates connect to [RL](rl.md).

**Why models are slow and expensive:** see [efficiency and systems](systems.md). Scale, context, precision, caching, and hardware jointly determine feasible experiments.

Language representations, semantics, and tasks also deserve study. [CS224N](https://web.stanford.edu/class/cs224n/) connects them with model methods.

## Transformer, BERT and LoRA

Read [Transformer](https://arxiv.org/abs/1706.03762) for architecture, [BERT](https://arxiv.org/abs/1810.04805) for pretraining objectives and representations, and [LoRA](https://arxiv.org/abs/2106.09685) for reducing trainable adaptation parameters. Pair a paper with [Mu Li's readings](https://github.com/mli/paper-reading).

Then read Jiaxuan Zou's [pretraining and scaling as methodology and scientific perspective](https://jiaxuanzou0714.github.io/blog/2026/pretrain-scaling-methodology-scientific-perspective/) to see how a researcher connects scale, data, stability, and problem selection.

## Inspect a small model’s tokens and outputs

Choose a small model you can run and a small text set. Record tokenization, input length, outputs, and errors. Change one setting and observe its effect. Check the selected tutorial's model and device requirements.

For tool use, continue to [agents](agent.md); for image understanding, see [multimodal models](multimodal.md).

## Position encoding, optimizers and scaling

For positional encodings and optimizers, see [Jianlin Su](blogs.md#su); for scaling experiments and extrapolation, see [Jiaxuan Zou](blogs.md#zou). Courses and projects are in the [LLM catalog](catalog-directions.md#topic-14).
