# World models: predict, then act

If a system can predict what happens after an action, it can compare choices before acting. World-model research asks how to represent environmental change and use predictions for learning and decisions.

## Begin with a concrete system

[World Models](https://worldmodels.github.io/) combines compressed observations, dynamics prediction, and control. Follow its diagrams and demos, identifying every module's inputs and outputs.

Then inspect [DreamerV3](https://danijar.com/project/dreamerv3/) and how the learned model participates in behavior learning. Relevant foundations include representation learning, sequence prediction, and [RL](rl.md) policies and returns.

## Two questions to follow

**What is predicted?** Images, compressed states, or other representations. Representation choices affect training difficulty and the information retained.

**What is prediction for?** Generating future frames, simulating interaction, training policies, and planning have different requirements. To judge whether actions improve, evaluate downstream task outcomes.

For image and video synthesis, see [generation](generation.md); for robot applications, see [embodied AI](embodied.md).

## A useful first pass

Draw the data and module relationships in World Models. Find a prediction failure and consider its effect on later decisions. Then try running or training under the project's conditions. Long training need not be your first encounter.

Use [Awesome World Models](https://github.com/JiahuaDong/Awesome-World-Models) by topic. Following one use case builds understanding more readily than treating every system called a world model as the same thing.

## Research notes and projects

The [world-model catalog](catalog-directions.md#topic-17) includes classic projects and paper indexes. [Purshow Notes](blogs.md#purshow) also contains WAM and related technical notes to consult by question.
