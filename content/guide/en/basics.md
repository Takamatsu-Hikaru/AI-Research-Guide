# Which foundations do you need, and how much?

ML, deep learning, mathematics, and computing are worth building gradually. Filling a gap during a project and studying a course systematically can happen together.

## Python and computing

First learn to read a small program: where data enters, what a function receives and returns, what a loop repeats, and where an error points. Use [CS50P](https://cs50.harvard.edu/python/) for functions, conditions, loops, exceptions, and files. If you can already code, start with the project in front of you.

Environments, paths, terminals, and Git often block progress before algorithms do. [Missing Semester](https://missing.csail.mit.edu/) is useful here; begin with the shell and version control. For the roles of CPUs, operating systems, and networks, see [Crash Course Computer Science](https://thecrashcourse.com/topic/computerscience/).

After changing a program, save a version you can return to and explain how to run it. You will understand why another project's README needs those details.

## ML: why models work on unseen data

Training, validation, and test sets; loss, overfitting, generalization, and baselines: these ideas determine how you interpret an experiment. Connect them through a classification or regression task.

[An Introduction to Statistical Learning](https://www.statlearning.com/) builds that understanding. Start with statistical learning, classification, resampling, and model selection. For Chinese videos, choose the relevant topics from [Hung-yi Lee's course](https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php).

Return to your project and explain why repeated tuning on test results is a problem and why a high training score need not be good. For more systematic derivations, continue to [CS229](https://cs229.stanford.edu/).

## Deep learning: understand a training run

[Dive into Deep Learning](https://zh.d2l.ai/) connects data operations, linear models, losses, gradients, optimization, and multilayer perceptrons. The [companion course](https://courses.d2l.ai/zh-v2/) includes Chinese videos.

Compare it with the training loop in [PyTorch's basics tutorial](https://docs.pytorch.org/tutorials/beginner/basics/intro.html). Once you can follow a batch through the forward pass, loss, backpropagation, and update, continue the project. Return when a new architecture raises questions.

For an application-first approach, try [fast.ai](https://course.fast.ai/). To take automatic differentiation apart, try micrograd in Karpathy's [Zero to Hero](https://karpathy.ai/zero-to-hero.html). Choose the explanation that addresses your current question.

## Where mathematics appears

**Vectors, matrices, and linear transformations** appear in representations, network layers, and attention. Build visual intuition with [3Blue1Brown's linear algebra](https://www.3blue1brown.com/?topic=linear-algebra), then check dimensions in code. For systematic depth, use [MIT 18.06](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/).

**Derivatives, gradients, and the chain rule** connect loss to parameter updates. Use [3Blue1Brown's calculus](https://www.3blue1brown.com/lessons/essence-of-calculus/) for intuition, differentiate a simple function yourself, and compare with automatic differentiation.

**Probability, expectation, and conditional probability** recur in generative models, RL, and experimental analysis. Explore distributions interactively with [Seeing Theory](https://seeing-theory.brown.edu/). Use [Stat 110](https://stat110.hsites.harvard.edu/) when you want a full course.

Choose a concept you currently need, solve some exercises, and return to its role in the paper. [Mathematics for Machine Learning](https://mml-book.github.io/) helps connect these areas.

## Going deeper into architectures

For Transformers, follow [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/), then inspect inputs and outputs with [Transformer Explainer](https://poloclub.github.io/transformer-explainer/). Use the [Annotated Transformer](https://github.com/harvardnlp/annotated-transformer) to connect attention diagrams to implementation.

For derivations of positional encodings, diffusion, and related topics, browse [Jianlin Su's Scientific Spaces](https://kexue.fm/content.html). Start with a question, read until you can explain it, and return to your work.

## Return to what you want to do

[Small projects](start.md) · [LLMs](llm.md) · [Vision](vision.md) · [RL](rl.md) · [Directions](directions.md)

## Try another explanation

The [course and textbook catalog](catalog-foundation.md) preserves other choices in mathematics, computing, ML/DL, and programming. [Mu Li's courses and paper readings](limu.md) connect foundations, code, and research reading.
